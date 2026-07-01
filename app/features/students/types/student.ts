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

  school: string;

  studentClass: string;

  monthlyFee: number;

  profilePhoto: string;

  status: "Active" | "Inactive";
}
