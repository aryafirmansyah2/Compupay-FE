import { type LucideIcon } from 'lucide-react';

export type TRoutes = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type TRouteGroup = {
  title: string;
  items: TRoutes[];
};
