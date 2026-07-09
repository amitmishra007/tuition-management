import StudentEditForm from "../components/StudentEditForm";
import { emptyStudent } from "../lib/emptyStudent";

export default function AddStudentPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <StudentEditForm student={emptyStudent} mode="create" />
      </div>
    </main>
  );
}
