"use client";

import { useState } from "react";

import StudentTable from "../students/components/StudentTable";
import { dummyStudents } from "../students/data/dummyStudents";
import type { Student } from "../students/types/student";

export default function StudentsPage() {
  const [students] = useState<Student[]>(dummyStudents);

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
