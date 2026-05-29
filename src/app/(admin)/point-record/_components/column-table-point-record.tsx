import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns = () => [
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
    accessorKey: "employee_number",
    header: "Employee No",
    cell: ({ row }) => <span className="font-medium">{row.original.employee_number}</span>,
  },
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => <span className="truncate font-medium">{row.original.full_name}</span>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const dept = row.original.department?.name ?? "-";
      return <Badge variant="secondary">{dept}</Badge>;
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const pos = row.original.position?.name ?? "-";
      return <span>{pos}</span>;
    },
  },
  {
    accessorKey: "total_point",
    header: "Total Point",
    cell: ({ row }) => <span className="font-semibold">{row.original.total_point ?? 0}</span>,
  },
];