import QuickActions from "./components/QuickActions";
import DashboardStats from "./components/DashboardStats";
import DashboardSnapshot from "./components/DashboardSnapshot";

import { getDashboardData } from "./lib/dashboardService";
import { getDashboardUser } from "./lib/userService";

export default async function DashboardPage() {
  const [dashboard] = await Promise.all([
    getDashboardData(),
    getDashboardUser(),
  ]);

  return (
    <div className="space-y-8">
      <DashboardSnapshot
        attendanceRecorded={dashboard.attendance.recorded}
        present={dashboard.attendance.present}
        total={dashboard.attendance.total}
        pendingFees={dashboard.fees.pendingStudents}
        birthdays={dashboard.birthdaysToday}
        consecutiveAbsentees={dashboard.consecutiveAbsentees}
      />

      <QuickActions />

      <DashboardStats
        totalStudents={dashboard.totalStudents}
        presentToday={dashboard.attendance.present}
        pendingFees={dashboard.fees.pendingStudents}
        dueThisMonth={dashboard.fees.dueThisMonth}
      />
    </div>
  );
}
