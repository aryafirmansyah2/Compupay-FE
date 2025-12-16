import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { formatCurrency } from "@/components/ui/currency-input";
import DialogDetailDepartment from "./dialog-detail-department";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormDepartment from "./dialog-form-department";

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
    accessorKey: "name",
    header: "Department",
    cell: ({ row }) => {
      const { name } = row.original as {
        name: string;
      };
      return <span className="truncate font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "position",
    header: "Count position",
    cell: ({ row }) => {
      const { position } = row.original as {
        position: Array<string>;
      };
      return (
        <div className="flex gap-2">
          {position?.map((item) => (
            <Badge key={item} className="truncate font-medium">
              {item}
            </Badge>
          )) ?? 0}
        </div>
      );
    },
  },
  {
    accessorKey: "start_salary",
    header: "Range salary",
    cell: ({ row }) => {
      const { start_salary, end_salary } = row.original as {
        start_salary: number;
        end_salary: number;
      };
      return (
        <span className="truncate font-medium">
          Rp {formatCurrency(start_salary.toString())} - Rp{" "}
          {formatCurrency(end_salary.toString())}
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
          <DialogDetailDepartment data={data}>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailDepartment>
          <DialogFormDepartment type="update" fetchData={fetchData} data={data}>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormDepartment>
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
