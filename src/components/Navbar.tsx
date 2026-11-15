"use client";

import React from "react";
import { Sparkles, Heart, Film, ArrowRight, ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-2xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#25f4ee] via-[#ff3b5c] to-[#fe2c55] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[#fe2c55]/20">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0c0d14]">
              <Film className="h-4.5 w-4.5 text-[#25f4ee] transition-colors group-hover:text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-zinc-100">
                Tik<span className="text-[#fe2c55]">Saver</span>
              </span>
              <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#25f4ee]/15 to-[#fe2c55]/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#25f4ee] border border-white/10">
                <Sparkles className="h-2.5 w-2.5 text-[#fe2c55]" />
                HD
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium -mt-1 hidden sm:block">
              Clean TikTok Downloader
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide text-zinc-300">
          <a
            href="#downloader"
            className="transition-colors hover:text-[#25f4ee] flex items-center gap-1.5"
          >
            <span>Downloader</span>
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-[#25f4ee] flex items-center gap-1.5"
          >
            <span>Features</span>
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-[#25f4ee] flex items-center gap-1.5"
          >
            <span>How it Works</span>
          </a>
          <a
            href="#faq"
            className="transition-colors hover:text-[#25f4ee]"
          >
            <span>FAQ</span>
          </a>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-500/20">
            <Heart className="h-3.5 w-3.5 text-[#fe2c55] fill-[#fe2c55]" />
            <span>100% Free Forever</span>
          </div>
          <a
            href="#downloader"
            className="rounded-full bg-gradient-to-r from-[#25f4ee] via-[#00c4cc] to-[#fe2c55] px-4 py-2 text-xs font-bold text-black transition-all hover:opacity-95 hover:shadow-lg hover:shadow-[#fe2c55]/25 active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <span>Start Saving</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
