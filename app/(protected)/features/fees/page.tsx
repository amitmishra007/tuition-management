import { createClient } from "@/lib/supabase/server";

import PaymentGrid from "./components/PaymentGrid";

import type { Student } from "../students/types/student";
import { mapStudent } from "../students/lib/mapStudent";

import type { PaymentStudent } from "./types/fee";

function createPaymentStudent(student: Student): PaymentStudent {
  return {
    id: student.id,

    admissionNo: student.admissionNo ?? "",

    firstName: student.firstName ?? "",

    lastName: student.lastName ?? "",

    profilePhoto: student.profilePhoto ?? null,

    studentClass: student.studentClass ?? "",

    batch: student.batch ?? "",

    monthlyFee: student.monthlyFee ?? 0,

    months: [],
  };
}

export default async function FeesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("firstName", {
      ascending: true,
    });

  if (error) {
    console.error("Failed to fetch students:", error);
  }

  const students: Student[] = (data ?? []).map(mapStudent);

  const paymentStudents: PaymentStudent[] = students.map(createPaymentStudent);

  return (
    <div className="space-y-6">
      <PaymentGrid students={paymentStudents} />
    </div>
  );
}
