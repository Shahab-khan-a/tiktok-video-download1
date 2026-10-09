"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { VideoResult } from "@/components/VideoResult";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { RecentDownloads } from "@/components/RecentDownloads";
import { TikTokVideoData, RecentDownloadItem } from "@/types/tiktok";
import {
  Download,
  ClipboardPaste,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Film,
  Zap,
  ShieldCheck,
  Play,
  RotateCcw,
} from "lucide-react";

const SAMPLE_TIKTOK_URL =
  "https://www.tiktok.com/@tiktok/video/7106594312292453675";

const LOADING_STEPS = [
  "Connecting to TikTok content servers...",
  "Analyzing video stream & stripping watermarks...",
  "Encoding 1080p Full HD MP4 without watermark...",
  "Finalizing high quality download links...",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<TikTokVideoData | null>(null);
  const [recentDownloads, setRecentDownloads] = useState<RecentDownloadItem[]>([]);
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
      }, 700);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError(null);
      }
    } catch {
      // Clipboard permissions denied
      setError("Please allow clipboard permission or paste the URL manually (Ctrl+V / Cmd+V).");
    }
  };

  const handleUseSample = () => {
    setUrl(SAMPLE_TIKTOK_URL);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const targetUrl = (customUrl || url).trim();

    if (!targetUrl) {
      setError("Please paste or type a TikTok video link.");
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
    <div className="flex min-h-screen flex-col bg-[#09090b] text-[#f4f4f5]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {/* HERO SECTION */}
        <section
          id="downloader"
          className="relative w-full pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden flex flex-col items-center"
        >
          {/* Ambient Background Glows */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-[#25f4ee]/15 via-purple-600/10 to-[#fe2c55]/20 blur-[130px]" />
          <div className="pointer-events-none absolute top-1/3 -left-48 h-96 w-96 rounded-full bg-[#25f4ee]/10 blur-[100px]" />
          <div className="pointer-events-none absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-[#fe2c55]/10 blur-[100px]" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-xs sm:text-sm font-semibold text-zinc-200 border border-white/10 mb-6 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-[#25f4ee] animate-pulse" />
              <span>Full HD 1080p • 100% Free • No Watermark</span>
              <Sparkles className="h-3.5 w-3.5 text-[#fe2c55]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl">
              TikTok Video Download{" "}
              <span className="text-gradient">Without Watermark</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
              Download TikTok videos in crystal-clear <span className="text-white font-semibold">1080p Full HD</span> quality and MP3 audio with no watermark. Fast, unlimited, and free for all devices.
            </p>

            {/* SEARCH / INPUT BAR */}
            <div className="mt-10 w-full max-w-3xl">
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col sm:flex-row items-center gap-2 p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-[#121217]/90 border border-white/15 backdrop-blur-2xl shadow-2xl transition-all focus-within:border-[#25f4ee]/60 focus-within:shadow-[0_0_30px_rgba(37,244,238,0.2)]"
              >
                {/* Input with icon */}
                <div className="relative flex-1 flex items-center w-full pl-3 pr-2">
                  <Film className="h-5 w-5 text-[#25f4ee] shrink-0 mr-3 hidden xs:block" />
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
                      className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors mr-1"
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
                    className="flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors border border-white/10 shrink-0"
                    title="Paste from clipboard"
                  >
                    <ClipboardPaste className="h-3.5 w-3.5 text-[#25f4ee]" />
                    <span className="hidden sm:inline">Paste</span>
                  </button>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl sm:rounded-full bg-gradient-to-r from-[#25f4ee] via-[#00c4cc] to-[#fe2c55] px-7 py-3.5 text-sm sm:text-base font-black text-black transition-all hover:opacity-95 hover:shadow-xl hover:shadow-[#fe2c55]/25 active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      <span>Download HD</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sample link prompt */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
                <span>Want to test it out?</span>
                <button
                  type="button"
                  onClick={handleUseSample}
                  className="inline-flex items-center gap-1 text-[#25f4ee] hover:underline font-semibold"
                >
                  <Zap className="h-3 w-3" />
                  Try Sample Video
                </button>
              </div>
            </div>

            {/* LOADING STATE INDICATOR */}
            {loading && (
              <div className="mt-10 w-full max-w-xl rounded-2xl glass-panel p-6 border border-white/10 shadow-xl animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#25f4ee] border-t-transparent" />
                  <span className="text-sm font-bold text-white">
                    Fetching Watermark-Free HD Stream
                  </span>
                </div>

                {/* Progress Step bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-[#25f4ee] to-[#fe2c55] transition-all duration-500 rounded-full"
                    style={{
                      width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-zinc-400 font-mono">
                  {LOADING_STEPS[loadingStepIdx]}
                </p>
              </div>
            )}

            {/* ERROR ALERT */}
            {error && !loading && (
              <div className="mt-8 w-full max-w-2xl rounded-2xl bg-red-500/10 border border-red-500/30 p-4 sm:p-5 text-left flex items-start gap-3 shadow-lg">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-red-200">
                    Unable to download video
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-red-300/90 leading-relaxed">
                    {error}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleUseSample}
                      className="text-xs font-semibold text-white underline hover:text-[#25f4ee]"
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
        <div ref={resultRef} className="w-full px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-16">
          {videoData && (
            <VideoResult data={videoData} onReset={handleReset} />
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
