"use client";

import { format } from "date-fns";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  FileText,
  ImageIcon,
  Mail,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { LeaveRequest } from "../types";
import { LeaveRequestStatusBadge } from "./leave-request-status-badge";

type LeaveRequestDetailModalProps = {
  data: LeaveRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatDate(value?: string) {
  if (!value) return "-";

  return format(new Date(value), "dd-MM-yyyy");
}

function getAttachmentUrl(attachment: string | null) {
  if (!attachment) return null;

  if (attachment.startsWith("http")) {
    return attachment;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const staticBaseUrl = baseUrl.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");

  const cleanAttachment = attachment.replace(/^\//, "");

  return `${staticBaseUrl}/${cleanAttachment}`;
}

function getAttachmentType(attachment: string | null) {
  if (!attachment) return "unknown";

  const cleanUrl = attachment.split("?")[0].toLowerCase();

  if (cleanUrl.endsWith(".pdf")) return "pdf";

  if (
    cleanUrl.endsWith(".jpg") ||
    cleanUrl.endsWith(".jpeg") ||
    cleanUrl.endsWith(".png") ||
    cleanUrl.endsWith(".webp") ||
    cleanUrl.endsWith(".gif")
  ) {
    return "image";
  }

  return "unknown";
}

function getFileName(attachment: string | null) {
  if (!attachment) return "-";

  const cleanPath = attachment.split("?")[0];
  return cleanPath.split("/").pop() || attachment;
}

function DetailItem({
  icon: Icon,
  label,
  value,
  breakValue = false,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
  breakValue?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3">
      <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>

      <p
        className={`text-sm font-semibold text-foreground ${
          breakValue ? "break-all leading-relaxed" : "truncate"
        }`}
      >
        {value || "-"}
      </p>
    </div>
  );
}

function AttachmentReview({ attachment }: { attachment: string | null }) {
  const attachmentUrl = getAttachmentUrl(attachment);
  const attachmentType = getAttachmentType(attachment);
  const fileName = getFileName(attachment);

  if (!attachmentUrl) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>

          <div>
            <p className="text-sm font-semibold">Tidak ada lampiran</p>
            <p className="text-xs text-muted-foreground">
              Karyawan tidak mengunggah file pendukung.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isImage = attachmentType === "image";
  const isPdf = attachmentType === "pdf";

  const label = isPdf
    ? "Review PDF"
    : isImage
      ? "Review Gambar"
      : "Review File";

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
            {isImage ? (
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <FileText className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold">
              {isPdf
                ? "PDF Attachment"
                : isImage
                  ? "Image Attachment"
                  : "File Attachment"}
            </p>

            <p className="truncate text-xs text-muted-foreground">{fileName}</p>

            <p className="mt-1 text-[11px] text-muted-foreground">
              Dibuka di tab baru untuk review.
            </p>
          </div>
        </div>

        <Button asChild size="sm" className="shrink-0">
          <a href={attachmentUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" />
            {label}
          </a>
        </Button>
      </div>
    </div>
  );
}

export function LeaveRequestDetailModal({
  data,
  open,
  onOpenChange,
}: LeaveRequestDetailModalProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[760px] overflow-hidden p-0 sm:rounded-2xl">
        <DialogHeader className="border-b bg-background px-6 py-5">
          <div className="flex flex-col gap-4 pr-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Detail Surat Izin
              </DialogTitle>

              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Informasi pengajuan izin karyawan dan lampiran pendukung.
              </p>
            </div>

            <div className="shrink-0">
              <LeaveRequestStatusBadge status={data.status} />
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[calc(90vh-96px)] overflow-y-auto bg-muted/10 px-6 py-5">
          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Employee
                  </p>

                  <h3 className="mt-1 truncate text-xl font-bold">
                    {data.users?.full_name || "-"}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {data.users?.employee_number || "-"}
                  </p>
                </div>

                <div className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  {data.type}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={data.users?.email}
                  breakValue
                />

                <DetailItem icon={User} label="Role" value={data.users?.role} />

                <DetailItem
                  icon={BriefcaseBusiness}
                  label="Leave Type"
                  value={data.type}
                />

                <DetailItem
                  icon={BadgeCheck}
                  label="Request ID"
                  value={data.id}
                  breakValue
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={CalendarDays}
                label="Start Date"
                value={formatDate(data.startDate)}
              />

              <DetailItem
                icon={CalendarDays}
                label="End Date"
                value={formatDate(data.endDate)}
              />
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <p className="mb-2 text-sm font-semibold">Reason</p>

              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {data.reason || "-"}
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Attachment</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Klik tombol review untuk membuka lampiran di tab baru.
                  </p>
                </div>

                <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
              </div>

              <AttachmentReview attachment={data.attachment} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
