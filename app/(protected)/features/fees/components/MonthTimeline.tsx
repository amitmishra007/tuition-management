"use client";

import { format, isSameMonth } from "date-fns";
import type { FeeMonth } from "../types/fee";
import TimelineCard from "./TimelineCard";
import TimelineConnector from "./TimelineConnector";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.95,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

interface Props {
  months: FeeMonth[];
}

export default function MonthTimeline({ months }: Props) {
  const today = new Date();

  if (!months.length) {
    return (
      <div
        className="
          flex
          h-48
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          border-slate-200
          bg-linear-to-br
          from-slate-50
          via-white
          to-slate-50
        "
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700">
            No payment history
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Timeline will appear once fee records exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* left fade */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-20
          h-full
          w-10
          bg-linear-to-r
          from-white
          via-white/90
          to-transparent
        "
      />

      {/* right fade */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-20
          h-full
          w-10
          bg-linear-to-l
          from-white
          via-white/90
          to-transparent
        "
      />

      <motion.div
        layout
        className="
          timeline-scroll
          relative
          flex
          snap-x
          snap-mandatory
          items-start
          gap-5
          overflow-x-auto
          px-3
          py-4
          scroll-smooth
        "
      >
        {months.map((month, index) => {
          const date = new Date(month.year, month.month - 1);

          const isCurrent = isSameMonth(today, date);

          const isLast = index === months.length - 1;

          return (
            <motion.div
              key={`${month.month}-${month.year}`}
              variants={item}
              layout
              className="
                flex
                shrink-0
                snap-start
                items-center
                gap-4
              "
            >
              <TimelineCard month={month} isCurrent={isCurrent} />

              {!isLast && <TimelineConnector paid={month.status === "paid"} />}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-slate-200
          bg-linear-to-r
          from-slate-50
          via-white
          to-slate-50
          px-5
          py-3
        "
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Timeline
          </p>

          <p className="text-sm text-slate-600">
            Showing payment history from{" "}
            <span className="font-semibold text-slate-900">
              {format(
                new Date(months[0].year, months[0].month - 1),
                "MMM yyyy",
              )}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-900">
              {format(
                new Date(
                  months[months.length - 1].year,
                  months[months.length - 1].month - 1,
                ),
                "MMM yyyy",
              )}
            </span>
          </p>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Legend color="from-emerald-500 to-green-500" label="Paid" />
          <Legend color="from-sky-500 to-indigo-500" label="Partial" />
          <Legend color="from-amber-500 to-orange-500" label="Pending" />
        </div>
      </div>
    </motion.div>
  );
}

interface LegendProps {
  label: string;
  color: string;
}

function Legend({ label, color }: LegendProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full bg-linear-to-r ${color}`} />

      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}
