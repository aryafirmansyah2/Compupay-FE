import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormPayroll from "./dialog-form-payroll";
import DialogDetailPayroll from "./dialog-detail-payroll";
import { formatCurrency } from "@/components/ui/currency-input";
import { format } from "date-fns";

export const columns = (fetchData, onDelete) => [
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
    accessorKey: "ref_no",
    header: "Reff No",
    cell: ({ row }) => {
      const data = row.original;
      return <span className="truncate font-medium">{data.ref_no}</span>;
    },
  },
  {
    accessorKey: "date_from",
    header: "Date From",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">{`${format(
          data.date_from,
          "dd-mm-yyyy"
        )}`}</span>
      );
    },
  },
  {
    accessorKey: "date_to",
    header: "Date To",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">{`${format(
          data.date_to,
          "dd-mm-yyyy"
        )}`}</span>
      );
    },
  },
  {
    accessorKey: "Emplloyee",
    header: "employee",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">{data.employee.full_name}</span>
      );
    },
  },

  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(data.employee.salary)}
        </span>
      );
    },
  },
  {
    accessorKey: "allowance_amount",
    header: "Allowance",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(data.allowance_amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "deduction_amount",
    header: "Deduction",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(data.deductions)}
        </span>
      );
    },
  },
  {
    accessorKey: "net",
    header: "Net",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(data.net)}
        </span>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

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
          <DialogFormPayroll type="update" fetchData={fetchData} data={data}>
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
            onClick={() => onDelete(data.id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
