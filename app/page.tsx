import StudentTable from "./features/students/components/StudentTable";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Home() {
  const { data: students, error } = await supabaseServer
    .from("students")
    .select("*")
    .order("firstName");

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <StudentTable students={students ?? []} />
      </div>
    </main>
  );
}
