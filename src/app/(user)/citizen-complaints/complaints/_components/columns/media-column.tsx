// columns/media-column.tsx
"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Play, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

// -- Tipe baris kamu (samakan dengan di proyek)
export type UserRow = {
  id: string;
  control: boolean;
  time: string;
  name: string;
  location: string;
  status: string;
  tags: { hash_tag: string }[];
  opd: { name: string; short_name: string }[];
  situation: string;
  media: {
    url: string;
    type: "image" | "video" | "gif";
    caption?: string;
    originalUrl?: string;
  }[];
};

// Tambahkan helper baru (di atas MediaCell)

function StackedMediaThumb({
  items,
  onClick,
}: {
  items: UserRow["media"];
  onClick: () => void;
}) {
  const first = items[0];
  const count = items.length;
  const isImage = first.type === "image" || first.type === "gif";

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-16 w-16 overflow-hidden rounded-md ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      title={first.caption || first.type}
      aria-label={
        count > 1 ? `Open media gallery, ${count} items` : "Open media"
      }
    >
      {isImage ? (
        <img
          src={first.url}
          alt={first.caption || "media"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="relative grid h-full w-full place-items-center bg-muted/40 cursor-pointer">
          <video
            src={first.url}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            muted
            preload="metadata"
          />
          <Play className="relative h-6 w-6 text-foreground" />
        </div>
      )}

      {count > 1 && (
        <div className="absolute inset-0 grid place-items-center bg-black/50 cursor-pointer">
          <span className="text-xs font-medium text-white">+{count - 1}</span>
        </div>
      )}
    </button>
  );
}

function MediaViewer({
  items,
  open,
  index,
  onOpenChange,
  onIndexChange,
}: {
  items: UserRow["media"];
  open: boolean;
  index: number;
  onOpenChange: (v: boolean) => void;
  onIndexChange: (i: number) => void;
}) {
  const item = items[index];

  const goPrev = () => onIndexChange((index - 1 + items.length) % items.length);
  const goNext = () => onIndexChange((index + 1) % items.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start gap-4">
            <span>Media Preview</span>
            <span className="text-xs text-muted-foreground">
              {index + 1} / {items.length}
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Preview media evidence
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={goPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="relative max-h-[70vh] flex-1 overflow-hidden rounded-lg bg-black/5 p-2">
            {item?.type === "image" || item?.type === "gif" ? (
              <img
                src={item.url}
                alt={item.caption || "media"}
                className="mx-auto max-h-[66vh] w-auto rounded-md object-contain"
              />
            ) : (
              <video
                src={item.url}
                className="mx-auto max-h-[66vh] w-auto rounded-md"
                controls
                preload="metadata"
              />
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goNext}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {item?.caption ? (
          <div className="mt-1 text-sm text-muted-foreground">
            {item.caption}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

// Cell untuk kolom media
export function MediaCell({ items }: { items: UserRow["media"] }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openViewerAt = (i: number) => {
    setActiveIndex(i);
    setOpen(true);
  };

  if (!items || items.length === 0) {
    return (
      <Badge
        variant="outline"
        className="bg-muted text-muted-foreground border-none"
      >
        <ImageIcon className="mr-1 h-4 w-4" />
        No media
      </Badge>
    );
  }

  // Selalu tampilkan 1 kotak saja.
  return (
    <div className="flex items-center gap-2">
      <StackedMediaThumb items={items} onClick={() => openViewerAt(0)} />

      <MediaViewer
        items={items}
        open={open}
        index={activeIndex}
        onOpenChange={setOpen}
        onIndexChange={setActiveIndex}
      />
    </div>
  );
}
