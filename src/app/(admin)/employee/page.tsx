"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import { OurCard } from "@/components/custom/our-card";
import DeleteToastConfirm from "@/components/custom/our-toast";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import request from "@/utils/request";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import type { User } from "@/types/userTypes";

import DialogFormEmployee from "./_components/dialog-form-employee";
import { columns } from "./_components/column-table-employee";

export default function EmployeePage() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request.get("/user", {
        search,
      });

      setData(res.data.data || []);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to fetch employee"));
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timeout);
  }, [fetchData]);

  const handleDelete = useCallback(
    (item: User): void => {
      toast(
        (t) => (
          <DeleteToastConfirm
            t={t}
            entityName="employee"
            itemName={item.full_name}
            onConfirm={async () => {
              const loading = toast.loading("Deleting employee...");

              try {
                await request.delete(`/user/${item.id}`);
                toast.success("Employee deleted successfully", { id: loading });
                fetchData();
              } catch (err: any) {
                toast.error(
                  err?.response?.data?.errors?.message ||
                    err?.response?.data?.message ||
                    "Failed to delete employee",
                  { id: loading },
                );
              }
            }}
          />
        ),
        {
          duration: 8000,
          position: "top-center",
        },
      );
    },
    [fetchData],
  );

  const table = useReactTable({
    data,
    columns: columns(fetchData, (id: string, name: string) => {
      const item = data.find((employee) => employee.id === id);

      if (item) {
        handleDelete(item);
      } else {
        handleDelete({
          id,
          full_name: name,
        } as User);
      }
    }),
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
    <section className="grid gap-4 md:grid-cols-3 w-full">
      <OurCard
        title="Employee"
        descTitle="Manage employee profiles, positions, salaries, and account access"
        action={
          <div className="flex gap-4">
            <InputGroup className="w-full md:w-80">
              <InputGroupInput
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <DialogFormEmployee type="create" fetchData={fetchData}>
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
        <div className="overflow-hidden rounded-md border">
          <Table className="table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Loading employee...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <DataTablePagination table={table} />
      </OurCard>
    </section>
  );
}
