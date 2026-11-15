import React from "react";
import { Film, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#090a0f] pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Brand info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#25f4ee] to-[#fe2c55] p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-[#0c0d14]">
                  <Film className="h-4 w-4 text-[#25f4ee]" />
                </div>
              </div>
              <span className="text-base font-black tracking-tight text-white">
                Tik<span className="text-[#fe2c55]">Saver</span> HD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              The cleanest and most delightful TikTok video and audio downloader without watermarks. Choose from 1080p, 720p, 480p, or 320kbps MP3 with instant direct downloads.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#downloader" className="hover:text-[#25f4ee] transition-colors">
                  Video Downloader
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#25f4ee] transition-colors">
                  Features & Quality
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#25f4ee] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#25f4ee] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Available Qualities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Available Formats
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25f4ee]" />
                1080p Ultra HD (MP4)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                720p Universal (H.264 MP4)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                480p Fast (Data Saver)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fe2c55]" />
                320kbps MP3 Audio
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="text-center md:text-left max-w-2xl text-[11px] leading-relaxed">
            TikSaver HD is an independent tool for personal backup and educational use. We do not host or store any videos on our servers. All video and audio rights belong to their respective creators on TikTok.
          </p>
          <div className="flex items-center gap-1.5 shrink-0 text-zinc-400 text-xs">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-[#fe2c55] fill-[#fe2c55]" />
            <span>for TikTok creators & lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
