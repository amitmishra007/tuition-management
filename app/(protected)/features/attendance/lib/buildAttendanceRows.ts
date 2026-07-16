import type { Student } from "../../students/types/student";

export interface AttendanceRecord {
  id: string;
  student_id: string;
  attendance_date: string;
  status: "Present" | "Absent";
}

export interface HolidayRecord {
  id: string;
  holiday_date: string;
  title: string;
}

export interface AttendanceRow {
  student: Student;

  todayStatus: "Present" | "Absent" | "Holiday" | "Not Marked";

  present: number;
  absent: number;
  holidays: number;

  percentage: number;

  streak: number;
}

export function buildAttendanceRows(
  students: Student[],
  attendance: AttendanceRecord[],
  holidays: HolidayRecord[],
  month: number,
  year: number,
): AttendanceRow[] {
  const today = new Date().toISOString().slice(0, 10);

  return students.map((student) => {
    const records = attendance.filter((record) => {
      if (record.student_id !== student.id) return false;

      const date = new Date(record.attendance_date);

      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });

    const present = records.filter((r) => r.status === "Present").length;

    const absent = records.filter((r) => r.status === "Absent").length;

    const percentage =
      present + absent === 0
        ? 0
        : Math.round((present / (present + absent)) * 100);

    const todayRecord = records.find((r) => r.attendance_date === today);

    let todayStatus: AttendanceRow["todayStatus"] = "Not Marked";

    if (todayRecord) {
      todayStatus = todayRecord.status;
    } else if (holidays.some((h) => h.holiday_date === today)) {
      todayStatus = "Holiday";
    }

    return {
      student,

      todayStatus,

      present,

      absent,

      holidays: holidays.length,

      percentage,

      streak: 0, // we'll calculate this next
    };
  });
}
