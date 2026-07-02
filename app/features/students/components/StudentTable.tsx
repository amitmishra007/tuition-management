"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  IndianRupee,
  Plus,
  Search,
  School,
  GraduationCap,
} from "lucide-react";

import type { Student } from "../types/student";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface StudentTableProps {
  students: Student[];

  onAddStudent?: () => void;
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
  onRecordFee?: (student: Student) => void;
}

export default function StudentTable({
  students,
  onAddStudent,
  onView,
  onEdit,
  onDelete,
  onRecordFee,
}: StudentTableProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredStudents = useMemo(() => {
    if (!debouncedSearch.trim()) return students;

    const q = debouncedSearch.toLowerCase();

    return students.filter((student) =>
      [
        student.firstName,
        student.lastName,
        student.fatherName,
        student.admissionNo,
        student.school,
        student.studentClass,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [students, debouncedSearch]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <Card className="rounded-3xl">
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Students</h1>

              <p className="mt-1 text-muted-foreground">
                Manage all your students from one place.
              </p>
            </div>

            <Button onClick={onAddStudent} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search by name, admission no, school..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-xl pl-11"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold">{filteredStudents.length}</span> of{" "}
            <span className="font-semibold">{students.length}</span> students
          </p>
        </CardContent>
      </Card>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="overflow-hidden rounded-3xl transition hover:shadow-lg"
          >
            <CardContent className="space-y-5 p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={student.profilePhoto} />

                  <AvatarFallback>
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold">
                    {student.firstName} {student.lastName}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {student.admissionNo}
                  </p>

                  <Badge
                    className="mt-2"
                    variant={
                      student.status === "Active" ? "default" : "destructive"
                    }
                  >
                    {student.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 text-sm">
                <div>
                  <p className="text-muted-foreground">School</p>

                  <p className="font-medium">{student.school}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Class</p>

                  <p className="font-medium">{student.studentClass}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Father</p>

                  <p className="font-medium">{student.fatherName}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Monthly Fee</p>

                  <p className="font-semibold text-green-600">
                    ₹ {student.monthlyFee.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <Link href={`/features/students/${student.id}`}>
                  <Button variant="outline" size="icon" className="w-full">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-full"
                  onClick={() => onEdit?.(student)}
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
                  variant="destructive"
                  size="icon"
                  className="w-full"
                  onClick={() => onDelete?.(student)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStudents.length === 0 && (
          <Card className="rounded-3xl">
            <CardContent className="py-12 text-center text-muted-foreground">
              No students found.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop */}

      <Card className="hidden overflow-hidden rounded-3xl lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Student</th>
                <th className="px-6 py-4 text-left">School</th>
                <th className="px-6 py-4 text-left">Class</th>
                <th className="px-6 py-4 text-left">Monthly Fee</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.profilePhoto} />

                        <AvatarFallback>
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold">
                          {student.firstName} {student.lastName}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {student.gender === "Male"
                            ? "S/O"
                            : student.gender === "Female"
                              ? "D/O"
                              : "Child of"}{" "}
                          {student.fatherName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {student.admissionNo}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      {student.school}
                    </div>
                  </td>

                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      {student.studentClass}
                    </div>
                  </td>

                  <td className="px-6 font-semibold text-green-600">
                    ₹ {student.monthlyFee.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6">
                    <Badge
                      variant={
                        student.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {student.status}
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
                        onClick={() => onEdit?.(student)}
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
                        variant="destructive"
                        onClick={() => onDelete?.(student)}
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
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
