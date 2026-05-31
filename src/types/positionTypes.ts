import type { Department } from "./departmentTypes";

export type Position = {
  id: string;
  name: string;
  department_id: string;
  department?: Department | null;
  created_at?: string;
  updated_at?: string;
};
