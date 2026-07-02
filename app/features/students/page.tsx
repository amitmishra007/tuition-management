import StudentTable from "../students/components/StudentTable";
import type { Student } from "../students/types/student";

import { supabaseServer } from "@/lib/supabase/server";
import { mapStudent } from "../students/lib/mapStudent";

export default async function StudentsPage() {
  const { data, error } = await supabaseServer
    .from("students")
    .select("*")
    .order("firstname", { ascending: true });

  if (error) {
    console.error("Failed to fetch students:", error);
  }

  const students: Student[] = (data ?? []).map(mapStudent);

  return (
    <div className="space-y-6">
      <StudentTable
        students={students}
        onAddStudent={() => {
          console.log("Add Student");
        }}
        onView={(student) => {
          console.log("View", student);
        }}
        onEdit={(student) => {
          console.log("Edit", student);
        }}
        onDelete={(student) => {
          console.log("Delete", student);
        }}
        onRecordFee={(student) => {
          console.log("Record Fee", student);
        }}
      />
    </div>
  );
}
