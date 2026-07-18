"use client";

import Image from "next/image";

import { motion, LayoutGroup, type Variants } from "framer-motion";

import {
  CalendarDays,
  IndianRupee,
  Clock3,
  CheckCircle2,
  AlertCircle,
  History,
  ReceiptIndianRupee,
  Sparkles,
  CalendarClock,
} from "lucide-react";

import { cn } from "@/lib/utils";

import MonthTimeline from "./MonthTimeline";

import type { FeeMonth, PaymentStudent } from "../types/fee";

/* ======================================================
   Props
====================================================== */

export interface PaymentCardProps {
  student: PaymentStudent;

  onRecordPayment?: (student: PaymentStudent) => void;

  onViewHistory?: (student: PaymentStudent) => void;

  currentMonth?: string;
}

/* ======================================================
   Motion
====================================================== */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* ======================================================
   Helpers
====================================================== */

function getInitials(firstName?: string, lastName?: string) {
  return `${firstName?.charAt(0) ?? ""}${
    lastName?.charAt(0) ?? ""
  }`.toUpperCase();
}

function getPaymentStatus(months: FeeMonth[]): "Paid" | "Pending" | "Partial" {
  const latest = months.at(-1);

  if (!latest) {
    return "Pending";
  }

  if (latest.paidAmount >= latest.amount) {
    return "Paid";
  }

  if (latest.paidAmount > 0) {
    return "Partial";
  }

  return "Pending";
}

function getLatestPaidDate(months: FeeMonth[]) {
  return [...months].reverse().find((month) => month.paidOn)?.paidOn ?? null;
}

function getNextPendingMonth(months: FeeMonth[]) {
  return months.find((month) => month.status === "pending");
}

/* ======================================================
   Status
====================================================== */

const STATUS_CONFIG = {
  Paid: {
    icon: CheckCircle2,

    label: "Paid",

    className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },

  Pending: {
    icon: Clock3,

    label: "Pending",

    className: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },

  Partial: {
    icon: AlertCircle,

    label: "Partial",

    className: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
} as const;

/* ======================================================
   Component
====================================================== */

export default function PaymentCard({
  student,

  currentMonth = "July 2026",

  onRecordPayment,

  onViewHistory,
}: PaymentCardProps) {
  const monthlyFee = student.monthlyFee ?? 0;

  const feeStatus = getPaymentStatus(student.months);

  const StatusIcon = STATUS_CONFIG[feeStatus].icon;

  const latestPaidDate = getLatestPaidDate(student.months);

  const nextPendingMonth = getNextPendingMonth(student.months);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      layout
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
       bg-white
border-slate-200
shadow-xl
        backdrop-blur-xl
        transition-transform
        duration-500
        hover:-translate-y-1
      "
    >
      {/* Content */}

      <div
        className="
          relative
          z-10
          p-5
          sm:p-6
        "
      >
        {" "}
        {/* ======================================================
            Header
        ======================================================= */}
        <motion.div
          variants={itemVariants}
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
            "
          >
            {/* Avatar */}

            <div
              className="
                relative
                h-14
                w-14
                shrink-0
                overflow-hidden
                rounded-2xl
                border
                border-sky-100
bg-sky-50
              "
            >
              {student.profilePhoto ? (
                <Image
                  src={student.profilePhoto}
                  alt={`${student.firstName} photo`}
                  fill
                  sizes="56px"
                  className="
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                    text-slate-900/80
                  "
                >
                  {getInitials(student.firstName, student.lastName)}
                </div>
              )}
            </div>

            {/* Student Details */}

            <div
              className="
                min-w-0
              "
            >
              <h3
                className="
                  truncate
                  text-base
                  font-semibold
                  text-slate-900
                "
              >
                {student.firstName} {student.lastName}
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                {student.studentClass}

                {" • "}

                {student.batch}
              </p>
            </div>
          </div>

          {/* Status */}

          <div
            className={cn(
              `
      flex
      items-center
      gap-1.5
      rounded-full
      border
      px-3
      py-1.5
      text-xs
      font-medium
      whitespace-nowrap
    `,
              STATUS_CONFIG[feeStatus].className,
            )}
          >
            <StatusIcon size={14} />

            {STATUS_CONFIG[feeStatus].label}
          </div>
        </motion.div>
        {/* ======================================================
            Fee Hero
        ======================================================= */}
        <motion.div
          variants={itemVariants}
          className="
            mt-6
            flex
            items-end
            justify-between
            gap-4
            rounded-3xl
border
border-emerald-100
bg-linear-to-br
from-emerald-50
via-white
to-teal-50
            p-4
          "
        >
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Monthly Fee
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                gap-1
              "
            >
              <IndianRupee
                size={22}
                className="
                  text-emerald-600
                "
              />

              <span
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-slate-900
                "
              >
                {monthlyFee.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div
            className="
              text-right
            "
          >
            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                text-sm
                text-slate-900/70
              "
            >
              <CalendarDays size={15} />

              {currentMonth}
            </div>

            <p
              className="
                mt-2
                text-xs
                text-slate-500
              "
            >
              Current cycle
            </p>
          </div>
        </motion.div>
        {/* ======================================================
            Payment Timeline
        ======================================================= */}
        <motion.section
          variants={itemVariants}
          className="
    mt-6
    overflow-hidden
    rounded-3xl
    border
    border-slate-200
    bg-white
    shadow-sm
  "
        >
          {/* Header */}

          <div
            className="
      flex
      items-center
      justify-between
      border-b
      border-slate-100
      bg-linear-to-r
      from-violet-50
      via-white
      to-fuchsia-50
      px-5
      py-4
    "
          >
            <div className="flex items-center gap-3">
              <div
                className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-linear-to-br
          from-violet-600
          to-fuchsia-600
          text-white
          shadow-lg
        "
              >
                <Sparkles size={18} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Payment Journey
                </h4>

                <p className="text-xs text-slate-500">
                  Complete payment history & monthly progress
                </p>
              </div>
            </div>

            <div
              className="
        rounded-full
        border
        border-violet-200
        bg-violet-50
        px-3
        py-1
        text-xs
        font-semibold
        text-violet-700
      "
            >
              {student.months.length} Months
            </div>
          </div>

          {/* Timeline */}

          <div className="relative">
            {/* subtle fade */}

            <div
              className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-10
        h-full
        w-8
        bg-linear-to-r
        from-white
        to-transparent
      "
            />

            <div
              className="
        pointer-events-none
        absolute
        right-0
        top-0
        z-10
        h-full
        w-8
        bg-linear-to-l
        from-white
        to-transparent
      "
            />

            <div
              className="
        overflow-x-auto
        px-5
        py-5

        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-slate-300
        hover:scrollbar-thumb-slate-400
      "
            >
              <LayoutGroup>
                <MonthTimeline months={student.months} />
              </LayoutGroup>
            </div>
          </div>

          {/* Footer */}

          <div
            className="
      flex
      items-center
      justify-between
      border-t
      border-slate-100
      bg-slate-50/70
      px-5
      py-3
      text-xs
      text-slate-500
    "
          >
            <span>Scroll horizontally to explore all months</span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Paid
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Pending
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                Partial
              </div>
            </div>
          </div>
        </motion.section>
        {/* ======================================================
            Quick Stats
        ======================================================= */}
        <motion.div
          variants={itemVariants}
          className="
            mt-5
            grid
            grid-cols-3
            gap-3
          "
        >
          <StatBox
            label="Last Paid"
            value={
              latestPaidDate
                ? new Date(latestPaidDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })
                : "-"
            }
            variant="paid"
          />

          <StatBox
            label="Next Due"
            value={
              nextPendingMonth
                ? `${nextPendingMonth.month}/${nextPendingMonth.year}`
                : "-"
            }
            variant="due"
          />

          <StatBox label="Status" value={feeStatus} variant="status" />
        </motion.div>
        {/* ======================================================
            Actions
        ======================================================= */}
        <motion.div
          variants={itemVariants}
          className="
            mt-6
            flex
            items-center
            gap-3
          "
        >
          <div className="mt-7 flex gap-3">
            {/* History */}

            <motion.button
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="button"
              onClick={() => onViewHistory?.(student)}
              className="
      group
      relative
      flex
      flex-1
      cursor-pointer
      items-center
      justify-center
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-linear-to-br
      from-white
      via-slate-50
      to-slate-100
      px-5
      py-3.5
      shadow-md
      transition-all
      duration-300
      hover:border-slate-300
      hover:shadow-xl
      active:shadow-md
    "
            >
              <span
                className="
        absolute
        inset-0
        bg-linear-to-r
        from-transparent
        via-white/60
        to-transparent
        -translate-x-full
        group-hover:translate-x-full
        transition-transform
        duration-1000
      "
              />

              <History
                size={18}
                className="
        mr-2
        text-slate-600
        transition-all
        duration-300
        group-hover:-rotate-12
        group-hover:scale-110
      "
              />

              <span
                className="
        relative
        font-semibold
        text-slate-700
      "
              >
                History
              </span>
            </motion.button>

            {/* Record Payment */}

            <motion.button
              whileHover={{
                y: -2,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="button"
              onClick={() => onRecordPayment?.(student)}
              className="
      group
      relative
      flex
      flex-1
      cursor-pointer
      items-center
      justify-center
      overflow-hidden
      rounded-2xl
      bg-linear-to-r
      from-violet-600
      via-fuchsia-600
      to-indigo-600
      px-5
      py-3.5
      shadow-[0_15px_40px_rgba(124,58,237,0.35)]
      transition-all
      duration-300
      hover:shadow-[0_20px_55px_rgba(124,58,237,0.55)]
    "
            >
              {/* Glow */}

              <span
                className="
        absolute
        inset-0
        opacity-0
        bg-linear-to-r
        from-white/0
        via-white/25
        to-white/0
        -translate-x-full
        group-hover:translate-x-full
        group-hover:opacity-100
        transition-all
        duration-1000
      "
              />

              <div
                className="
        absolute
        inset-0
        rounded-2xl
        ring-1
        ring-white/20
      "
              />

              <ReceiptIndianRupee
                size={18}
                className="
        relative
        mr-2
        text-white
        transition-all
        duration-300
        group-hover:rotate-12
        group-hover:scale-110
      "
              />

              <span
                className="
        relative
        font-semibold
        tracking-wide
        text-white
      "
              >
                Record Payment
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ======================================================
   Stat Box
====================================================== */

interface StatBoxProps {
  label: string;
  value: string;
  variant?: "paid" | "due" | "status";
}

function StatBox({ label, value, variant = "paid" }: StatBoxProps) {
  const styles = {
    paid: {
      icon: CheckCircle2,
      border: "border-emerald-200",
      bg: "bg-gradient-to-br from-emerald-50 to-white",
      iconBg: "bg-emerald-100 text-emerald-600",
      value: "text-emerald-700",
    },

    due: {
      icon: CalendarClock,
      border: "border-blue-200",
      bg: "bg-gradient-to-br from-sky-50 to-white",
      iconBg: "bg-sky-100 text-sky-600",
      value: "text-sky-700",
    },

    status: {
      icon: Clock3,
      border: "border-violet-200",
      bg: "bg-gradient-to-br from-violet-50 to-white",
      iconBg: "bg-violet-100 text-violet-600",
      value: "text-violet-700",
    },
  };

  const config = styles[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        config.border,
        config.bg,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
          {label}
        </p>

        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            config.iconBg,
          )}
        >
          <Icon size={18} />
        </div>
      </div>

      <p className={cn("mt-4 text-lg font-bold tracking-tight", config.value)}>
        {value}
      </p>
    </div>
  );
}
