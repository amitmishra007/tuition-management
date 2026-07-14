import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  startOfMonth,
} from "date-fns";

import type {
  AttendanceRecord,
  HolidayRecord,
} from "./getStudentAttendanceAnalytics";

export type CalendarDayStatus =
  | "present"
  | "absent"
  | "holiday"
  | "pending"
  | "future";

export interface CalendarDay {
  date: Date;
  status: CalendarDayStatus;
  attendance?: AttendanceRecord;
}

export interface AttendanceAnalytics {
  calendar: CalendarDay[];

  present: number;
  absent: number;
  holiday: number;
  pending: number;

  attendancePercentage: number;
}

export function buildAttendanceAnalytics(
  attendance: AttendanceRecord[],
  holidays: HolidayRecord[],
  year: number,
  month: number,
): AttendanceAnalytics {
  const today = new Date();

  const attendanceMap = new Map(
    attendance.map((row) => [row.attendance_date, row]),
  );

  const holidayMap = new Map(
    holidays.map((holiday) => [holiday.date, holiday]),
  );

  const days = eachDayOfInterval({
    start: startOfMonth(new Date(year, month - 1)),
    end: endOfMonth(new Date(year, month - 1)),
  });

  const calendar: CalendarDay[] = days.map((day) => {
    const key = format(day, "yyyy-MM-dd");

    if (holidayMap.has(key)) {
      return {
        date: day,
        status: "holiday",
      };
    }

    const record = attendanceMap.get(key);

    if (record) {
      return {
        date: day,
        status: record.status === "Present" ? "present" : "absent",
        attendance: record,
      };
    }

    if (isAfter(day, today)) {
      return {
        date: day,
        status: "future",
      };
    }

    return {
      date: day,
      status: "pending",
    };
  });

  const present = attendance.filter((a) => a.status === "Present").length;

  const absent = attendance.filter((a) => a.status === "Absent").length;

  const holiday = holidays.length;

  const pending = calendar.filter((d) => d.status === "pending").length;

  const attendancePercentage =
    present + absent === 0
      ? 0
      : Math.round((present / (present + absent)) * 100);

  return {
    calendar,

    present,
    absent,
    holiday,
    pending,

    attendancePercentage,
  };
}
