import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { dummyStudents } from "../data/dummyStudents";
import StudentProfileCard from "../components/StudentProfileCard";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentViewPage({ params }: PageProps) {
  const { id } = await params;

  const student = dummyStudents.find((student) => student.id === id);

  if (!student) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link href="/features/students">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Button>
        </Link>

        <StudentProfileCard student={student} />
      </div>
    </main>
  );
}
