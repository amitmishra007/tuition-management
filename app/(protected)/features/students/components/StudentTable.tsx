"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ClipboardCheck,
  Eye,
  GraduationCap,
  IndianRupee,
  Pencil,
  Phone,
  Plus,
  School,
  Search,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { deleteStudent } from "../action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AnimatePresence, motion } from "framer-motion";
import type { Student } from "../types/student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { startTransition } from "react";

interface StudentTableProps {
  students: Student[];
  onView?: (student: Student) => void;
  onRecordFee?: (student: Student) => void;
  onAttendance?: (student: Student) => void;
}

const value = (v: unknown, fallback = "—") => {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "string" && !v.trim()) return fallback;
  return String(v);
};

const initials = (student: Student) => {
  const first = student.firstName?.trim()?.charAt(0) ?? "";
  const last = student.lastName?.trim()?.charAt(0) ?? "";

  const text = `${first}${last}`.toUpperCase();

  return text || "??";
};

const fullName = (student: Student) => {
  return (
    `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim() ||
    "Unnamed Student"
  );
};

export default function StudentTable({
  students,
  onRecordFee,
  onAttendance,
}: StudentTableProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [activeRow, setActiveRow] = useState<string | null>(null);

  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const [isDeleting, startDeleteTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    students.forEach((student) => {
      router.prefetch(`/features/students/${student.id}`);
      router.prefetch(`/features/students/${student.id}/edit`);
    });
  }, [students, router]);

  const filteredStudents = useMemo(() => {
    if (!debouncedSearch.trim()) return students;

    const q = debouncedSearch.toLowerCase();

    return students.filter((student) =>
      [
        student.firstName,
        student.lastName,
        student.admissionNo,
        student.fatherName,
        student.phone,
        student.school,
        student.studentClass,
        student.city,
        student.batch,
        student.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [students, debouncedSearch]);

  const handleEdit = (id: string) => {
    setActiveRow(id);

    startTransition(() => {
      router.push(`/features/students/${id}/edit`);
    });
  };

  const handleAddStudent = () => {
    router.push("/features/students/add");
  };

  const handleDelete = () => {
    if (!studentToDelete) return;

    startDeleteTransition(async () => {
      try {
        await deleteStudent(studentToDelete.id);

        toast.success(
          `${studentToDelete.firstName} ${studentToDelete.lastName} ${
            studentToDelete.gender === "Male"
              ? "S/o"
              : studentToDelete.gender === "Female"
                ? "D/o"
                : "Child of"
          } Sh. ${studentToDelete.fatherName} & Smt. ${
            studentToDelete.motherName
          } deleted successfully.`,
        );

        setStudentToDelete(null);

        router.refresh();
      } catch (error) {
        console.error(error);

        toast.error("Unable to delete student.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Students</h1>

              <p className="mt-1 text-muted-foreground">
                Manage all students from one place.
              </p>
            </div>

            <Button size="lg" onClick={handleAddStudent} className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, admission no, father, phone, school..."
              className="h-12 rounded-xl pl-11"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Showing
            <span className="mx-1 font-semibold">
              {filteredStudents.length}
            </span>
            of
            <span className="mx-1 font-semibold">{students.length}</span>
            students
          </p>
        </CardContent>
      </Card>

      {/* ---------------- Mobile ---------------- */}

      <div className="space-y-4 lg:hidden">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className={`border-b transition-all duration-200 hover:bg-slate-50 ${
              activeRow === student.id ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <CardContent className="space-y-5 p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={student.profilePhoto || ""} />

                  <AvatarFallback className="font-semibold">
                    {initials(student)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold">
                    {fullName(student)}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Admission No. {value(student.admissionNo)}
                  </p>

                  <Badge
                    variant={student.status === "Active" ? "success" : "danger"}
                  >
                    {value(student.status)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 text-sm">
                <div>
                  <p className="text-muted-foreground">School</p>
                  <p className="font-medium">{value(student.school)}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Class</p>
                  <p className="font-medium">{value(student.studentClass)}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Father</p>
                  <p className="font-medium">{value(student.fatherName)}</p>
                </div>

                <div className="cursor-pointer">
                  <p className="text-muted-foreground">Phone</p>

                  <a
                    href={`tel:+91${String(student.phone).replace(/\D/g, "")}`}
                    className="font-medium text-sky-700 transition-colors hover:text-sky-900 hover:underline"
                  >
                    {value(student.phone)}
                  </a>
                </div>

                <div>
                  <p className="text-muted-foreground">Monthly Fee</p>

                  <p className="font-semibold text-green-700">
                    ₹ {Number(student.monthlyFee ?? 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Fee Status</p>

                  <Badge
                    variant={
                      student.feeStatus === "Paid" ? "success" : "warning"
                    }
                  >
                    {value(student.feeStatus)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  disabled={activeRow === student.id}
                  onClick={() => {
                    setActiveRow(student.id);
                    router.push(`/features/students/${student.id}`);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={() => handleEdit(student.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={() => onRecordFee?.(student)}
                >
                  <IndianRupee className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={() => onAttendance?.(student)}
                >
                  <ClipboardCheck className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  className="w-full"
                  onClick={() => setStudentToDelete(student)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStudents.length === 0 && (
          <Card className="rounded-3xl">
            <CardContent className="py-14 text-center text-muted-foreground">
              No students found.
            </CardContent>
          </Card>
        )}
      </div>

      {/* ======================= Desktop ======================= */}

      <Card className="hidden overflow-hidden rounded-3xl lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-362.5 w-full">
            <thead className="border-b bg-slate-50">
              <tr className="text-sm font-semibold">
                <th className="px-6 py-4 text-left">Student</th>

                <th className="px-6 py-4 text-left">Admission</th>

                <th className="px-6 py-4 text-left">Father</th>

                <th className="px-6 py-4 text-left">School</th>

                <th className="px-6 py-4 text-left">Class</th>

                <th className="px-6 py-4 text-left">Phone</th>

                <th className="px-6 py-4 text-right">Monthly Fee</th>

                <th className="px-6 py-4 text-center">Fee</th>

                <th className="px-6 py-4 text-center">Status</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className={`border-b transition-all duration-200 hover:bg-slate-50 ${
                    activeRow === student.id ? "opacity-60 scale-[0.99]" : ""
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={student.profilePhoto || ""} />

                        <AvatarFallback>{initials(student)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold">{fullName(student)}</p>

                        <p className="text-sm text-muted-foreground">
                          {student.gender === "Male"
                            ? "S/O"
                            : student.gender === "Female"
                              ? "D/O"
                              : "Child of"}{" "}
                          {value(student.fatherName)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6">{value(student.admissionNo)}</td>

                  <td className="px-6">{value(student.fatherName)}</td>

                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />

                      {value(student.school)}
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />

                      {value(student.studentClass)}
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />

                      {value(student.phone)}
                    </div>
                  </td>

                  <td className="px-6 text-right font-semibold text-green-700">
                    ₹ {Number(student.monthlyFee ?? 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 text-center">
                    <Badge
                      variant={
                        student.feeStatus === "Paid" ? "success" : "warning"
                      }
                    >
                      {value(student.feeStatus)}
                    </Badge>
                  </td>

                  <td className="px-6 text-center">
                    <Badge
                      variant={
                        student.status === "Active" ? "success" : "danger"
                      }
                    >
                      {value(student.status)}
                    </Badge>
                  </td>

                  <td className="px-6">
                    <div className="flex justify-center gap-2">
                      <Link href={`/features/students/${student.id}`}>
                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(student.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onRecordFee?.(student)}
                      >
                        <IndianRupee className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onAttendance?.(student)}
                      >
                        <ClipboardCheck className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setStudentToDelete(student)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-14 text-center text-muted-foreground"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <AlertDialog
        open={!!studentToDelete}
        onOpenChange={(open) => !open && setStudentToDelete(null)}
      >
        <AnimatePresence>
          {studentToDelete && (
            <AlertDialogContent
              asChild
              forceMount
              className="overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-md"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 30,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                }}
                className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
              >
                {/* Header */}

                <div className="h-28 bg-linear-to-br from-red-500 via-rose-600 to-red-700" />

                {/* Body */}

                <div className="-mt-14 px-6 pb-6">
                  <motion.div
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <Avatar className="h-28 w-28 border-[6px] border-white shadow-2xl">
                      <AvatarImage src={studentToDelete.profilePhoto || ""} />
                      <AvatarFallback className="text-2xl font-bold">
                        {initials(studentToDelete)}
                      </AvatarFallback>
                    </Avatar>

                    <AlertDialogTitle className="mt-5 text-2xl font-bold tracking-tight">
                      {studentToDelete.firstName} {studentToDelete.lastName}
                    </AlertDialogTitle>

                    <AlertDialogDescription asChild>
                      <div className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                        <span className="font-medium">
                          {studentToDelete.gender === "Male"
                            ? "S/O"
                            : studentToDelete.gender === "Female"
                              ? "D/O"
                              : "Child of"}
                        </span>{" "}
                        <span className="font-semibold text-foreground">
                          Sh. {studentToDelete.fatherName || "—"}
                        </span>
                        <br />
                        <span className="text-xs">&</span>
                        <br />
                        <span className="font-semibold text-foreground">
                          Smt. {studentToDelete.motherName || "—"}
                        </span>
                      </div>
                    </AlertDialogDescription>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                    className="mt-8 rounded-2xl border border-red-200 bg-linear-to-br from-red-50 via-white to-rose-50 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-red-700">
                          Permanently delete this student?
                        </h3>

                        <p className="text-sm font-medium text-red-600">
                          This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <AlertDialogFooter className="mt-8 flex-col gap-3 sm:flex-row">
                    <AlertDialogCancel
                      disabled={isDeleting}
                      className="h-12 rounded-xl"
                    >
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      disabled={isDeleting}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                      }}
                      className="h-12 rounded-xl bg-linear-to-r from-red-600 to-rose-700 text-white shadow-lg transition-all hover:scale-[1.02] hover:from-red-700 hover:to-rose-800"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Student
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </div>
              </motion.div>
            </AlertDialogContent>
          )}
        </AnimatePresence>
      </AlertDialog>
    </div>
  );
}
