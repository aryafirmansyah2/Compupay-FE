import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import { formatDateTime } from "@/utils/format-date";
import type { Attendance } from "@/types/attendanceTypes";

import DialogDetailAttendance from "./dialog-detail-attendance";

const getTypeBadgeClass = (type?: string) => {
  return type === "CHECK_IN"
    ? "bg-violet-100 text-violet-700 border border-violet-200"
    : "bg-amber-100 text-amber-700 border border-amber-200";
};

const getStatusBadgeClass = (status?: string) => {
  if (status === "LATE") {
    return "bg-red-100 text-red-700 border border-red-200";
  }

  if (status === "EARLY") {
    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }

  return "bg-green-100 text-green-700 border border-green-200";
};

const getPointBadgeClass = (point?: number | null) => {
  const pointValue = Number(point ?? 0);

  if (pointValue > 0) {
    return "bg-green-100 text-green-700 border border-green-200";
  }

  return "bg-slate-100 text-slate-700 border border-slate-200";
};

export const columns = () => [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }: any) => {
      const data = row.original as Attendance;
      const user = data.users;

      return (
        <div className="grid text-sm leading-tight">
          <span className="font-medium">{user?.full_name || "-"}</span>
          <span className="text-xs text-muted-foreground">
            {user?.employee_number || user?.email || "-"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }: any) => {
      const data = row.original as Attendance;
      const type = data.type;

      return (
        <Badge className={getTypeBadgeClass(type)}>
          {type?.replace("_", " ") || "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const data = row.original as Attendance;
      const status = data.status;

      return (
        <Badge className={getStatusBadgeClass(status)}>
          {status?.replace("_", " ") || "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "pointRecord",
    header: "Point",
    cell: ({ row }: any) => {
      const data = row.original as Attendance;
      const point = data.pointRecord?.point;

      return (
        <Badge className={getPointBadgeClass(point)}>
          {point !== undefined && point !== null && point > 0
            ? `+${point}`
            : (point ?? "-")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "datetime_log",
    header: "Datetime",
    cell: ({ row }: any) => {
      const data = row.original as Attendance;

      return (
        <span className="text-sm">{formatDateTime(data.datetime_log)}</span>
      );
    },
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
    cell: ({ row }: any) => {
      const data = row.original as Attendance;

      return (
        <span className="text-sm text-muted-foreground">
          {data.accuracy ? `${data.accuracy} m` : "-"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }: any) => {
      const data = row.original as Attendance;

      return (
        <div className="flex gap-3">
          <DialogDetailAttendance data={data}>
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogDetailAttendance>
        </div>
      );
    },
  },
];
