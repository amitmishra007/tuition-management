import StudentTable from "../students/components/StudentTable";
import type { Student } from "../students/types/student";

import { createClient } from "@/lib/supabase/server";
import { mapStudent } from "../students/lib/mapStudent";

export default async function StudentsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("firstName", { ascending: true });

  if (error) {
    console.error("Failed to fetch students:", error);
  }

  const students: Student[] = (data ?? []).map(mapStudent);

  return (
    <div className="space-y-6">
      <StudentTable students={students} />
    </div>
  );
}
