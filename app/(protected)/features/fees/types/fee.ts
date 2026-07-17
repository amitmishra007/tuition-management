export type PaymentStatus = "paid" | "pending" | "partial" | "na";

export interface FeeMonth {
  month: number;

  year: number;

  amount: number;

  paidAmount: number;

  paidOn: string | null;

  status: PaymentStatus;
}

export interface PaymentStudent {
  id: string;

  admissionNo: string;

  firstName: string;

  lastName: string;

  profilePhoto: string | null;

  studentClass: string;

  batch: string;

  monthlyFee: number | null;

  months: FeeMonth[];
}
