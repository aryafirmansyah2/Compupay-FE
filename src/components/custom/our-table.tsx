"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Columns3, Download, Search } from "lucide-react";

// Opsional: pakai pagination component Anda sendiri
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { cn } from "@/lib/utils";

type RowSelectionState = Record<string, boolean>;

export type DataTableQuery = {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  filters: ColumnFiltersState;
  globalFilter?: string;
};

type AnyData = Record<string, unknown>;

export interface DataTableProps<TData extends AnyData, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];

  /** Kunci untuk quick global search (OR). Jika kosong => pakai global filter default TanStack. */
  searchableKeys?: (keyof TData)[];

  /** Opsi UI */
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enableExportCSV?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  initialVisibility?: VisibilityState;

  /** Server-side mode */
  manual?: boolean;
  totalRows?: number; // wajib jika manual=true
  onQueryChange?: (q: DataTableQuery) => void;

  /** Controlled state (opsional) */
  externalSearch?: string; // jika mau kontrol search dari luar
  onRowClick?: (row: TData) => void;
}

function escapeCSV(v: unknown) {
  const s = v == null ? "" : String(v).replace(/"/g, '""');
  return `"${s}"`;
}

export function headerLabel<TData>(colDef: ColumnDef<TData, unknown>): string {
  const { header } = colDef;
  if (typeof header === "string") return header;

  // Narrowing aman untuk id
  if ("id" in colDef) {
    const id = (colDef as { id?: unknown }).id;
    if (typeof id === "string" && id) return id;
  }

  // Narrowing aman untuk accessorKey (bisa string | keyof TData)
  if ("accessorKey" in colDef) {
    const ak = (colDef as { accessorKey?: unknown }).accessorKey;
    if (typeof ak === "string" && ak) return ak;
    // kalau accessorKey berupa symbol/keyof, fallback ke String()
    if (ak != null) return String(ak);
  }

  return "";
}

export default function DataTable<TData extends AnyData, TValue = unknown>({
  data,
  columns,
  searchableKeys,
  enableRowSelection = true,
  enableColumnVisibility = true,
  enableExportCSV = true,
  defaultPageSize = 10,
  // pageSizeOptions = [10, 20, 50, 100],
  initialVisibility,
  manual = false,
  totalRows,
  onQueryChange,
  externalSearch,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialVisibility ?? {}
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Debounce search
  const [search, setSearch] = useState<string>(externalSearch ?? "");
  useEffect(() => setSearch(externalSearch ?? ""), [externalSearch]);
  useEffect(() => {
    const t = setTimeout(() => setGlobalFilter(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Inject selection column
  const selectionColumn: ColumnDef<TData, unknown> = useMemo(
    () => ({
      id: "__select__",
      header: ({ table }) => (
        <Checkbox
          aria-label="Select all"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(Boolean(v))}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(Boolean(v))}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 48, // px
      minSize: 36, // opsional
      maxSize: 60, // opsional
    }),
    []
  );

  const finalColumns = useMemo(
    () => (enableRowSelection ? [selectionColumn, ...columns] : columns),
    [enableRowSelection, selectionColumn, columns]
  );

  // Custom global filter OR across searchableKeys
  // const globalFilterFn = useMemo(() => {
  //   if (!searchableKeys || searchableKeys.length === 0) return undefined;
  //   return (row: any, _columnId: string, filterValue: string) => {
  //     if (!filterValue) return true;
  //     const q = filterValue.toLowerCase();
  //     return searchableKeys.some((k) => {
  //       const v = row.original?.[k as string];
  //       return v != null && String(v).toLowerCase().includes(q);
  //     });
  //   };
  // }, [searchableKeys]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize, // mis. 10
  });

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination, // ⬅️ gunakan state pagination terkontrol
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, // ⬅️ penting untuk server-side

    // core
    getCoreRowModel: getCoreRowModel(),
    // sorting/filtering
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // pagination
    getPaginationRowModel: getPaginationRowModel(),

    // server-side mode
    manualPagination: manual,
    manualSorting: manual,
    manualFiltering: manual,
    // ❌ manualGlobalFilter: manual,  (hapus baris ini)
    // opsional, bisa eksplisitkan
    enableGlobalFilter: true,

    // ⬇️ hitung pageCount tanpa menyentuh `table`
    pageCount: manual
      ? Math.max(
          1,
          Math.ceil((totalRows ?? 0) / (pagination.pageSize || defaultPageSize))
        )
      : undefined,

    initialState: {
      // boleh dihapus kalau sudah pakai state pagination di atas
      // pagination: { pageIndex: 0, pageSize: defaultPageSize },
    },
  });

  // Callback query (server-side)
  useEffect(() => {
    if (!manual || !onQueryChange) return;
    const { pageIndex, pageSize } = table.getState().pagination;
    onQueryChange({
      pageIndex,
      pageSize,
      sorting,
      filters: columnFilters,
      globalFilter,
    });
  }, [manual, onQueryChange, table, sorting, columnFilters, globalFilter]);

  const handleExportCSV = () => {
    const rows = table.getFilteredRowModel().rows;
    const visibleCols = table
      .getAllLeafColumns()
      .filter((c) => c.getIsVisible());
    const header = visibleCols.map((c) =>
      headerLabel(c.columnDef as ColumnDef<TData, unknown>)
    );
    const lines = [header.join(",")];

    for (const r of rows) {
      const vals = visibleCols.map((c) => {
        const id = c.id;
        const v = id ? (r.getValue(id) as unknown) : "";
        return escapeCSV(v);
      });
      lines.push(vals.join(","));
    }

    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // const totalFiltered = table.getFilteredRowModel().rows.length;
  // const selected = table.getSelectedRowModel().rows.length;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-[260px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${
                searchableKeys && searchableKeys.length
                  ? searchableKeys.join(", ")
                  : "all"
              }...`}
              className="pl-8"
            />
          </div>

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Columns3 className="h-4 w-4" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-72 w-56 overflow-auto"
              >
                {table.getAllLeafColumns().map((column) => {
                  if (column.id === "__select__") return null;
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(v) =>
                        column.toggleVisibility(Boolean(v))
                      }
                    >
                      {headerLabel(
                        column.columnDef as ColumnDef<TData, unknown>
                      ) || column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {enableExportCSV && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          )}
        </div>

        {/* <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {selected > 0 ? <span>{selected} selected •</span> : null}
          <span>
            {totalFiltered} result{totalFiltered !== 1 ? 's' : ''}
          </span>

          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* Table */}
      <div className="w-[calc(100vw-2.25rem)] md:w-auto rounded-lg border">
        {/* scroll horizontal tetap ada */}
        <div className="overflow-x-auto rounded-lg">
          {/* scroll vertical saat melebihi tinggi maks */}
          <div className="relative max-h-[70vh] overflow-y-auto rounded-lg">
            <Table className="table-auto min-w-full ">
              <TableHeader className="sticky top-0 z-10 bg-background">
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="hover:bg-transparent">
                    {hg.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="whitespace-nowrap hover:bg-transparent "
                        onClick={header.column.getToggleSortingHandler?.()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{
                          asc: " ▲",
                          desc: " ▼",
                        }[header.column.getIsSorted() as "asc" | "desc"] ??
                          null}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => onRowClick?.(row.original)}
                      className={cn(
                        onRowClick ? "" : undefined,
                        "hover:bg-muted/20"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className=""
                        >
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
                      colSpan={finalColumns.length}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
