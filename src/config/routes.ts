import { TRouteGroup } from "@/types/TRoutes";
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
  Users,
  GitFork,
  BriefcaseBusiness,
  BanknoteArrowUp,
  BanknoteArrowDown,
  CircleDollarSign,
} from "lucide-react";
import Cookies from "js-cookie";

const role = Cookies.get("role");

export const routeGroups: TRouteGroup[] = [
  // {
  //   title: "Main",
  //   items: [
  //     {
  //       title: "Overview",
  //       url: "/overview",
  //       icon: LayoutDashboard,
  //     },
  //   ],
  // },
  {
    title: "Menu",
    items: [
      {
        title: "Employee",
        url: "/employee",
        icon: Users,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Department",
        url: "/department",
        icon: GitFork,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Position",
        url: "/position",
        icon: BriefcaseBusiness,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Deduction",
        url: "/deduction",
        icon: BanknoteArrowDown,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Allowance",
        url: "/allowance",
        icon: BanknoteArrowUp,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        title: "Payroll",
        url: "/payroll",
        icon: CircleDollarSign,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },

      {
        title: "Salary Slip",
        url: "/salary-slip",
        icon: CircleDollarSign,
        roles: ["USER"],
      },
    ],
  },
  // {
  //   title: "Media Monitoring",
  //   items: [
  //     {
  //       title: "Self Growth",
  //       url: "/media-monitoring/self-growth",
  //       icon: ChartNoAxesCombined,
  //     },
  //     {
  //       title: "Competitor Analysis",
  //       url: "/media-monitoring/competitor-analysis",
  //       icon: UserCheck,
  //     },
  //     {
  //       title: "Content Performance",
  //       url: "/media-monitoring/content-performance",
  //       icon: MonitorCog,
  //     },
  //   ],
  // },
  // {
  //   title: "Issue Monitoring",
  //   items: [
  //     {
  //       title: "Executive Summary",
  //       url: "/issue-monitoring/executive-summary",
  //       icon: NotepadText,
  //     },
  //     {
  //       title: "Issue Highlights",
  //       url: "/issue-monitoring/issue-highlights",
  //       icon: Siren,
  //     },
  //   ],
  // },
  // {
  //   title: "Complaints Monitoring",
  //   items: [
  //     {
  //       title: "Complaints",
  //       url: "/citizen-complaints/complaints",
  //       icon: MicVocal,
  //     },
  //   ],
  // },
  // {
  //   title: "Tools",
  //   items: [
  //     {
  //       title: "Integrations",
  //       url: "/tools/integrations",
  //       icon: Cable,
  //     },
  //     {
  //       title: "Report Tamplates",
  //       url: "/tools/report-templates",
  //       icon: ClipboardPlus,
  //     },
  //   ],
  // },
  // {
  //   title: "Others",
  //   items: [
  //     {
  //       title: "Settings",
  //       url: "/others/settings",
  //       icon: Settings,
  //     },
  //     {
  //       title: "Profile",
  //       url: "/others/profile",
  //       icon: UserRound,
  //     },
  //   ],
  // },
];
