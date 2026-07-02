import type { Student } from "../types/student";

export function mapStudent(row: any): Student {
  return {
    id: row.id,

    admissionNo: row.admissionno,

    firstName: row.firstname,
    lastName: row.lastname,

    gender: row.gender,

    dob: row.dob,
    joiningDate: row.joiningdate,

    fatherName: row.fathername,
    motherName: row.mothername,

    phone: row.phone,
    alternatePhone: row.alternatephone,

    email: row.email,

    address: row.address,
    city: row.city,
    state: row.state,
    pincode: row.pincode,

    school: row.school,
    studentClass: row.studentclass,

    batch: row.batch,

    monthlyFee: row.monthlyfee,

    feeStatus: row.feestatus,

    lastFeePaid: row.lastfeepaid,
    nextDueDate: row.nextduedate,

    profilePhoto: row.profilephoto,

    remarks: row.remarks,

    status: row.status,
  };
}
