import type { User } from "./userTypes";

export type LeaveRequestType = "CUTI" | "SAKIT";

export type LeaveRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type LeaveRequest = {
  id: string;
  user_id: string;
  type: LeaveRequestType;
  startDate: string;
  endDate: string;
  reason: string;
  attachment?: string | null;
  status: LeaveRequestStatus;
  user?: User | null;
  created_at?: string;
  updated_at?: string;
};
