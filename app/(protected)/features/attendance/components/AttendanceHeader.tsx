import Link from "next/link";
import { CalendarCheck2, ChartNoAxesCombined } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AttendanceHeader() {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <CalendarCheck2 className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Attendance Management
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Mark daily attendance, edit previous records and manage holidays.
            </p>
          </div>
        </div>

        <Link href="/features/attendance/analytics">
          <Button
            size="lg"
            className="
              h-12 rounded-xl cursor-pointer
              bg-linear-to-r
              from-emerald-600
              via-teal-600
              to-cyan-600
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            <ChartNoAxesCombined className="mr-2 h-5 w-5" />
            Attendance Analytics
          </Button>
        </Link>
      </div>
    </div>
  );
}
