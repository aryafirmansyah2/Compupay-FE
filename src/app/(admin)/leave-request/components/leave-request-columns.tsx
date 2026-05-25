import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Check, Eye, FileText, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeaveRequestStatusBadge } from "./leave-request-status-badge";
import type { LeaveRequest, LeaveRequestStatus } from "../types";

type GetLeaveRequestColumnsProps = {
  updatingId: string | null;
  onViewDetail: (data: LeaveRequest) => void;
  onUpdateStatus: (id: string, status: "APPROVED" | "REJECT") => void;
};

export function getLeaveRequestColumns({
  updatingId,
  onViewDetail,
  onUpdateStatus,
}: GetLeaveRequestColumnsProps): ColumnDef<LeaveRequest>[] {
  return [
    {
      accessorKey: "users",
      header: "Employee",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {item.users?.full_name || "-"}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {item.users?.email || "-"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "employee_number",
      header: "Employee Number",
      cell: ({ row }) => {
        const item = row.original;

        return <div>{item.users?.employee_number || "-"}</div>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="rounded-full px-2.5 py-1.5">
            {row.original.type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const value = row.getValue("startDate") as string;

        return <div>{value ? format(new Date(value), "dd-MM-yyyy") : "-"}</div>;
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const value = row.getValue("endDate") as string;

        return <div>{value ? format(new Date(value), "dd-MM-yyyy") : "-"}</div>;
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => {
        const reason = row.getValue("reason") as string;

        return <div className="max-w-[280px] truncate">{reason || "-"}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as LeaveRequestStatus;

        return <LeaveRequestStatusBadge status={status} />;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        const isPending = item.status === "PENDING";
        const isUpdating = updatingId === item.id;

        return (
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
              onClick={() => onViewDetail(item)}
            >
              <Eye />
            </Button>

            <Button
              size="icon"
              variant="outline"
              disabled={!isPending || isUpdating}
              className="hover:text-green-600"
              onClick={() => onUpdateStatus(item.id, "APPROVED")}
            >
              <Check />
            </Button>

            <Button
              size="icon"
              variant="outline"
              disabled={!isPending || isUpdating}
              className="hover:text-red-600"
              onClick={() => onUpdateStatus(item.id, "REJECT")}
            >
              <X />
            </Button>
          </div>
        );
      },
    },
  ];
}
