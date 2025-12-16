import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormAllowance from "./dialog-form-allowance";
import DialogDetailAllowance from "./dialog-detail-allowance";
import DialogFormEmployeeAllowance from "./dialog-form-employee-allowance";
import DialogDetailEmployeeAllowance from "./dialog-detail-employee-allowance";
import { formatCurrency } from "@/components/ui/currency-input";

export const columnsEmployeeAllowance = [
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
    accessorKey: "allowance",
    header: "Allowance",
    cell: ({ row }) => {
      const { allowance } = row.original as {
        allowance: { allowance: string };
      };
      return (
        <span className="truncate font-medium">{allowance.allowance}</span>
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
          <DialogDetailEmployeeAllowance>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailEmployeeAllowance>
          <DialogFormEmployeeAllowance type="update">
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormEmployeeAllowance>
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
