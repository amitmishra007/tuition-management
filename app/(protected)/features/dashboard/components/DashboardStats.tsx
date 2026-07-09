"use client";

import { Users, UserCheck, IndianRupee, AlertTriangle } from "lucide-react";

import DashboardStatCard from "./DashboardStatCard";

interface Props {
  totalStudents: number;
  presentToday: number;
  pendingFees: number;
  dueThisMonth: number;
}

export default function DashboardStats({
  totalStudents,
  presentToday,
  pendingFees,
  dueThisMonth,
}: Props) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Overview</h2>

        <p className="text-sm text-slate-500">Today&apos;s important numbers</p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <DashboardStatCard
          title="Students"
          value={totalStudents}
          subtitle="Currently enrolled"
          icon={Users}
          color="blue"
        />

        <DashboardStatCard
          title="Present"
          value={presentToday}
          subtitle="Today's attendance"
          icon={UserCheck}
          color="green"
        />

        <DashboardStatCard
          title="Pending Fees"
          value={pendingFees}
          subtitle="Students"
          icon={IndianRupee}
          color="orange"
        />

        <DashboardStatCard
          title="Due This Month"
          value={dueThisMonth}
          subtitle="Fee reminders"
          icon={AlertTriangle}
          color="red"
        />
      </div>
    </section>
  );
}
