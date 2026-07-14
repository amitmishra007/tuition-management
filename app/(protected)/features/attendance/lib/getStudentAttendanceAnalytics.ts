import { supabase } from "@/lib/supabase/client";

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

export interface StudentAttendanceAnalyticsRaw {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    studentClass: string | null;
    batch: string | null;
    profilePhoto: string | null;
  };

  attendance: AttendanceRecord[];

  holidays: HolidayRecord[];
}

export async function getStudentAttendanceAnalytics(
  studentId: string,
  year: number,
  month: number,
): Promise<StudentAttendanceAnalyticsRaw> {
  const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;

  const monthEnd = `${year}-${String(month).padStart(2, "0")}-31`;

  const [
    { data: student, error: studentError },
    { data: attendance, error: attendanceError },
    { data: holidays, error: holidayError },
  ] = await Promise.all([
    supabase
      .from("students")
      .select(
        `
          id,
          firstName,
          lastName,
          studentClass,
          batch,
          profilePhoto
        `,
      )
      .eq("id", studentId)
      .single(),

    supabase
      .from("attendance")
      .select("*")
      .eq("student_id", studentId)
      .gte("attendance_date", monthStart)
      .lte("attendance_date", monthEnd)
      .order("attendance_date"),

    supabase
      .from("holidays")
      .select("*")
      .gte("date", monthStart)
      .lte("date", monthEnd)
      .order("date"),
  ]);

  if (studentError) throw studentError;
  if (attendanceError) throw attendanceError;
  if (holidayError) throw holidayError;

  return {
    student,
    attendance: attendance ?? [],
    holidays: holidays ?? [],
  };
}
