"use client";

import Image from "next/image";

import { motion, LayoutGroup, type Variants } from "framer-motion";

import {
  ReceiptIndianRupee,
  History,
  IndianRupee,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

import MonthTimeline from "./MonthTimeline";

import type { FeeMonth, PaymentStudent } from "../types/fee";

/* =========================================================
   Props
========================================================= */

export interface PaymentCardProps {
  student: PaymentStudent;

  currentMonth?: string;

  onRecordPayment?: (student: PaymentStudent) => void;

  onViewHistory?: (student: PaymentStudent) => void;
}

/* =========================================================
   Motion
========================================================= */

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  show: {
    opacity: 1,
    y: 0,
  },
};

const spring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 22,
};

/* =========================================================
   Helpers
========================================================= */

function initials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}

function paymentStatus(months: FeeMonth[]): "Paid" | "Pending" | "Partial" {
  const latest = months.at(-1);

  if (!latest) return "Pending";

  if (latest.paidAmount >= latest.amount) return "Paid";

  if (latest.paidAmount > 0) return "Partial";

  return "Pending";
}

function completion(months: FeeMonth[]) {
  if (!months.length) return 0;

  return Math.round(
    (months.filter((m) => m.paidAmount >= m.amount).length / months.length) *
      100,
  );
}

function latestPaid(months: FeeMonth[]) {
  return [...months].reverse().find((m) => m.paidOn)?.paidOn ?? null;
}

function nextDue(months: FeeMonth[]) {
  return months.find((m) => m.status === "pending");
}

/* =========================================================
   Status
========================================================= */

const STATUS = {
  Paid: {
    icon: CheckCircle2,

    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  Pending: {
    icon: Clock3,

    pill: "bg-amber-50 text-amber-700 border-amber-200",
  },

  Partial: {
    icon: AlertCircle,

    pill: "bg-sky-50 text-sky-700 border-sky-200",
  },
} as const;

/* =========================================================
   Component
========================================================= */

export default function PaymentCard({
  student,
  onRecordPayment,
  onViewHistory,
}: PaymentCardProps) {
  const fee = student.monthlyFee ?? 0;

  const status = paymentStatus(student.months);

  const StatusIcon = STATUS[status].icon;

  const progress = completion(student.months);

  const paidDate = latestPaid(student.months);

  const due = nextDue(student.months);

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{
        y: -3,
      }}
      transition={spring}
      className="
group
relative
overflow-hidden
rounded-[30px]
border
border-slate-200/70
bg-white
shadow-[0_10px_35px_rgba(15,23,42,.06)]
"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,.05),transparent_35%)]" />

      <div className="relative p-7">
        {/* Header */}

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-5">
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: -2,
              }}
              transition={spring}
              className="
relative
h-16
w-16
overflow-hidden
rounded-2xl
border
border-slate-200
shadow-sm
"
            >
              {student.profilePhoto ? (
                <Image
                  fill
                  src={student.profilePhoto}
                  alt={student.firstName}
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="
flex
h-full
w-full
items-center
justify-center
bg-linear-to-br
from-slate-100
to-slate-50
font-semibold
text-slate-700
"
                >
                  {initials(student.firstName, student.lastName)}
                </div>
              )}
            </motion.div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900">
                {student.firstName} {student.lastName}
              </h2>

              <p className="mt-1 text-xs md:text-sm text-slate-500">
                {student.studentClass}
                {" • "}
                {student.batch}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
              STATUS[status].pill,
            )}
          >
            <StatusIcon size={16} />

            {status}
          </div>
        </motion.div>

        {/* Top Row */}

        <motion.div
          variants={itemVariants}
          className="
mt-6
grid
gap-6
lg:grid-cols-[1fr_220px]
items-start
"
        >
          <div>
            <p
              className="text-[11px]
uppercase
tracking-wider text-slate-500"
            >
              Monthly Fee
            </p>

            <div className="mt-2 flex items-end gap-2">
              <IndianRupee className="mb-2 text-slate-700" size={28} />

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                {fee.toLocaleString("en-IN")}
              </h1>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500">Academic Progress</span>

                <span className="font-semibold text-slate-700">
                  {progress}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="
h-full
rounded-full
bg-linear-to-r
from-indigo-500
to-cyan-500
"
                />
              </div>
            </div>
          </div>{" "}
          {/* Right Panel */}
          <motion.div
            variants={itemVariants}
            className="w-full
max-w-60
lg:max-w-65"
          >
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Last Paid
                  </p>

                  <p className="mt-2 text-sm md:text-base font-semibold text-slate-900">
                    {paidDate
                      ? new Date(paidDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "--"}
                  </p>
                </div>

                <div className="h-10 w-px bg-slate-200" />

                <div className="text-right">
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Next Due
                  </p>

                  <p className="mt-2 text-sm md:text-base font-semibold text-slate-900">
                    {due ? `${due.month}/${due.year}` : "Completed"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}

        <motion.div
          variants={itemVariants}
          className="my-8 h-px bg-slate-200"
        />

        {/* Timeline */}

        <motion.div variants={itemVariants}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm md:text-base font-semibold tracking-tight text-slate-900">
                Payment Journey
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Complete academic payment timeline
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] md:text-[11px] font-medium text-slate-600">
              {student.months.length} Months
            </span>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-white to-transparent" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-white to-transparent" />

            <div
              className="
overflow-x-auto
pb-2
timeline-scroll
"
            >
              <LayoutGroup>
                <MonthTimeline months={student.months} />
              </LayoutGroup>
            </div>
          </div>
        </motion.div>

        {/* Divider */}

        <motion.div
          variants={itemVariants}
          className="my-8 h-px bg-slate-200"
        />

        {/* Bottom Row */}

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between gap-6"
        >
          <div
            className="
flex
flex-1
items-center
gap-4
min-w-0
overflow-hidden
"
          >
            <CompactInfo
              title="Last Paid"
              value={
                paidDate
                  ? new Date(paidDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })
                  : "--"
              }
            />

            <CompactInfo
              title="Next Due"
              value={due ? `${due.month}/${due.year}` : "Completed"}
            />
          </div>

          <div
            className="
flex
flex-col
gap-4
lg:flex-row
lg:items-center
lg:justify-between
"
          >
            {" "}
            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={spring}
              onClick={() => onViewHistory?.(student)}
              className="
group
inline-flex
items-center
gap-3
rounded-2xl
border
border-slate-200
bg-white
px-5
py-3
text-sm
font-medium
text-slate-700
shadow-sm
transition-all
hover:border-slate-300
hover:shadow-md
"
            >
              <History size={18} className="text-slate-500" />

              <span>View History</span>

              <ChevronRight
                size={16}
                className="
transition-transform
duration-300
group-hover:translate-x-1
"
              />
            </motion.button>
            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={spring}
              onClick={() => onRecordPayment?.(student)}
              className="
group
inline-flex
items-center
gap-3
rounded-2xl
bg-linear-to-r
from-slate-900
to-slate-800
px-5
py-3
text-sm
font-medium
text-white
shadow-lg
transition-all
hover:shadow-xl
"
            >
              <ReceiptIndianRupee size={18} />

              <span>Record Payment</span>

              <ChevronRight
                size={16}
                className="
transition-transform
duration-300
group-hover:translate-x-1
"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   Compact Info
========================================================= */

interface CompactInfoProps {
  title: string;
  value: string;
}

function CompactInfo({ title, value }: CompactInfoProps) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={spring}
      className="
min-w-0
flex-1
max-w-30
"
    >
      <p
        className="
text-[10px] md:text-[11px]
uppercase
tracking-[0.16em]
text-slate-400
"
      >
        {title}
      </p>

      <p
        className="
mt-2
text-sm md:text-base
font-semibold
tracking-tight
text-slate-900
"
      >
        {value}
      </p>
    </motion.div>
  );
}
