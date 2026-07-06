export interface Student {
  id: string;

  admissionNo: string;

  firstName: string;

  lastName: string;

  gender: "Male" | "Female" | "Other";

  dob: string | null;

  joiningDate: string | null;

  fatherName: string | null;

  motherName: string | null;

  phone: string | null;

  alternatePhone: string | null;

  email: string | null;

  address: string | null;

  city: string | null;

  state: string | null;

  pincode: string | null;

  school: string | null;

  studentClass: string | null;

  batch: string | null;

  monthlyFee: number | null;

  feeStatus: "Paid" | "Pending" | null;

  lastFeePaid: string | null;

  nextDueDate: string | null;

  profilePhoto: string | null;

  remarks: string | null;

  status: "Active" | "Inactive" | null;

  created_at?: string;

  updated_at?: string;
}

/**
 * Database row is identical to Student.
 */
export type StudentRow = Student;
