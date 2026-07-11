"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  GraduationCap,
  IndianRupee,
  MapPin,
  Phone,
  ChevronRight,
  AlertTriangle,
  Cake,
} from "lucide-react";

import type { DashboardStudent } from "../types/dashboard";

interface Props {
  student: DashboardStudent;
  variant: "fees" | "birthday" | "absence";
  index?: number;
}

export default function StudentSnapshotCard({
  student,
  variant,
  index = 0,
}: Props) {
  const colors = {
    fees: {
      bg: "from-orange-50 to-white",
      border: "border-orange-200",
      glow: "bg-orange-400/20",
      icon: "bg-orange-100 text-orange-700",
      badge: "bg-orange-100 text-orange-700",
      title: "Pending Fees",
      Icon: IndianRupee,
    },

    birthday: {
      bg: "from-pink-50 to-white",
      border: "border-pink-200",
      glow: "bg-pink-400/20",
      icon: "bg-pink-100 text-pink-700",
      badge: "bg-pink-100 text-pink-700",
      title: "Birthday Today",
      Icon: Cake,
    },

    absence: {
      bg: "from-red-50 to-white",
      border: "border-red-200",
      glow: "bg-red-400/20",
      icon: "bg-red-100 text-red-700",
      badge: "bg-red-100 text-red-700",
      title: "Long Absence",
      Icon: AlertTriangle,
    },
  };

  const theme = colors[variant];
  const Icon = theme.Icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        ${theme.border}
        bg-linear-to-br
        ${theme.bg}
        p-6
        shadow-lg
        transition-all
      `}
    >
      {/* Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${theme.glow}`}
      />

      {/* Shine */}

      <motion.div
        animate={{
          x: ["-150%", "250%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute inset-y-0 w-24 rotate-12 bg-white/30 blur-xl"
      />

      <div className="relative z-10">
        {/* Top */}

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="relative"
            >
              <Image
                src={student.profilePhoto || "/avatar.png"}
                alt={student.firstName}
                width={72}
                height={72}
                className="rounded-2xl object-cover shadow-lg"
              />

              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500" />
            </motion.div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {student.firstName} {student.lastName}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {student.admissionNo}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
              >
                {theme.title}
              </span>
            </div>
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.icon}`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>

        {/* Divider */}

        <div className="my-6 border-t border-slate-200" />

        {/* Details */}

        <div className="grid gap-3">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <GraduationCap className="h-4 w-4 text-slate-400" />

            <span>{student.studentClass}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Phone className="h-4 w-4 text-slate-400" />

            <span>{student.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-700">
            <MapPin className="h-4 w-4 text-slate-400" />

            <span>{student.city}</span>
          </div>

          {variant === "fees" && (
            <div className="flex items-center gap-3 text-sm text-orange-700">
              <Calendar className="h-4 w-4" />

              <span>Due: {student.nextDueDate}</span>
            </div>
          )}

          {variant === "birthday" && (
            <div className="flex items-center gap-3 text-sm text-pink-700">
              <Cake className="h-4 w-4" />

              <span>{student.dob}</span>
            </div>
          )}

          {variant === "absence" && (
            <div className="flex items-center gap-3 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4" />

              <span>Needs follow up</span>
            </div>
          )}
        </div>

        {/* Bottom */}

        <motion.div
          whileHover={{
            x: 6,
          }}
          className="mt-7 flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 backdrop-blur"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Student Profile
            </p>

            <p className="text-sm font-semibold text-slate-700">
              Click for complete details
            </p>
          </div>

          <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
        </motion.div>
      </div>
    </motion.div>
  );
}
