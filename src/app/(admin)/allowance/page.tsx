"use client";
import { OurCard } from "@/components/custom/our-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowDownToLine, ListFilterPlus, Plus, Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import DialogFormAllowance from "./_components/dialog-form-allowance";
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
import { columnsAllowance } from "./_components/column-table-allowance";
import { columnsEmployeeAllowance } from "./_components/column-table-employee-allowance";
// import { allowance, employeeAllowance } from "./_data/allawance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import DialogFormEmployeeAllowance from "./_components/dialog-form-employee-allowance";
import request from "@/utils/request";
import toast from "react-hot-toast";
import DeleteToastConfirm from "@/components/custom/our-toast";

export default function AllowancePage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [tabsValue, setTabsValue] = useState("employeeAllowance");

  const [employeeAllowance, setEmployeeAllowance] = useState([]);
  const [allowance, setAllowance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (tabsValue === "employeeAllowance") {
        const res = await request.get(`/employeeAllowance?search=${search}`);
        // Check if the data has actually changed before updating the state
        setEmployeeAllowance(res.data.data);
      } else if (tabsValue === "allowance") {
        const res = await request.get(`/allowances?search=${search}`);
        // Check if the data has actually changed before updating the state
        setAllowance(res.data.data);
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
    tableEmployeeAllowance.setPageIndex(0);
    tableAllowance.setPageIndex(0);
  }, [tabsValue]);

  const handleDelete = (id: string, allowance: string): void => {
    toast(
      (t) => (
        <DeleteToastConfirm
          t={t}
          itemName={allowance}
          onConfirm={async () => {
            await request.delete(`/allowances/${id}`, {});
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

  const tableEmployeeAllowance = useReactTable({
    data: employeeAllowance, // Mengambil data berdasarkan tabsValue
    columns: columnsEmployeeAllowance(fetchData, handleDelete),

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

  const tableAllowance = useReactTable({
    data: allowance, // Mengambil data berdasarkan tabsValue
    columns: columnsAllowance(fetchData, handleDelete),

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
      name: "Employee allowance",
      value: "employeeAllowance",
      content: (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table className="table-auto">
              <TableHeader>
                {tableEmployeeAllowance.getHeaderGroups().map((headerGroup) => (
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
                {tableEmployeeAllowance.getRowModel().rows?.length ? (
                  tableEmployeeAllowance.getRowModel().rows.map((row) => (
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
                      colSpan={columnsEmployeeAllowance.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={tableEmployeeAllowance} />
        </>
      ),
    },
    {
      name: "Allowance",
      value: "allowance",
      content: (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table className="table-auto">
              <TableHeader>
                {tableAllowance.getHeaderGroups().map((headerGroup) => (
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
                {tableAllowance.getRowModel().rows?.length ? (
                  tableAllowance.getRowModel().rows.map((row) => (
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
          <DataTablePagination table={tableAllowance} />
        </>
      ),
    },
  ];

  console.log(tabsValue);
  return (
    <section className=" grid gap-4  md:grid-cols-3  w-full">
      <OurCard
        title="Allowance"
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
            {tabsValue === "employeeAllowance" && (
              <DialogFormEmployeeAllowance type="create" fetchData={fetchData}>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Employee Allowance
                </Button>
              </DialogFormEmployeeAllowance>
            )}
            {tabsValue === "allowance" && (
              <DialogFormAllowance type="create" fetchData={fetchData}>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Allowance
                </Button>
              </DialogFormAllowance>
            )}
          </div>
        }
        size="fill"
        className="col-span-full md:col-span-3"
      >
        <Tabs
          defaultValue="employeeAllowance"
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
