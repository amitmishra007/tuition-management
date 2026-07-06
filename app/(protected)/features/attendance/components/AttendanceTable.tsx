"use client";

import { useMemo, useState } from "react";
import { saveAttendance } from "../lib/attendanceMutations";

/* ================= TYPES ================= */

type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

type Row = {
  student: Student;
  status: "Present" | "Absent";
  attendanceId: string | null;
};

type Props = {
  date: string;
  data: Row[];
  onRefresh: () => void;
};

/* ================= COMPONENT ================= */

export default function AttendanceTable({ date, data, onRefresh }: Props) {
  const [saving, setSaving] = useState(false);

  /* 🔥 LOCAL EDITS ONLY */
  const [changes, setChanges] = useState<Record<string, "Present" | "Absent">>(
    {},
  );

  /* ================= DERIVED STATE ================= */

  const rows = useMemo(() => {
    return data.map((row) => ({
      ...row,
      status: changes[row.student.id] ?? row.status,
    }));
  }, [data, changes]);

  /* ================= TOGGLE ================= */

  const toggle = (studentId: string, status: "Present" | "Absent") => {
    setChanges((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      await saveAttendance(
        date,
        rows.map((r) => ({
          student_id: r.student.id,
          status: r.status,
        })),
      );

      setChanges({}); // clear local edits after save
      await onRefresh();
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Attendance Sheet - {date}</h2>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      {/* TABLE */}
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.student.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>
              {row.student.firstName} {row.student.lastName}
            </span>

            <div className="flex gap-4">
              <button
                onClick={() => toggle(row.student.id, "Present")}
                className={
                  row.status === "Present"
                    ? "text-green-600 font-bold"
                    : "text-gray-500"
                }
              >
                Present
              </button>

              <button
                onClick={() => toggle(row.student.id, "Absent")}
                className={
                  row.status === "Absent"
                    ? "text-red-600 font-bold"
                    : "text-gray-500"
                }
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
