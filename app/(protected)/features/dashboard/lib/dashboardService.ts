import { createClient } from "@/lib/supabase/server";
import type { DashboardData, DashboardStudent } from "../types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const todayMonthDay = today.slice(5); // MM-DD

  const [{ data: students }, { data: attendance }] = await Promise.all([
    supabase
      .from("students")
      .select("*")
      .eq("status", "Active")
      .order("firstName"),

    supabase
      .from("attendance")
      .select("*")
      .order("attendance_date", { ascending: false }),
  ]);

  const allStudents = (students ?? []) as DashboardStudent[];

  const attendanceRows = attendance ?? [];

  // -----------------------------
  // Today's Attendance
  // -----------------------------

  const todayAttendance = attendanceRows.filter(
    (row) => row.attendance_date === today,
  );

  const present = todayAttendance.filter(
    (row) => row.status === "Present",
  ).length;

  // -----------------------------
  // Pending Fees
  // -----------------------------

  const feeStudents = allStudents.filter(
    (student) => student.feeStatus === "Pending",
  );

  // -----------------------------
  // Today's Birthdays
  // -----------------------------

  const birthdayStudents = allStudents.filter((student) => {
    if (!student.dob) return false;

    return student.dob.slice(5) === todayMonthDay;
  });

  // -----------------------------
  // Consecutive Absentees
  // -----------------------------

  const absenteeStudents = allStudents.filter((student) => {
    const history = attendanceRows
      .filter((row) => row.student_id === student.id)
      .sort((a, b) => b.attendance_date.localeCompare(a.attendance_date));

    if (history.length < 3) return false;

    return history.slice(0, 3).every((record) => record.status === "Absent");
  });

  return {
    totalStudents: allStudents.length,

    attendance: {
      recorded: todayAttendance.length > 0,
      present,
      total: allStudents.length,
    },

    fees: {
      pendingStudents: feeStudents.length,
      dueThisMonth: feeStudents.length,
      students: feeStudents,
    },

    birthdays: {
      total: birthdayStudents.length,
      students: birthdayStudents,
    },

    absentees: {
      total: absenteeStudents.length,
      students: absenteeStudents,
    },
  };
}
