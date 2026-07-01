"use client";

import { useState } from "react";

import StudentTable from "../app/features/students/components/StudentTable";
import { dummyStudents } from "../app/features/students/data/dummyStudents";
import type { Student } from "../app/features/students/types/student";

export default function Home() {
  const [students] = useState<Student[]>(dummyStudents);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <StudentTable
          students={students}
          onAddStudent={() => console.log("Add Student")}
          onView={(student) => console.log("View", student)}
          onEdit={(student) => console.log("Edit", student)}
          onDelete={(student) => console.log("Delete", student)}
          onRecordFee={(student) => console.log("Record Fee", student)}
        />
      </div>
    </main>
  );
}
