import { supabase } from "@/lib/supabase/client";

import type { Student } from "../../students/types/student";

export interface AttendanceRecord {
  id: string;
  student_id: string;
  attendance_date: string;
  status: "Present" | "Absent";
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export interface HolidayRecord {
  id: string;
  date: string;
  title: string;
  description: string | null;
}

export interface AttendanceDashboardData {
  students: Student[];
  attendance: AttendanceRecord[];
  holidays: HolidayRecord[];
}

export async function getAttendanceDashboard(
  year: number,
  month: number,
): Promise<AttendanceDashboardData> {
  const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;

  const lastDay = new Date(year, month, 0).getDate();

  const monthEnd = `${year}-${String(month).padStart(2, "0")}-${String(
    lastDay,
  ).padStart(2, "0")}`;

  const [
    { data: students, error: studentError },
    { data: attendance, error: attendanceError },
    { data: holidays, error: holidayError },
  ] = await Promise.all([
    supabase
      .from("students")
      .select("*")
      .order("firstName", { ascending: true }),

    supabase
      .from("attendance")
      .select("*")
      .gte("attendance_date", monthStart)
      .lte("attendance_date", monthEnd)
      .order("attendance_date", { ascending: true }),

    supabase
      .from("holidays")
      .select("*")
      .gte("date", monthStart)
      .lte("date", monthEnd)
      .order("date", { ascending: true }),
  ]);

  if (studentError) throw studentError;
  if (attendanceError) throw attendanceError;
  if (holidayError) throw holidayError;

  return {
    students: (students ?? []) as Student[],
    attendance: (attendance ?? []) as AttendanceRecord[],
    holidays: (holidays ?? []) as HolidayRecord[],
  };
}
