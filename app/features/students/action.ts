import { supabaseServer } from "@/lib/supabase/server";
import type { Student } from "./types/student";

export async function updateStudent(id: string, values: Omit<Student, "id">) {
  const { error } = await supabaseServer
    .from("students")
    .update(values)
    .eq("id", id);

  if (error) throw new Error(error.message);
}
