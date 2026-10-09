import React from "react";
import { Film, Heart, Shield, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#09090b] pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          {/* Brand info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#25f4ee] to-[#fe2c55] p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#09090b]">
                  <Film className="h-4 w-4 text-[#25f4ee]" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Tik<span className="text-[#fe2c55]">Saver</span> HD
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              The premier online TikTok video downloader without watermark. Save videos in original 1080p Full HD MP4 and crystal-clear MP3 audio track instantly and freely.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
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
                  How To Download
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#25f4ee] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Formats Supported */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Supported Formats
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25f4ee]" />
                Full HD 1080p MP4
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25f4ee]" />
                High Speed 720p MP4
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fe2c55]" />
                Original MP3 Audio (320kbps)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Photo Slide HD Images
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="text-center md:text-left max-w-2xl">
            <strong>Disclaimer:</strong> TikSaver HD is an independent tool for personal backup and educational use. We do not host or store any videos on our servers. All videos and audios belong to their respective creators and copyright owners on TikTok.
          </p>
          <div className="flex items-center gap-1 shrink-0 text-zinc-400">
            <span>© 2026 TikSaver HD. Built with</span>
            <Heart className="h-3 w-3 text-[#fe2c55] fill-[#fe2c55]" />
            <span>for TikTok creators.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
