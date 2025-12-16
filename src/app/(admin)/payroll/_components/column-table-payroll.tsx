import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormPayroll from "./dialog-form-payroll";
import DialogDetailPayroll from "./dialog-detail-payroll";
import { formatCurrency } from "@/components/ui/currency-input";

export const columnsPayroll = [
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
    accessorKey: "reff_no",
    header: "Reff No",
    cell: ({ row }) => {
      const { payroll } = row.original as {
        payroll: { ref_no: string };
      };
      return <span className="truncate font-medium">{payroll.ref_no}</span>;
    },
  },
  {
    accessorKey: "Emplloyee",
    header: "employee",
    cell: ({ row }) => {
      const { employee } = row.original as {
        employee: { name: string };
      };
      return <span className="truncate font-medium">{employee.name}</span>;
    },
  },

  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const { salary } = row.original as {
        salary: number;
      };
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(String(salary))}
        </span>
      );
    },
  },
  {
    accessorKey: "allowance_amount",
    header: "Allowance",
    cell: ({ row }) => {
      const { allowance_amount } = row.original as {
        allowance_amount: number;
      };
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(String(allowance_amount))}
        </span>
      );
    },
  },
  {
    accessorKey: "deduction_amount",
    header: "Deduction",
    cell: ({ row }) => {
      const { deduction_amount } = row.original as {
        deduction_amount: number;
      };
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(String(deduction_amount))}
        </span>
      );
    },
  },
  {
    accessorKey: "net",
    header: "Net",
    cell: ({ row }) => {
      const { net } = row.original as {
        net: number;
      };
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(String(net))}
        </span>
      );
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
          <DialogDetailPayroll>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailPayroll>
          <DialogFormPayroll type="update">
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormPayroll>
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
