"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  Flame,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";

import StudentAttendanceCalendar from "./StudentAttendanceCalendar";

import type { AttendanceCalendarDay } from "../types";

interface Props {
  student: {
    id: string;
    name: string;
    class: string;
    school: string;
    batch: string;
    photo?: string | null;
  };

  calendar: AttendanceCalendarDay[];

  present: number;
  absent: number;
  holidays: number;
  percentage: number;
  streak: number;

  month: Date;
}

export default function StudentAttendanceCard({
  student,
  calendar,
  present,
  absent,
  holidays,
  percentage,
  streak,
  month,
}: Props) {
  return (
    <motion.div
      layout
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="overflow-hidden rounded-3xl border bg-white shadow-sm"
    >
      {/* Hero */}

      <div className="relative overflow-hidden border-b bg-linear-to-br from-sky-500 via-indigo-500 to-cyan-500 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.25),transparent_35%)]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Avatar */}

          <Image
            src={student.photo || "/images/avatar.png"}
            alt={student.name}
            width={92}
            height={92}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
          />

          {/* Info */}

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{student.name}</h2>

            <div className="mt-3 flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />

                {student.class}
              </div>

              <div className="flex items-center gap-2">
                <School className="h-4 w-4" />

                {student.school}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />

                {student.batch}
              </div>
            </div>
          </div>

          {/* Circular Progress */}

          <div className="h-36 w-36">
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="72%"
                outerRadius="100%"
                data={[
                  {
                    value: percentage,
                  },
                ]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

                <RadialBar dataKey="value" cornerRadius={18} />

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  className="text-3xl font-bold"
                >
                  {percentage}%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid gap-4 border-b p-6 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="emerald"
          label="Present"
          value={present}
        />

        <Stat
          icon={<XCircle className="h-5 w-5" />}
          color="rose"
          label="Absent"
          value={absent}
        />

        <Stat
          icon={<CalendarDays className="h-5 w-5" />}
          color="amber"
          label="Holiday"
          value={holidays}
        />

        <Stat
          icon={<Flame className="h-5 w-5" />}
          color="orange"
          label="Current Streak"
          value={streak}
        />
      </div>

      {/* Calendar */}

      <div className="p-6">
        <StudentAttendanceCalendar month={month} days={calendar} />
      </div>

      {/* Footer */}

      <div className="flex justify-end border-t bg-slate-50 p-5">
        <Button size="sm" className="rounded-xl">
          <Eye className="mr-2 h-4 w-4" />
          View Student
        </Button>
      </div>
    </motion.div>
  );
}

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: "emerald" | "rose" | "amber" | "orange";
}

function Stat({ icon, value, label, color }: StatProps) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-600",
    rose: "bg-rose-100 text-rose-600",
    amber: "bg-amber-100 text-amber-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      className="flex items-center gap-4 rounded-2xl border p-4"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
      >
        {icon}
      </div>

      <div>
        <div className="text-2xl font-bold">{value}</div>

        <div className="text-sm text-slate-500">{label}</div>
      </div>
    </motion.div>
  );
}
