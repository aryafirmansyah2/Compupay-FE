"use client";
import React, { useCallback, useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { OurCard } from "@/components/custom/our-card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import request from "@/utils/request";

import { columns } from "./_components/column-table-point-record";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Department = {
  id: string;
  name: string;
};

export default function PointRecordPage() {
  // DATA
  const [data, setData] = useState<any[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  // LOADING & ERROR
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FILTERS
  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [minPoint, setMinPoint] = useState<string>("");
  const [maxPoint, setMaxPoint] = useState<string>("");

  // PAGINATION
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // TABLE UTILS
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // GET DEPARTMENTS
  const fetchDepartments = useCallback(async () => {
    try {
      const res = await request.get(`/department?get_all=true`);
      setDepartments(res.data.data ?? []);
    } catch (e) {
      // ignore or log warning
    }
  }, []);

  // BUILD QUERY STRING
  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (departmentId) params.set("filter[department_id]", departmentId);
    if (minPoint) params.set("filter[total_point_min]", minPoint);
    if (maxPoint) params.set("filter[total_point_max]", maxPoint);
    params.set("pagination[page]", String(page));
    params.set("pagination[limit]", String(limit));
    return params.toString();
  }, [search, departmentId, minPoint, maxPoint, page, limit]);

  // FETCH DATA
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const qs = buildQueryString();
      const res = await request.get(`/pointRecord?${qs}`);
      const rows = res.data.data ?? [];
      const meta = res.data.meta;
      setData(rows);

      if (meta) {
        setTotalItems(meta.totalItems ?? 0);
        setTotalPages(meta.totalPages ?? 1);
        if (meta.currentpage) setPage(Number(meta.currentpage));
        if (meta.itemsPerPage) setLimit(Number(meta.itemsPerPage));
      } else {
        setTotalItems(rows.length);
        setTotalPages(1);
      }
    } catch (err: any) {
      setError(err?.message || "Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [buildQueryString]);

  // INIT DEPARTMENTS
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // TRIGGER FETCH DATA on filter change (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchData();
    }, 400);
    return () => clearTimeout(delay);
  }, [search, departmentId, minPoint, maxPoint, limit, fetchData]);

  // TRIGGER FETCH DATA on page change
  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  // TABLE INSTANCE
  const table = useReactTable({
    data,
    columns: columns(),
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
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <section className="grid gap-4 md:grid-cols-3 w-full">
      <OurCard
        title="Point Records"
        action={
          <div className="flex flex-col md:flex-row items-end gap-4 w-full md:w-auto">
            {/* Input Search */}
            <div className="grid gap-1 w-full md:w-[240px]">
              <Label className="text-xs text-transparent select-none hidden md:block">Search</Label>
              <InputGroup className="w-full">
                <InputGroupInput
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <InputGroupAddon>
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Filter Group */}
            <div className="flex items-end gap-3 w-full md:w-auto flex-wrap">
              <div className="grid gap-1 flex-1 md:flex-initial">
                <Label className="text-xs text-muted-foreground">Department</Label>
                <select
                  className="h-10 w-full md:w-[130px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={departmentId}
                  onChange={e => setDepartmentId(e.target.value)}
                >
                  <option value="">All</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-1 flex-1 md:flex-initial">
                <Label className="text-xs text-muted-foreground">Min total point</Label>
                <Input
                  type="number"
                  value={minPoint}
                  onChange={e => setMinPoint(e.target.value)}
                  placeholder="0"
                  className="w-full md:w-[120px]"
                />
              </div>

              <div className="grid gap-1 flex-1 md:flex-initial">
                <Label className="text-xs text-muted-foreground">Max total point</Label>
                <Input
                  type="number"
                  value={maxPoint}
                  onChange={e => setMaxPoint(e.target.value)}
                  placeholder="999"
                  className="w-full md:w-[120px]"
                />
              </div>
            </div>
          </div>
        }
        size="fill"
        className="col-span-full md:col-span-3"
      >
        {error ? (
          <div className="p-4 text-sm text-red-600">{error}</div>
        ) : null}

        <div className="overflow-hidden rounded-md border">
          <Table className="table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
        <div className="mt-2 text-xs text-muted-foreground">
          Total items: {totalItems} • Page {page} / {totalPages}
        </div>
      </OurCard>
    </section>
  );
}