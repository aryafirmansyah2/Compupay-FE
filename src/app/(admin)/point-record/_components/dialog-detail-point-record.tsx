"use client";

import { ReactNode } from "react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PointRecord } from "@/types/pointRecordTypes";

interface Props {
  data: PointRecord;
  children?: ReactNode;
}

const getPointBadgeClass = (point: number) => {
  if (point > 0) return "bg-green-100 text-green-700 border border-green-200";
  if (point < 0) return "bg-red-100 text-red-700 border border-red-200";
  return "bg-slate-100 text-slate-700 border border-slate-200";
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

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="font-medium break-words">{value || "-"}</div>
    </div>
  );
}

export default function DialogDetailPointRecord({ data, children }: Props) {
  const attendance = data?.attendance;
  const user = attendance?.users;
  const point = Number(data?.point ?? 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button variant="secondary">Detail</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Point Record Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Employee" value={user?.full_name} />
            <DetailItem label="Employee Number" value={user?.employee_number} />
            <DetailItem label="Email" value={user?.email} />
            <DetailItem label="Department" value={user?.department?.name} />
            <DetailItem label="Position" value={user?.position?.name} />
            <DetailItem
              label="Point"
              value={
                <Badge className={getPointBadgeClass(point)}>
                  {point > 0 ? `+${point}` : point}
                </Badge>
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <DetailItem
              label="Attendance Type"
              value={attendance?.type?.replace("_", " ")}
            />
            <DetailItem
              label="Attendance Status"
              value={
                <Badge className={getStatusBadgeClass(attendance?.status)}>
                  {attendance?.status?.replace("_", " ") || "-"}
                </Badge>
              }
            />
            <DetailItem
              label="Attendance Time"
              value={
                attendance?.datetime_log
                  ? format(
                      new Date(attendance.datetime_log),
                      "dd MMM yyyy • HH:mm",
                    )
                  : "-"
              }
            />
            <DetailItem
              label="Record Created"
              value={
                data?.created_at
                  ? format(new Date(data.created_at), "dd MMM yyyy • HH:mm")
                  : "-"
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <DetailItem label="Latitude" value={attendance?.latitude} />
            <DetailItem label="Longitude" value={attendance?.longitude} />
            <DetailItem
              label="Accuracy"
              value={
                attendance?.accuracy ? `${attendance.accuracy} meters` : "-"
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
