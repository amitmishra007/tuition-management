import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/db";

type AttendanceInsert = Database["public"]["Tables"]["attendance"]["Insert"];

type SavePayload = {
  student_id: string;
  status: "Present" | "Absent";
};

export async function saveAttendance(date: string, records: SavePayload[]) {
  const payload: AttendanceInsert[] = records.map((r) => ({
    ...r,
    attendance_date: date,
  }));

  // 🔥 IMPORTANT: no inference from "attendance"
  const table = supabase.schema("public").from("attendance");

  const { error } = await table.upsert(payload, {
    onConflict: "student_id,attendance_date",
  });

  if (error) throw error;

  return true;
}
