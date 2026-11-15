import React from "react";
import { Sparkles, Zap, Music, Shield, CheckCircle, Smartphone, Layers, Heart } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Layers className="h-5 w-5 text-[#25f4ee]" />,
      badge: "Quality Choice",
      title: "Multiple Quality Options",
      desc: "Choose between 1080p Ultra HD, 720p Universal MP4, 480p Data Saver, or crystal-clear MP3 audio. Download what fits your device.",
      glow: "hover:border-[#25f4ee]/40",
      accent: "bg-[#25f4ee]/10 text-[#25f4ee]",
    },
    {
      icon: <Heart className="h-5 w-5 text-[#fe2c55] fill-[#fe2c55]" />,
      badge: "100% Clean",
      title: "Zero Watermarks",
      desc: "Completely removes bouncing TikTok logos, usernames, and watermarks from the beginning, middle, and end of every video.",
      glow: "hover:border-[#fe2c55]/40",
      accent: "bg-[#fe2c55]/10 text-[#fe2c55]",
    },
    {
      icon: <Music className="h-5 w-5 text-[#25f4ee]" />,
      badge: "Sound Track",
      title: "Extract TikTok MP3",
      desc: "Love the background song or sound effect? Extract and save it as a high-fidelity 320kbps MP3 audio file with one tap.",
      glow: "hover:border-[#25f4ee]/40",
      accent: "bg-[#25f4ee]/10 text-[#25f4ee]",
    },
    {
      icon: <Smartphone className="h-5 w-5 text-amber-400" />,
      badge: "Universal",
      title: "Seamless On All Devices",
      desc: "Fully tested and native on iPhone (iOS Safari), Android (Chrome), Windows PC, and Mac without needing any third-party app.",
      glow: "hover:border-amber-400/40",
      accent: "bg-amber-400/10 text-amber-400",
    },
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24 border-t border-white/[0.08] relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#fe2c55]" />
            Full-Featured Downloader
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Crafted for speed, simplicity, and uncompromised HD quality on every download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-[#12131d] p-6 border border-white/10 transition-all duration-300 ${feature.glow} hover:-translate-y-1.5 flex flex-col justify-between shadow-lg`}
            >
              <div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.accent} border border-white/5 mb-4`}>
                  {feature.icon}
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  {feature.badge}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-zinc-400">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>Unlimited & Always Free</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
