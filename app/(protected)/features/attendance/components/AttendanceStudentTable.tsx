"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  School,
  CalendarDays,
  CheckCircle2,
  Flame,
  Eye,
} from "lucide-react";

import type { Student } from "../../students/types/student";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { AttendanceRow } from "../types";
import AttendancePercentage from "./AttendaancePercentage";

interface AttendanceStudentTableProps {
  rows: AttendanceRow[];

  viewedStudent: Student | null;

  onViewStudent: (student: Student) => void;
}

const initials = (student: Student) =>
  `${student.firstName?.[0] ?? ""}${student.lastName?.[0] ?? ""}`.toUpperCase();

const rowAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function AttendanceStudentTable({
  rows,
  viewedStudent,
  onViewStudent,
}: AttendanceStudentTableProps) {
  const safeRows = rows ?? [];

  return (
    <Card
      className="
        overflow-hidden
        rounded-[30px]
        border-white/60
        bg-white/70
        shadow-[0_30px_80px_rgba(15,23,42,.08)]
        backdrop-blur-xl
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-350 w-full">
          <thead>
            <tr
              className="
                border-b
                bg-linear-to-b
                from-slate-50
                to-white
                text-xs
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              <th className="px-6 py-5 text-left">Student</th>

              <th className="px-6 py-5 text-left">Class</th>

              <th className="px-6 py-5 text-left">Batch</th>

              <th className="px-6 py-5 text-center">Today</th>

              <th className="px-6 py-5 text-center">Present</th>

              <th className="px-6 py-5 text-center">Absent</th>

              <th className="px-6 py-5 text-center">Holiday</th>

              <th className="px-6 py-5 text-center">Attendance</th>

              <th className="px-6 py-5 text-center">Streak</th>

              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {safeRows.map((row, index) => {
                const student = row.student;

                const isViewing = viewedStudent?.id === student.id;

                return (
                  <motion.tr
                    key={student.id}
                    variants={rowAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{
                      delay: index * 0.04,
                      duration: 0.35,
                    }}
                    whileHover={{
                      backgroundColor: "rgba(248,250,252,.85)",
                    }}
                    onClick={() => onViewStudent(student)}
                    className={`
                      group
                      cursor-pointer
                      border-b
                      transition-all

                      ${isViewing ? "bg-sky-50 ring-1 ring-sky-200" : ""}

                    `}
                  >
                    {/* Student */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar
                          className="
                            h-16
                            w-16
                            border-2
                            border-white
                            shadow-xl
                          "
                        >
                          <AvatarImage src={student.profilePhoto ?? ""} />

                          <AvatarFallback>{initials(student)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {student.firstName} {student.lastName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Admission #{student.admissionNo}
                          </p>

                          <div
                            className="
                              mt-2
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-slate-500
                            "
                          >
                            <School className="h-3.5 w-3.5" />

                            {student.school}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Class */}

                    <td className="px-6">
                      <div className="flex items-center gap-2">
                        <GraduationCap
                          className="
                            h-4
                            w-4
                            text-indigo-500
                          "
                        />

                        {student.studentClass}
                      </div>
                    </td>

                    {/* Batch */}

                    <td className="px-6">
                      <div className="flex items-center gap-2">
                        <Users
                          className="
                            h-4
                            w-4
                            text-cyan-500
                          "
                        />

                        {student.batch}
                      </div>
                    </td>

                    {/* Today */}

                    <td className="px-6 text-center">
                      <Badge
                        className="
                          rounded-full
                          px-3
                        "
                      >
                        <CheckCircle2
                          className="
                            mr-1
                            h-3.5
                            w-3.5
                          "
                        />

                        {row.lastAttendance}
                      </Badge>
                    </td>

                    <td className="px-6 text-center">
                      <span className="font-bold text-emerald-600">
                        {row.present}
                      </span>
                    </td>

                    <td className="px-6 text-center">
                      <span className="font-bold text-rose-600">
                        {row.absent}
                      </span>
                    </td>

                    <td className="px-6 text-center">
                      <span className="font-bold text-amber-600">
                        {row.holidays}
                      </span>
                    </td>

                    {/* Percentage */}

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <AttendancePercentage value={row.percentage} />
                      </div>
                    </td>

                    {/* Streak */}

                    <td className="px-6 text-center">
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          bg-orange-50
                          px-3
                          py-1
                        "
                      >
                        <Flame
                          className="
                            h-4
                            w-4
                            text-orange-500
                          "
                        />
                        {row.streak} Days
                      </div>
                    </td>

                    {/* Action */}

                    <td className="px-6">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();

                          onViewStudent(student);
                        }}
                        className="rounded-xl"
                      >
                        <Eye
                          className="
                            mr-2
                            h-4
                            w-4
                          "
                        />
                        View
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>

            {safeRows.length === 0 && (
              <tr>
                <td colSpan={10}>
                  <div
                    className="
                        flex
                        min-h-80
                        flex-col
                        items-center
                        justify-center
                        gap-4
                      "
                  >
                    <CalendarDays
                      className="
                          h-12
                          w-12
                          text-slate-300
                        "
                    />

                    <h3 className="text-xl font-bold">No Student Found</h3>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
