import type { Student } from "../students/types/student";

export type DayStatus = "HOLIDAY" | "RECORDED" | "NOT_RECORDED";

export interface Holiday {
  id: string;
  holiday_date: string;
  title: string;
  description: string | null;
}

export interface Attendance {
  id: string;
  student_id: string;
  attendance_date: string;
  status: "Present" | "Absent";
}

export type AttendanceSheetRow = {
  student: Student;
  status: "Present" | "Absent";
  attendanceId: string | null;
};
