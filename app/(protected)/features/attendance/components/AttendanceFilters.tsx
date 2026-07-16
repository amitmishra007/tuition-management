"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  GraduationCap,
  RotateCcw,
  Search,
  Sparkles,
  Users2,
  CalendarRange,
} from "lucide-react";

import { startOfMonth, endOfMonth, format } from "date-fns";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AttendanceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  selectedMonth: number;
  onMonthChange: (month: number) => void;

  dateRange: {
    from: Date;
    to: Date;
  };

  onDateRangeChange: (range: { from: Date; to: Date }) => void;

  classFilter: string;
  onClassChange: (value: string) => void;

  statusFilter: string;
  onStatusChange: (value: string) => void;

  totalStudents: number;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const classes = [
  "all",
  "Nursery",
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 15,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={item} className="space-y-2">
      <label
        className="
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-slate-500
"
      >
        {label}
      </label>

      {children}
    </motion.div>
  );
}

export default function AttendanceFilters({
  search,
  onSearchChange,

  selectedMonth,
  onMonthChange,

  dateRange,
  onDateRangeChange,

  classFilter,
  onClassChange,

  statusFilter,
  onStatusChange,

  totalStudents,
}: AttendanceFiltersProps) {
  function changeMonth(value: string) {
    const monthIndex = Number(value);

    const year = dateRange.from.getFullYear();

    const selectedDate = new Date(year, monthIndex, 1);

    onMonthChange(monthIndex + 1);

    onDateRangeChange({
      from: startOfMonth(selectedDate),
      to: endOfMonth(selectedDate),
    });
  }

  function reset() {
    const today = new Date();

    onSearchChange("");

    onClassChange("all");

    onStatusChange("all");

    onMonthChange(today.getMonth() + 1);

    onDateRangeChange({
      from: startOfMonth(today),
      to: endOfMonth(today),
    });
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
    >
      <Card
        className="
relative
overflow-hidden
rounded-[32px]
border
border-white/70
bg-white/75
shadow-[0_30px_90px_rgba(15,23,42,.08)]
backdrop-blur-2xl
"
      >
        <div
          className="
pointer-events-none
absolute
inset-0
"
        >
          <div
            className="
absolute
-left-20
top-0
h-52
w-52
rounded-full
bg-sky-400/10
blur-3xl
"
          />

          <div
            className="
absolute
right-0
top-0
h-60
w-60
rounded-full
bg-indigo-400/10
blur-3xl
"
          />
        </div>

        <div
          className="
relative
flex
flex-col
gap-5
border-b
border-slate-200/70
px-8
py-7
md:flex-row
md:items-center
md:justify-between
"
        >
          <div className="flex items-center gap-3">
            <div
              className="
rounded-2xl
bg-sky-100
p-3
"
            >
              <Sparkles
                className="
h-5
w-5
text-sky-600
"
              />
            </div>

            <div>
              <h2
                className="
text-xl
font-bold
text-slate-900
"
              >
                Attendance Filters
              </h2>

              <p
                className="
text-sm
text-slate-500
"
              >
                Search students and analyze attendance periods
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
flex
items-center
gap-3
rounded-2xl
border
border-sky-200
bg-sky-50
px-5
py-3
"
          >
            <Users2 className="text-sky-600" />

            <div>
              <p
                className="
text-xs
uppercase
text-slate-500
"
              >
                Students
              </p>

              <p
                className="
text-xl
font-black
"
              >
                {totalStudents}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
relative
space-y-8
p-8
"
        >
          <FilterField label="Search Student">
            <div className="relative">
              <Search
                className="
absolute
left-5
top-1/2
h-5
w-5
-translate-y-1/2
text-slate-400
"
              />

              <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="
Search by name, admission number...
"
                className="
h-14
rounded-2xl
pl-14
"
              />
            </div>
          </FilterField>

          <div
            className="
grid
gap-6
lg:grid-cols-3
"
          >
            <FilterField label="Quick Month View">
              <Select
                value={String(selectedMonth - 1)}
                onValueChange={changeMonth}
              >
                <SelectTrigger
                  className="
h-14
rounded-2xl
bg-white
"
                >
                  <CalendarDays
                    className="
mr-2
text-sky-600
"
                  />

                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={month} value={String(index)}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField label="Selected Attendance Period">
              <div
                className="
flex
h-14
items-center
gap-3
rounded-2xl
border
bg-white
px-4
"
              >
                <CalendarRange
                  className="
text-indigo-600
"
                />

                <div className="text-sm">
                  <p className="font-semibold">
                    {format(dateRange.from, "dd MMM yyyy")}

                    {" → "}

                    {format(dateRange.to, "dd MMM yyyy")}
                  </p>
                </div>
              </div>
            </FilterField>

            <FilterField label="Custom Range">
              <div
                className="
flex
gap-2
"
              >
                <Input
                  type="date"
                  value={dateRange.from.toISOString().slice(0, 10)}
                  onChange={(e) =>
                    onDateRangeChange({
                      from: new Date(e.target.value),

                      to: dateRange.to,
                    })
                  }
                  className="rounded-xl"
                />

                <Input
                  type="date"
                  value={dateRange.to.toISOString().slice(0, 10)}
                  onChange={(e) =>
                    onDateRangeChange({
                      from: dateRange.from,

                      to: new Date(e.target.value),
                    })
                  }
                  className="rounded-xl"
                />
              </div>
            </FilterField>
          </div>

          <div
            className="
grid
gap-6
md:grid-cols-2
"
          >
            <FilterField label="Student Class">
              <Select value={classFilter} onValueChange={onClassChange}>
                <SelectTrigger
                  className="
h-14
rounded-2xl
"
                >
                  <GraduationCap className="mr-2 text-indigo-600" />

                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls === "all" ? "All Classes" : cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField label="Student Status">
              <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger
                  className="
h-14
rounded-2xl
"
                >
                  <Users2 className="mr-2 text-emerald-600" />

                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>

                  <SelectItem value="Active">🟢 Active</SelectItem>

                  <SelectItem value="Inactive">⚪ Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FilterField>
          </div>

          <div
            className="
flex
flex-col
gap-4
rounded-3xl
bg-slate-50
p-5
sm:flex-row
sm:items-center
sm:justify-between
"
          >
            <div>
              <p
                className="
text-xs
uppercase
tracking-widest
text-slate-500
"
              >
                Showing
              </p>

              <p
                className="
mt-1
font-bold
"
              >
                {totalStudents} students
              </p>
            </div>

            <Button
              variant="outline"
              onClick={reset}
              className="
rounded-2xl
"
            >
              <RotateCcw
                className="
mr-2
h-4
w-4
"
              />
              Reset
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
