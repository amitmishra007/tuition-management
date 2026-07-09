export interface DashboardData {
  totalStudents: number;

  attendance: {
    recorded: boolean;
    present: number;
    total: number;
  };

  fees: {
    pendingStudents: number;
    dueThisMonth: number;
  };

  birthdaysToday: number;

  consecutiveAbsentees: number;
}
