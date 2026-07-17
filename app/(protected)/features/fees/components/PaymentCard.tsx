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
        border-white/10
        bg-white/[0.035]
        backdrop-blur-xl
        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
        transition-transform
        duration-500
        hover:-translate-y-1
      "
    >
      {/* ======================================================
          Aurora Layers
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],

            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 8,

            repeat: Infinity,

            ease: "easeInOut",
          }}
          className="
            absolute
            -left-24
            -top-24
            h-80
            w-80
            rounded-full
            bg-violet-500/20
            blur-[90px]
          "
        />

        <motion.div
          animate={{
            x: [0, 80, -40, 0],

            y: [0, 30, -20, 0],
          }}
          transition={{
            duration: 20,

            repeat: Infinity,

            ease: "linear",
          }}
          className="
            absolute
            -right-20
            top-10
            h-72
            w-72
            rounded-full
            bg-cyan-400/20
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-linear-to-br
            from-white/[0.08]
            via-transparent
            to-black/20
          "
        />
      </div>

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
                border-white/20
                bg-linear-to-br
                from-white/20
                to-white/[0.05]
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
                    text-white/80
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
                  text-white
                "
              >
                {student.firstName} {student.lastName}
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-white/50
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
            rounded-2xl
            border
            border-white/10
            bg-black/10
            p-4
          "
        >
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-white/40
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
                  text-white/70
                "
              />

              <span
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-white
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
                text-white/70
              "
            >
              <CalendarDays size={15} />

              {currentMonth}
            </div>

            <p
              className="
                mt-2
                text-xs
                text-white/40
              "
            >
              Current cycle
            </p>
          </div>
        </motion.div>
        {/* ======================================================
            Payment Timeline
        ======================================================= */}
        <motion.div
          variants={itemVariants}
          className="
            mt-6
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            p-4
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Sparkles
                size={16}
                className="
                  text-white/60
                "
              />

              <span
                className="
                  text-sm
                  font-medium
                  text-white/80
                "
              >
                Payment Journey
              </span>
            </div>

            <span
              className="
                text-xs
                text-white/40
              "
            >
              {student.months.length} Months
            </span>
          </div>

          <LayoutGroup>
            <MonthTimeline months={student.months} />
          </LayoutGroup>
        </motion.div>{" "}
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
          />

          <StatBox
            label="Next Due"
            value={
              nextPendingMonth
                ? `${nextPendingMonth.month}/${nextPendingMonth.year}`
                : "-"
            }
          />

          <StatBox label="Status" value={feeStatus} />
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
          {/* History Button */}

          <button
            type="button"
            onClick={() => onViewHistory?.(student)}
            className="
              group
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-3
              text-sm
              font-medium
              text-white/80
              transition
              hover:bg-white/[0.08]
              active:scale-95
            "
          >
            <History
              size={16}
              className="
                transition
                group-hover:scale-110
              "
            />
            History
          </button>

          {/* Record Payment Button */}

          <button
            type="button"
            onClick={() => onRecordPayment?.(student)}
            className="
              group
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-white
              px-4
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:scale-[1.02]
              active:scale-95
            "
          >
            <ReceiptIndianRupee
              size={17}
              className="
                transition
                group-hover:rotate-6
              "
            />
            Record Payment
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ======================================================
   Stat Box
====================================================== */

function StatBox({
  label,

  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-3
      "
    >
      <p
        className="
          text-[11px]
          uppercase
          tracking-wider
          text-white/40
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          truncate
          text-sm
          font-medium
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}
