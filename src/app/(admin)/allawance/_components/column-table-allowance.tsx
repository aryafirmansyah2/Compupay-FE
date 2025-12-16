import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormAllowance from "./dialog-form-allowance";
import DialogDetailAllowance from "./dialog-detail-allowance";

export const columnsAllowance = [
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
    accessorKey: "allowance",
    header: "Allowance",
    cell: ({ row }) => {
      const { allowance } = row.original as {
        allowance: string;
      };
      return <span className="truncate font-medium">{allowance}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { description } = row.original as {
        description: string;
      };
      return <span className="truncate font-medium">{description}</span>;
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
          <DialogDetailAllowance>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailAllowance>
          <DialogFormAllowance type="update">
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormAllowance>
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
