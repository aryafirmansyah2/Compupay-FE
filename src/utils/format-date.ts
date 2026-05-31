import { format } from "date-fns";

export function formatDateTime(value?: string | Date | null) {
  if (!value) return "-";

  return format(new Date(value), "dd MMM yyyy • HH:mm");
}

export function formatDateOnly(value?: string | Date | null) {
  if (!value) return "-";

  return format(new Date(value), "dd MMM yyyy");
}
