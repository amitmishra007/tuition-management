"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Clock3,
  IndianRupee,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import type { FeeMonth } from "../types/fee";

interface Props {
  month: FeeMonth;
  isCurrent: boolean;
}

const STATUS = {
  paid: {
    label: "Paid",
    icon: CheckCircle2,

    gradient: "from-emerald-500 via-green-500 to-teal-500",

    background: "from-emerald-50 via-white to-teal-50",

    border: "border-emerald-200",

    pill: "from-emerald-500 to-green-500",

    iconBg: "bg-emerald-100 text-emerald-700",

    glow: "shadow-[0_18px_45px_rgba(16,185,129,.18)]",
  },

  partial: {
    label: "Partial",
    icon: AlertCircle,

    gradient: "from-sky-500 via-cyan-500 to-indigo-500",

    background: "from-sky-50 via-white to-indigo-50",

    border: "border-sky-200",

    pill: "from-sky-500 to-indigo-500",

    iconBg: "bg-sky-100 text-sky-700",

    glow: "shadow-[0_18px_45px_rgba(59,130,246,.18)]",
  },

  pending: {
    label: "Pending",
    icon: Clock3,

    gradient: "from-amber-500 via-orange-500 to-red-500",

    background: "from-orange-50 via-white to-red-50",

    border: "border-orange-200",

    pill: "from-amber-500 to-orange-500",

    iconBg: "bg-orange-100 text-orange-700",

    glow: "shadow-[0_18px_45px_rgba(245,158,11,.20)]",
  },

  na: {
    label: "N/A",
    icon: Clock3,

    gradient: "from-slate-400 to-slate-500",

    background: "from-slate-50 via-white to-slate-100",

    border: "border-slate-200",

    pill: "from-slate-400 to-slate-500",

    iconBg: "bg-slate-100 text-slate-600",

    glow: "shadow-none",
  },
} as const;

export default function TimelineCard({ month, isCurrent }: Props) {
  const config = STATUS[month.status];

  const Icon = config.icon;

  const date = new Date(month.year, month.month - 1);

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className={cn(
        `
        group
        relative
        w-37.5
        shrink-0
        overflow-hidden
        rounded-[28px]
        border
        bg-linear-to-br
        p-5
        backdrop-blur-xl
        transition-all
        duration-500
      `,
        config.background,
        config.border,
        config.glow,
        isCurrent &&
          `
          ring-2
          ring-violet-500/40
          shadow-[0_25px_70px_rgba(124,58,237,.25)]
        `,
      )}
    >
      {/* Shine */}

      <motion.div
        animate={{
          x: ["-120%", "180%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
        className="
          absolute
          inset-y-0
          w-16
          rotate-12
          bg-white/40
          blur-xl
        "
      />

      {/* Current */}

      {isCurrent && (
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-linear-to-r
            from-violet-600
            to-fuchsia-600
            px-2
            py-1
            text-[9px]
            font-bold
            tracking-wider
            text-white
          "
        >
          CURRENT
        </motion.div>
      )}

      {/* Month */}

      <p
        className="
          text-center
          text-xs
          font-bold
          tracking-[0.35em]
          text-slate-500
        "
      >
        {format(date, "MMM").toUpperCase()}
      </p>

      {/* Amount */}

      <div className="mt-5 text-center">
        <div className="flex items-center justify-center gap-1">
          <IndianRupee
            size={18}
            className="
              text-slate-500
            "
          />

          <span
            className="
              text-3xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            {month.paidAmount > 0
              ? month.paidAmount.toLocaleString("en-IN")
              : month.amount.toLocaleString("en-IN")}
          </span>
        </div>

        {month.status === "partial" && (
          <p
            className="
              mt-1
              text-[11px]
              text-slate-500
            "
          >
            of ₹{month.amount.toLocaleString("en-IN")}
          </p>
        )}
      </div>

      {/* Status */}

      <div
        className="
          mt-5
          flex
          justify-center
        "
      >
        <div
          className={cn(
            `
            inline-flex
            items-center
            gap-1.5
            rounded-full
            bg-linear-to-r
            px-3
            py-1.5
            text-[11px]
            font-semibold
            text-white
          `,
            config.pill,
          )}
        >
          <Icon size={13} />

          {config.label}
        </div>
      </div>

      {/* Date */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-white/60
          bg-white/70
          p-3
          backdrop-blur-md
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <div
            className={cn(
              `
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
            `,
              config.iconBg,
            )}
          >
            <CalendarDays size={16} />
          </div>

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-slate-500
              "
            >
              Payment
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {month.paidOn
                ? format(new Date(month.paidOn), "dd MMM")
                : format(date, "01 MMM")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status */}

      <motion.div
        whileHover={{
          rotate: 8,
        }}
        className="
          mt-5
          flex
          justify-center
        "
      >
        <div
          className={cn(
            `
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-br
            text-white
            shadow-lg
          `,
            config.gradient,
          )}
        >
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </motion.div>
    </motion.div>
  );
}
