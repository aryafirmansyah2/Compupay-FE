import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import DialogDetailPosition from "./dialog-detail-position";
import DialogFormPosition from "./dialog-form-position";

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
    header: "Position",
    cell: ({ row }) => {
      const { name } = row.original as {
        name: string;
      };
      return <span className="truncate font-medium">{name}</span>;
    },
  },

  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const { department } = row.original;
      return <span className="truncate font-medium">{department.name}</span>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-4">
          <DialogDetailPosition>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailPosition>
          <DialogFormPosition type="update" fetchData={fetchData} data={data}>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormPosition>
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
