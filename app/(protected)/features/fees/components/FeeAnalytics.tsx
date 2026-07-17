"use client";

import CountUp from "react-countup";
import { IndianRupee, Wallet, Clock3, Users2, TrendingUp } from "lucide-react";

import { motion } from "framer-motion";

import { PaymentStudent } from "../types/fee";

interface Props {
  students: PaymentStudent[];
}

export default function FeeAnalytics({ students }: Props) {
  const allMonths = students.flatMap((student) => student.months);

  const collectedRevenue = allMonths.reduce(
    (sum, month) => sum + month.paidAmount,
    0,
  );

  const expectedRevenue = allMonths.reduce(
    (sum, month) => sum + month.amount,
    0,
  );

  const pendingRevenue = expectedRevenue - collectedRevenue;

  const pendingStudents = students.filter((student) =>
    student.months.some(
      (month) => month.status === "pending" || month.status === "partial",
    ),
  ).length;

  const collectionRate =
    expectedRevenue === 0
      ? 0
      : Math.round((collectedRevenue / expectedRevenue) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <AnalyticsCard
        title="Collected"
        value={collectedRevenue}
        prefix="₹"
        icon={<IndianRupee className="h-5 w-5" />}
        gradient="from-emerald-500 via-green-500 to-teal-500"
      />

      <AnalyticsCard
        title="Pending"
        value={pendingRevenue}
        prefix="₹"
        icon={<Clock3 className="h-5 w-5" />}
        gradient="from-rose-500 via-red-500 to-pink-500"
      />

      <AnalyticsCard
        title="Students Due"
        value={pendingStudents}
        icon={<Users2 className="h-5 w-5" />}
        gradient="from-orange-500 via-amber-500 to-yellow-500"
      />

      <AnalyticsCard
        title="Collection"
        value={`${collectionRate}%`}
        icon={<TrendingUp className="h-5 w-5" />}
        gradient="from-sky-500 via-cyan-500 to-blue-500"
      />

      <AnalyticsCard
        title="Expected"
        value={expectedRevenue}
        prefix="₹"
        icon={<Wallet className="h-5 w-5" />}
        gradient="from-violet-500 via-fuchsia-500 to-purple-500"
      />
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  gradient: string;
  icon: React.ReactNode;
  prefix?: string;
}

function AnalyticsCard({
  title,
  value,
  gradient,
  icon,
  prefix,
}: AnalyticsCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm"
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <div className="mt-3 flex items-end gap-1">
            {prefix && (
              <span className="text-lg font-semibold text-slate-500">
                {prefix}
              </span>
            )}

            <span className="text-3xl font-black tracking-tight">
              {typeof value === "number" ? (
                <CountUp end={value} duration={1} separator="," />
              ) : (
                value
              )}
            </span>
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full bg-linear-to-r ${gradient}`}
        />
      </div>
    </motion.div>
  );
}
