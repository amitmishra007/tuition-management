"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Check, UserRound, X } from "lucide-react";

import type { AttendanceSheetRow } from "../types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  rows: AttendanceSheetRow[];
  search: string;
  batch: string;
  onRowsChange: (rows: AttendanceSheetRow[]) => void;
};

export default function AttendanceTable({
  rows,
  search,
  batch,
  onRowsChange,
}: Props) {
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const fullName =
        `${row.student.firstName} ${row.student.lastName}`.toLowerCase();

      const admission = (row.student.admissionNo ?? "").toLowerCase();

      const matchesSearch =
        query.length === 0 ||
        fullName.includes(query) ||
        admission.includes(query);

      const matchesBatch = batch === "all" || row.student.batch === batch;

      return matchesSearch && matchesBatch;
    });
  }, [rows, search, batch]);

  const updateStatus = (studentId: string, status: "Present" | "Absent") => {
    onRowsChange(
      rows.map((row) =>
        row.student.id === studentId
          ? {
              ...row,
              status,
            }
          : row,
      ),
    );
  };

  if (!filteredRows.length) {
    return (
      <div className="rounded-3xl border bg-white py-16 text-center shadow-sm">
        <UserRound className="mx-auto mb-4 h-12 w-12 text-slate-300" />

        <h3 className="text-lg font-semibold">No students found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing the search text or batch filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredRows.map((row) => {
        const student = row.student;

        const initials = `${student.firstName?.charAt(0) ?? ""}${student.lastName?.charAt(0) ?? ""}`;

        return (
          <div
            key={student.id}
            className="
              rounded-3xl
              border
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div
              className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
            >
              {/* Student Info */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    relative
                    h-16
                    w-16
                    overflow-hidden
                    rounded-full
                    border-2
                    border-slate-200
                    bg-slate-100
                  "
                >
                  {student.profilePhoto ? (
                    <Image
                      src={student.profilePhoto}
                      alt={`${student.firstName} ${student.lastName}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-lg
                        font-bold
                        text-slate-600
                      "
                    >
                      {initials}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    {student.firstName} {student.lastName}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {student.admissionNo && (
                      <Badge variant="info">{student.admissionNo}</Badge>
                    )}

                    <Badge variant="neutral">
                      {student.batch ?? "No Batch"}
                    </Badge>

                    {row.status && (
                      <Badge
                        variant={
                          row.status === "Present" ? "success" : "danger"
                        }
                      >
                        {row.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Attendance Buttons */}
              <div
                className="
                  flex
                  w-full
                  gap-3
                  lg:w-auto
                "
              >
                <Button
                  type="button"
                  size="lg"
                  onClick={() => updateStatus(student.id, "Present")}
                  className={`
                    flex-1
                    rounded-2xl
                    transition-all
                    lg:min-w-40

                    ${
                      row.status === "Present"
                        ? `
                          bg-emerald-600
                          text-white
                          shadow-md
                          hover:bg-emerald-700
                        `
                        : `
                          border
                          border-emerald-200
                          bg-emerald-50
                          text-emerald-700
                          hover:bg-emerald-100
                        `
                    }
                  `}
                >
                  <Check className="mr-2 h-5 w-5" />
                  Present
                </Button>

                <Button
                  type="button"
                  size="lg"
                  onClick={() => updateStatus(student.id, "Absent")}
                  className={`
                    flex-1
                    rounded-2xl
                    transition-all
                    lg:min-w-40

                    ${
                      row.status === "Absent"
                        ? `
                          bg-red-600
                          text-white
                          shadow-md
                          hover:bg-red-700
                        `
                        : `
                          border
                          border-red-200
                          bg-red-50
                          text-red-700
                          hover:bg-red-100
                        `
                    }
                  `}
                >
                  <X className="mr-2 h-5 w-5" />
                  Absent
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
