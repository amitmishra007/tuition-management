import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import StudentProfileCard from "../components/StudentProfileCard";
import BackButton from "../components/BackButton";
import type { Student } from "../types/student";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentViewPage({ params }: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(error);
    notFound();
  }

  const student = data as Student;

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <BackButton />

        <StudentProfileCard student={student} />
      </div>
    </main>
  );
}
