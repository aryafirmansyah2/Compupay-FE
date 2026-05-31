import type { User } from "./userTypes";

export type Allowance = {
  id: string;
  allowance: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type EmployeeAllowance = {
  id: string;
  user_id: string;
  allowance_id: string;
  type: "MONTHLY";
  amount: number;
  effective_date: string;
  user?: User | null;
  allowance?: Allowance | null;
  created_at?: string;
  updated_at?: string;
};
