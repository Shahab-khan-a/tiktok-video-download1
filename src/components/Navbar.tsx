"use client";

import React from "react";
import { Sparkles, ShieldCheck, Film, Music2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#25f4ee] to-[#fe2c55] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[#fe2c55]/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#09090b]">
              <Film className="h-5 w-5 text-[#25f4ee] transition-colors group-hover:text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                Tik<span className="text-[#fe2c55]">Saver</span>
              </span>
              <span className="rounded-full bg-gradient-to-r from-[#25f4ee]/20 to-[#fe2c55]/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#25f4ee] border border-[#25f4ee]/30 uppercase">
                HD 1080P
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium -mt-1 hidden sm:block">
              No Watermark Downloader
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a
            href="#features"
            className="transition-colors hover:text-[#25f4ee] flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#25f4ee]" />
            Features
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-[#25f4ee] flex items-center gap-1.5"
          >
            <Film className="h-3.5 w-3.5 text-[#fe2c55]" />
            How to Download
          </a>
          <a
            href="#faq"
            className="transition-colors hover:text-[#25f4ee]"
          >
            FAQ
          </a>
        </nav>

        {/* Trust Badges */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Free & Clean</span>
          </div>
          <a
            href="#downloader"
            className="rounded-lg bg-gradient-to-r from-[#25f4ee] to-[#fe2c55] px-4 py-2 text-xs sm:text-sm font-semibold text-black transition-all hover:opacity-95 hover:shadow-lg hover:shadow-[#fe2c55]/25 active:scale-95"
          >
            Download Now
          </a>
        </div>
      </div>
    </header>
  );
}
