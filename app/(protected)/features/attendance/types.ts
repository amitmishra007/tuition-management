import type { Student } from "../students/types/student";

/**
 * Daily/month level attendance state
 */
export type DayStatus =
  | "HOLIDAY"
  | "RECORDED"
  | "NOT_RECORDED"
  | "PARTIALLY_RECORDED";

/**
 * Holiday records
 */
export interface Holiday {
  id: string;

  holiday_date: string;

  title: string;

  description: string | null;
}

/**
 * Raw attendance table row
 * Matches Supabase attendance table
 */
export interface Attendance {
  id: string;

  student_id: string;

  attendance_date: string;

  status: "Present" | "Absent";
}

/**
 * Attendance marking state
 */
export type AttendanceStatus = "Present" | "Absent" | "Unmarked";

/**
 * Attendance sheet row
 * Used while taking attendance
 */
export interface AttendanceSheetRow {
  student: Student;

  status: AttendanceStatus;

  attendanceId: string | null;
}

/**
 * Calendar rendering status
 */
export type CalendarDayStatus = "Present" | "Absent" | "Holiday" | "Pending";

/**
 * Single calendar day
 */
export interface AttendanceCalendarDay {
  /**
   * yyyy-MM-dd
   */
  date: string;

  status: CalendarDayStatus;

  remarks?: string | null;
}

/**
 * Complete attendance analytics
 * Used by StudentAttendanceCard
 */
export interface StudentAttendanceSummary {
  student: Student;

  calendar: AttendanceCalendarDay[];

  present: number;

  absent: number;

  holidays: number;

  percentage: number;

  streak: number;

  today: "Present" | "Absent" | "Holiday" | "Pending";
}

/**
 * Lookup structure for fast access
 *
 * Example:
 * attendanceMap[student.id]
 */
export type AttendanceMap = Record<string, StudentAttendanceSummary>;

/**
 * Row data used by AttendanceStudentTable
 */
export interface AttendanceRow {
  student: Student;

  present: number;

  absent: number;

  holidays: number;

  percentage: number;

  streak: number;

  lastAttendance: "Present" | "Absent" | "Holiday" | "Not Recorded";

  totalDays: number;
}

export interface AttendanceDateRange {
  from: Date;
  to: Date;
}
