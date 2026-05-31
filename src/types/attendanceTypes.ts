import type { User } from "./userTypes";

export type AttendanceType = "CHECK_IN" | "CHECK_OUT";

export type AttendanceStatus = "ON_TIME" | "LATE" | "EARLY" | "PENDING";

export type AttendancePointRecord = {
  id: string;
  attendanceId: string;
  point: number;
  created_at?: string;
  updated_at?: string;
};

export type Attendance = {
  id: string;
  employeeId: string;
  type: AttendanceType;
  status: AttendanceStatus;
  datetime_log: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  photo_url?: string | null;
  users?: User | null;
  pointRecord?: AttendancePointRecord | null;
  created_at?: string;
  updated_at?: string;
};
