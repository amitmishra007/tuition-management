import { supabase } from "@/lib/supabase/client";

import { buildAttendanceAnalytics } from "./attendanceAnalytics";

export interface StudentAttendanceCard {
  id: string;

  firstName: string;
  lastName: string;

  studentClass: string | null;
  batch: string | null;

  profilePhoto: string | null;

  analytics: ReturnType<typeof buildAttendanceAnalytics>;
}

export async function getAttendanceDashboard(
  year: number,
  month: number,
): Promise<StudentAttendanceCard[]> {
  const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;

  const monthEnd = `${year}-${String(month).padStart(2, "0")}-31`;

  const [
    { data: students, error: studentError },
    { data: attendance, error: attendanceError },
    { data: holidays, error: holidayError },
  ] = await Promise.all([
    supabase.from("students").select("*").order("firstName"),

    supabase
      .from("attendance")
      .select("*")
      .gte("attendance_date", monthStart)
      .lte("attendance_date", monthEnd),

    supabase
      .from("holidays")
      .select("*")
      .gte("date", monthStart)
      .lte("date", monthEnd),
  ]);

  if (studentError) throw studentError;

  if (attendanceError) throw attendanceError;

  if (holidayError) throw holidayError;

  return (students ?? []).map((student) => {
    const studentAttendance = (attendance ?? []).filter(
      (a) => a.student_id === student.id,
    );

    return {
      id: student.id,

      firstName: student.firstName,

      lastName: student.lastName,

      studentClass: student.studentClass,

      batch: student.batch,

      profilePhoto: student.profilePhoto,

      analytics: buildAttendanceAnalytics(
        studentAttendance,
        holidays ?? [],
        year,
        month,
      ),
    };
  });
}
