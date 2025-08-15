export interface ContentPerformanceData {
  avatar: string;
  accountName: string;
  platform: 'Instagram' | 'Tiktok' | 'X' | 'Facebook' | 'News';
  date: string;
  caption: string;
  likes: number;
  comments: number;
  views: number;
  shares: number;
  saves: number;
}
