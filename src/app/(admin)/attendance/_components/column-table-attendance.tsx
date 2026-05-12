import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";

import DialogDetailAttendance from "./dialog-detail-attendance";

export const columns = (
  fetchData: any
) => [{
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }) => {
      return <div>{row.original.users?.full_name}</div>;
    },
  },
  {
  accessorKey: "type",
  header: "Type",

  cell: ({ row }: any) => {
    const type = row.original.type;

    const formattedType = type
      .replace("_", " ")

    return (
      <Badge
        className={
          type === "CHECK_IN"
            ? "bg-violet-100 text-violet-700 border border-violet-200" 
            : "bg-amber-100 text-amber-700 border border-amber-200"
        }
       >
        {formattedType}
      </Badge>
    );
  },
},
  {
  accessorKey: "status",
  header: "Status",

  cell: ({ row }: any) => {
    const status = row.original.status;

    const formattedStatus = status
      .replace("_", " ")
      ;

    return (
      <Badge
        className={
          status === "LATE"
            ? "bg-red-100 text-red-700 border border-red-200"
            : status === "EARLY"
            ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
            : "bg-green-100 text-green-700 border border-green-200"
        }
      >
        {formattedStatus}
      </Badge>
    );
  },
},
  {
    accessorKey: "datetime_log",
    header: "Datetime",
    cell: ({ row }) => (
      <div>
        {format(new Date(row.original.datetime_log), "dd MMM yyyy • HH:mm")}
      </div>
    ),
  },
  {
  accessorKey: "action",
  header: "Action",

  cell: ({ row }: any) => {
    return (
      <DialogDetailAttendance
        data={row.original}
      />
    );
  },
},
];