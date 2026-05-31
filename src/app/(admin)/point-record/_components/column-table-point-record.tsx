import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import { format } from "date-fns";

import type { PointRecord } from "@/types/pointRecordTypes";

import DialogDetailPointRecord from "./dialog-detail-point-record";
import DialogFormPointRecord from "./dialog-form-point-record";

type ColumnProps = {
  fetchData: () => void;
  onDelete: (item: PointRecord) => void;
  canManage: boolean;
};

const getPointBadgeClass = (point: number) => {
  if (point > 0) return "bg-green-100 text-green-700 border border-green-200";
  if (point < 0) return "bg-red-100 text-red-700 border border-red-200";
  return "bg-slate-100 text-slate-700 border border-slate-200";
};

const getAttendanceTypeBadgeClass = (type?: string) => {
  return type === "CHECK_IN"
    ? "bg-violet-100 text-violet-700 border border-violet-200"
    : "bg-amber-100 text-amber-700 border border-amber-200";
};

const getAttendanceStatusBadgeClass = (status?: string) => {
  if (status === "LATE") {
    return "bg-red-100 text-red-700 border border-red-200";
  }

  if (status === "EARLY") {
    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }

  return "bg-green-100 text-green-700 border border-green-200";
};

export const columns = ({ fetchData, onDelete, canManage }: ColumnProps) => [
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;
      const user = item.attendance?.users;

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
    accessorKey: "point",
    header: "Point",
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;
      const point = Number(item.point ?? 0);

      return (
        <Badge className={getPointBadgeClass(point)}>
          {point > 0 ? `+${point}` : point}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Attendance Type",
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;
      const type = item.attendance?.type;

      return (
        <Badge className={getAttendanceTypeBadgeClass(type)}>
          {type?.replace("_", " ") || "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;
      const status = item.attendance?.status;

      return (
        <Badge className={getAttendanceStatusBadgeClass(status)}>
          {status?.replace("_", " ") || "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "datetime_log",
    header: "Attendance Time",
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;
      const datetime = item.attendance?.datetime_log;

      return (
        <div className="text-sm">
          {datetime ? format(new Date(datetime), "dd MMM yyyy • HH:mm") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Record Created",
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;
      const createdAt = item.created_at;

      return (
        <div className="text-sm text-muted-foreground">
          {createdAt ? format(new Date(createdAt), "dd MMM yyyy • HH:mm") : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }: any) => {
      const item = row.original as PointRecord;

      return (
        <div className="flex gap-3">
          <DialogDetailPointRecord data={item}>
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogDetailPointRecord>

          {canManage && (
            <>
              <DialogFormPointRecord
                type="update"
                data={item}
                fetchData={fetchData}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="hover:text-primary"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogFormPointRecord>

              <Button
                size="icon"
                variant="outline"
                className="hover:text-primary"
                onClick={() => onDelete(item)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
