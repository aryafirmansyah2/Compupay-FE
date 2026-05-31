import type { Attendance } from "./attendanceTypes";

export type PointRecord = {
  id: string;
  attendanceId: string;
  point: number;
  attendance?: Attendance | null;
  created_at: string;
  updated_at: string;
};
