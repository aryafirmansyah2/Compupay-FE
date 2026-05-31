"use client";

import { OurCard } from "@/components/custom/our-card";
import DeleteToastConfirm from "@/components/custom/our-toast";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import request from "@/utils/request";
import DialogFormDeduction from "./_components/dialog-form-deduction";
import DialogFormEmployeeDeduction from "./_components/dialog-form-employee-deduction";
import { columnsDeduction } from "./_components/column-table-deduction";
import { columnsEmployeeDeduction } from "./_components/column-table-employee-deduction";

export default function DeductionPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [tabsValue, setTabsValue] = useState("employeeDeduction");

  const [employeeDeduction, setEmployeeDeduction] = useState([]);
  const [deduction, setDeduction] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      if (tabsValue === "employeeDeduction") {
        const res = await request.get("/employeeDeduction", {
          search,
        });

        setEmployeeDeduction(res.data.data || []);
      }

      if (tabsValue === "deduction") {
        const res = await request.get("/deduction", {
          search,
        });

        setDeduction(res.data.data || []);
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.errors?.message ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch deduction data",
      );
    } finally {
      setIsLoading(false);
    }
  }, [search, tabsValue]);

  const handleDelete = (id: string, deductionName: string): void => {
    toast(
      (t) => (
        <DeleteToastConfirm
          t={t}
          entityName={
            tabsValue === "employeeDeduction"
              ? "employee deduction"
              : "deduction"
          }
          itemName={deductionName}
          onConfirm={async () => {
            const loading = toast.loading("Deleting data...");

            try {
              if (tabsValue === "employeeDeduction") {
                await request.delete(`/employeeDeduction/${id}`);
              } else {
                await request.delete(`/deduction/${id}`);
              }

              toast.success("Data deleted successfully", {
                id: loading,
              });

              fetchData();
            } catch (err: any) {
              toast.error(
                err?.response?.data?.errors?.message ||
                  err?.response?.data?.message ||
                  "Failed to delete data",
                {
                  id: loading,
                },
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
  };

  const tableEmployeeDeduction = useReactTable({
    data: employeeDeduction,
    columns: columnsEmployeeDeduction(fetchData, handleDelete),

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

  const tableDeduction = useReactTable({
    data: deduction,
    columns: columnsDeduction(fetchData, handleDelete),

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchData]);

  useEffect(() => {
    setSearch("");
    tableEmployeeDeduction.setPageIndex(0);
    tableDeduction.setPageIndex(0);
  }, [tabsValue, tableEmployeeDeduction, tableDeduction]);

  const tabs = [
    {
      name: "Employee Deduction",
      value: "employeeDeduction",
      content: (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table className="table-auto">
              <TableHeader>
                {tableEmployeeDeduction.getHeaderGroups().map((headerGroup) => (
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
                      colSpan={tableEmployeeDeduction.getAllColumns().length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Loading employee deduction...
                    </TableCell>
                  </TableRow>
                ) : tableEmployeeDeduction.getRowModel().rows?.length ? (
                  tableEmployeeDeduction.getRowModel().rows.map((row) => (
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
                      colSpan={tableEmployeeDeduction.getAllColumns().length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination table={tableEmployeeDeduction} />
        </>
      ),
    },
    {
      name: "Deduction",
      value: "deduction",
      content: (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table className="table-auto">
              <TableHeader>
                {tableDeduction.getHeaderGroups().map((headerGroup) => (
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
                      colSpan={tableDeduction.getAllColumns().length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Loading deduction...
                    </TableCell>
                  </TableRow>
                ) : tableDeduction.getRowModel().rows?.length ? (
                  tableDeduction.getRowModel().rows.map((row) => (
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
                      colSpan={tableDeduction.getAllColumns().length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination table={tableDeduction} />
        </>
      ),
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3 w-full">
      <OurCard
        title="Deduction"
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

            {tabsValue === "employeeDeduction" && (
              <DialogFormEmployeeDeduction type="create" fetchData={fetchData}>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Employee Deduction
                </Button>
              </DialogFormEmployeeDeduction>
            )}

            {tabsValue === "deduction" && (
              <DialogFormDeduction type="create" fetchData={fetchData}>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Deduction
                </Button>
              </DialogFormDeduction>
            )}
          </div>
        }
        size="fill"
        className="col-span-full md:col-span-3"
      >
        <Tabs
          defaultValue="employeeDeduction"
          onValueChange={setTabsValue}
          className="gap-4"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1 px-2.5 sm:px-3"
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </OurCard>
    </section>
  );
}
