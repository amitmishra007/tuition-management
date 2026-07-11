"use client";

import { motion } from "framer-motion";
import { Cake, CircleAlert, IndianRupee, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import { DashboardStudent } from "../types/dashboard";

interface SnapshotCardProps {
  variant: "fees" | "birthday" | "absence";
  title: string;
  value: number;
  description: string;

  students: DashboardStudent[];

  onStudentClick: (student: DashboardStudent) => void;
}

const config = {
  fees: {
    icon: IndianRupee,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    border: "border-orange-100",
    bg: "bg-orange-50/70",
    number: (v: number) => (v > 0 ? "text-orange-700" : "text-emerald-700"),
    dot: "bg-orange-500",
    animate: {
      scale: [1, 1.12, 1],
      rotate: [0, -8, 8, 0],
    },
  },

  birthday: {
    icon: Cake,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    border: "border-pink-100",
    bg: "bg-pink-50/70",
    number: (v: number) => (v > 0 ? "text-pink-700" : "text-slate-700"),
    dot: "bg-pink-500",
    animate: {
      y: [0, -5, 0],
      rotate: [0, -6, 6, 0],
    },
  },

  absence: {
    icon: CircleAlert,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
    border: "border-red-100",
    bg: "bg-red-50/70",
    number: (v: number) => (v > 0 ? "text-red-700" : "text-emerald-700"),
    dot: "bg-red-500",
    animate: {
      rotate: [-8, 8, -8],
    },
  },
};

export default function SnapshotCard({
  variant,
  title,
  value,
  description,
  students,
  onStudentClick,
}: SnapshotCardProps) {
  const c = config[variant];
  const Icon = c.icon as LucideIcon;

  return (
    <motion.button
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      onClick={() => {
        if (students.length > 0) {
          onStudentClick(students[0]);
        }
      }}
      className={clsx(
        "group relative w-full overflow-hidden rounded-2xl border p-5 text-left shadow-sm transition-all",
        c.border,
        c.bg,
      )}
    >
      {/* Glow */}

      <motion.div
        animate={{
          opacity: [0.1, 0.35, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.8),transparent_55%)]"
      />

      {/* Icon */}

      <motion.div
        animate={c.animate}
        transition={{
          duration: 2.4,
          repeat: Infinity,
        }}
        className={clsx(
          "relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm",
          c.iconBg,
        )}
      >
        <Icon className={clsx("h-7 w-7", c.iconColor)} />
      </motion.div>

      {/* Number */}

      <motion.p
        key={value}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={clsx("text-4xl font-bold tracking-tight", c.number(value))}
      >
        {value}
      </motion.p>

      <h3 className="mt-2 text-base font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-slate-700">
          View Students
        </span>

        <motion.div
          animate={
            value > 0
              ? {
                  scale: [1, 1.6, 1],
                  opacity: [0.25, 1, 0.25],
                }
              : {
                  opacity: [0.4, 0.7, 0.4],
                }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
          }}
          className={clsx("h-3 w-3 rounded-full", c.dot)}
        />
      </div>
    </motion.button>
  );
}
