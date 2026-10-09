import React from "react";
import { Copy, ArrowRight, Download, Link, Sparkles } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Copy TikTok Link",
      desc: "Open TikTok app or website, find any video you want to save, tap 'Share' and click 'Copy Link'.",
      icon: <Copy className="h-6 w-6 text-[#25f4ee]" />,
      accent: "from-[#25f4ee]/20 to-transparent",
    },
    {
      num: "02",
      title: "Paste URL Here",
      desc: "Paste the copied TikTok link into the search input box at the top of this page and click 'Download'.",
      icon: <Link className="h-6 w-6 text-white" />,
      accent: "from-white/20 to-transparent",
    },
    {
      num: "03",
      title: "Download HD Without Watermark",
      desc: "Choose Full HD 1080p, Standard MP4, or MP3 Audio. Your clean video is saved directly to your device.",
      icon: <Download className="h-6 w-6 text-[#fe2c55]" />,
      accent: "from-[#fe2c55]/20 to-transparent",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24 border-t border-white/5 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#fe2c55]" />
            Quick & Simple 3-Step Guide
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            How to Download TikTok Videos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            No software installation or account required. It takes less than 5 seconds!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl glass-panel p-8 border border-white/10 flex flex-col items-start overflow-hidden group hover:border-[#25f4ee]/40 transition-all duration-300"
            >
              <div
                className={`pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br ${step.accent} blur-2xl group-hover:scale-125 transition-transform`}
              />

              <div className="flex w-full items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  {step.icon}
                </div>
                <span className="font-mono text-3xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                  {step.num}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <a
            href="#downloader"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#25f4ee] hover:text-white transition-colors"
          >
            Ready to download? Paste your link above <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
