export type DayStatus = "HOLIDAY" | "RECORDED" | "NOT_RECORDED";

export type Holiday = {
  id: string;
  holiday_date: string;
  title: string;
  description?: string;
};

export type Attendance = {
  id: string;
  student_id: string;
  attendance_date: string;
  status: "Present" | "Absent";
};

export type DayData =
  | { status: "HOLIDAY"; holiday: Holiday }
  | { status: "RECORDED"; attendance: Attendance[] }
  | { status: "NOT_RECORDED" };
