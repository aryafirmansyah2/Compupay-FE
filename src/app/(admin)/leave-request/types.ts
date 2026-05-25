export type LeaveRequestStatus = "PENDING" | "APPROVED" | "REJECT";

export type LeaveRequestType = "CUTI" | "SAKIT" | "IZIN";

export type LeaveRequestUser = {
  id: string;
  employee_number: string;
  full_name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
};

export type LeaveRequest = {
  id: string;
  user_id: string;
  type: LeaveRequestType;
  startDate: string;
  endDate: string;
  reason: string;
  attachment: string | null;
  status: LeaveRequestStatus;
  created_at: string;
  updated_at: string;
  users: LeaveRequestUser;
};

export type LeaveRequestPagination = {
  totalItems: number;
  totalPages: number;
  currentpage: number;
  itemsPerPage: number;
};

export type LeaveRequestResponse = {
  code: number;
  status: string;
  message: string;
  pagination: LeaveRequestPagination;
  data: LeaveRequest[];
  errors: unknown;
};

export type LeaveRequestDetailResponse = {
  code: number;
  status: string;
  message: string;
  data: LeaveRequest;
  errors: unknown;
};
