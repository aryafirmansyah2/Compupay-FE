import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormEmployeeAllowance from "./dialog-form-employee-allowance";
import DialogDetailEmployeeAllowance from "./dialog-detail-employee-allowance";
import { formatCurrency } from "@/components/ui/currency-input";
import { format } from "date-fns";

export const columnsEmployeeAllowance = (fetchData, handleDelete) => [
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
    accessorKey: "users",
    header: "Employee name",
    cell: ({ row }) => {
      const { users } = row.original;
      return <span className="truncate font-medium">{users.full_name}</span>;
    },
  },
  {
    accessorKey: "allowance",
    header: "Allowance",
    cell: ({ row }) => {
      const { allowance } = row.original;
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
      const { amount } = row.original;
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(amount.toString())}
        </span>
      );
    },
  },
  {
    accessorKey: "effective_date",
    header: "Effective date",
    cell: ({ row }) => {
      const { effective_date } = row.original;
      return (
        <span className="truncate font-medium">
          {format(effective_date, "dd-MM-yyyy")}
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
          <DialogDetailEmployeeAllowance>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailEmployeeAllowance>
          <DialogFormEmployeeAllowance
            type="update"
            data={payment}
            fetchData={fetchData}
          >
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
            onClick={() => handleDelete(id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
