"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { VideoResult } from "@/components/VideoResult";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { RecentDownloads } from "@/components/RecentDownloads";
import { TikTokVideoData, RecentDownloadItem, QualityId } from "@/types/tiktok";
import {
  Download,
  ClipboardPaste,
  X,
  Sparkles,
  AlertCircle,
  Film,
  Zap,
  CheckCircle2,
  Heart,
  Layers,
  ArrowRight,
  Shield,
  Smartphone,
} from "lucide-react";

const SAMPLE_TIKTOK_URL =
  "https://www.tiktok.com/@tiktok/video/7106594312292453675";

const LOADING_STEPS = [
  "✨ Connecting to TikTok content servers...",
  "🧹 Stripping bouncing logos & watermarks...",
  "🎬 Encoding 1080p, 720p & MP3 quality options...",
  "💖 Finalizing your clean download links...",
];

const QUALITY_PRESETS: { id: QualityId; label: string; icon: string; subtitle: string }[] = [
  { id: "1080p", label: "1080p Ultra HD", icon: "🌟", subtitle: "Maximum clarity" },
  { id: "720p", label: "720p Universal", icon: "🎬", subtitle: "Plays everywhere" },
  { id: "480p", label: "480p Fast", icon: "⚡", subtitle: "Data saver" },
  { id: "audio", label: "MP3 Audio", icon: "🎵", subtitle: "Original sound" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [selectedQualityId, setSelectedQualityId] = useState<QualityId>("1080p");
  const [loading, setLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<TikTokVideoData | null>(null);
  const [recentDownloads, setRecentDownloads] = useState<RecentDownloadItem[]>([]);
  const [pasteFeedback, setPasteFeedback] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tiksaver_history");
      if (stored) {
        setRecentDownloads(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Cycle through loading steps during processing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStepIdx(0);
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 650);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Clean and extract URL from pasted string
  const cleanInputUrl = (input: string): string => {
    const trimmed = input.trim();
    const match = trimmed.match(/https?:\/\/[^\s]+/i);
    if (match) {
      return match[0].replace(/[),.;]+$/, "");
    }
    return trimmed;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const cleaned = cleanInputUrl(text);
        setUrl(cleaned);
        setError(null);
        setPasteFeedback(true);
        setTimeout(() => setPasteFeedback(false), 1800);
      }
    } catch {
      setError("Please allow clipboard permission or paste the URL manually (Ctrl+V / Cmd+V).");
    }
  };

  const handleUseSample = () => {
    setUrl(SAMPLE_TIKTOK_URL);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const targetUrl = cleanInputUrl(customUrl || url);

    if (!targetUrl) {
      setError("Please paste or type a valid TikTok video link.");
      return;
    }

    setLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const response = await fetch("/api/tiktok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to fetch video. Please check the URL.");
      }

      const fetchedData: TikTokVideoData = resData.data;
      setVideoData(fetchedData);

      // Save to recent downloads
      const historyItem: RecentDownloadItem = {
        id: fetchedData.id,
        title: fetchedData.title,
        author: fetchedData.author.username,
        cover: fetchedData.cover,
        timestamp: Date.now(),
        hdUrl: fetchedData.downloads.hd.url || fetchedData.downloads.sd.url,
        quality: selectedQualityId === "audio" ? "MP3" : selectedQualityId.toUpperCase(),
      };

      setRecentDownloads((prev) => {
        const filtered = prev.filter((item) => item.id !== fetchedData.id);
        const updated = [historyItem, ...filtered].slice(0, 6);
        try {
          localStorage.setItem("tiksaver_history", JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      });

      // Smooth scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please check your link.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVideoData(null);
    setError(null);
    setUrl("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearHistory = () => {
    setRecentDownloads([]);
    try {
      localStorage.removeItem("tiksaver_history");
    } catch {
      // Ignore
    }
  };

  const handleSelectRecent = (item: RecentDownloadItem) => {
    const link = `https://www.tiktok.com/@${item.author}/video/${item.id}`;
    setUrl(link);
    handleSubmit(undefined, link);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090a0f] text-[#f4f4f7] antialiased">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {/* HERO SECTION */}
        <section
          id="downloader"
          className="relative w-full pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden flex flex-col items-center"
        >
          {/* Gentle Ambient Glows */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-gradient-to-b from-[#25f4ee]/10 via-[#fe2c55]/10 to-transparent blur-[140px]" />
          <div className="pointer-events-none absolute top-1/4 -left-36 h-80 w-80 rounded-full bg-[#25f4ee]/8 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/4 -right-36 h-80 w-80 rounded-full bg-[#fe2c55]/8 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-1.5 text-xs sm:text-sm font-semibold text-zinc-200 border border-white/10 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#25f4ee] animate-pulse" />
              <span>Full HD 1080p • 720p • MP3 Audio</span>
              <span className="text-zinc-500">•</span>
              <span className="text-[#fe2c55] font-bold flex items-center gap-1">
                <Heart className="h-3 w-3 fill-[#fe2c55]" />
                100% Watermark-Free
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl">
              Save TikTok Videos{" "}
              <span className="text-gradient">In Pure Quality</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
              Fast, simple, and clean. Download watermark-free videos in 1080p, universal 720p MP4, or high-quality MP3 audio track.
            </p>

            {/* QUALITY SELECTION PRESETS & SEARCH INPUT */}
            <div className="mt-8 w-full max-w-2xl">
              {/* Quality Selection Preset Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
                <span className="text-xs font-semibold text-zinc-400 mr-1 flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-[#25f4ee]" />
                  Quality:
                </span>
                {QUALITY_PRESETS.map((preset) => {
                  const isActive = selectedQualityId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedQualityId(preset.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-white text-black shadow-lg shadow-white/10 scale-105"
                          : "bg-white/[0.04] text-zinc-300 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                      title={preset.subtitle}
                    >
                      <span>{preset.icon}</span>
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Clean Lovable Search Card */}
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col sm:flex-row items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#13141f] border border-white/15 backdrop-blur-2xl shadow-2xl transition-all focus-within:border-[#25f4ee]/70 focus-within:ring-2 focus-within:ring-[#25f4ee]/20"
              >
                {/* Input with icon */}
                <div className="relative flex-1 flex items-center w-full pl-3 pr-2">
                  <Film className="h-4.5 w-4.5 text-[#25f4ee] shrink-0 mr-2.5 hidden xs:block" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Paste TikTok video link here..."
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none py-2"
                    disabled={loading}
                  />

                  {/* Clear Button */}
                  {url && !loading && (
                    <button
                      type="button"
                      onClick={() => setUrl("")}
                      className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors mr-1 cursor-pointer"
                      title="Clear URL"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  {/* Paste Button */}
                  <button
                    type="button"
                    onClick={handlePaste}
                    disabled={loading}
                    className="flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors border border-white/10 shrink-0 cursor-pointer active:scale-95"
                    title="Paste from clipboard"
                  >
                    <ClipboardPaste className="h-3.5 w-3.5 text-[#25f4ee]" />
                    <span>{pasteFeedback ? "Pasted! ✨" : "Paste"}</span>
                  </button>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25f4ee] via-[#00c4cc] to-[#fe2c55] px-6 py-3.5 text-sm sm:text-base font-black text-black transition-all hover:opacity-95 hover:shadow-xl hover:shadow-[#fe2c55]/25 active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {loading ? (
                    <>
                      <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4.5 w-4.5" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sample link prompt */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
                <span>Want to test quickly?</span>
                <button
                  type="button"
                  onClick={handleUseSample}
                  className="inline-flex items-center gap-1 text-[#25f4ee] hover:underline font-semibold cursor-pointer"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Try Sample Video
                </button>
              </div>

              {/* Key Trust Guarantees */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>No Watermark</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#25f4ee]" />
                  <span>Select 1080p / 720p / 480p</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#fe2c55]" />
                  <span>MP3 Audio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>All Devices (iOS, Android, PC)</span>
                </div>
              </div>
            </div>

            {/* DELIGHTFUL LOADING STATE INDICATOR */}
            {loading && (
              <div className="mt-8 w-full max-w-lg rounded-2xl bg-[#12131d] p-5 border border-white/10 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-center gap-2.5 mb-3.5">
                  <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-[#25f4ee] border-t-transparent" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Preparing Clean Watermark-Free Streams
                  </span>
                </div>

                {/* Progress Step bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#25f4ee] via-[#00c4cc] to-[#fe2c55] transition-all duration-500 rounded-full"
                    style={{
                      width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%`,
                    }}
                  />
                </div>

                <p className="text-[11px] text-zinc-400 font-mono">
                  {LOADING_STEPS[loadingStepIdx]}
                </p>
              </div>
            )}

            {/* ERROR ALERT */}
            {error && !loading && (
              <div className="mt-6 w-full max-w-xl rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-left flex items-start gap-3 shadow-lg animate-fadeIn">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-red-200">
                    Unable to download video
                  </h4>
                  <p className="mt-1 text-xs text-red-300/90 leading-relaxed">
                    {error}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleUseSample}
                      className="text-xs font-semibold text-white underline hover:text-[#25f4ee] cursor-pointer"
                    >
                      Click here to test with a verified working video
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RESULTS SECTION (ANCHORED) */}
        <div ref={resultRef} className="w-full px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 mb-16">
          {videoData && (
            <VideoResult
              data={videoData}
              initialQualityId={selectedQualityId}
              onReset={handleReset}
            />
          )}

          {/* RECENT DOWNLOADS */}
          <RecentDownloads
            items={recentDownloads}
            onSelect={handleSelectRecent}
            onClear={handleClearHistory}
          />
        </div>

        {/* FEATURES SECTION */}
        <Features />

        {/* HOW TO DOWNLOAD */}
        <HowItWorks />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
