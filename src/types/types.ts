import { type LucideIcon } from 'lucide-react';
import type { ComponentType, SVGAttributes } from 'react';

export type FormatStyleType =
  | 'percent'
  | 'duration'
  | 'currency'
  | 'regular'
  | 'socialMedia';

export interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export type IconType = ComponentType<IconProps> | LucideIcon;

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

export interface TabItem {
  name: string;
  value: string;
  content: React.ReactNode;
}
