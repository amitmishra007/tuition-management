"use client";
import type { Variants } from "framer-motion";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isFuture,
  isToday,
  startOfMonth,
} from "date-fns";

import { motion } from "framer-motion";
import clsx from "clsx";

import type { AttendanceCalendarDay } from "../types";

interface Props {
  days: AttendanceCalendarDay[];
  month: Date;
}

const STATUS_STYLES = {
  Present: `
    bg-gradient-to-br
    from-emerald-400
    via-emerald-500
    to-green-600
    text-white
    shadow-emerald-500/30
  `,

  Absent: `
    bg-gradient-to-br
    from-rose-400
    via-red-500
    to-rose-700
    text-white
    shadow-rose-500/30
  `,

  Holiday: `
    bg-gradient-to-br
    from-amber-300
    via-orange-400
    to-yellow-500
    text-slate-900
    shadow-orange-400/30
  `,

  Pending: `
    bg-gradient-to-br
    from-slate-200
    via-slate-100
    to-white
    text-slate-400
    border
    border-slate-200
  `,

  None: `
    bg-gradient-to-br
    from-slate-50
    via-white
    to-slate-100
    text-slate-400
    border
    border-slate-200/70
  `,
};

const dayVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 10,
  },

  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      delay: i * 0.015,
      duration: 0.3,
      type: "spring" as const,
      stiffness: 180,
    },
  }),
};

export default function StudentAttendanceCalendar({ month, days }: Props) {
  const first = startOfMonth(month);

  const last = endOfMonth(month);

  const calendarDays = eachDayOfInterval({
    start: first,
    end: last,
  });

  const offset = getDay(first);

  const attendanceMap = new Map(days.map((item) => [item.date, item]));

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="
overflow-hidden
rounded-2xl
sm:rounded-[28px]
border
border-white/60
bg-white/70
p-3
sm:p-5
shadow-[0_20px_60px_rgba(15,23,42,.08)]
backdrop-blur-xl
"
    >
      {/* Month Header */}

      <div
        className="
mb-4
flex
items-start
justify-between
gap-3
"
      >
        <div>
          <h3
            className="
  text-base
  sm:text-lg
  font-black
  tracking-tight
  text-slate-800
"
          >
            {format(month, "MMMM yyyy")}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500">
            Attendance timeline
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-linear-to-r
            from-sky-100
            via-indigo-100
            to-cyan-100
           px-3
py-1.5
text-[10px]
sm:px-4
sm:py-2
sm:text-xs
            font-bold
            text-indigo-700
          "
        >
          Monthly View
        </div>
      </div>

      {/* Week Header */}

      <div
        className="
          mb-3
          grid
          grid-cols-7
          gap-2
        "
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="
                text-center
                text-[11px]
                font-bold
                uppercase
                tracking-widest
                text-slate-400
              "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}

      <div
        className="
          grid
          grid-cols-7
          gap-2
        "
      >
        {Array.from({
          length: offset,
        }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {calendarDays.map((date, index) => {
          const key = format(date, "yyyy-MM-dd");

          const item = attendanceMap.get(key);

          let status: "Present" | "Absent" | "Holiday" | "Pending" | "None" =
            "None";

          if (item) {
            status = item.status;
          } else if (isFuture(date)) {
            status = "Pending";
          }

          return (
            <motion.div
              key={key}
              custom={index}
              variants={dayVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.12,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className={clsx(
                `
                    relative
                    aspect-square
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    text-xs
                    font-black
                    cursor-pointer
                    shadow-lg
                    transition-all
                    `,

                STATUS_STYLES[status],

                isToday(date) &&
                  `
                    ring-2
                    ring-sky-400
                    ring-offset-2
                    `,
              )}
            >
              {format(date, "d")}

              {item?.remarks && (
                <span
                  className="
                          absolute
                          right-1
                          top-1
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-white
                          shadow
                        "
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}

      <div
        className="
          mt-6
          flex
          flex-wrap
          gap-3
        "
      >
        <Legend
          gradient="
          from-emerald-400
          to-green-600"
          text="Present"
        />

        <Legend
          gradient="
          from-rose-400
          to-red-600"
          text="Absent"
        />

        <Legend
          gradient="
          from-amber-300
          to-orange-500"
          text="Holiday"
        />

        <Legend
          gradient="
          from-slate-200
          to-white"
          text="Pending"
        />
      </div>
    </motion.div>
  );
}

function Legend({ gradient, text }: { gradient: string; text: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-full
        border
        bg-white
        px-3
        py-1.5
        shadow-sm
      "
    >
      <span
        className={clsx(
          `
          h-3
          w-3
          rounded-full
          bg-linear-to-br
          `,
          gradient,
        )}
      />

      <span
        className="
          text-xs
          font-semibold
          text-slate-600
        "
      >
        {text}
      </span>
    </div>
  );
}
