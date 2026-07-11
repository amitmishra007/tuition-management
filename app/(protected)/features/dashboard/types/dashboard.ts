export interface DashboardStudent {
  id: string;

  admissionNo: string;

  firstName: string;
  lastName: string;

  gender: string;

  dob: string;
  joiningDate: string;

  fatherName: string;
  motherName: string | null;

  phone: string;
  alternatePhone: string | null;

  email: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  school: string;
  studentClass: string;
  batch: string;

  monthlyFee: number;

  feeStatus: "Paid" | "Pending";

  lastFeePaid: string | null;
  nextDueDate: string | null;

  profilePhoto: string | null;

  remarks: string | null;

  status: "Active" | "Inactive";

  created_at?: string;
  updated_at?: string;
}

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
    students: DashboardStudent[];
  };

  birthdays: {
    total: number;
    students: DashboardStudent[];
  };

  absentees: {
    total: number;
    students: DashboardStudent[];
  };
}
