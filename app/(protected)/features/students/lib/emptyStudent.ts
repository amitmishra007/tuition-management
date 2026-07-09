import type { Student } from "../types/student";

export const emptyStudent: Student = {
  id: "",

  admissionNo: "",

  firstName: "",
  lastName: "",

  gender: "Male",

  dob: null,
  joiningDate: null,

  fatherName: null,
  motherName: null,

  phone: null,
  alternatePhone: null,
  email: null,

  address: null,
  city: null,
  state: null,
  pincode: null,

  school: null,
  studentClass: null,
  batch: null,

  monthlyFee: null,
  feeStatus: "Pending",

  lastFeePaid: null,
  nextDueDate: null,

  profilePhoto: null,

  remarks: null,

  status: "Active",
};
