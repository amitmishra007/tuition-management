import type { PaymentStudent, PaymentStatus } from "../types/fee";
import type { StudentRow, StudentFeeRecordRow } from "../types/db";

function mapPaymentStatus(
  status: StudentFeeRecordRow["status"],
): PaymentStatus {
  switch (status) {
    case "Paid":
      return "paid";

    case "Pending":
      return "pending";

    case "Partial":
      return "partial";

    default:
      return "na";
  }
}

export function mapPaymentStudent(
  student: StudentRow,
  records: StudentFeeRecordRow[],
): PaymentStudent {
  const months = [...records]
    .sort(
      (a, b) =>
        new Date(a.billing_month).getTime() -
        new Date(b.billing_month).getTime(),
    )
    .map((record) => {
      const billingDate = new Date(record.billing_month);

      return {
        month: billingDate.getMonth() + 1,

        year: billingDate.getFullYear(),

        amount: Number(record.amount),

        paidAmount: Number(record.paid_amount),

        paidOn: record.paid_on,

        status: mapPaymentStatus(record.status),
      };
    });

  return {
    id: student.id,

    admissionNo: student.admissionNo,

    firstName: student.firstName,

    lastName: student.lastName,

    profilePhoto: student.profilePhoto,

    studentClass: student.studentClass ?? "",

    batch: student.batch ?? "",

    monthlyFee: student.monthlyFee ?? 0,

    months,
  };
}
