("use server");
import { supabase } from "@/lib/supabase/client";
import type { Student } from "./types/student";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateStudent(id: string, values: Omit<Student, "id">) {
  const { error } = await supabase.from("students").update(values).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function createStudent(
  student: Omit<Student, "id" | "created_at" | "updated_at">,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .insert(student)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/students");

  redirect(`/students/${data.id}`);
}
