"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import SnapshotCard from "./SnapshotCard";
import { useState } from "react";
import type { DashboardStudent } from "../types/dashboard";
import StudentSnapshotDialog from "./StudentSnapshotDialog";

interface Props {
  attendanceRecorded: boolean;
  present: number;
  total: number;

  pendingFees: number;
  birthdays: number;
  consecutiveAbsentees: number;

  feeStudents: DashboardStudent[];
  birthdayStudents: DashboardStudent[];
  absenteeStudents: DashboardStudent[];
}

export default function DashboardSnapshot({
  pendingFees,
  birthdays,
  consecutiveAbsentees,

  feeStudents,
  birthdayStudents,
  absenteeStudents,
}: Props) {
  const [selectedStudent, setSelectedStudent] =
    useState<DashboardStudent | null>(null);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,.08)]">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,.08),transparent_30%)]" />

      <div className="relative p-6">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 shadow-sm">
              <CalendarDays className="h-7 w-7 text-sky-700" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Today&apos;s Snapshot
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Everything important at a glance
              </p>
            </div>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0 rgba(34,197,94,0)",
                "0 0 18px rgba(34,197,94,.35)",
                "0 0 0 rgba(34,197,94,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [1, 0.35, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
              className="h-2.5 w-2.5 rounded-full bg-emerald-500"
            />

            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              LIVE
            </span>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SnapshotCard
            variant="fees"
            title="Pending Fees"
            value={pendingFees}
            students={feeStudents}
            description={
              pendingFees > 0
                ? `${pendingFees} student${pendingFees > 1 ? "s have" : " has"} pending payment.`
                : "Excellent! All fees have been collected."
            }
            onStudentClick={setSelectedStudent}
          />
          <SnapshotCard
            variant="birthday"
            title="Birthdays"
            value={birthdays}
            students={birthdayStudents}
            description={
              birthdays === 0
                ? "No birthdays today."
                : birthdays === 1
                  ? "One student celebrates today 🎂"
                  : `${birthdays} students celebrate today 🎉`
            }
            onStudentClick={setSelectedStudent}
          />

          <SnapshotCard
            variant="absence"
            title="Long Absences"
            value={consecutiveAbsentees}
            students={absenteeStudents}
            description={
              consecutiveAbsentees > 0
                ? `${consecutiveAbsentees} student${consecutiveAbsentees > 1 ? "s are" : " is"} absent for 3+ consecutive days.`
                : "No prolonged absences detected."
            }
            onStudentClick={setSelectedStudent}
          />
        </div>
      </div>
      <StudentSnapshotDialog
        open={!!selectedStudent}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </section>
  );
}
