import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "TikSaver HD — Download TikTok Videos Without Watermark in 1080p",
  description:
    "Free, lightning-fast TikTok video downloader without watermark. Save videos in 1080p Full HD MP4 and extract original MP3 audio instantly on any device.",
  keywords: [
    "tiktok video download without watermark",
    "tiktok downloader hd",
    "download tiktok no watermark 1080p",
    "snaptik",
    "tiktok mp3 downloader",
    "tiktok to mp4",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "TikSaver HD — High Quality TikTok Video Downloader Without Watermark",
    description:
      "Download crystal-clear TikTok videos in Full HD 1080p without any watermark or logo. Fast, free, and unlimited.",
    type: "website",
    images: [
      {
        url: "/app-icon.jpg",
        width: 1024,
        height: 1024,
        alt: "TikSaver HD App Icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#f4f4f5] selection:bg-[#fe2c55]/30 selection:text-[#25f4ee]">
        {children}
      </body>
    </html>
  );
}
