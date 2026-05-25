import { Badge } from "@/components/ui/badge";
import type { LeaveRequestStatus } from "../types";

export function LeaveRequestStatusBadge({
  status,
}: {
  status: LeaveRequestStatus;
}) {
  if (status === "APPROVED") {
    return (
      <Badge className="px-2.5 py-1.5 rounded-full bg-green-500/10 border-green-500 text-green-600">
        APPROVED
      </Badge>
    );
  }

  if (status === "REJECT") {
    return (
      <Badge className="px-2.5 py-1.5 rounded-full bg-red-500/10 border-red-500 text-red-600">
        REJECT
      </Badge>
    );
  }

  return (
    <Badge className="px-2.5 py-1.5 rounded-full bg-yellow-500/10 border-yellow-500 text-yellow-600">
      PENDING
    </Badge>
  );
}
