import React from "react";
import { Copy, ArrowRight, Download, Sparkles, Layers } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Copy Any TikTok Link",
      desc: "Open TikTok, find any video you love, tap the 'Share' arrow and select 'Copy Link'.",
      icon: <Copy className="h-5 w-5 text-[#25f4ee]" />,
    },
    {
      num: "02",
      title: "Paste & Pick Your Quality",
      desc: "Paste your link into the downloader and pick 1080p Ultra HD, 720p Universal, or MP3.",
      icon: <Layers className="h-5 w-5 text-white" />,
    },
    {
      num: "03",
      title: "Save Directly to Device",
      desc: "Hit Download and enjoy your clean watermark-free video or audio file instantly.",
      icon: <Download className="h-5 w-5 text-[#fe2c55]" />,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24 border-t border-white/[0.08] relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#25f4ee]" />
            Easy As 1-2-3
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            How to Download in Seconds
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            No signup, no apps, no waiting. Simple and clean on any web browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#12131d] p-7 border border-white/10 flex flex-col items-start hover:border-[#25f4ee]/40 transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              <div className="flex w-full items-center justify-between mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  {step.icon}
                </div>
                <span className="font-mono text-2xl font-black text-white/20">
                  {step.num}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#downloader"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#25f4ee] hover:text-white transition-colors cursor-pointer group"
          >
            <span>Ready to try? Paste your link above</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
