"use client";

import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  date: string;
  onDateChange: (date: string) => void;
};

export default function AttendanceToolbar({ date, onDateChange }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Attendance Date</h2>

          <p className="text-sm text-muted-foreground">
            Select any day to record or edit attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-47.5"
          />

          <Button
            variant="outline"
            onClick={() => onDateChange(new Date().toISOString().split("T")[0])}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Today
          </Button>
        </div>
      </div>
    </div>
  );
}
