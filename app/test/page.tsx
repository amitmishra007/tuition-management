"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { dummyStudents } from "@/app/features/students/data/dummyStudents";

export default function TestPage() {
  const [message, setMessage] = useState("");

  async function fetchStudents() {
    const { data, error } = await supabase.from("students").select("*");

    console.log("FETCH DATA:", data);
    console.log("FETCH ERROR:", error);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(`Found ${data.length} students`);
  }

  async function seedStudents() {
    const { data, error } = await supabase
      .from("students")
      .insert(dummyStudents)
      .select();

    console.log("INSERT DATA:", data);
    console.log("INSERT ERROR:", error);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(`Inserted ${data.length} students`);
  }

  async function deleteStudents() {
    const { error } = await supabase.from("students").delete().neq("id", "");

    console.log("DELETE ERROR:", error);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("All students deleted");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 p-10">
      <h1 className="text-3xl font-bold">Supabase Test</h1>

      <div className="flex gap-4">
        <button
          onClick={fetchStudents}
          className="rounded bg-blue-600 px-5 py-3 text-white"
        >
          Fetch Students
        </button>

        <button
          onClick={seedStudents}
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          Seed Students
        </button>

        <button
          onClick={deleteStudents}
          className="rounded bg-red-600 px-5 py-3 text-white"
        >
          Delete All
        </button>
      </div>

      <div className="rounded-lg border p-5">
        <strong>Status:</strong>

        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
}
