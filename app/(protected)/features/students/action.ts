import { supabase } from "@/lib/supabase/client";
import type { Student } from "./types/student";

export async function updateStudent(id: string, values: Omit<Student, "id">) {
  const { error } = await supabase.from("students").update(values).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
