"use client";

import {
  CalendarDays,
  CircleAlert,
  Cake,
  CircleCheckBig,
  IndianRupee,
} from "lucide-react";

interface Props {
  attendanceRecorded: boolean;
  present: number;
  total: number;
  pendingFees: number;
  birthdays: number;
  consecutiveAbsentees: number;
}

export default function DashboardSnapshot({
  attendanceRecorded,
  present,
  total,
  pendingFees,
  birthdays,
  consecutiveAbsentees,
}: Props) {
  const attendancePercentage =
    total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <section
      className="
        rounded-3xl
        border
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="
            rounded-2xl
            bg-sky-100
            p-3
          "
        >
          <CalendarDays
            className="
              h-6
              w-6
              text-sky-700
            "
          />
        </div>

        <div>
          <h2 className="text-lg font-bold">Today&apos;s Snapshot</h2>

          <p className="text-sm text-slate-500">
            Everything important at a glance
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Attendance */}

        <div className="flex items-center gap-3">
          {attendanceRecorded ? (
            <CircleCheckBig
              className="
                h-5
                w-5
                text-emerald-600
              "
            />
          ) : (
            <CircleAlert
              className="
                h-5
                w-5
                text-orange-500
              "
            />
          )}

          <span className="text-sm">
            {attendanceRecorded ? (
              <>
                Attendance recorded •{" "}
                <strong>
                  {present}/{total}
                </strong>{" "}
                present ({attendancePercentage}%)
              </>
            ) : (
              "Attendance not marked yet"
            )}
          </span>
        </div>

        {/* Fees */}

        <div className="flex items-center gap-3">
          <IndianRupee
            className="
              h-5
              w-5
              text-orange-600
            "
          />

          <span className="text-sm">
            {pendingFees > 0 ? (
              <>
                <strong>{pendingFees}</strong> students have pending fees
              </>
            ) : (
              "All fees are up to date"
            )}
          </span>
        </div>

        {/* Birthdays */}

        <div className="flex items-center gap-3">
          <Cake
            className="
              h-5
              w-5
              text-pink-600
            "
          />

          <span className="text-sm">
            {birthdays > 0 ? (
              <>
                <strong>{birthdays}</strong> birthday
                {birthdays > 1 && "s"} today 🎂
              </>
            ) : (
              "No birthdays today"
            )}
          </span>
        </div>

        {/* Absentees */}

        <div className="flex items-center gap-3">
          <CircleAlert
            className="
              h-5
              w-5
              text-red-600
            "
          />

          <span className="text-sm">
            {consecutiveAbsentees > 0 ? (
              <>
                <strong>{consecutiveAbsentees}</strong> students absent for 3+
                days
              </>
            ) : (
              "No prolonged absences"
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
