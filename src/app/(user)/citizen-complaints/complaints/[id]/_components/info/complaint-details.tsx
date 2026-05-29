"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Clipboard, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { object } from "zod";
import TagsInput from "@/components/ui/tags-input";

// Pastikan path ini sesuai dengan lokasimu:
// kalau file map ada di src/components/map/index.tsx -> pakai "@/components/map"
const Map = dynamic(() => import("@/components/ui/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

/* ===========================
   Types
=========================== */
type RowText = {
  type: "text";
  label: string;
  value: string;
  isAction?: boolean;
};

type RowLabels = {
  type: "label";
  label: string;
  value: string[];
  isAction?: boolean;
};

type RowMap = {
  type: "maps";
  label: string;
  value: [number, number]; // Lat, Lng
  isAction?: boolean;
};

type RowImage = {
  type: "image";
  label: string;
  value: string; // src url
  isAction?: boolean;
};

type Row = RowText | RowLabels | RowMap | RowImage;

/* ===========================
   Component
=========================== */
export default function ComplaintDetails() {
  const [tags, setTags] = useState<string[]>(["Apple", "Banana"]);

  const data: Row[] = [
    {
      type: "text",
      label: "Report Contents",
      value: "Kevin Irawan Daniswara",
      isAction: true,
    },
    {
      type: "label",
      label: "Tags/Hashtags",
      value: tags,
      isAction: true,
    },
    {
      type: "text",
      label: "Location of the Incident",
      value: "Menteng Jakarta Pusat",
      isAction: true,
    },
    { type: "text", label: "Date of Incident", value: "2025-10-04" },
    { type: "text", label: "Village/Sub-district", value: "Menteng" },
    { type: "text", label: "Sub-district", value: "Menteng" },
    { type: "text", label: "Regency", value: "Jakarta Pusat" },
    {
      type: "maps",
      label: "Map of Incident Location",
      value: [-6.1962, 106.8326],
    }, // contoh koordinat Menteng
    {
      type: "image",
      label: "Evidence of Incident",
      value: "/assets/provinsi/Gorontalo.png",
    },
  ];

  const handleCopy = useCallback((row: Row) => {
    let text = "";
    switch (row.type) {
      case "text":
        text = row.value;
        break;
      case "label":
        text = row.value.join(", ");
        break;
      case "maps":
        text = `${row.value[0]}, ${row.value[1]}`;
        break;
      case "image":
        text = row.value;
        break;
    }
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
  }, []);

  const handleEdit = useCallback((row: Row) => {
    // TODO: sambungkan ke modal/edit form yang kamu punya
    // sementara log aja
    console.log("Edit row:", row);
  }, []);

  return (
    <div className="flex flex-col gap-4 leading-relaxed">
      <Card className="border">
        <CardHeader className="px-4 py-2 bg-muted/50 data-[state=open]:border-b rounded-t-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base sm:text-lg">Profile</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <Table className="w-full">
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={`${item.label}-${index}`}>
                  {/* Label */}
                  <TableCell className="whitespace-nowrap align-top w-[220px] font-medium text-muted-foreground">
                    {item.label}
                  </TableCell>

                  {/* Value cell */}
                  <TableCell className="align-top">
                    {item.type === "label" && (
                      <div className="flex flex-wrap gap-2">
                        <TagsInput value={tags} onChange={setTags} />
                      </div>
                    )}

                    {item.type === "maps" && (
                      // MapContainer perlu parent dengan tinggi tetap
                      <div className="h-64 w-full overflow-hidden rounded-md border">
                        <Map posix={item.value} zoom={14} />
                      </div>
                    )}

                    {item.type === "image" && (
                      <div className="w-full max-w-sm overflow-hidden rounded-md border">
                        {/* Pakai next/image kalau mau optimasi */}
                        {/* <Image
                          src={item.value}
                          alt="Evidence of Incident"
                          // placeholder="blur"
                          quality={100}
                          fill
                          sizes="100vw"
                          style={{ objectFit: "none" }}
                        /> */}
                        <Image
                          alt="Mountains"
                          src={item.value}
                          width={700}
                          height={475}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    )}

                    {item.type === "text" && <span>{item.value}</span>}
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="align-top w-[120px]">
                    <div className="flex gap-2">
                      {item.isAction && (
                        <>
                          <Button
                            variant="default"
                            size="icon"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleCopy(item)}
                            title="Copy"
                          >
                            <Clipboard className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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
