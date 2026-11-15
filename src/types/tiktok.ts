export interface TikTokAuthor {
  id: string;
  username: string;
  nickname: string;
  avatar: string | null;
}

export interface TikTokStats {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  downloads: number;
}

export interface TikTokMusic {
  title: string;
  author: string;
  url: string | null;
}

export interface DownloadOption {
  url: string;
  size?: number;
  quality: string;
}

export interface TikTokDownloads {
  hd: DownloadOption;
  sd: DownloadOption;
  watermarked: DownloadOption | null;
  audio: DownloadOption | null;
}

export type QualityId = "1080p" | "720p" | "480p" | "audio" | "watermarked";

export interface QualityOption {
  id: QualityId;
  label: string;
  resolution: string;
  format: "MP4" | "MP3";
  type: "video" | "audio";
  url: string;
  size?: number;
  sizeFormatted?: string;
  badge?: string;
  badgeColor?: "cyan" | "pink" | "emerald" | "amber" | "zinc";
  description: string;
  recommended?: boolean;
}

export interface TikTokVideoData {
  id: string;
  title: string;
  duration: number;
  cover: string | null;
  author: TikTokAuthor;
  stats: TikTokStats;
  music: TikTokMusic;
  downloads: TikTokDownloads;
  qualities: QualityOption[];
  isSlideshow: boolean;
  images: string[];
}

export interface RecentDownloadItem {
  id: string;
  title: string;
  author: string;
  cover: string | null;
  timestamp: number;
  hdUrl: string;
  quality?: string;
}
