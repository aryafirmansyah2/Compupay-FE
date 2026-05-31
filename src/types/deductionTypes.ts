import type { User } from "./userTypes";

export type Deduction = {
  id: string;
  deduction: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type EmployeeDeduction = {
  id: string;
  user_id: string;
  deduction_id: string;
  type: "MONTHLY";
  amount: number;
  effective_date: string;
  user?: User | null;
  deduction?: Deduction | null;
  created_at?: string;
  updated_at?: string;
};
