import { ChartProps, IconType } from '@/types/types';

export interface MetricType {
  period: string;
  value: number;
  percentageChange: number;
}

export interface OverviewType {
  totalFollowers: MetricType;
  totalLikes: MetricType;
  totalComments: MetricType;
  totalViews: MetricType;
}

export interface ProxyFriendshipPieChartMetric {
  label: string;
  value: number;
  fill: string;
  topic?: string[];
}

export interface ProxyFriendshipPieType {
  platform: string;
  accountName: string;
  icon: IconType;
  data: ProxyFriendshipPieChartMetric[];
}

export interface SocialMediaRankingType {
  accountName: string;
  avatar: string;
  score: number;
  pointCoefficient: number;
}

export interface FairScoreType {
  date: string;
  score: number;
}

export interface ProxyFriendshipItem {
  account: string;
  avatar: string;
  platform: string;
  link: string;
  data: ChartProps;
  dataKey: string;
  namekey: string;
}
