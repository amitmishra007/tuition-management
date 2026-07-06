// app/features/students/lib/getStudents.ts

import { createClient } from "@/lib/supabase/server";

export async function getStudents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
