import { CalendarCheck2 } from "lucide-react";

export default function AttendanceHeader() {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <CalendarCheck2 className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Attendance Management
          </h1>

          <p className="mt-2 text-muted-foreground">
            Mark daily attendance, edit attendance for previous dates and manage
            holidays.
          </p>
        </div>
      </div>
    </div>
  );
}
