// AttendancePercentage.tsx

"use client";

import { motion } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  value: number;
}

export default function AttendancePercentage({ value }: Props) {
  const data = [
    {
      name: "attendance",
      value,
      fill: "#10b981",
    },
  ];

  return (
    <motion.div
      initial={{
        scale: 0.7,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
      }}
      className="relative h-18 w-18"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="74%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          data={data}
        >
          <defs>
            <linearGradient id="attendanceGradient">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="55%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          <RadialBar
            background={{
              fill: "#e2e8f0",
            }}
            dataKey="value"
            cornerRadius={20}
            fill="url(#attendanceGradient)"
            animationDuration={1200}
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
        <span
          className="
            text-base
            font-black
            tracking-tight
            text-slate-800
          "
        >
          {value}
        </span>

        <span
          className="
            -mt-1
            text-[9px]
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
          "
        >
          %
        </span>
      </div>
    </motion.div>
  );
}
