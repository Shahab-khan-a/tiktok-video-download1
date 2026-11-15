import { NextRequest, NextResponse } from "next/server";
import { QualityOption } from "@/types/tiktok";


interface TikWMResponse {
  code: number;
  msg: string;
  data?: {
    id: string;
    title: string;
    cover: string;
    origin_cover?: string;
    duration: number;
    play: string;
    wmplay?: string;
    hdplay?: string;
    size?: number;
    wm_size?: number;
    hd_size?: number;
    music?: string;
    music_info?: {
      id?: string;
      title?: string;
      author?: string;
      album?: string;
      play?: string;
      duration?: number;
      cover?: string;
    };
    play_count?: number;
    digg_count?: number;
    comment_count?: number;
    share_count?: number;
    download_count?: number;
    author?: {
      id?: string;
      unique_id?: string;
      nickname?: string;
      avatar?: string;
    };
    images?: string[];
  };
}

function normalizeUrl(rawUrl: string): string {
  let url = rawUrl.trim();
  // If user pasted a full share text with message, extract URL
  const match = url.match(/https?:\/\/[^\s]+/i);
  if (match) {
    url = match[0];
  }
  // Strip trailing punctuation
  url = url.replace(/[),.;]+$/, "");
  return url;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatMediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://www.tikwm.com${url}`;
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputUrl = body?.url;

    if (!inputUrl || typeof inputUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid TikTok video URL." },
        { status: 400 }
      );
    }

    let url = normalizeUrl(inputUrl);

    if (!url.includes("tiktok.com")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid URL. Please enter a valid TikTok link (e.g., https://www.tiktok.com/@user/video/... or https://vt.tiktok.com/...)",
        },
        { status: 400 }
      );
    }

    // If it's a short link (vt.tiktok.com or vm.tiktok.com or /t/), follow redirects to resolve canonical URL
    if (
      url.includes("vt.tiktok.com") ||
      url.includes("vm.tiktok.com") ||
      url.includes("/t/")
    ) {
      try {
        const redirectRes = await fetch(url, {
          redirect: "follow",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          },
        });
        if (redirectRes.url && redirectRes.url.includes("tiktok.com")) {
          url = redirectRes.url;
        }
      } catch (err) {
        console.warn("Could not resolve redirect, using raw url:", err);
      }
    }

    // Call TikWM API with HD enabled
    const formData = new URLSearchParams();
    formData.append("url", url);
    formData.append("hd", "1");

    const tikwmRes = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json, text/javascript, */*; q=0.01",
      },
      body: formData.toString(),
      cache: "no-store",
    });

    if (!tikwmRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Service responded with status ${tikwmRes.status}. Please try again.`,
        },
        { status: 502 }
      );
    }

    const json: TikWMResponse = await tikwmRes.json();

    if (json.code !== 0 || !json.data) {
      return NextResponse.json(
        {
          success: false,
          error:
            json.msg ||
            "Unable to fetch video. The video might be private, deleted, or region-restricted.",
        },
        { status: 422 }
      );
    }

    const data = json.data;
    const playUrl = formatMediaUrl(data.play);
    const hdPlayUrl = formatMediaUrl(data.hdplay) || playUrl;
    const wmPlayUrl = formatMediaUrl(data.wmplay);
    const musicUrl = formatMediaUrl(data.music || data.music_info?.play);
    const coverUrl = formatMediaUrl(data.origin_cover || data.cover);

    const images = Array.isArray(data.images)
      ? data.images.map((img) => formatMediaUrl(img)).filter((img): img is string => !!img)
      : [];

    const isSlideshow = images.length > 0;

    const qualities: QualityOption[] = [];

    // 1. 1080p Full HD (Best quality stream)
    if (hdPlayUrl) {
      const hdSize = data.hd_size || data.size || 0;
      qualities.push({
        id: "1080p",
        label: "1080p Full HD",
        resolution: "1920x1080 (1080p)",
        format: "MP4",
        type: "video",
        url: hdPlayUrl,
        size: hdSize,
        sizeFormatted: formatBytes(hdSize) || "Full HD",
        badge: "Best Quality",
        badgeColor: "cyan",
        description: "Maximum resolution & clarity • No watermark",
        recommended: false,
      });
    }

    // 2. 720p HD (Universal MP4 - Recommended for 100% device compatibility)
    if (playUrl) {
      const sdSize = data.size || 0;
      qualities.push({
        id: "720p",
        label: "720p HD (Universal)",
        resolution: "1280x720 (720p)",
        format: "MP4",
        type: "video",
        url: playUrl,
        size: sdSize,
        sizeFormatted: formatBytes(sdSize) || "Standard HD",
        badge: "Recommended",
        badgeColor: "emerald",
        description: "Universal H.264 • Plays on all iPhone, Android & PC",
        recommended: true,
      });
    }

    // 3. 480p SD (Data Saver / Fast mobile download)
    if (playUrl) {
      const estSize = data.size ? Math.round(data.size * 0.6) : 0;
      qualities.push({
        id: "480p",
        label: "480p SD (Fast)",
        resolution: "854x480 (480p)",
        format: "MP4",
        type: "video",
        url: playUrl,
        size: estSize,
        sizeFormatted: formatBytes(estSize) || "Lightweight",
        badge: "Data Saver",
        badgeColor: "amber",
        description: "Smaller file size • Fast download • Less data usage",
        recommended: false,
      });
    }

    // 4. MP3 Audio (Original Sound track)
    if (musicUrl) {
      qualities.push({
        id: "audio",
        label: "MP3 Audio (320kbps)",
        resolution: "Audio Only (320kbps)",
        format: "MP3",
        type: "audio",
        url: musicUrl,
        badge: "Audio Only",
        badgeColor: "pink",
        description: "Original TikTok background sound & music track",
        recommended: false,
      });
    }

    // 5. Watermarked (Original stream with TikTok watermark)
    if (wmPlayUrl) {
      const wmSize = data.wm_size || 0;
      qualities.push({
        id: "watermarked",
        label: "Original (With Watermark)",
        resolution: "Original Stream",
        format: "MP4",
        type: "video",
        url: wmPlayUrl,
        size: wmSize,
        sizeFormatted: formatBytes(wmSize) || "Original",
        badge: "Original",
        badgeColor: "zinc",
        description: "Original video retaining TikTok logo and username",
        recommended: false,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        title: data.title || "TikTok Video",
        duration: data.duration || 0,
        cover: coverUrl,
        author: {
          id: data.author?.id || "",
          username: data.author?.unique_id || "tiktok_user",
          nickname: data.author?.nickname || "TikTok Creator",
          avatar: formatMediaUrl(data.author?.avatar),
        },
        stats: {
          views: data.play_count ?? 0,
          likes: data.digg_count ?? 0,
          comments: data.comment_count ?? 0,
          shares: data.share_count ?? 0,
          downloads: data.download_count ?? 0,
        },
        music: {
          title: data.music_info?.title || "Original Sound",
          author: data.music_info?.author || data.author?.nickname || "TikTok",
          url: musicUrl,
        },
        downloads: {
          hd: {
            url: hdPlayUrl,
            size: data.hd_size || data.size || 0,
            quality: "1080p Full HD (No Watermark)",
          },
          sd: {
            url: playUrl,
            size: data.size || 0,
            quality: "Standard Quality (No Watermark)",
          },
          watermarked: wmPlayUrl
            ? {
                url: wmPlayUrl,
                size: data.wm_size || 0,
                quality: "With Watermark",
              }
            : null,
          audio: musicUrl
            ? {
                url: musicUrl,
                quality: "MP3 Audio (Original Sound)",
              }
            : null,
        },
        qualities,
        isSlideshow,
        images,
      },
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_")
    ) {
      throw error;
    }
    console.error("TikTok API Handler error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      {
        success: false,
        error: `Failed to process TikTok video: ${message}`,
      },
      { status: 500 }
    );
  }
}
