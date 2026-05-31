import type { User } from "./userTypes";

export type PayrollStatus = "PENDING" | "PAID";

export type PayrollType = "MONTHLY";

export type Payroll = {
  id: string;
  ref_no: string;
  user_id: string;
  date_from: string;
  date_to: string;
  type: PayrollType;
  status: PayrollStatus;
  salary: number;
  allowance_amount: number;
  deductions: number;
  net: number;
  paid_at?: string | null;
  paid_by?: string | null;
  employee?: User | null;
  payer?: User | null;
  created_at?: string;
  updated_at?: string;
};
