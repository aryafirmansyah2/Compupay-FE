import type { Department } from "./departmentTypes";
import type { Position } from "./positionTypes";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export type UserStatus = "ACTIVE" | "INACTIVE";

export type User = {
  id: string;
  employee_number: string;
  full_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  join_date: string;
  department_id: string;
  position_id: string;
  salary: number;
  profile_uri?: string | null;
  department?: Department | null;
  position?: Position | null;
  created_at?: string;
  updated_at?: string;
};

export type UserFormPayload = {
  employee_number: string;
  full_name: string;
  email: string;
  password?: string;
  role: UserRole;
  status?: UserStatus;
  join_date: string | Date;
  department_id: string;
  position_id: string;
  salary: number;
};
