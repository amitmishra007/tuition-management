import { createClient } from "@/lib/supabase/server";
import type { DashboardData } from "../types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const [studentsResult, attendanceResult, feesResult] = await Promise.all([
    supabase.from("students").select("id").eq("status", "Active"),

    supabase
      .from("attendance")
      .select(
        `
        student_id,
        status
        `,
      )
      .eq("attendance_date", today),

    supabase
      .from("students")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("feeStatus", "Pending"),
  ]);

  const activeStudents = studentsResult.data ?? [];

  const activeStudentIds = new Set(
    activeStudents.map((student) => String(student.id)),
  );

  const todaysAttendance = (attendanceResult.data ?? []).filter((record) =>
    activeStudentIds.has(String(record.student_id)),
  );

  const present = todaysAttendance.filter(
    (record) => record.status === "Present",
  ).length;

  return {
    totalStudents: activeStudents.length,

    attendance: {
      recorded: todaysAttendance.length > 0,

      present,

      total: activeStudents.length,
    },

    fees: {
      pendingStudents: feesResult.count ?? 0,

      dueThisMonth: 0,
    },

    birthdaysToday: 0,

    consecutiveAbsentees: 0,
  };
}
