import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const mediaUrl = searchParams.get("url");
    const rawFilename = searchParams.get("filename") || "tiktok_download";
    const mediaType = searchParams.get("type") || "video";

    if (!mediaUrl) {
      return new NextResponse("Missing url parameter", { status: 400 });
    }

    // Security check: only allow http / https
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(mediaUrl);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        return new NextResponse("Invalid protocol", { status: 400 });
      }
    } catch {
      return new NextResponse("Invalid URL format", { status: 400 });
    }

    // Clean filename
    let safeFilename = rawFilename
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 100);

    const ext =
      mediaType === "audio"
        ? ".mp3"
        : mediaType === "image"
          ? ".jpg"
          : ".mp4";

    if (!safeFilename.endsWith(ext)) {
      safeFilename += ext;
    }

    // Forward range header if present for resumable downloads or video scrubbing
    const rangeHeader = req.headers.get("range");
    const fetchHeaders: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://www.tiktok.com/",
      Accept: "*/*",
    };

    if (rangeHeader) {
      fetchHeaders["Range"] = rangeHeader;
    }

    const upstreamResponse = await fetch(mediaUrl, {
      headers: fetchHeaders,
      cache: "no-store",
    });

    if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
      return new NextResponse(
        `Upstream error: ${upstreamResponse.status} ${upstreamResponse.statusText}`,
        { status: 502 }
      );
    }

    const contentType =
      upstreamResponse.headers.get("content-type") ||
      (mediaType === "audio"
        ? "audio/mpeg"
        : mediaType === "image"
          ? "image/jpeg"
          : "video/mp4");

    const contentLength = upstreamResponse.headers.get("content-length");
    const contentRange = upstreamResponse.headers.get("content-range");
    const acceptRanges = upstreamResponse.headers.get("accept-ranges") || "bytes";

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", contentType);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
    );
    responseHeaders.set("Accept-Ranges", acceptRanges);

    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }
    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
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
    console.error("Download proxy error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(`Download error: ${message}`, { status: 500 });
  }
}
