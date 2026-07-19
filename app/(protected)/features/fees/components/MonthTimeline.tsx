"use client";

import { motion, type Variants } from "framer-motion";
import { Check, IndianRupee, Minus } from "lucide-react";
import type { ReactNode } from "react";
import type { FeeMonth } from "../types/fee";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 24,
    },
  },
};

interface Props {
  months: FeeMonth[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthTimeline({ months }: Props) {
  const current = new Date();

  const currentYear = current.getFullYear();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
        {MONTHS.map((label, index) => {
          const monthNo = index + 1;

          const fee = months.find(
            (m) => m.month === monthNo && m.year === currentYear,
          );

          let variant: "paid" | "pending" | "future" | "na" = "na";

          if (fee) {
            if (fee.status === "paid") {
              variant = "paid";
            } else {
              variant = "pending";
            }
          } else {
            if (monthNo > current.getMonth() + 1) {
              variant = "future";
            }
          }

          return (
            <motion.div
              key={label}
              variants={item}
              whileHover={{
                y: -4,
                scale: 1.05,
              }}
              className="group"
            >
              <MonthBubble label={label} variant={variant} />
            </motion.div>
          );
        })}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <Legend variant="paid" label="Paid" />
          <Legend variant="pending" label="Pending" />
          <Legend variant="future" label="Upcoming" />
          <Legend variant="na" label="N/A" />
        </div>
      </div>
    </motion.div>
  );
}

type Variant = "paid" | "pending" | "future" | "na";

interface MonthBubbleProps {
  label: string;
  variant: Variant;
}

function MonthBubble({ label, variant }: MonthBubbleProps) {
  type BubbleStyle = {
    outer: string;
    inner: string;
    icon: ReactNode;
  };

  const styles = {
    paid: {
      outer: "border-emerald-200 bg-emerald-50 shadow-emerald-200/60",
      inner: "bg-gradient-to-br from-emerald-500 to-green-500 text-white",
      icon: <Check size={14} />,
    },
    pending: {
      outer: "border-rose-200 bg-rose-50 shadow-rose-200/60",
      inner: "bg-gradient-to-br from-rose-500 to-red-500 text-white",
      icon: <IndianRupee size={14} />,
    },
    future: {
      outer: "border-amber-200 bg-amber-50 shadow-amber-200/60",
      inner: "bg-gradient-to-br from-amber-400 to-orange-400 text-white",
      icon: <IndianRupee size={14} />,
    },
    na: {
      outer: "border-slate-200 bg-slate-50 opacity-50",
      inner: "bg-slate-200 text-slate-500",
      icon: <Minus size={14} />,
    },
  } satisfies Record<Variant, BubbleStyle>;

  const style = styles[variant];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg group-hover:shadow-xl ${style.outer}`}
      >
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${style.inner}`}
        >
          {style.icon}
        </div>
      </div>

      <span className="text-xs font-semibold text-slate-600">{label}</span>
    </div>
  );
}

interface LegendProps {
  label: string;
  variant: Variant;
}

function Legend({ label, variant }: LegendProps) {
  const colors = {
    paid: "bg-emerald-500",
    pending: "bg-rose-500",
    future: "bg-amber-500",
    na: "bg-slate-300",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${colors[variant]}`} />
      <span className="text-slate-500">{label}</span>
    </div>
  );
}
