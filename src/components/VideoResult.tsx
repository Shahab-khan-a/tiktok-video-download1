"use client";

import React, { useState, useEffect } from "react";
import { TikTokVideoData, QualityOption, QualityId } from "@/types/tiktok";
import {
  Download,
  Music,
  Copy,
  ExternalLink,
  Sparkles,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  RotateCcw,
  Image as ImageIcon,
  Check,
  CheckCircle2,
  Film,
  Zap,
  Layers,
  Info,
  Smartphone,
} from "lucide-react";

interface VideoResultProps {
  data: TikTokVideoData;
  initialQualityId?: QualityId;
  onReset: () => void;
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

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function VideoResult({ data, initialQualityId = "1080p", onReset }: VideoResultProps) {
  const [copied, setCopied] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<"all" | "video" | "audio">("all");

  const availableQualities = data.qualities && data.qualities.length > 0 ? data.qualities : [];
  
  const defaultQuality =
    availableQualities.find((q) => q.id === initialQualityId) ||
    availableQualities.find((q) => q.recommended) ||
    availableQualities[0] ||
    null;

  const [selectedQuality, setSelectedQuality] = useState<QualityOption | null>(defaultQuality);

  useEffect(() => {
    if (availableQualities.length > 0) {
      const match =
        availableQualities.find((q) => q.id === initialQualityId) ||
        availableQualities.find((q) => q.recommended) ||
        availableQualities[0];
      if (match) setSelectedQuality(match);
    }
  }, [initialQualityId, availableQualities]);

  const cleanFilenameBase =
    `tiktok_${data.author.username}_${data.id}`.replace(/[^a-zA-Z0-9_-]/g, "_");

  const handleCopyLink = () => {
    const linkToCopy = selectedQuality?.url || data.downloads.hd.url || data.downloads.sd.url;
    if (linkToCopy) {
      navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const triggerDownload = (option: {
    url: string;
    filename: string;
    type: "video" | "audio" | "image";
    key: string;
    label?: string;
  }) => {
    setDownloadingId(option.key);
    setDownloadSuccess(null);

    const downloadUrl = `/api/download?url=${encodeURIComponent(option.url)}&filename=${encodeURIComponent(
      option.filename
    )}&type=${option.type}`;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = option.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(option.label || "Download started! Enjoy your clean video 💖");
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1400);
  };

  // Download all slideshow images sequentially
  const [downloadingAllSlides, setDownloadingAllSlides] = useState(false);
  const handleDownloadAllSlides = async () => {
    if (!data.images || data.images.length === 0) return;
    setDownloadingAllSlides(true);

    for (let i = 0; i < data.images.length; i++) {
      const imgUrl = data.images[i];
      const filename = `${cleanFilenameBase}_slide_${i + 1}.jpg`;
      const downloadUrl = `/api/download?url=${encodeURIComponent(imgUrl)}&filename=${encodeURIComponent(
        filename
      )}&type=image`;

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setDownloadingAllSlides(false);
    setDownloadSuccess(`Downloaded all ${data.images.length} photos! 💖`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const videoStreamUrl =
    selectedQuality?.type === "video"
      ? selectedQuality.url
      : data.downloads.hd.url || data.downloads.sd.url;

  const filteredQualities = availableQualities.filter((q) => {
    if (selectedFormatFilter === "video") return q.type === "video";
    if (selectedFormatFilter === "audio") return q.type === "audio";
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#12131d] border border-white/10 shadow-2xl p-5 sm:p-7 md:p-8 relative overflow-hidden transition-all animate-fadeIn">
      {/* Gentle background glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#fe2c55]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#25f4ee]/10 blur-3xl" />

      {/* Top Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-emerald-400 tracking-wide uppercase flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Ready for Download • Watermark Removed
          </span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
          <span>Download Another Video</span>
        </button>
      </div>

      {/* Lovely Success Alert message */}
      {downloadSuccess && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-xs sm:text-sm font-medium animate-fadeIn">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Player Preview & Stats */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Video / Cover Player Container */}
          <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl aspect-[9/16]">
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
                alt={data.title || "TikTok Cover"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
                No preview available
              </div>
            )}

            {/* Quality badge tag overlay */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="inline-flex items-center gap-1 rounded-md bg-black/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/15">
                <Sparkles className="h-3 w-3 text-[#25f4ee]" />
                {selectedQuality ? selectedQuality.label : "Full HD"}
              </span>
            </div>

            {/* Duration badge */}
            {data.duration > 0 && (
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-xs font-mono font-medium text-white/90 border border-white/15">
                  {formatDuration(data.duration)}
                </span>
              </div>
            )}
          </div>

          {/* Quick Utility Links below player */}
          <div className="mt-3.5 flex w-full max-w-xs sm:max-w-sm gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 py-2 px-3 text-xs font-semibold text-zinc-200 transition-all active:scale-95 cursor-pointer"
              title="Copy direct download link"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied! 💖</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy Clean Link</span>
                </>
              )}
            </button>

            {videoStreamUrl && (
              <a
                href={videoStreamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 py-2 px-3 text-xs font-semibold text-zinc-200 transition-all hover:text-[#25f4ee] cursor-pointer"
                title="Open stream in browser tab"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Raw</span>
              </a>
            )}
          </div>

          {/* Video Metrics Pill Row with lovely colorful icons */}
          <div className="mt-4 grid grid-cols-4 gap-2 w-full max-w-xs sm:max-w-sm">
            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.03] border border-white/5">
              <Heart className="h-3.5 w-3.5 text-[#fe2c55] fill-[#fe2c55] mb-0.5" />
              <span className="text-xs font-bold text-white">
                {formatNumber(data.stats.likes)}
              </span>
              <span className="text-[10px] text-zinc-400">Likes</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.03] border border-white/5">
              <MessageCircle className="h-3.5 w-3.5 text-[#25f4ee] mb-0.5" />
              <span className="text-xs font-bold text-white">
                {formatNumber(data.stats.comments)}
              </span>
              <span className="text-[10px] text-zinc-400">Comments</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.03] border border-white/5">
              <Repeat2 className="h-3.5 w-3.5 text-emerald-400 mb-0.5" />
              <span className="text-xs font-bold text-white">
                {formatNumber(data.stats.shares)}
              </span>
              <span className="text-[10px] text-zinc-400">Shares</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.03] border border-white/5">
              <Eye className="h-3.5 w-3.5 text-amber-400 mb-0.5" />
              <span className="text-xs font-bold text-white">
                {formatNumber(data.stats.views)}
              </span>
              <span className="text-[10px] text-zinc-400">Views</span>
            </div>
          </div>
        </div>

        {/* Right Column: Author Info & QUALITY SELECTION */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Creator Profile Card */}
          <div className="flex items-center gap-3.5 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
            {data.author.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.author.avatar}
                alt={data.author.nickname}
                className="h-12 w-12 rounded-full object-cover border-2 border-[#25f4ee]/40 shadow-sm"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                {data.author.nickname.charAt(0)}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {data.author.nickname}
                </h3>
                <span className="text-[10px] bg-[#25f4ee]/15 text-[#25f4ee] px-1.5 py-0.5 rounded font-bold border border-[#25f4ee]/20">
                  Creator
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono truncate">
                @{data.author.username}
              </p>
            </div>
          </div>

          {/* Video Title / Caption */}
          {data.title && (
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5 line-clamp-3 hover:line-clamp-none transition-all">
              {data.title}
            </p>
          )}

          {/* Audio track info */}
          {data.music.title && (
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300">
              <div className="p-1.5 rounded-lg bg-[#fe2c55]/15 text-[#fe2c55] shrink-0">
                <Music className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 truncate">
                <span className="font-semibold text-white">{data.music.title}</span>
                {data.music.author && (
                  <span className="text-zinc-400"> — {data.music.author}</span>
                )}
              </div>
            </div>
          )}

          {/* ================= QUALITY SELECTION SECTION ================= */}
          <div className="rounded-2xl bg-black/40 border border-white/10 p-4 sm:p-5 flex flex-col gap-4 shadow-inner">
            {/* Header + Filter tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#25f4ee]" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Select Quality & Format
                </h4>
              </div>

              {/* Format Filter Switch */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedFormatFilter("all")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedFormatFilter === "all"
                      ? "bg-[#25f4ee] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFormatFilter("video")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedFormatFilter === "video"
                      ? "bg-[#25f4ee] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Video (MP4)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFormatFilter("audio")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedFormatFilter === "audio"
                      ? "bg-[#fe2c55] text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Audio (MP3)
                </button>
              </div>
            </div>

            {/* Quality Selection List / Cards */}
            <div className="flex flex-col gap-2.5">
              {filteredQualities.map((q) => {
                const isSelected = selectedQuality?.id === q.id;
                const isDownloadingThis = downloadingId === q.id;

                let badgeStyles = "bg-white/10 text-zinc-300 border-white/10";
                if (q.badgeColor === "cyan") {
                  badgeStyles = "bg-[#25f4ee]/15 text-[#25f4ee] border-[#25f4ee]/30";
                } else if (q.badgeColor === "emerald") {
                  badgeStyles = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
                } else if (q.badgeColor === "pink") {
                  badgeStyles = "bg-[#fe2c55]/15 text-[#fe2c55] border-[#fe2c55]/30";
                } else if (q.badgeColor === "amber") {
                  badgeStyles = "bg-amber-500/15 text-amber-400 border-amber-500/30";
                }

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuality(q)}
                    className={`group relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.08] border-[#25f4ee] shadow-lg shadow-[#25f4ee]/10"
                        : "bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/20"
                    }`}
                  >
                    {/* Left: Radio indicator + Title + Subtitle */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Radio Circle */}
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? "border-[#25f4ee] bg-[#25f4ee] text-black"
                            : "border-zinc-600 bg-transparent group-hover:border-zinc-400"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>

                      {/* Details */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-xs sm:text-sm font-bold tracking-tight ${
                              isSelected ? "text-white" : "text-zinc-200 group-hover:text-white"
                            }`}
                          >
                            {q.label}
                          </span>

                          {q.badge && (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${badgeStyles}`}
                            >
                              {q.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {q.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Format + Size + Quick Download */}
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-mono font-semibold text-zinc-300">
                          {q.sizeFormatted || q.format}
                        </span>
                        <span className="block text-[10px] text-zinc-500 uppercase font-mono">
                          {q.format}
                        </span>
                      </div>

                      {/* 1-Click download icon button on each row */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedQuality(q);
                          triggerDownload({
                            url: q.url,
                            filename: `${cleanFilenameBase}_${q.id}.${q.format.toLowerCase()}`,
                            type: q.type,
                            key: q.id,
                            label: `Downloaded ${q.label}! 💖`,
                          });
                        }}
                        disabled={isDownloadingThis}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#25f4ee] text-black hover:bg-white"
                            : "bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white"
                        }`}
                        title={`Quick download ${q.label}`}
                      >
                        {isDownloadingThis ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button for Selected Quality */}
            {selectedQuality && (
              <div className="mt-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() =>
                    triggerDownload({
                      url: selectedQuality.url,
                      filename: `${cleanFilenameBase}_${selectedQuality.id}.${selectedQuality.format.toLowerCase()}`,
                      type: selectedQuality.type,
                      key: `primary_${selectedQuality.id}`,
                      label: `Downloaded ${selectedQuality.label}! 💖`,
                    })
                  }
                  disabled={downloadingId === `primary_${selectedQuality.id}`}
                  className="w-full flex items-center justify-center gap-2.5 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#25f4ee] via-[#00c4cc] to-[#fe2c55] text-black font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-[#fe2c55]/25 hover:opacity-95 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {downloadingId === `primary_${selectedQuality.id}` ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Preparing Your Clean File...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      <span>
                        Download {selectedQuality.label}{" "}
                        {selectedQuality.sizeFormatted ? `(${selectedQuality.sizeFormatted})` : ""}
                      </span>
                    </>
                  )}
                </button>

                {/* Compatibility hint */}
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 justify-center">
                  <Info className="h-3.5 w-3.5 text-[#25f4ee]" />
                  <span>
                    No watermark • 100% direct download • Compatible with all iPhone, Android & PC
                  </span>
                </div>
              </div>
            )}

            {/* Cover photo download button */}
            {data.cover && (
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Want the cover thumbnail?</span>
                <button
                  type="button"
                  onClick={() =>
                    triggerDownload({
                      url: data.cover!,
                      filename: `${cleanFilenameBase}_cover.jpg`,
                      type: "image",
                      key: "cover",
                      label: "Downloaded HD Cover Thumbnail! 💖",
                    })
                  }
                  disabled={downloadingId === "cover"}
                  className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <ImageIcon className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Download Cover Art (JPG)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= PHOTO CAROUSEL / SLIDESHOW MODE ================= */}
      {data.isSlideshow && data.images && data.images.length > 0 && (
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#25f4ee]" />
                Photo Slide Images ({data.images.length} Photos)
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Download individual photos or save all images in full resolution.
              </p>
            </div>

            <button
              onClick={handleDownloadAllSlides}
              disabled={downloadingAllSlides}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#25f4ee] to-[#fe2c55] px-4 py-2 text-xs sm:text-sm font-bold text-black hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {downloadingAllSlides ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <span>Downloading All Photos...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download All ({data.images.length})</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {data.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-square shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                  <span className="text-[10px] text-zinc-300 font-mono mb-1">
                    Photo #{idx + 1}
                  </span>
                  <button
                    onClick={() =>
                      triggerDownload({
                        url: imgUrl,
                        filename: `${cleanFilenameBase}_slide_${idx + 1}.jpg`,
                        type: "image",
                        key: `slide_${idx}`,
                        label: `Downloaded Photo #${idx + 1}! 💖`,
                      })
                    }
                    className="w-full py-1.5 px-2 rounded-lg bg-[#25f4ee] hover:bg-white text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
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
