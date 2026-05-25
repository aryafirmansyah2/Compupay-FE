"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { OurCard } from "@/components/custom/our-card";
import { Button } from "@/components/ui/button";
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

import type {
  LeaveRequest,
  LeaveRequestPagination,
  LeaveRequestStatus,
} from "../types";
import { getLeaveRequestColumns } from "./leave-request-columns";
import { LeaveRequestDetailModal } from "./leave-request-detail-modal";

type LeaveRequestTableProps = {
  data: LeaveRequest[];
  isLoading: boolean;
  updatingId: string | null;

  search: string;
  status: LeaveRequestStatus | "";

  pagination: LeaveRequestPagination | null;
  page: number;
  limit: number;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeaveRequestStatus | "") => void;
  onPageChange: (value: number) => void;
  onLimitChange: (value: number) => void;
  onUpdateStatus: (id: string, status: "APPROVED" | "REJECT") => void;
};

export function LeaveRequestTable({
  data,
  isLoading,
  updatingId,
  search,
  status,
  pagination,
  page,
  limit,
  onSearchChange,
  onStatusChange,
  onPageChange,
  onLimitChange,
  onUpdateStatus,
}: LeaveRequestTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [selectedLeaveRequest, setSelectedLeaveRequest] =
    useState<LeaveRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (leaveRequest: LeaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsDetailOpen(true);
  };

  const columns = useMemo(
    () =>
      getLeaveRequestColumns({
        updatingId,
        onViewDetail: handleViewDetail,
        onUpdateStatus,
      }),
    [updatingId, onUpdateStatus],
  );

  const filteredByStatusData = useMemo(() => {
    if (!status) return data;

    return data.filter((item) => item.status === status);
  }, [data, status]);

  const table = useReactTable({
    data: filteredByStatusData,
    columns,
    manualPagination: true,
    pageCount: pagination?.totalPages ?? 1,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: search,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: (value) => {
      onSearchChange(String(value));
    },

    globalFilterFn: (row, _columnId, filterValue) => {
      const keyword = String(filterValue).toLowerCase().trim();

      if (!keyword) return true;

      const item = row.original;

      const searchableText = [
        item.users?.full_name,
        item.users?.email,
        item.users?.employee_number,
        item.type,
        item.status,
        item.reason,
        item.startDate,
        item.endDate,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filteredRows = table.getFilteredRowModel().rows;

  const totalPages = pagination?.totalPages ?? 1;
  const totalItems = pagination?.totalItems ?? data.length;
  const currentPage = pagination?.currentpage ?? page;
  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  return (
    <>
      <OurCard
        title="Leave Request"
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <InputGroup className="w-full sm:w-[300px]">
              <InputGroupInput
                placeholder="Search employee, email, type, status..."
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <select
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as LeaveRequestStatus | "")
              }
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECT">Reject</option>
            </select>
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
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Loading leave request...
                  </TableCell>
                </TableRow>
              ) : filteredRows.length ? (
                filteredRows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-muted/40"
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

        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredRows.length}
            </span>{" "}
            of <span className="font-medium text-foreground">{totalItems}</span>{" "}
            leave requests
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Rows per page</p>

              <select
                value={limit}
                onChange={(event) => {
                  onLimitChange(Number(event.target.value));
                  onPageChange(1);
                }}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={!canPreviousPage || isLoading}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                disabled={!canNextPage || isLoading}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </OurCard>

      <LeaveRequestDetailModal
        data={selectedLeaveRequest}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  );
}
