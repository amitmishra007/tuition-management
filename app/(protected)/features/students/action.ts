"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import type { Student } from "./types/student";

export async function updateStudent(id: string, values: Omit<Student, "id">) {
  const supabase = await createClient();

  const { error } = await supabase.from("students").update(values).eq("id", id);

  if (error) {
    console.error("Update student error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/features/students");
  revalidatePath(`/features/students/${id}`);
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
    console.error("Create student error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/features/students");

  return data;
}

export async function deleteStudent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    console.error("Delete student error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/features/students");
}
