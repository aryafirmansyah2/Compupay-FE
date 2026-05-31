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
import toast from "react-hot-toast";
import { Search } from "lucide-react";

import { OurCard } from "@/components/custom/our-card";
import DeleteToastConfirm from "@/components/custom/our-toast";
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
import { canManageData, getCurrentRole } from "@/utils/role";
import type { PointRecord } from "@/types/pointRecordTypes";

import { columns } from "./_components/column-table-point-record";

export default function PointRecordPage() {
  const [data, setData] = useState<PointRecord[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<string | undefined>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setRole(getCurrentRole());
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await request.get("/pointRecord", {
        search,
      });

      setData(res.data.data || []);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Failed to fetch point record"));
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  const onDelete = useCallback(
    (item: PointRecord) => {
      const employeeName = item.attendance?.users?.full_name || item.id;

      toast(
        (t) => (
          <DeleteToastConfirm
            t={t}
            itemName={employeeName}
            onConfirm={async () => {
              const loading = toast.loading("Deleting point record...");

              try {
                await request.delete(`/pointRecord/${item.id}`);

                toast.success("Point record deleted", { id: loading });
                fetchData();
              } catch (err) {
                toast.error(
                  getApiErrorMessage(err, "Failed to delete point record"),
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timeout);
  }, [fetchData]);

  const table = useReactTable({
    data,
    columns: columns({
      fetchData,
      onDelete,
      canManage: canManageData(role),
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
        title="Point Record"
        descTitle="Attendance point history from employee check-in records"
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
          </div>
        }
        size="fill"
        className="col-span-full"
      >
        <div className="overflow-hidden rounded-md border">
          <Table>
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
                    Loading point records...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
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
