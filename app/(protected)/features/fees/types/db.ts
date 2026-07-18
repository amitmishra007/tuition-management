import type { Database } from "@/types/db";

export type StudentRow = Database["public"]["Tables"]["students"]["Row"];

export type StudentFeeRecordRow =
  Database["public"]["Tables"]["student_fee_records"]["Row"];
