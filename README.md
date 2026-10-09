# TikTok Video Downloader HD (Without Watermark)

A modern, high-performance web application to download TikTok videos in high quality without watermark. Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS**.

---

## ✨ Features

- **100% Watermark-Free**: Strips TikTok bouncing logos and creator username watermarks cleanly.
- **Universal Multi-Device Playback**:
  - **Universal MP4 (H.264)**: Plays natively on **all Windows PCs**, **Apple iPhones / iPads / Macs**, and **Android devices** without needing any extra codec packages (avoids Windows HEVC codec prompt).
  - **1080p Ultra HD (HEVC)**: High-bitrate 1080p stream for maximum quality.
- **Extract MP3 Audio**: Extract original background audio/music in 320kbps MP3.
- **Photo Slide Support**: Download all high-res photos from TikTok photo carousels.
- **Built-in HD Video Player**: Preview videos watermark-free before downloading.
- **Direct 1-Click Downloads**: Uses a server-side streaming proxy with proper `Content-Disposition: attachment` headers to trigger direct browser file saves.
- **Recent Downloads History**: Keeps recent download history stored locally in browser `localStorage`.
- **Responsive Dark Mode UI**: Neon cyan & pink glassmorphic aesthetics.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Shahab-khan-a/tiktok-video-download1.git
cd tiktok-video-download1

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Cross-Device Compatibility

| Device / OS | Universal H.264 MP4 | 1080p HEVC MP4 | MP3 Audio |
| :--- | :---: | :---: | :---: |
| **Windows 10 / 11** | ✅ Native (No Codec Required) | ✅ Supported (VLC / HEVC Extension) | ✅ Native |
| **Apple iOS (iPhone/iPad)** | ✅ Native (Safari / Files) | ✅ Native (iOS 11+) | ✅ Native |
| **Apple macOS** | ✅ Native (QuickTime) | ✅ Native | ✅ Native |
| **Android (All versions)** | ✅ Native (Chrome / Gallery) | ✅ Native | ✅ Native |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.4.0 (Turbopack, App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4, Glassmorphism & Custom CSS animations
- **Icons**: Lucide React
- **Language**: TypeScript

---

## 📄 License & Disclaimer

This project is for personal backup and educational purposes only. All video and audio rights belong to their respective creators on TikTok.
