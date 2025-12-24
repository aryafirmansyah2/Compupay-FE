"use client";
import { OurCard } from "@/components/custom/our-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowDownToLine, ListFilterPlus, Plus, Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import DialogFormDeduction from "./_components/dialog-form-deduction";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { columnsDeduction } from "./_components/column-table-deduction";
import { columnsEmployeeDeduction } from "./_components/column-table-employee-deduction";
// import { deduction, employeeDeduction } from "./_data/allawance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import DialogFormEmployeeDeduction from "./_components/dialog-form-employee-deduction";
import request from "@/utils/request";
import toast from "react-hot-toast";
import DeleteToastConfirm from "@/components/custom/our-toast";

export default function DeductionPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [tabsValue, setTabsValue] = useState("employeeDeduction");

  const [employeeDeduction, setEmployeeDeduction] = useState([]);
  const [deduction, setDeduction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (tabsValue === "employeeDeduction") {
        const res = await request.get(`/employeeDeduction?search=${search}`);
        // Check if the data has actually changed before updating the state
        setEmployeeDeduction(res.data.data);
      } else if (tabsValue === "deduction") {
        const res = await request.get(`/deduction?search=${search}`);
        // Check if the data has actually changed before updating the state
        setDeduction(res.data.data);
      }
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }, [search, tabsValue]); // Use search as dependency to refetch when the search value changes

  // UseEffect to trigger fetchData on search change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // Adding debounce delay of 500ms to avoid multiple calls while typing

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce on search change
  }, [search, fetchData]);

  useEffect(() => {
    setSearch("");
    tableEmployeeDeduction.setPageIndex(0);
    tableDeduction.setPageIndex(0);
  }, [tabsValue]);

  const handleDelete = (id: string, deduction: string): void => {
    toast(
      (t) => (
        <DeleteToastConfirm
          t={t}
          itemName={deduction}
          onConfirm={async () => {
            if (tabsValue === "employeeDeduction") {
              await request.delete(`/employeeDeduction/${id}`, {});
            } else if (tabsValue === "deduction") {
              await request.delete(`/deduction/${id}`, {});
            }

            fetchData();
          }}
        />
      ),
      {
        duration: 8000,
        position: "top-center",
      }
    );
  };

  const tableEmployeeDeduction = useReactTable({
    data: employeeDeduction, // Mengambil data berdasarkan tabsValue
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
    data: deduction, // Mengambil data berdasarkan tabsValue
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

  const tabs = [
    {
      name: "Employee deduction",
      value: "employeeDeduction",
      content: (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table className="table-auto">
              <TableHeader>
                {tableEmployeeDeduction.getHeaderGroups().map((headerGroup) => (
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
                {tableEmployeeDeduction.getRowModel().rows?.length ? (
                  tableEmployeeDeduction.getRowModel().rows.map((row) => (
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
                      colSpan={columnsEmployeeDeduction.length}
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
                {tableDeduction.getRowModel().rows?.length ? (
                  tableDeduction.getRowModel().rows.map((row) => (
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
                    <TableCell colSpan={3} className="h-24 text-center">
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

  console.log(tabsValue);
  return (
    <section className=" grid gap-4  md:grid-cols-3  w-full">
      <OurCard
        title="Deduction"
        action={
          <div className="flex gap-4">
            <InputGroup className="w-full">
              <InputGroupInput
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search value
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
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
            {/* <div className="flex gap-4">
              <Button variant="outline">
                <ListFilterPlus className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline">
                <ArrowDownToLine className="mr-2 h-4 w-4" /> Export
              </Button>
            </div> */}
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
