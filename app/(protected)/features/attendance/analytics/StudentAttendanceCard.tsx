"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  GraduationCap,
  School,
  Flame,
  CalendarDays,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
} from "lucide-react";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";

import StudentAttendanceCalendar from "./StudentAttendanceCalendar";

import type { AttendanceCalendarDay } from "../types";

interface Props {
  student: {
    id: string;
    name: string;
    class: string;
    school: string;
    batch: string;
    photo?: string | null;
  };

  calendar: AttendanceCalendarDay[];

  present: number;
  absent: number;
  holidays: number;
  percentage: number;
  streak: number;

  month: Date;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
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

export default function StudentAttendanceCard({
  student,
  calendar,
  present,
  absent,
  holidays,
  percentage,
  streak,
  month,
}: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      layout
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/60
        bg-white/80
        shadow-[0_35px_100px_rgba(15,23,42,0.15)]
        backdrop-blur-xl
      "
    >
      {/* Ambient Background */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,.18),transparent_35%)]
        "
      />
      {/* HERO */}
      <motion.div
        variants={itemVariants}
        className="
          relative
          overflow-hidden
          bg-linear-to-br
          from-sky-500
          via-indigo-500
          to-cyan-500
          p-6
        "
      >
        {/* Animated glow */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-white
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
          "
        >
          {/* Avatar */}

          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
            }}
            className="
              relative
              h-24
              w-24
              shrink-0
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-linear-to-tr
                from-cyan-300
                via-white
                to-indigo-300
                blur-sm
              "
            />

            <Image
              src={student.photo || "/images/avatar.png"}
              alt={student.name}
              fill
              sizes="96px"
              className="
                relative
                rounded-full
                border-4
                border-white/90
                object-cover
                shadow-2xl
              "
            />
          </motion.div>

          {/* Student Details */}

          <div className="flex-1">
            <motion.h2
              variants={itemVariants}
              className="
                text-3xl
                font-black
                tracking-tight
                text-white
              "
            >
              {student.name}
            </motion.h2>

            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-3
                text-sm
                text-white/90
              "
            >
              <InfoChip icon={<GraduationCap />} text={student.class} />

              <InfoChip icon={<School />} text={student.school} />

              <InfoChip icon={<CalendarDays />} text={student.batch} />
            </div>
          </div>

          {/* Premium Attendance Ring */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
            }}
            className="
              relative
              h-40
              w-40
              rounded-full
              bg-white/10
              p-3
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="72%"
                outerRadius="100%"
                data={[
                  {
                    value: percentage,
                  },
                ]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

                <RadialBar
                  dataKey="value"
                  cornerRadius={30}
                  fill="url(#attendanceGradient)"
                  background={{
                    fill: "rgba(255,255,255,.18)",
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
              "
            >
              <motion.span
                initial={{
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="
                  text-4xl
                  font-black
                  text-white
                "
              >
                {percentage}%
              </motion.span>

              <span
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-widest
                  text-white/80
                "
              >
                Attendance
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* STATISTICS */}
      <motion.div
        variants={itemVariants}
        className="
          grid
          gap-3
          p-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <PremiumStat
          icon={<CheckCircle2 />}
          label="Present"
          value={present}
          gradient="from-emerald-400 to-green-600"
        />

        <PremiumStat
          icon={<XCircle />}
          label="Absent"
          value={absent}
          gradient="from-rose-400 to-red-600"
        />

        <PremiumStat
          icon={<CalendarDays />}
          label="Holiday"
          value={holidays}
          gradient="from-amber-400 to-orange-500"
        />

        <PremiumStat
          icon={<Flame />}
          label="Streak"
          value={`${streak} days`}
          gradient="from-orange-400 to-red-500"
        />
      </motion.div>{" "}
      {/* CALENDAR */}
      <motion.div
        variants={itemVariants}
        className="
          mx-5
          mb-5
          rounded-[28px]
          border
          border-slate-200/70
          bg-linear-to-br
          from-slate-50
          via-white
          to-slate-100
          p-5
          shadow-inner
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
          <div>
            <h3
              className="
                text-lg
                font-bold
                tracking-tight
                text-slate-800
              "
            >
              Attendance Calendar
            </h3>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Monthly attendance overview
            </p>
          </div>

          <div
            className="
              rounded-full
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
            "
          >
            {month.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        <StudentAttendanceCalendar month={month} days={calendar} />
      </motion.div>
      {/* FOOTER ACTION */}
      <motion.div
        variants={itemVariants}
        className="
          flex
          justify-end
          border-t
          border-slate-200
          bg-linear-to-r
          from-slate-50
          to-white
          p-5
        "
      >
        <motion.div
          whileHover={{
            scale: 1.04,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          <Button
            className="
              group
              rounded-2xl
              bg-linear-to-r
              from-indigo-500
              via-sky-500
              to-cyan-500
              px-6
              py-6
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-sky-500/30
              transition-all
              hover:shadow-xl
            "
          >
            <ClipboardCheck
              className="
                mr-2
                h-5
                w-5
                transition-transform
                group-hover:rotate-12
              "
            />
            Mark Attendance
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/*
  Premium info pill
*/

function InfoChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/20
        bg-white/10
        px-4
        py-2
        backdrop-blur-md
      "
    >
      <span
        className="
          h-4
          w-4
          [&>svg]:h-4
          [&>svg]:w-4
        "
      >
        {icon}
      </span>

      <span>{text}</span>
    </motion.div>
  );
}

/*
 Premium statistic tile
*/

function PremiumStat({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="
        group
        flex
        items-center
        gap-4
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-linear-to-br
          ${gradient}
          text-white
          shadow-lg
        `}
      >
        {icon}
      </div>

      <div>
        <div
          className="
            text-2xl
            font-black
            text-slate-800
          "
        >
          {value}
        </div>

        <div
          className="
            text-xs
            font-semibold
            uppercase
            tracking-widest
            text-slate-400
          "
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}
