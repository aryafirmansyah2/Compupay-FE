import { TRouteGroup } from '@/types/TRoutes';
import {
  Home,
  Inbox,
  Calendar,
  Settings,
  LayoutDashboard,
  ChartNoAxesCombined,
  MonitorCog,
  UserCheck,
  NotepadText,
  Spotlight,
  Siren,
  FileCog,
  Cable,
  ClipboardPlus,
  UserRound,
  MicVocal,
} from 'lucide-react';

export const routeGroups: TRouteGroup[] = [
  {
    title: 'Main',
    items: [
      {
        title: 'Overview',
        url: '/overview',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Media Monitoring',
    items: [
      {
        title: 'Self Growth',
        url: '/media-monitoring/self-growth',
        icon: ChartNoAxesCombined,
      },
      {
        title: 'Competitor Analysis',
        url: '/media-monitoring/competitor-analysis',
        icon: UserCheck,
      },
      {
        title: 'Content Performance',
        url: '/media-monitoring/content-performance',
        icon: MonitorCog,
      },
    ],
  },
  {
    title: 'Issue Monitoring',
    items: [
      {
        title: 'Executive Summary',
        url: '/issue-monitoring/executive-summary',
        icon: NotepadText,
      },
      {
        title: 'Issue Highlights',
        url: '/issue-monitoring/issue-highlights',
        icon: Siren,
      },
    ],
  },
  {
    title: 'Complaints Monitoring',
    items: [
      {
        title: 'Complaints',
        url: '/citizen-complaints/complaints',
        icon: MicVocal,
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        title: 'Integrations',
        url: '/tools/integrations',
        icon: Cable,
      },
      {
        title: 'Report Tamplates',
        url: '/tools/report-templates',
        icon: ClipboardPlus,
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        title: 'Settings',
        url: '/others/settings',
        icon: Settings,
      },
      {
        title: 'Profile',
        url: '/others/profile',
        icon: UserRound,
      },
    ],
  },
];
