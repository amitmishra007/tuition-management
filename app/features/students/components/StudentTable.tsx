"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2, IndianRupee, Plus, Search } from "lucide-react";

import type { Student } from "../../students/types/student";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Students</h2>
          <p className="text-sm text-muted-foreground">
            Manage all your students from one place.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Search student..." className="pl-10" />
          </div>

          <Button onClick={onAddStudent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Student</th>

                <th className="px-6 py-4 text-left font-semibold">School</th>

                <th className="px-6 py-4 text-left font-semibold">Class</th>

                <th className="px-6 py-4 text-left font-semibold">
                  Monthly Fee
                </th>

                <th className="px-6 py-4 text-left font-semibold">Status</th>

                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b transition hover:bg-slate-50"
                >
                  {/* Student */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.profilePhoto} />

                        <AvatarFallback>
                          {student.firstName.charAt(0)}
                          {student.lastName.charAt(0)}
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

                  {/* School */}

                  <td className="px-6 py-4">{student.school}</td>

                  {/* Class */}

                  <td className="px-6 py-4">Class {student.studentClass}</td>

                  {/* Fee */}

                  <td className="px-6 py-4 font-semibold">
                    ₹ {student.monthlyFee.toLocaleString("en-IN")}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        student.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {student.status}
                    </Badge>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onView?.(student)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

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

              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
