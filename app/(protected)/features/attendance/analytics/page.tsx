"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

import StudentAttendanceAnalytics from "./StudentAttendanceAnalytics";
import StudentAttendanceCard from "./StudentAttendanceCard";

import type { AttendanceCalendarDay } from "../types";

export default function AttendancePage() {
  /*
    Later replace this with server fetched data
    from Supabase
  */

  const month = new Date();

  const calendar: AttendanceCalendarDay[] = [
    {
      date: "2026-07-01",
      status: "Present",
    },
    {
      date: "2026-07-02",
      status: "Present",
    },
    {
      date: "2026-07-03",
      status: "Absent",
    },
    {
      date: "2026-07-04",
      status: "Holiday",
    },
  ];

  const student = {
    id: "1",
    name: "Aarav Sharma",
    class: "Class 8",
    school: "Delhi Public School",
    batch: "Morning Batch",
    photo: "/images/avatar.png",
  };

  const present = 18;
  const absent = 2;
  const holidays = 2;
  const total = 22;

  const percentage = Math.round((present / total) * 100);

  const streak = 8;

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Page Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl
              bg-linear-to-br
              from-sky-500
              via-indigo-500
              to-cyan-500
              text-white
              shadow-lg
            "
          >
            <CalendarDays className="h-6 w-6" />
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
        </div>
      </motion.div>

      {/* Analytics */}

      <StudentAttendanceAnalytics
        total={total}
        present={present}
        absent={absent}
        holidays={holidays}
      />

      {/* Student Attendance */}

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
      >
        <StudentAttendanceCard
          student={student}
          calendar={calendar}
          present={present}
          absent={absent}
          holidays={holidays}
          percentage={percentage}
          streak={streak}
          month={month}
        />
      </motion.section>
    </div>
  );
}
