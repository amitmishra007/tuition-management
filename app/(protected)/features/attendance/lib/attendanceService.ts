import { supabase } from "@/lib/supabase/client";
import type { Student } from "@/app/(protected)/features/students/types/student";
import type { Database } from "@/types/db";

/* ================= TYPES ================= */

type AttendanceRow = Database["public"]["Tables"]["attendance"]["Row"];

export type HolidayRow = Database["public"]["Tables"]["holidays"]["Row"];

type AttendanceSheetRow = {
  student: Student;
  status: "Present" | "Absent";
  attendanceId: string | null;
};

export type DayData =
  | {
      status: "HOLIDAY";
      holiday: HolidayRow;
    }
  | {
      status: "RECORDED";
      sheet: AttendanceSheetRow[];
    }
  | {
      status: "NOT_RECORDED";
      sheet: AttendanceSheetRow[];
    };

/* ================= MAIN FUNCTION ================= */

export async function getAttendanceSheet(date: string): Promise<DayData> {
  const [studentsRes, attendanceRes, holidayRes] = await Promise.all([
    supabase.from("students").select("*"),
    supabase.from("attendance").select("*").eq("attendance_date", date),
    supabase
      .from("holidays")
      .select("*")
      .eq("holiday_date", date)
      .maybeSingle(),
  ]);

  const students = (studentsRes.data || []) as Student[];
  const attendance = (attendanceRes.data || []) as AttendanceRow[];
  const holiday = holidayRes.data;

  if (holiday) {
    return {
      status: "HOLIDAY",
      holiday,
    };
  }

  const attendanceMap = new Map(attendance.map((a) => [a.student_id, a]));

  const sheet: AttendanceSheetRow[] = students.map((student) => {
    const record = attendanceMap.get(student.id);

    return {
      student,
      status: record?.status ?? "Absent",
      attendanceId: record?.id ?? null,
    };
  });

  return {
    status: attendance.length ? "RECORDED" : "NOT_RECORDED",
    sheet,
  };
}
