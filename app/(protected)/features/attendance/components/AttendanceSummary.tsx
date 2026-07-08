import {
  CalendarCheck2,
  CircleAlert,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  present: number;
  absent: number;
  total: number;
  status: "RECORDED" | "NOT_RECORDED" | "HOLIDAY";
};

export default function AttendanceSummary({
  present,
  absent,
  total,
  status,
}: Props) {
  const statusConfig = {
    RECORDED: {
      label: "Attendance Recorded",
      icon: CalendarCheck2,
      className: "border-green-200 bg-green-50 text-green-700",
    },
    NOT_RECORDED: {
      label: "Attendance Pending",
      icon: CircleAlert,
      className: "border-amber-200 bg-amber-50 text-amber-700",
    },
    HOLIDAY: {
      label: "Holiday",
      icon: CalendarCheck2,
      className: "border-sky-200 bg-sky-50 text-sky-700",
    },
  };

  const current = statusConfig[status];
  const StatusIcon = current.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-4">
      <Card className="rounded-3xl border-green-200 shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">Present</p>

            <h2 className="mt-2 text-3xl font-bold">{present}</h2>
          </div>

          <div className="rounded-2xl bg-green-100 p-3 text-green-700">
            <UserCheck className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-red-200 shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">Absent</p>

            <h2 className="mt-2 text-3xl font-bold">{absent}</h2>
          </div>

          <div className="rounded-2xl bg-red-100 p-3 text-red-700">
            <UserX className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-sky-200 shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Students</p>

            <h2 className="mt-2 text-3xl font-bold">{total}</h2>
          </div>

          <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
            <Users className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className={`rounded-3xl shadow-sm ${current.className}`}>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm opacity-80">Status</p>

            <h2 className="mt-2 text-lg font-semibold">{current.label}</h2>
          </div>

          <StatusIcon className="h-8 w-8" />
        </CardContent>
      </Card>
    </div>
  );
}
