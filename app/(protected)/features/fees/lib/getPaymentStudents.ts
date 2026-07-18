import { createClient } from "@/lib/supabase/server";
import { mapPaymentStudent } from "./mapPaymentStudent";

export async function getPaymentStudents() {
  const supabase = await createClient();

  const [
    { data: students, error: studentsError },
    { data: feeRecords, error: feeError },
  ] = await Promise.all([
    supabase.from("students").select("*").order("firstName"),

    supabase.from("student_fee_records").select("*").order("billing_month"),
  ]);

  if (studentsError) throw studentsError;
  if (feeError) throw feeError;

  const feeMap = new Map<string, typeof feeRecords>();

  for (const record of feeRecords ?? []) {
    const existing = feeMap.get(record.student_id);

    if (existing) {
      existing.push(record);
    } else {
      feeMap.set(record.student_id, [record]);
    }
  }

  return (students ?? []).map((student) =>
    mapPaymentStudent(student, feeMap.get(student.id) ?? []),
  );
}
