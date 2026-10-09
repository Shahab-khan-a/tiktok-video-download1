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
      question: "Is this TikTok downloader completely free and watermark-free?",
      answer:
        "Yes, 100% free! You can download as many videos as you want without paying or creating an account. All downloaded videos have the TikTok bouncing logo and watermark completely removed.",
    },
    {
      question: "How do I download TikTok videos on iPhone or iPad (iOS)?",
      answer:
        "On iOS, open the TikTok app, tap Share -> Copy Link. Open Safari, navigate to TikSaver HD, paste your link and tap Download. When the HD format button is tapped, Safari will prompt 'Do you want to download?'. Tap Download and your video will be saved directly into your Safari Downloads folder / Files app.",
    },
    {
      question: "Does downloading reduce the video quality?",
      answer:
        "No. Our service retrieves the original stream directly from TikTok's content delivery servers in its maximum source resolution (including 1080p Full HD) without re-encoding compression.",
    },
    {
      question: "Can I download TikTok photo slideshows / carousel images?",
      answer:
        "Yes! If the TikTok URL points to a photo slideshow rather than a single video, TikSaver HD detects all original high-resolution pictures and allows you to download each one individually.",
    },
    {
      question: "How do I extract TikTok background sound as MP3?",
      answer:
        "Simply paste the TikTok video link and hit Download. In the download options list, choose 'Download MP3 Audio'. The tool will extract the audio track and deliver it as a 320kbps MP3 audio file.",
    },
    {
      question: "Where are the downloaded files saved on my computer or Android?",
      answer:
        "On PC/Mac and Android, files are automatically saved in your default 'Downloads' folder. You can also press Ctrl+J (Windows) or Cmd+Option+L (Mac) in Chrome/Firefox/Edge to open your recent downloads.",
    },
    {
      question: "Do I need to install software or Chrome extensions?",
      answer:
        "No software, app, or browser extension is needed. TikSaver HD works completely online in any modern web browser.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 border-t border-white/5 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 text-xs font-semibold text-zinc-300 border border-white/10 mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-[#25f4ee]" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Common Questions & Answers
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Everything you need to know about downloading TikTok videos without watermark.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-base sm:text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#fe2c55]/20 text-[#fe2c55]" : "text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-white/5">
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
