"use client";

import CountUp from "react-countup";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { motion } from "framer-motion";

interface Props {
  total: number;
  present: number;
  absent: number;
  holidays: number;
}

export default function StudentAttendanceAnalytics({
  total,
  present,
  absent,
  holidays,
}: Props) {
  const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

  const pending = Math.max(total - present - absent - holidays, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <Card
        title="Attendance"
        value={`${percentage}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        gradient="from-sky-500 via-cyan-500 to-blue-500"
      />

      <Card
        title="Present"
        value={present}
        icon={<CheckCircle2 className="h-5 w-5" />}
        gradient="from-emerald-500 via-green-500 to-teal-500"
      />

      <Card
        title="Absent"
        value={absent}
        icon={<XCircle className="h-5 w-5" />}
        gradient="from-rose-500 via-red-500 to-pink-500"
      />

      <Card
        title="Holiday"
        value={holidays}
        icon={<CalendarDays className="h-5 w-5" />}
        gradient="from-amber-500 via-yellow-500 to-orange-500"
      />

      <Card
        title="Pending"
        value={pending}
        icon={<Clock3 className="h-5 w-5" />}
        gradient="from-orange-500 via-amber-500 to-yellow-500"
      />
    </div>
  );
}

interface CardProps {
  title: string;
  value: number | string;
  gradient: string;
  icon: React.ReactNode;
}

function Card({ title, value, gradient, icon }: CardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm"
    >
      {/* Glow */}

      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <div className="mt-3 text-3xl font-black">
            {typeof value === "number" ? (
              <CountUp end={value} duration={1} />
            ) : (
              value
            )}
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            duration: 1,
          }}
          className={`h-full rounded-full bg-linear-to-r ${gradient}`}
        />
      </div>
    </motion.div>
  );
}
