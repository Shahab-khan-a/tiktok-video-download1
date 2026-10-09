import React from "react";
import { Sparkles, Zap, Music, Shield, CheckCircle, Smartphone } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-[#25f4ee]" />,
      badge: "No Watermark",
      title: "Clean Without Watermark",
      desc: "Completely removes the bouncing TikTok logo and creator username from both start and end of the video, giving you a crystal clean MP4.",
      borderColor: "hover:border-[#25f4ee]/40",
      glowColor: "group-hover:bg-[#25f4ee]/10",
    },
    {
      icon: <Zap className="h-6 w-6 text-[#fe2c55]" />,
      badge: "Full HD 1080p",
      title: "High Definition Quality",
      desc: "Downloads videos in original 1080p Full HD resolution without compression or bit-rate loss, keeping every detail vivid and sharp.",
      borderColor: "hover:border-[#fe2c55]/40",
      glowColor: "group-hover:bg-[#fe2c55]/10",
    },
    {
      icon: <Music className="h-6 w-6 text-[#25f4ee]" />,
      badge: "MP3 Extractor",
      title: "Convert TikTok to MP3",
      desc: "Extract background songs, sound effects, and voice-overs into high-bitrate 320kbps MP3 audio files with just one click.",
      borderColor: "hover:border-[#25f4ee]/40",
      glowColor: "group-hover:bg-[#25f4ee]/10",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-[#fe2c55]" />,
      badge: "All Devices",
      title: "Works on Any Platform",
      desc: "Compatible with iPhone (iOS Safari), Android (Chrome), Windows, Mac, and Linux. No apps or browser extensions required.",
      borderColor: "hover:border-[#fe2c55]/40",
      glowColor: "group-hover:bg-[#fe2c55]/10",
    },
  ];

  return (
    <section id="features" className="w-full py-16 sm:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10 mb-4">
            <Shield className="h-3.5 w-3.5 text-[#25f4ee]" />
            Best TikTok Video Downloader
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Why Download With <span className="text-gradient">TikSaver HD</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Enjoy uncompromised video quality with the most powerful and reliable TikTok downloader tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl glass-panel p-6 sm:p-7 transition-all duration-300 ${feature.borderColor} hover:-translate-y-1.5 flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-colors ${feature.glowColor} mb-5`}
                >
                  {feature.icon}
                </div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  {feature.badge}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-zinc-400">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>100% Free Forever</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
