"use client";

import React from "react";
import { RecentDownloadItem } from "@/types/tiktok";
import { Clock, Trash2, Download, Heart } from "lucide-react";

interface RecentDownloadsProps {
  items: RecentDownloadItem[];
  onSelect: (item: RecentDownloadItem) => void;
  onClear: () => void;
}

export function RecentDownloads({ items, onSelect, onClear }: RecentDownloadsProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 rounded-2xl bg-[#12131d] p-5 sm:p-6 border border-white/10 shadow-xl">
      <div className="flex items-center justify-between pb-3.5 border-b border-white/5 mb-3.5">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#25f4ee]" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <span>Recent Downloads</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-zinc-300 font-mono">
              {items.length}
            </span>
          </h3>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#fe2c55] transition-colors p-1 cursor-pointer"
          title="Clear History"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {items.map((item) => (
          <div
            key={item.id + item.timestamp}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all group cursor-pointer hover:border-white/15"
            onClick={() => onSelect(item)}
          >
            {item.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.cover}
                alt={item.title}
                className="h-11 w-11 rounded-lg object-cover shrink-0 border border-white/10 shadow-sm"
              />
            ) : (
              <div className="h-11 w-11 rounded-lg bg-zinc-800 shrink-0 flex items-center justify-center text-xs text-zinc-500 font-mono">
                Video
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#25f4ee] transition-colors">
                {item.title || "TikTok Video"}
              </h4>
              <p className="text-[11px] text-zinc-400 truncate">
                @{item.author}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {item.quality && (
                  <span className="text-[9px] bg-[#25f4ee]/15 text-[#25f4ee] px-1.5 py-0.2 rounded font-mono font-bold">
                    {item.quality}
                  </span>
                )}
                <span className="text-[10px] text-zinc-500 font-mono">
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <a
              href={`/api/download?url=${encodeURIComponent(item.hdUrl)}&filename=${encodeURIComponent(
                `tiktok_${item.id}_hd.mp4`
              )}&type=video`}
              download
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#25f4ee] hover:text-black text-zinc-300 transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
              title="Download Again"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
