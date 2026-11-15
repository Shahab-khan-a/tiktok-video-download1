"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Can I choose different video qualities (1080p, 720p, 480p)?",
      answer:
        "Yes! TikSaver HD gives you full quality control. You can pick 1080p Ultra HD for maximum detail, 720p HD Universal MP4 for guaranteed compatibility across all mobile phones and desktop media players, 480p SD for fast data saving, or MP3 audio only.",
    },
    {
      question: "Is this TikTok downloader completely free and watermark-free?",
      answer:
        "Yes, 100% free with unlimited downloads. All videos downloaded have the TikTok bouncing logo and username watermark cleanly removed.",
    },
    {
      question: "Which quality should I choose for iPhone, Android, or Windows PC?",
      answer:
        "We recommend '720p HD (Universal)' for 100% native playback on all iPhones, iPads, Android phones, and Windows Media Player without any codec prompt. If you want maximum bitrate and have VLC or an HEVC player, choose '1080p Ultra HD'.",
    },
    {
      question: "How do I extract TikTok audio as MP3?",
      answer:
        "Select the 'MP3 Audio' quality option and click Download. TikSaver HD will extract the background music or audio track and save it as a high-bitrate 320kbps MP3 file.",
    },
    {
      question: "Can I download TikTok photo slideshows / carousel images?",
      answer:
        "Yes! If a link contains photo slides instead of a video, TikSaver HD automatically displays all high-resolution pictures and allows you to download each one individually or all at once.",
    },
    {
      question: "Where are downloaded files saved?",
      answer:
        "On PC/Mac and Android, files are saved directly into your device's default 'Downloads' folder. On iPhone and iPad, Safari saves files to your 'Files' app / Downloads folder.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-14 sm:py-20 border-t border-white/5 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-[#25f4ee]" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            Common Questions & Answers
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Everything you need to know about video resolutions, formats, and downloads.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#121217] border border-white/10 transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-3">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#fe2c55]/20 text-[#fe2c55]" : "text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
