import { type LucideIcon } from 'lucide-react';

export type FormatStyleType =
  | 'percent'
  | 'duration'
  | 'currency'
  | 'regular'
  | 'socialMedia';

export type IconType = LucideIcon;

export interface ChartConfigItem {
  label: string;
  fill?: string;
}

export interface ChartConfig {
  [key: string]: ChartConfigItem;
}

export interface ChartProps {
  chartConfig: ChartConfig;
  data: Record<string, string | number>[];
}
