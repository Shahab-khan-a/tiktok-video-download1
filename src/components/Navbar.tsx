"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-2xl transition-all">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo with Icon */}
        <a href="#" className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.svg"
            alt="TikSaver Icon"
            className="h-9 w-9 rounded-xl shadow-md shadow-[#fe2c55]/20 group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight text-white group-hover:text-zinc-100">
              Tik<span className="text-[#fe2c55]">Saver</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#25f4ee] border border-white/10">
              <Sparkles className="h-2.5 w-2.5 text-[#fe2c55]" />
              HD
            </span>
          </div>
        </a>

        {/* Right Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-500/20">
            <Heart className="h-3 w-3 text-[#fe2c55] fill-[#fe2c55]" />
            <span>No Watermark • Free</span>
          </div>
        </div>
      </div>
    </header>
  );
}
