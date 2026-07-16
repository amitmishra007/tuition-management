"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Variants } from "framer-motion";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isWithinInterval,
} from "date-fns";
import { supabase } from "@/lib/supabase/client";
import type { Student } from "../../students/types/student";
import StudentAttendanceAnalytics from "./StudentAttendanceAnalytics";
import StudentAttendanceCard from "./StudentAttendanceCard";
import AttendanceStudentTable from "../components/AttendanceStudentTable";
import AttendanceFilters from "../components/AttendanceFilters";

import type {
  Attendance,
  Holiday,
  AttendanceMap,
  StudentAttendanceSummary,
  AttendanceCalendarDay,
} from "../types";

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.35,
    },
  },
};

export default function AttendancePage() {
  const [dateRange, setDateRange] = useState({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const currentMonth = dateRange.from;

  const [students, setStudents] = useState<Student[]>([]);

  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [classFilter, setClassFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  const [viewStudent, setViewStudent] =
    useState<StudentAttendanceSummary | null>(null);

  function calculateStreak(records: Attendance[]) {
    const sorted = [...records].sort(
      (a, b) =>
        new Date(b.attendance_date).getTime() -
        new Date(a.attendance_date).getTime(),
    );

    let streak = 0;

    for (const record of sorted) {
      if (record.status === "Present") {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  /*
    Fetch all attendance data together
  */

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);

      const [studentsResponse, attendanceResponse, holidaysResponse] =
        await Promise.all([
          supabase.from("students").select("*").order("firstName"),

          supabase.from("attendance").select("*"),

          supabase.from("holidays").select("*"),
        ]);

      if (!mounted) return;

      if (studentsResponse.error) {
        console.error(studentsResponse.error);
      }

      if (attendanceResponse.error) {
        console.error(attendanceResponse.error);
      }

      if (holidaysResponse.error) {
        console.error(holidaysResponse.error);
      }

      setStudents((studentsResponse.data ?? []) as Student[]);

      setAttendanceRecords((attendanceResponse.data ?? []) as Attendance[]);

      setHolidays((holidaysResponse.data ?? []) as Holiday[]);

      setLoading(false);
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  /*
      Group attendance by student
  */

  const groupedAttendance = useMemo(() => {
    return attendanceRecords.reduce<Record<string, Attendance[]>>(
      (acc, item) => {
        if (!acc[item.student_id]) {
          acc[item.student_id] = [];
        }

        acc[item.student_id].push(item);

        return acc;
      },
      {},
    );
  }, [attendanceRecords]);
  /*
    Merge:
    Students
    +
    Attendance
    +
    Holidays

    into complete student summaries
  */

  const attendanceMap = useMemo(() => {
    const map: AttendanceMap = {};

    students.forEach((student) => {
      const records = groupedAttendance[student.id] ?? [];

      const calendar: AttendanceCalendarDay[] = eachDayOfInterval({
        start: dateRange.from,
        end: dateRange.to,
      }).map((day) => {
        const date = format(day, "yyyy-MM-dd");

        const attendance = records.find(
          (item) => item.attendance_date === date,
        );

        const holiday = holidays.find((item) => item.holiday_date === date);

        return {
          date,
          status: holiday
            ? "Holiday"
            : attendance
              ? attendance.status
              : "Pending",
        };
      });

      const filteredRecords = records.filter((record) =>
        isWithinInterval(new Date(record.attendance_date), {
          start: dateRange.from,
          end: dateRange.to,
        }),
      );

      const present = filteredRecords.filter(
        (item) => item.status === "Present",
      ).length;

      const absent = filteredRecords.filter(
        (item) => item.status === "Absent",
      ).length;

      const holidayCount = calendar.filter(
        (item) => item.status === "Holiday",
      ).length;

      const total = present + absent;

      const today =
        calendar.find(
          (item) => item.date === new Date().toISOString().slice(0, 10),
        )?.status ?? "Pending";

      map[student.id] = {
        student,
        calendar,
        present,
        absent,
        holidays: holidayCount,
        percentage: total ? Math.round((present / total) * 100) : 0,
        streak: calculateStreak(filteredRecords),
        today,
      };
    });

    return map;
  }, [students, groupedAttendance, holidays, dateRange]);

  /*
      Convert summary data
      into table rows
  */

  const attendanceRows = useMemo(() => {
    return students

      .filter((student) => {
        const query = search.trim().toLowerCase();

        const name = `${student.firstName} ${student.lastName}`.toLowerCase();

        const matchesSearch =
          !query ||
          name.includes(query) ||
          student.admissionNo?.toLowerCase().includes(query) ||
          student.phone?.includes(query);

        const matchesClass =
          classFilter === "all" || student.studentClass === classFilter;

        const summary = attendanceMap[student.id];

        const matchesStatus =
          statusFilter === "all" || summary?.today === statusFilter;

        return matchesSearch && matchesClass && matchesStatus;
      })

      .map((student) => {
        const summary = attendanceMap[student.id];

        return {
          student,

          present: summary?.present ?? 0,

          absent: summary?.absent ?? 0,

          holidays: summary?.holidays ?? 0,

          percentage: summary?.percentage ?? 0,

          streak: summary?.streak ?? 0,

          lastAttendance:
            summary?.today === "Present"
              ? ("Present" as const)
              : summary?.today === "Absent"
                ? ("Absent" as const)
                : summary?.today === "Holiday"
                  ? ("Holiday" as const)
                  : ("Not Recorded" as const),

          totalDays: summary?.calendar.length ?? 0,
        };
      });
  }, [students, attendanceMap, search, classFilter, statusFilter]);

  /*
      Dashboard analytics
  */

  const attendanceAnalytics = useMemo(() => {
    return attendanceRows.reduce(
      (acc, row) => {
        acc.present += row.present;

        acc.absent += row.absent;

        acc.holidays += row.holidays;

        return acc;
      },

      {
        present: 0,
        absent: 0,
        holidays: 0,
      },
    );
  }, [attendanceRows]);

  const totalAttendanceDays =
    attendanceAnalytics.present +
    attendanceAnalytics.absent +
    attendanceAnalytics.holidays;

  /*
    Selected Student Summary
  */

  const selectedStudentSummary = viewStudent;

  /*
    Loading
  */

  if (loading) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="
          flex
          h-[60vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-2xl
            border
            bg-background/70
            px-8
            py-5
            shadow-xl
            backdrop-blur
          "
        >
          Loading attendance...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="
        space-y-8
        p-4
        md:p-6
        lg:p-8
      "
    >
      {/* Header */}

      <motion.section
        variants={itemVariants}
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-br
            from-sky-500
            via-indigo-500
            to-cyan-500
            text-white
            shadow-xl
          "
        >
          <CalendarDays />
        </div>

        <div>
          <h1
            className="
              text-3xl
              font-black
              tracking-tight
            "
          >
            Attendance Dashboard
          </h1>

          <p className="text-muted-foreground">
            Complete student attendance overview
          </p>
        </div>
      </motion.section>

      {/* Filters */}

      <motion.section variants={itemVariants}>
        <AttendanceFilters
          search={search}
          onSearchChange={setSearch}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          classFilter={classFilter}
          onClassChange={setClassFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          totalStudents={attendanceRows.length}
        />
      </motion.section>

      {/* Student Table */}

      <motion.section variants={itemVariants}>
        <AttendanceStudentTable
          rows={attendanceRows}
          viewedStudent={viewStudent?.student ?? null}
          onViewStudent={(student) => {
            const summary = attendanceMap[student.id];

            if (summary) {
              setViewStudent(summary);
            }
          }}
        />
      </motion.section>

      {/* Analytics */}

      <motion.section variants={itemVariants}>
        <StudentAttendanceAnalytics
          total={totalAttendanceDays}
          present={attendanceAnalytics.present}
          absent={attendanceAnalytics.absent}
          holidays={attendanceAnalytics.holidays}
        />
      </motion.section>

      {/* Student Detail Modal */}

      <AnimatePresence>
        {selectedStudentSummary && (
          <motion.div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/40
              p-4
              backdrop-blur-md
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setViewStudent(null)}
          >
            <motion.div
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-5xl
                overflow-y-auto
                rounded-[32px]
                bg-background
                p-6
                shadow-2xl
              "
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 40,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => setViewStudent(null)}
                className="
                  absolute
                  right-5
                  top-5
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-xl
                  shadow-md
                "
              >
                ×
              </motion.button>

              <StudentAttendanceCard
                student={{
                  id: selectedStudentSummary.student.id,

                  name: `${selectedStudentSummary.student.firstName} ${selectedStudentSummary.student.lastName}`,

                  class: selectedStudentSummary.student.studentClass ?? "",

                  school: selectedStudentSummary.student.school ?? "",

                  batch: selectedStudentSummary.student.batch ?? "",

                  photo: selectedStudentSummary.student.profilePhoto ?? "",
                }}
                calendar={selectedStudentSummary.calendar}
                present={selectedStudentSummary.present}
                absent={selectedStudentSummary.absent}
                holidays={selectedStudentSummary.holidays}
                percentage={selectedStudentSummary.percentage}
                streak={selectedStudentSummary.streak}
                month={currentMonth}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
