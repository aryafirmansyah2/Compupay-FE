"use client";

import { Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DialogDetailAttendance({
  data,
}: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Attendance Detail
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">
              Employee
            </p>

            <p className="font-semibold text-base">
              {data.users?.full_name || "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Type
              </p>

              <Badge
                className={
                    data.type === "CHECK_IN"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-orange-100 text-orange-700 border border-orange-200"
                }
                >
                {data.type
                    ?.replace("_", " ")
                    }
                </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <Badge
                className={
                    data.status === "LATE"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : data.status === "EARLY"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }
                >
                {data.status
                    ?.replace("_", " ")
                    }
                </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Latitude
              </p>

              <p>{data.latitude}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Longitude
              </p>

              <p>{data.longitude}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Accuracy
            </p>

            <p>{data.accuracy} meters</p>
          </div>

          {data.photo_url && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Attendance Photo
              </p>

              <img
                src={`http://localhost:3001/public/${data.photo_url}`}
                alt="attendance"
                className="rounded-xl border w-full object-cover"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}