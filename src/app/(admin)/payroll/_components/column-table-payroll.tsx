import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash } from "lucide-react";

import DialogDetailPayroll from "./dialog-detail-payroll";
import DialogUpdatePayrollStatus from "./dialog-update-payroll-status";

type ColumnProps = {
  fetchData: () => void;
  onDelete: (id: string, refNo: string) => void;
};

const formatCurrency = (value: number | string | null | undefined) => {
  const numberValue = Number(value || 0);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const formatDate = (value?: string | Date | null) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getStatusBadgeClass = (status?: string) => {
  if (status === "PAID") {
    return "bg-green-100 text-green-700 border border-green-200";
  }

  if (status === "CANCELED") {
    return "bg-red-100 text-red-700 border border-red-200";
  }

  return "bg-yellow-100 text-yellow-700 border border-yellow-200";
};

export const columns = ({ fetchData, onDelete }: ColumnProps) => [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ref_no",
    header: "Ref No",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span className="font-medium">{data.ref_no || "-"}</span>;
    },
  },
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }: any) => {
      const data = row.original;
      const employee = data.employee || data.users || data.user;

      return (
        <div className="grid text-sm leading-tight">
          <span className="font-medium">{employee?.full_name || "-"}</span>
          <span className="text-xs text-muted-foreground">
            {employee?.employee_number || employee?.email || "-"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date_from",
    header: "Date From",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span>{formatDate(data.date_from)}</span>;
    },
  },
  {
    accessorKey: "date_to",
    header: "Date To",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span>{formatDate(data.date_to)}</span>;
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span>{formatCurrency(data.salary)}</span>;
    },
  },
  {
    accessorKey: "allowance_amount",
    header: "Allowance",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span>{formatCurrency(data.allowance_amount)}</span>;
    },
  },
  {
    accessorKey: "deductions",
    header: "Deduction",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span>{formatCurrency(data.deductions)}</span>;
    },
  },
  {
    accessorKey: "net",
    header: "Net Salary",
    cell: ({ row }: any) => {
      const data = row.original;

      return <span className="font-semibold">{formatCurrency(data.net)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const data = row.original;

      return (
        <Badge className={getStatusBadgeClass(data.status)}>
          {data.status || "-"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }: any) => {
      const data = row.original;
      const canUpdateStatus = data.status === "PENDING";

      return (
        <div className="flex gap-3">
          <DialogDetailPayroll data={data}>
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </DialogDetailPayroll>

          {canUpdateStatus && (
            <DialogUpdatePayrollStatus data={data} fetchData={fetchData}>
              <Button
                size="icon"
                variant="outline"
                className="hover:text-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </DialogUpdatePayrollStatus>
          )}

          <Button
            size="icon"
            variant="outline"
            className="hover:text-primary"
            onClick={() => onDelete(data.id, data.ref_no)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
