import { ChartProps } from '@/types/types';

export interface FairMatricType {
  date: string;
  value: number;
}
export interface FairDataType {
  accountName: string;
  avatar: string;
  score: number;
  pointCoefficient: number;
  data: FairMatricType[];
}

export interface FollowersMatricType {
  label: string;
  value: number;
}

export interface FollowersData {
  accountName: string;
  avatar: string;
  score: number;
  pointCoefficient: number;
  data: FollowersMatricType;
}

export interface FollowersMatricType {
  label: string;
  value: number;
}

export interface FollowersData {
  accountName: string;
  avatar: string;
  score: number;
  pointCoefficient: number;
  data: FollowersMatricType;
}

export interface CompetitorRankingType {
  account: string;
  avatar: string;
  score: number;
  pointCoefficient: number;
}
