import type { Student } from "../students/types/student";

export type DayStatus =
  | "HOLIDAY"
  | "RECORDED"
  | "NOT_RECORDED"
  | "PARTIALLY_RECORDED";

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

export type AttendanceStatus = "Present" | "Absent" | "Unmarked";

export type AttendanceSheetRow = {
  student: Student;
  status: AttendanceStatus;
  attendanceId: string | null;
};

export type CalendarDayStatus = "Present" | "Absent" | "Holiday" | "Pending";

export interface AttendanceCalendarDay {
  date: string; // yyyy-MM-dd
  status: CalendarDayStatus;
  remarks?: string | null;
}

export interface StudentAttendanceSummary {
  student: Student;

  calendar: AttendanceCalendarDay[];

  present: number;
  absent: number;
  holidays: number;

  percentage: number;

  streak: number;
}
