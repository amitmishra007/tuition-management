"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isFuture,
  isToday,
  startOfMonth,
} from "date-fns";

import { motion } from "framer-motion";
import clsx from "clsx";

import type { AttendanceCalendarDay } from "../types";

interface Props {
  days: AttendanceCalendarDay[];
  month: Date;
}

const COLORS = {
  Present:
    "bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600",

  Absent: "bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-600",

  Holiday: "bg-amber-400 text-slate-900 shadow-amber-300/40 hover:bg-amber-500",

  Pending: "bg-orange-400 text-white shadow-orange-300/40 hover:bg-orange-500",

  None: "bg-slate-100 text-slate-500 hover:bg-slate-200",
};

export default function StudentAttendanceCalendar({ month, days }: Props) {
  const first = startOfMonth(month);

  const last = endOfMonth(month);

  const calendarDays = eachDayOfInterval({
    start: first,
    end: last,
  });

  const offset = getDay(first);

  const map = new Map(days.map((d) => [d.date, d]));

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b bg-linear-to-r from-sky-50 via-white to-indigo-50 px-6 py-5">
        <h3 className="text-lg font-bold">Attendance Calendar</h3>

        <p className="text-sm text-muted-foreground">
          Daily attendance overview
        </p>
      </div>

      <div className="p-5">
        {/* Week Days */}

        <div className="mb-3 grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={i} />
          ))}

          {calendarDays.map((date) => {
            const key = format(date, "yyyy-MM-dd");

            const item = map.get(key);

            let state: "Present" | "Absent" | "Holiday" | "Pending" | "None" =
              "None";

            if (item) {
              state = item.status;
            } else if (isFuture(date)) {
              state = "Pending";
            }

            return (
              <motion.div
                key={key}
                whileHover={{
                  scale: 1.08,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.18,
                }}
                className={clsx(
                  "relative flex aspect-square cursor-pointer items-center justify-center rounded-xl text-sm font-bold shadow transition-all",
                  COLORS[state],
                  isToday(date) && "ring-2 ring-sky-500 ring-offset-2",
                )}
              >
                {format(date, "d")}

                {item?.remarks && (
                  <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}

        <div className="mt-6 flex flex-wrap gap-4">
          <Legend color="bg-emerald-500" text="Present" />

          <Legend color="bg-rose-500" text="Absent" />

          <Legend color="bg-amber-400" text="Holiday" />

          <Legend color="bg-orange-400" text="Pending" />
        </div>
      </div>
    </div>
  );
}

function Legend({ color, text }: { color: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={clsx("h-3 w-3 rounded-full", color)} />

      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}
