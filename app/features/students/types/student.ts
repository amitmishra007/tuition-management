export interface Student {
  id: string;

  admissionNo: string;

  firstName: string;

  lastName: string;

  gender: "Male" | "Female" | "Other";

  dob: string;

  joiningDate: string;

  fatherName: string;

  motherName?: string;

  phone: string;

  alternatePhone: string;

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

  lastFeePaid: string;

  nextDueDate: string;

  profilePhoto: string;

  remarks: string;

  status: "Active" | "Inactive";
}
