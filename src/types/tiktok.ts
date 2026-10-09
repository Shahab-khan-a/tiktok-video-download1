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

export interface TikTokVideoData {
  id: string;
  title: string;
  duration: number;
  cover: string | null;
  author: TikTokAuthor;
  stats: TikTokStats;
  music: TikTokMusic;
  downloads: TikTokDownloads;
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
}
