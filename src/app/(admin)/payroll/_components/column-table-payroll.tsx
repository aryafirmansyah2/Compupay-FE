import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash } from "lucide-react";

import { formatCurrency } from "@/utils/format-currency";
import { formatDateOnly } from "@/utils/format-date";
import type { Payroll } from "@/types/payrollTypes";

import DialogFormPayroll from "./dialog-form-payroll";
import DialogDetailPayroll from "./dialog-detail-payroll";

type ColumnProps = {
  fetchData: () => void;
  onDelete: (item: Payroll) => void;
  canManage: boolean;
};

const getPayrollStatusBadgeClass = (status?: string) => {
  if (status === "PAID") {
    return "bg-green-100 text-green-700 border border-green-200";
  }

  return "bg-yellow-100 text-yellow-700 border border-yellow-200";
};

export const columns = ({ fetchData, onDelete, canManage }: ColumnProps) => [
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
      const data = row.original as Payroll;

      return <span className="truncate font-medium">{data.ref_no}</span>;
    },
  },
  {
    accessorKey: "employee",
    header: "Employee",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;
      const employee = data.employee;

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
      const data = row.original as Payroll;

      return <span>{formatDateOnly(data.date_from)}</span>;
    },
  },
  {
    accessorKey: "date_to",
    header: "Date To",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return <span>{formatDateOnly(data.date_to)}</span>;
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return (
        <span className="truncate font-medium">
          {formatCurrency(data.salary)}
        </span>
      );
    },
  },
  {
    accessorKey: "allowance_amount",
    header: "Allowance",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return (
        <span className="truncate font-medium">
          {formatCurrency(data.allowance_amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "deductions",
    header: "Deduction",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return (
        <span className="truncate font-medium">
          {formatCurrency(data.deductions)}
        </span>
      );
    },
  },
  {
    accessorKey: "net",
    header: "Net",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return (
        <span className="truncate font-semibold">
          {formatCurrency(data.net)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return (
        <Badge className={getPayrollStatusBadgeClass(data.status)}>
          {data.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }: any) => {
      const data = row.original as Payroll;

      return (
        <div className="flex gap-3">
          <DialogDetailPayroll data={data}>
            <Button
              size="icon"
              variant="outline"
              className="hover:text-primary"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogDetailPayroll>

          {canManage && (
            <>
              <DialogFormPayroll
                type="update"
                fetchData={fetchData}
                data={data}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="hover:text-primary"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogFormPayroll>

              <Button
                size="icon"
                variant="outline"
                className="hover:text-primary"
                onClick={() => onDelete(data)}
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
