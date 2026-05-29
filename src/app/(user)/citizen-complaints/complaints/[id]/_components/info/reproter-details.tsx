import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/custom/our-table";

import { Button } from "@/components/ui/button";
import { useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Clipboard, Pencil } from "lucide-react";

function ReproterDetails() {
  const data = [
    {
      label: "Name",
      value: "Kevin Irawan Daniswara",
    },
    {
      label: "Gender",
      value: "Pria",
    },
    {
      label: "No. Telephone",
      value: "6285159436455",
    },
  ];
  return (
    <div className="flex flex-col gap-4 text-balance leading-relaxed">
      <Card className="border">
        <CardHeader className="px-4 py-2 bg-muted/50 data-[state=open]:border-b rounded-t-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base sm:text-lg">Profile</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 ">
          <Table className=" w-full">
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant={"default"} size={"icon"} className="">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant={"outline"} size={"icon"} className="">
                        <Clipboard className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReproterDetails;
