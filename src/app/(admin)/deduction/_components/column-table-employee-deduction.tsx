import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormEmployeeDeduction from "./dialog-form-employee-deduction";
import DialogDetailEmployeeDeduction from "./dialog-detail-employee-deduction";
import { formatCurrency } from "@/components/ui/currency-input";

export const columnsEmployeeDeduction = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
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
    accessorKey: "employee",
    header: "Employee name",
    cell: ({ row }) => {
      const { employee } = row.original as {
        employee: { name: string };
      };
      return <span className="truncate font-medium">{employee.name}</span>;
    },
  },
  {
    accessorKey: "deduction",
    header: "Deduction",
    cell: ({ row }) => {
      const { deduction } = row.original as {
        deduction: { deduction: string };
      };
      return (
        <span className="truncate font-medium">{deduction.deduction}</span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const { type } = row.original as {
        type: string;
      };
      return <span className="truncate font-medium">{type}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const { amount } = row.original as {
        amount: number;
      };
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(amount.toString())}
        </span>
      );
    },
  },
  {
    accessorKey: "effectiveDate",
    header: "Effective date",
    cell: ({ row }) => {
      const { effectiveDate } = row.original as {
        effectiveDate: string;
      };
      return <span className="truncate font-medium">{effectiveDate}</span>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const { id } = row.original as {
        id: string;
      };
      return (
        <div className="flex gap-4">
          <DialogDetailEmployeeDeduction>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailEmployeeDeduction>
          <DialogFormEmployeeDeduction type="update">
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormEmployeeDeduction>
          <Button
            size={"icon"}
            variant={"outline"}
            className="hover:text-primary"
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
