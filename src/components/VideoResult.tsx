"use client";

import React, { useState } from "react";
import { TikTokVideoData } from "@/types/tiktok";
import {
  Download,
  Music,
  CheckCircle2,
  Copy,
  Share2,
  ExternalLink,
  Sparkles,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  RotateCcw,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Volume2,
} from "lucide-react";

interface VideoResultProps {
  data: TikTokVideoData;
  onReset: () => void;
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return "";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

export function VideoResult({ data, onReset }: VideoResultProps) {
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const cleanFilenameBase =
    `tiktok_${data.author.username}_${data.id}`.replace(/[^a-zA-Z0-9_-]/g, "_");

  const handleCopyLink = () => {
    const linkToCopy = data.downloads.hd.url || data.downloads.sd.url;
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerDownload = (url: string, filename: string, type: "video" | "audio" | "image", formatKey: string) => {
    setDownloadingFormat(formatKey);
    const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(
      filename
    )}&type=${type}`;

    // Create invisible anchor to trigger direct browser file save
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      setDownloadingFormat(null);
    }, 2000);
  };

  const videoStreamUrl = data.downloads.hd.url || data.downloads.sd.url;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl glass-panel p-6 sm:p-8 md:p-10 transition-all border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow inside card */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#fe2c55]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#25f4ee]/15 blur-3xl" />

      {/* Top Banner Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25f4ee] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25f4ee]"></span>
          </span>
          <span className="text-sm font-semibold text-[#25f4ee] tracking-wide uppercase">
            Video Ready for Download • 100% Watermark Removed
          </span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Download Another Video
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video Preview / Thumbnail */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl aspect-[9/16] group">
            {videoStreamUrl && !data.isSlideshow ? (
              <video
                src={videoStreamUrl}
                poster={data.cover || undefined}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            ) : data.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.cover}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                No preview available
              </div>
            )}

            {/* Quality pill overlay */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-[#25f4ee] border border-[#25f4ee]/30">
                <Sparkles className="h-3 w-3" />
                Full HD 1080p
              </span>
            </div>

            {data.duration > 0 && (
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-xs font-medium text-white/90">
                  {Math.floor(data.duration / 60)}:
                  {String(data.duration % 60).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          {/* Quick Action below preview */}
          <div className="mt-4 flex w-full max-w-sm gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 px-3 text-xs font-medium text-zinc-200 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Direct Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-zinc-400" />
                  <span>Copy Clean Link</span>
                </>
              )}
            </button>

            {videoStreamUrl && (
              <a
                href={videoStreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 px-3 text-xs font-medium text-zinc-200 transition-all hover:text-[#25f4ee]"
                title="Open raw video in browser tab"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Raw</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Author Info & Download Action Buttons */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Creator Profile */}
          <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
            {data.author.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.author.avatar}
                alt={data.author.nickname}
                className="h-14 w-14 rounded-full object-cover border-2 border-[#25f4ee]/40 shadow-md"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-white border border-white/10">
                {data.author.nickname.charAt(0)}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white truncate">
                  {data.author.nickname}
                </h3>
                <span className="text-xs bg-[#25f4ee]/10 text-[#25f4ee] px-2 py-0.5 rounded-full font-medium border border-[#25f4ee]/20">
                  Verified
                </span>
              </div>
              <p className="text-sm text-zinc-400 font-mono truncate">
                @{data.author.username}
              </p>
            </div>
          </div>

          {/* Caption */}
          {data.title && (
            <div className="text-sm sm:text-base text-zinc-200 leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/5 font-sans break-words">
              {data.title}
            </div>
          )}

          {/* Video Metrics */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <Heart className="h-4 w-4 text-[#fe2c55] mb-1" />
              <span className="text-xs sm:text-sm font-bold text-white">
                {formatNumber(data.stats.likes)}
              </span>
              <span className="text-[10px] text-zinc-400">Likes</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <MessageCircle className="h-4 w-4 text-[#25f4ee] mb-1" />
              <span className="text-xs sm:text-sm font-bold text-white">
                {formatNumber(data.stats.comments)}
              </span>
              <span className="text-[10px] text-zinc-400">Comments</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <Repeat2 className="h-4 w-4 text-emerald-400 mb-1" />
              <span className="text-xs sm:text-sm font-bold text-white">
                {formatNumber(data.stats.shares)}
              </span>
              <span className="text-[10px] text-zinc-400">Shares</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <Eye className="h-4 w-4 text-amber-400 mb-1" />
              <span className="text-xs sm:text-sm font-bold text-white">
                {formatNumber(data.stats.views)}
              </span>
              <span className="text-[10px] text-zinc-400">Views</span>
            </div>
          </div>

          {/* Background Music Info */}
          {data.music.title && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300">
              <div className="p-2 rounded-lg bg-[#fe2c55]/10 text-[#fe2c55]">
                <Music className="h-4 w-4" />
              </div>
              <div className="flex-1 truncate">
                <span className="font-semibold text-white">Music: </span>
                <span className="text-zinc-300">{data.music.title}</span>
                {data.music.author && (
                  <span className="text-zinc-400"> — {data.music.author}</span>
                )}
              </div>
            </div>
          )}

          {/* High Quality Download Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Available Formats (Without Watermark)
            </h4>

            {/* OPTION 1: UNIVERSAL H.264 MP4 (RECOMMENDED - PLAYS ON ALL WINDOWS, APPLE, AND ANDROID DEVICES) */}
            <button
              onClick={() =>
                triggerDownload(
                  data.downloads.sd.url || data.downloads.hd.url,
                  `${cleanFilenameBase}_universal_nowatermark.mp4`,
                  "video",
                  "universal"
                )
              }
              disabled={downloadingFormat === "universal"}
              className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-[#25f4ee] via-[#00c4cc] to-[#fe2c55] text-black font-bold transition-all shadow-xl hover:shadow-[#fe2c55]/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-[#25f4ee] shadow-inner group-hover:scale-105 transition-transform">
                  {downloadingFormat === "universal" ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#25f4ee] border-t-transparent" />
                  ) : (
                    <Download className="h-5 w-5" />
                  )}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight text-black">
                      Download MP4 (Universal)
                    </span>
                    <span className="rounded-md bg-black px-2 py-0.5 text-[10px] font-black uppercase text-[#25f4ee]">
                      NO WATERMARK
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-black/85">
                    Universal H.264 • Plays on all Windows, Apple & Android devices
                  </p>
                </div>
              </div>

              <div className="text-right pl-2 hidden sm:block">
                <span className="rounded-lg bg-black/20 px-2.5 py-1 text-xs font-black text-black">
                  {data.downloads.sd.size
                    ? formatBytes(data.downloads.sd.size)
                    : "Standard HD"}
                </span>
              </div>
            </button>

            {/* OPTION 2: 1080P ULTRA HD (HEVC STREAM IF SEPARATE) */}
            {data.downloads.hd.url && (
              <button
                onClick={() =>
                  triggerDownload(
                    data.downloads.hd.url,
                    `${cleanFilenameBase}_1080p_hevc.mp4`,
                    "video",
                    "hd"
                  )
                }
                disabled={downloadingFormat === "hd"}
                className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:border-[#25f4ee]/40 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25f4ee]/10 text-[#25f4ee]">
                    {downloadingFormat === "hd" ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#25f4ee] border-t-transparent" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-zinc-100">
                        Download 1080p Ultra HD (HEVC)
                      </span>
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300">
                        1080p
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      High bitrate (Requires VLC or HEVC codec on Windows)
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-zinc-400 font-mono">
                    {data.downloads.hd.size
                      ? formatBytes(data.downloads.hd.size)
                      : "1080p"}
                  </span>
                </div>
              </button>
            )}

            {/* Device Compatibility Note */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Device Compatibility:</strong> Use <strong>Universal MP4</strong> to play natively on all Windows Media Players, Apple iPhone/iPad/Mac, and Android without any extra codec prompts.
              </span>
            </div>

            {/* OPTION 3: MP3 AUDIO (ORIGINAL SOUND) */}
            {data.downloads.audio?.url && (
              <button
                onClick={() =>
                  triggerDownload(
                    data.downloads.audio!.url,
                    `${cleanFilenameBase}_audio.mp3`,
                    "audio",
                    "audio"
                  )
                }
                disabled={downloadingFormat === "audio"}
                className="group flex items-center justify-between w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:border-[#fe2c55]/40 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fe2c55]/10 text-[#fe2c55]">
                    {downloadingFormat === "audio" ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#fe2c55] border-t-transparent" />
                    ) : (
                      <Music className="h-4 w-4" />
                    )}
                  </div>
                  <div className="text-left">
                    <span className="text-sm sm:text-base font-bold text-zinc-100">
                      Download MP3 Audio
                    </span>
                    <p className="text-xs text-zinc-400">
                      High Quality 320kbps Audio Track
                    </p>
                  </div>
                </div>

                <span className="rounded-lg bg-white/5 px-2 py-1 text-xs font-mono text-[#fe2c55] border border-[#fe2c55]/20">
                  MP3
                </span>
              </button>
            )}

            {/* OPTION 4: COVER THUMBNAIL */}
            {data.cover && (
              <button
                onClick={() =>
                  triggerDownload(
                    data.cover!,
                    `${cleanFilenameBase}_cover.jpg`,
                    "image",
                    "cover"
                  )
                }
                disabled={downloadingFormat === "cover"}
                className="group flex items-center justify-between w-full p-3 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/5 text-zinc-300 font-medium transition-all hover:border-white/20 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">
                    Download HD Cover Thumbnail
                  </span>
                </div>
                <span className="text-xs text-zinc-500">JPG</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PHOTO CAROUSEL / SLIDESHOW MODE (IF APPLICABLE) */}
      {data.isSlideshow && data.images.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#25f4ee]" />
                Photo Slide Images ({data.images.length} Photos)
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                This TikTok is a photo slideshow. You can download individual photos in original HD quality.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 aspect-square shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <button
                    onClick={() =>
                      triggerDownload(
                        imgUrl,
                        `${cleanFilenameBase}_slide_${idx + 1}.jpg`,
                        "image",
                        `img_${idx}`
                      )
                    }
                    className="w-full py-1.5 px-2 rounded-lg bg-[#25f4ee] hover:bg-white text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Download className="h-3 w-3" />
                    Download #{idx + 1}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
