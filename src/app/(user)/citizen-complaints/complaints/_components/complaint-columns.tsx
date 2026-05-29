"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Bot, CircleUserRound } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { UserRow } from "../type";
import { MediaCell } from "./columns/media-column";
import Link from "next/link";

export const complaintsColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "control",
    header: () => (
      <div className="flex items-center gap-2">
        {/* <Joystick className="h-4 w-4" /> */}
        <p className="font-medium">Control</p>
      </div>
    ),
    cell: ({ row }) => {
      const { control } = row.original as {
        control: boolean;
      };

      return (
        <div className=" flex justify-center items-center ">
          <Button size="icon" variant="outline" className="rounded-full">
            {control ? <CircleUserRound /> : <Bot />}
          </Button>
        </div>
      );
    },
    size: 36,
  },
  {
    accessorKey: "time",
    header: () => (
      <div className="flex items-center gap-2">
        {/* <Timer className="h-4 w-4" /> */}
        <p className="font-medium">Time</p>
      </div>
    ),
    cell: ({ row }) => {
      const { time } = row.original as {
        time: string;
      };

      return <span>{format(time, "PPP")}</span>;
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2">
        {/* <UserRound className="h-4 w-4" /> */}
        <p className="font-medium">Name</p>
      </div>
    ),
    cell: ({ row }) => {
      const { name } = row.original as {
        name: string;
      };
      return (
        <Link
          href={`/citizen-complaints/complaints/${row.original.id}`}
          className="cursor-pointer"
        >
          <Button variant="link" className=" cursor-pointer">
            {name}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => (
      <div className="flex items-center gap-2">
        {/* <UserRound className="h-4 w-4" /> */}
        <p className="font-medium">Location</p>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: () => (
      <div className="flex items-center gap-2">
        <p className="font-medium">Tags</p>
      </div>
    ),
    cell: ({ row }) => {
      const tags =
        (row.original as { tags?: { hash_tag: string }[] }).tags ?? [];
      const max = 1;
      const visible = tags.slice(0, max);
      const hidden = tags.slice(max);
      const hiddenCount = hidden.length;

      const TAG_COLORS = [
        "bg-chart-1/10 text-chart-1",
        "bg-chart-2/10 text-chart-2",
        "bg-chart-3/10 text-chart-3",
        "bg-chart-4/10 text-chart-4",
        "bg-chart-5/10 text-chart-5",
        "bg-chart-6/10 text-chart-6",
      ];

      function hashStr(s: string) {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
          h = (h << 5) - h + s.charCodeAt(i);
          h |= 0;
        }
        return h;
      }

      function colorClassFor(tag: string) {
        const idx = Math.abs(hashStr(tag)) % TAG_COLORS.length;
        return "bg-muted text-muted-foreground";
        // return TAG_COLORS[idx];
      }

      return (
        <div className="flex items-center gap-2 flex-warp">
          {visible.map((item, i) => (
            <Badge
              key={`${item.hash_tag}-${i}`}
              variant="outline"
              className={`${colorClassFor(item.hash_tag)} border-none`}
            >
              #{item.hash_tag}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge variant="outline" className="font-normal cursor-pointer">
                  +{hiddenCount}
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60" align="end">
                <DropdownMenuLabel>List Tags</DropdownMenuLabel>
                <div className="flex flex-wrap gap-2">
                  {hidden.map((item, i) => (
                    <Badge
                      key={`hidden-${item.hash_tag}-${i}`}
                      variant="outline"
                      className={`${colorClassFor(item.hash_tag)} border-none`}
                    >
                      #{item.hash_tag}
                    </Badge>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-2">
        {/* <UserRound className="h-4 w-4" /> */}
        <p className="font-medium">Status</p>
      </div>
    ),
    cell: ({ row }) => {
      const { status } = row.original as {
        status: string;
      };

      const STATUS_STYLES: Record<string, string> = {
        "need verifikasi": "bg-chart-1/20 text-chart-1", // chart-2
        "verify the situation": "bg-chart-4/20 text-chart-4", // chart-1
        "file verification": "bg-chart-4/20 text-chart-4", // chart-3
        "opd process": "bg-chart-4/20 text-chart-4", // chart-4
        "completed handling": "bg-chart-4/20 text-chart-4", // chart-5
        "complaint completed": "bg-chart-3/20 text-chart-3", // chart-6
        closed: "bg-chart-1/20 text-chart-1", // chart-2
      };

      function statusClass(s?: string) {
        const key = (s ?? "").trim().toLowerCase();
        // return 'bg-muted text-muted-foreground';
        return STATUS_STYLES[key] ?? "bg-muted text-muted-foreground";
      }

      return (
        <Badge
          variant="outline"
          className={`${statusClass(status)} border-none`}
        >
          <FaCircle className="text-[8px] mr-2" />
          {/* ikut warna text (currentColor) */}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "situation",
    header: () => (
      <div className="flex items-center gap-2">
        {/* <UserRound className="h-4 w-4" /> */}
        <p className="font-medium">Situation</p>
      </div>
    ),
    cell: ({ row }) => {
      const { situation } = row.original as {
        situation: string;
      };

      const SITUATION_STYLES: Record<string, string> = {
        Emergency: "bg-chart-1/20 text-chart-1",
        "Information Request": "bg-chart-3/20 text-chart-3",
        Supervised: "bg-chart-5/20 text-chart-5",
        Unsupervised: "bg-chart-2/20 text-chart-2",
      };

      function situationClass(s?: string) {
        const key = (s ?? "").trim();
        return "bg-muted text-muted-foreground";
        // return SITUATION_STYLES[key] ?? 'bg-muted text-muted-foreground';
      }

      return (
        <Badge
          variant="outline"
          className={`${situationClass(situation)} border-none`}
        >
          {/* <FaCircle className="text-[8px] mr-2" /> */}
          {/* ikut warna text (currentColor) */}
          {situation}
        </Badge>
      );
    },
  },
  {
    accessorKey: "opd",
    header: () => (
      <div className="flex items-center gap-2">
        <p className="font-medium">OPD</p>
      </div>
    ),
    cell: ({ row }) => {
      const opd =
        (row.original as { opd?: { name: string; short_name: string }[] })
          .opd ?? [];
      const max = 1;
      const visible = opd.slice(0, max);
      const hidden = opd.slice(max);
      const hiddenCount = hidden.length;

      const TAG_COLORS = [
        "bg-chart-1/10 text-chart-1",
        "bg-chart-2/10 text-chart-2",
        "bg-chart-3/10 text-chart-3",
        "bg-chart-4/10 text-chart-4",
        "bg-chart-5/10 text-chart-5",
        "bg-chart-6/10 text-chart-6",
      ];

      function hashStr(s: string) {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
          h = (h << 5) - h + s.charCodeAt(i);
          h |= 0;
        }
        return h;
      }

      function colorClassFor(tag: string) {
        const idx = Math.abs(hashStr(tag)) % TAG_COLORS.length;
        return "bg-muted text-muted-foreground";
        // return TAG_COLORS[idx];
      }

      return (
        <div className="flex items-center gap-2 flex-warp">
          {visible.map((item, i) => (
            <Badge
              key={`${item.short_name}-${i}`}
              variant="outline"
              className={`${colorClassFor(item.short_name)} border-none`}
            >
              {item.short_name}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge variant="outline" className="font-normal cursor-pointer">
                  +{hiddenCount}
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60" align="end">
                <DropdownMenuLabel>List OPD</DropdownMenuLabel>
                <div className="flex flex-wrap gap-2">
                  {hidden.map((item, i) => (
                    <Badge
                      key={`hidden-${item.short_name}-${i}`}
                      variant="outline"
                      className={`${colorClassFor(
                        item.short_name
                      )} border-none`}
                    >
                      {item.short_name}
                    </Badge>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
  {
    id: "media",
    accessorKey: "media",
    header: () => (
      <div className="flex items-center gap-2">
        <span className="font-medium">Media</span>
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <MediaCell items={row.original.media} />,
  },
];
