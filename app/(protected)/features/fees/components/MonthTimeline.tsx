"use client";

import { motion } from "framer-motion";
import { Check, Clock3, AlertCircle } from "lucide-react";

import type { FeeMonth } from "../types/fee";

interface Props {
  months: FeeMonth[];

  onSelect?: (month: FeeMonth) => void;
}

/* =====================================================
   Month Labels
===================================================== */

const MONTH_LABELS = [
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D",
];

/* =====================================================
   Styles
===================================================== */

const STATUS = {
  paid: {
    label: "Paid",

    node: "bg-emerald-400 text-white shadow-emerald-400/40",

    ring: "ring-emerald-300/30",

    line: "bg-emerald-400",
  },

  pending: {
    label: "Pending",

    node: "bg-amber-400 text-white shadow-amber-400/40",

    ring: "ring-amber-300/30",

    line: "bg-amber-300/40",
  },

  partial: {
    label: "Partial",

    node: "bg-blue-400 text-white shadow-blue-400/40",

    ring: "ring-blue-300/30",

    line: "bg-blue-300/40",
  },

  na: {
    label: "Not paid",

    node: "bg-slate-300 text-white shadow-slate-300/30",

    ring: "ring-slate-300/20",

    line: "bg-slate-200",
  },
};

export default function MonthTimeline({ months, onSelect }: Props) {
  return (
    <div
      className="
        relative
        w-full
        overflow-x-auto
        pb-3
        scrollbar-hide
      "
    >
      <div
        className="
          relative
          flex
          min-w-max
          items-start
          gap-6
          px-2
          pt-2
        "
      >
        {/* Connection Line */}

        <div
          className="
            absolute
            top-11
            left-8
            right-8
            h-0.5
            bg-white/10
          "
        />

        {months.map((month, index) => {
          const style = STATUS[month.status];

          return (
            <motion.button
              key={`${month.year}-${month.month}`}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -5,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => onSelect?.(month)}
              className="
                group
                relative
                flex
                w-12
                flex-col
                items-center
              "
            >
              <span
                className="
                  mb-3
                  text-xs
                  font-semibold
                  text-white/50
                "
              >
                {MONTH_LABELS[month.month - 1]}
              </span>

              <div
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                "
              >
                <motion.div
                  animate={
                    month.status === "pending"
                      ? {
                          scale: [1, 1.15, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className={`
                    absolute
                    inset-0
                    rounded-full
                    ring-8
                    ${style.ring}
                  `}
                />{" "}
                <motion.div
                  layoutId={`node-${month.year}-${month.month}`}
                  className={`
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    shadow-lg
                    ${style.node}
                  `}
                >
                  {month.status === "paid" && (
                    <Check size={16} strokeWidth={3} />
                  )}

                  {month.status === "pending" && <Clock3 size={16} />}

                  {month.status === "partial" && <AlertCircle size={16} />}
                </motion.div>
              </div>

              {/* Month Card */}

              <div
                className="
                  mt-3
                  text-center
                "
              >
                <p
                  className="
                    text-[10px]
                    text-white/40
                  "
                >
                  {month.month.toString().padStart(2, "0")}/{month.year}
                </p>
              </div>

              {/* Tooltip */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-full
                  left-1/2
                  mb-4
                  -translate-x-1/2
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:opacity-100
                  z-50
                "
              >
                <div
                  className="
                    min-w-32.5
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-950/95
                    px-4
                    py-3
                    text-center
                    shadow-2xl
                    backdrop-blur-xl
                  "
                >
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    {new Date(month.year, month.month - 1).toLocaleString(
                      "default",
                      {
                        month: "long",
                      },
                    )}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-white/50
                    "
                  >
                    {style.label}
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    ₹{month.amount.toLocaleString("en-IN")}
                  </p>

                  {month.paidAmount > 0 && (
                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-emerald-300
                      "
                    >
                      Paid ₹{month.paidAmount.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
