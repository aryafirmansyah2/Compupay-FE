import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import DialogDetailEmployee from "./dialog-detail-employee";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import DialogFormEmployee from "./dialog-form-employee";
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
    accessorKey: "name",
    header: "Name of employee",
    cell: ({ row }) => {
      const { full_name, email, profile_uri } = row.original;
      return (
        <div className="flex gap-4">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={profile_uri} alt={full_name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{full_name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "employee_number",
    header: "Employee Number",
    cell: ({ row }) => (
      <div className="">{row.getValue("employee_number")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const { department } = row.original;
      console.log(row.original);
      return <div className="">{department.name}</div>;
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const { position } = row.original;
      console.log(row.original);
      return <div className="">{position.name}</div>;
    },
  },

  {
    accessorKey: "join_date",
    header: "Join date",
    cell: ({ row }) => (
      <div className="lowercase">
        {format(row.getValue("join_date"), "dd-MM-yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className="px-2.5 py-1.5 rounded-full bg-primary/10 border-primary text-primary">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex gap-4">
          <DialogDetailEmployee>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Eye />
            </Button>
          </DialogDetailEmployee>
          <DialogFormEmployee
            type="update"
            fetchData={fetchData}
            data={payment}
          >
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:text-primary"
            >
              <Edit />
            </Button>
          </DialogFormEmployee>
          <Button
            size={"icon"}
            variant={"outline"}
            className="hover:text-primary"
            onClick={() => onDelete(payment.id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
