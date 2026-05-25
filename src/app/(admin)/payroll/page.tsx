"use client";

import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
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

import DialogFormPayroll from "./_components/dialog-form-payroll";
import { columns } from "./_components/column-table-payroll";

export default function PayrollPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const role = Cookies.get("role");
  const isUser = role === "USER";

  const buildPayrollUrl = useCallback(() => {
    const currentRole = Cookies.get("role");
    const userId = Cookies.get("user_id");

    let url = "/payroll/?getAll=true";

    if (search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }

    if (currentRole === "USER") {
      if (!userId || userId === "undefined" || userId === "null") {
        return null;
      }

      url += `&filter[user_id]=${encodeURIComponent(userId)}`;
    }

    return url;
  }, [search]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const url = buildPayrollUrl();

      if (!url) {
        setData([]);

        toast.error("User ID tidak ditemukan. Silakan login ulang.", {
          duration: 2000,
          position: "top-right",
        });

        return;
      }

      const res = await request.get(url);

      setData(res.data.data || []);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.message ||
        "Failed to fetch payroll";

      toast.error(message, {
        duration: 2000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }, [buildPayrollUrl]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchData]);

  const handleDelete = (id: string, payrollName: string): void => {
    toast(
      (t) => (
        <DeleteToastConfirm
          t={t}
          itemName={payrollName}
          onConfirm={async () => {
            try {
              await request.delete(`/payroll/${id}`, {});

              toast.success("Payroll deleted successfully", {
                duration: 2000,
                position: "top-right",
              });

              fetchData();
            } catch (error: any) {
              const message =
                error?.response?.data?.message || "Failed to delete payroll";

              toast.error(message, {
                duration: 2000,
                position: "top-right",
              });
            }
          }}
        />
      ),
      {
        duration: 8000,
        position: "top-center",
      },
    );
  };

  const table = useReactTable({
    data,
    columns: columns(fetchData, handleDelete),
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
    <section className="grid w-full gap-4 md:grid-cols-3">
      <OurCard
        title="Payroll"
        action={
          <div className="flex gap-4">
            <InputGroup className="w-full">
              <InputGroupInput
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            {!isUser && (
              <DialogFormPayroll type="create" fetchData={fetchData}>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Payroll
                </Button>
              </DialogFormPayroll>
            )}
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
                    colSpan={columns(fetchData, handleDelete).length}
                    className="h-24 text-center"
                  >
                    Loading payroll...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
                    colSpan={columns(fetchData, handleDelete).length}
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
      </OurCard>
    </section>
  );
}
