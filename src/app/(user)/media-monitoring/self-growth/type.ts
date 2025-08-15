import { ChartProps } from '@/types/types';

export interface BarMatricType {
  date: string;
  score: number;
}

export interface SocialBenchmarkType {
  engagementMatric: ChartProps;
  awarenessMatric: ChartProps;
  convorsationMatric: ChartProps;
}

export interface SocialStatsType {
  title: string;
  value: number;
  percentage: number;
}

export interface FollowersType {
  date: string;
  countFollowers: number;
}

export interface LikesType {
  date: string;
  countLikes: number;
}

export interface ViewsType {
  date: string;
  countViews: number;
}

export interface CommentsType {
  date: string;
  countComments: number;
}

export interface SharesType {
  date: string;
  countShares: number;
}

export interface SavesType {
  date: string;
  countSaves: number;
}
