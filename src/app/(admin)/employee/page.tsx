"use client";
import React, { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { OurCard } from "@/components/custom/our-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownToLine,
  ArrowUpDown,
  ChevronDown,
  Edit,
  Eye,
  ListFilterPlus,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { formatDate, formatNumberSocialMedia } from "@/lib/utils";
import { ShowMoreText } from "@/components/ui/show-more-text";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import DialogFormEmployee from "./_components/dialog-form-employee";
import DialogDetailEmployee from "./_components/dialog-detail-employee";
const data = [
  {
    id: "1",
    profile_uri: "assets/images/user-1.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "2",
    profile_uri: "assets/images/user-2.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "3",
    profile_uri: "assets/images/user-3.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "4",
    profile_uri: "assets/images/user-4.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "5",
    profile_uri: "assets/images/user-5.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "6",
    profile_uri: "assets/images/user-1.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "7",
    profile_uri: "assets/images/user-2.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "8",
    profile_uri: "assets/images/user-3.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "9",
    profile_uri: "assets/images/user-4.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
  {
    id: "10",
    profile_uri: "assets/images/user-5.png",
    name: "Arya Firmansyah",
    email: "aryafirmansyah@gmail.com",
    employee_id: "AO1DSGN193",
    job_title: "UI/UX Designer",
    join_date: "24-12-2025",
    status: "Active",
    department: "Produksi",
    position: "HRD",
  },
];

export const columns = [
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
      const { name, email, profile_uri } = row.original as {
        name: string;
        email: string;
        profile_uri: string;
      };
      return (
        <div className="flex gap-4">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={profile_uri} alt={name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "employee_id",
    header: "Employe ID",
    cell: ({ row }) => <div className="">{row.getValue("employee_id")}</div>,
  },
  {
    accessorKey: "job_title",
    header: "Job title",
    cell: ({ row }) => <div className="">{row.getValue("job_title")}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "join_date",
    header: "Join date",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("join_date")}</div>
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
      const { id } = row.original as {
        id: string;
      };
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
          <DialogFormEmployee type="update">
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
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export default function EmployeePage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <section className=" grid gap-4  md:grid-cols-3  w-full">
      <OurCard
        title="Employee"
        descTitle="Make changes to your profile here. Click save when you're done."
        action={
          <div className="flex gap-4">
            <InputGroup className="w-full">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
            </InputGroup>
            <DialogFormEmployee type="create">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Employee
              </Button>
            </DialogFormEmployee>
          </div>
        }
        size="fill"
        className="col-span-full md:col-span-3"
      >
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                All Users
                <ChevronDown className="ml-2 h-4 w-4" />{" "}
                {/* Icon with margin-right */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-4">
            <Button variant="outline">
              <ListFilterPlus className="mr-2 h-4 w-4" /> Filter
              {/* Icon with margin-right */}
            </Button>
            <Button variant="outline">
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Export
              {/* Icon with margin-right */}
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table className="table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
        {/* <ActionTable />
        <ContentPerformanceTable data={contentPerformance} /> */}
      </OurCard>
    </section>
  );
}
