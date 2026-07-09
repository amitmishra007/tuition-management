"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "red" | "purple" | "indigo";
  onClick?: () => void;
}

const styles = {
  blue: {
    card: "bg-blue-50 border-blue-100",
    icon: "bg-blue-100 text-blue-700",
  },
  green: {
    card: "bg-emerald-50 border-emerald-100",
    icon: "bg-emerald-100 text-emerald-700",
  },
  orange: {
    card: "bg-orange-50 border-orange-100",
    icon: "bg-orange-100 text-orange-700",
  },
  red: {
    card: "bg-red-50 border-red-100",
    icon: "bg-red-100 text-red-700",
  },
  purple: {
    card: "bg-purple-50 border-purple-100",
    icon: "bg-purple-100 text-purple-700",
  },
  indigo: {
    card: "bg-indigo-50 border-indigo-100",
    icon: "bg-indigo-100 text-indigo-700",
  },
};

export default function DashboardStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  onClick,
}: DashboardStatCardProps) {
  const c = styles[color];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
      }}
      onClick={onClick}
      className={`
        rounded-3xl
        border
        ${c.card}
        p-4
        sm:p-5
        shadow-sm
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-slate-500
            "
          >
            {title}
          </p>

          <div
            className="
              mt-2
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            <CountUp end={value} duration={0.8} separator="," />
          </div>

          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            sm:h-12
            sm:w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${c.icon}
          `}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>
    </motion.div>
  );
}
