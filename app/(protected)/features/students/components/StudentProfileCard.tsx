"use client";
import {
  LayoutGroup,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Building2,
  Cake,
  CalendarCheck2,
  CalendarClock,
  Clock3,
  GraduationCap,
  IndianRupee,
  Mailbox,
  Map,
  MapPin,
  NotebookPen,
  Pencil,
  School,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  Phone,
  Smartphone,
  Mail,
  MessageCircleMore,
  User,
  Mars,
  Venus,
  CalendarDays,
  CalendarPlus,
  BadgeCheck,
} from "lucide-react";
import type { Student } from "../types/student";
import { formatDate, getAge, getDaysJoined } from "@/app/lib/date";

interface StudentProfileCardProps {
  student: Student;
}

const springGentle = {
  type: "spring" as const,
  damping: 22,
  stiffness: 140,
};

const springSnappy = {
  type: "spring" as const,
  damping: 24,
  stiffness: 280,
};

const relationLabel = (gender?: string | null) => {
  if (gender === "Male") return "S/O";
  if (gender === "Female") return "D/O";
  return "Child of";
};

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ...springGentle,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const blockVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: springGentle,
  },
};

export default function StudentProfileCard({
  student,
}: StudentProfileCardProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <LayoutGroup>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div variants={blockVariants}>
          <div className="relative mb-8 overflow-hidden rounded-[36px] border border-white/60 bg-white/75 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: [0.45, 0.65, 0.45],
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,.1))]"
            />
            <div className="relative flex flex-col gap-8 p-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <motion.div
                  layoutId={`avatar-${student.id}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.82,
                          y: 24,
                          filter: "blur(10px)",
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={springGentle}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: 1.05,
                          rotate: -2,
                        }
                  }
                >
                  <Image
                    src={student.profilePhoto ?? ""}
                    alt={student.firstName}
                    width={132}
                    height={132}
                    className="rounded-full border-[6px] border-white object-cover shadow-[0_20px_50px_rgba(15,23,42,.18)]"
                  />
                </motion.div>

                <motion.div
                  variants={blockVariants}
                  className="text-center sm:text-left"
                >
                  <motion.h1
                    layoutId={`card-${student.id}`}
                    className="text-4xl font-bold tracking-[-0.04em] text-slate-900"
                  >
                    {student.firstName} {student.lastName}
                  </motion.h1>

                  <motion.p
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 10,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.12,
                      ...springGentle,
                    }}
                    className="mt-3 text-slate-500"
                  >
                    Admission No.
                    <span className="ml-2 rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-700">
                      {student.admissionNo}
                    </span>
                  </motion.p>

                  <motion.p
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 10,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.18,
                      ...springGentle,
                    }}
                    className="mt-3 text-slate-500"
                  >
                    {relationLabel(student.gender)}

                    <span className="ml-2 font-semibold text-slate-800">
                      {student.fatherName}
                    </span>
                  </motion.p>

                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                            scale: 0.8,
                            opacity: 0,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.24,
                      ...springSnappy,
                    }}
                    className="mt-5"
                  >
                    <Badge
                      className={
                        student.status === "Active"
                          ? "rounded-full border-green-200 bg-green-100 px-4 py-1 text-green-700"
                          : "rounded-full border-red-200 bg-red-100 px-4 py-1 text-red-700"
                      }
                    >
                      {student.status}
                    </Badge>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 30,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.18,
                  ...springGentle,
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.02,
                      }
                }
                whileTap={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
              >
                <Link href={`/features/students/${student.id}/edit`}>
                  <Button
                    size="lg"
                    className="h-12 rounded-2xl border-0 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#0f766e_100%)] px-6 shadow-[0_18px_40px_rgba(15,23,42,.24)]"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Student
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal */}

          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-md">
            <h2 className="mb-5 border-b border-sky-100 pb-3 text-lg font-bold text-sky-700">
              Personal Details
            </h2>

            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <User className="h-4 w-4 text-sky-600" />
                  First Name
                </p>
                <p className="font-semibold text-slate-800">
                  {student.firstName}
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <User className="h-4 w-4 text-indigo-600" />
                  Last Name
                </p>
                <p className="font-semibold text-slate-800">
                  {student.lastName}
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {student.gender === "Male" ? (
                    <Mars className="h-4 w-4 text-blue-600" />
                  ) : student.gender === "Female" ? (
                    <Venus className="h-4 w-4 text-pink-600" />
                  ) : (
                    <User className="h-4 w-4 text-violet-600" />
                  )}
                  Gender
                </p>

                <p
                  className={`font-semibold ${
                    student.gender === "Male"
                      ? "text-blue-700"
                      : student.gender === "Female"
                        ? "text-pink-700"
                        : "text-violet-700"
                  }`}
                >
                  {student.gender}
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <CalendarDays className="h-4 w-4 text-amber-600" />
                  Date of Birth
                </p>
                <p className="font-semibold text-slate-800">
                  {formatDate(student.dob)}
                </p>
              </div>

              <div>
                <p className="section-label">
                  <Cake className="h-4 w-4 text-pink-600" />
                  Age
                </p>

                <p className="section-value">{getAge(student.dob)} Years</p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <CalendarPlus className="h-4 w-4 text-emerald-600" />
                  Joining Date
                </p>
                <p className="font-semibold text-slate-800">
                  {formatDate(student.joiningDate)}
                </p>
              </div>

              <div>
                <p className="section-label">
                  <Clock3 className="h-4 w-4 text-emerald-600" />
                  Joined Since
                </p>

                <p className="section-value">
                  {getDaysJoined(student.joiningDate)} Days
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" />
                  Status
                </p>

                <Badge
                  className={
                    student.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }
                >
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Parent */}

          <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-md">
            <h2 className="mb-5 border-b border-violet-100 pb-3 text-lg font-bold text-violet-700">
              Parent Details
            </h2>

            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Father&apos;s Name
                </p>
                <p className="font-semibold text-slate-800">
                  {student.fatherName}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mother&apos;s Name
                </p>
                <p className="font-semibold text-slate-800">
                  {student.motherName || "-"}
                </p>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Phone className="h-4 w-4 text-sky-600" />
                  Phone
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${student.phone}`}
                    className="font-semibold text-sky-700 transition hover:text-sky-900 hover:underline"
                  >
                    {student.phone}
                  </a>

                  <a
                    href={`https://wa.me/91${student.phone}?text=Hi`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    >
                      <MessageCircleMore className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Smartphone className="h-4 w-4 text-violet-600" />
                  Alternate Phone
                </p>

                {student.alternatePhone ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${student.alternatePhone}`}
                      className="font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
                    >
                      {student.alternatePhone}
                    </a>

                    <a
                      href={`https://wa.me/91${student.alternatePhone}?text=Hi`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <MessageCircleMore className="mr-2 h-4 w-4" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                ) : (
                  <p className="font-semibold text-slate-400">-</p>
                )}
              </div>

              <div className="col-span-2">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Mail className="h-4 w-4 text-rose-600" />
                  Email
                </p>

                {student.email ? (
                  <a
                    href={`mailto:${student.email}`}
                    className="font-semibold text-rose-700 transition hover:text-rose-900 hover:underline"
                  >
                    {student.email}
                  </a>
                ) : (
                  <p className="font-semibold text-slate-400">-</p>
                )}
              </div>
            </div>
          </div>

          {/* Academic */}

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                Academic Information
              </h2>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <BadgeCheck className="h-5 w-5 text-blue-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Admission No.
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {student.admissionNo}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <GraduationCap className="h-5 w-5 text-violet-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Class
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {student.studentClass}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 xl:col-span-2">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <School className="h-5 w-5 text-emerald-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  School
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {student.school}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 xl:col-span-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <BookOpen className="h-5 w-5 text-amber-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Batch
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {student.batch}
                </p>
              </div>
            </div>
          </div>

          {/* Fee */}

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Wallet className="h-5 w-5 text-emerald-600" />
                Fee Details
              </h2>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <IndianRupee className="h-5 w-5 text-emerald-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Monthly Fee
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  ₹ {student.monthlyFee?.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Wallet className="h-5 w-5 text-blue-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Fee Status
                </p>

                <Badge
                  className={
                    student.feeStatus === "Paid"
                      ? "mt-2 bg-green-100 text-green-700"
                      : "mt-2 bg-amber-100 text-amber-700"
                  }
                >
                  {student.feeStatus}
                </Badge>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <CalendarCheck2 className="h-5 w-5 text-blue-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Last Fee Paid
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {formatDate(student.lastFeePaid)}
                </p>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <CalendarClock className="h-5 w-5 text-red-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Next Due Date
                </p>

                <p className="mt-2 font-semibold text-red-700">
                  {formatDate(student.nextDueDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Address */}

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <MapPin className="h-5 w-5 text-orange-600" />
                Address Information
              </h2>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 md:col-span-2">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Address
                </p>

                <p className="mt-2 font-medium leading-7 text-slate-900">
                  {student.address}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  City
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {student.city}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Map className="h-5 w-5 text-violet-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  State
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {student.state}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 xl:col-span-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <Mailbox className="h-5 w-5 text-emerald-600" />
                </div>

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Pincode
                </p>

                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {student.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Remarks */}

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <NotebookPen className="h-5 w-5 text-slate-700" />
                Remarks
              </h2>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200">
                    <NotebookPen className="h-5 w-5 text-slate-700" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Teacher Notes
                    </p>

                    <p className="text-sm text-slate-500">
                      Internal remarks for this student
                    </p>
                  </div>
                </div>

                {student.remarks ? (
                  <p className="leading-8 text-slate-700 whitespace-pre-line">
                    {student.remarks}
                  </p>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white py-10 text-center">
                    <NotebookPen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                    <p className="font-medium text-slate-500">
                      No remarks added yet
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Teacher notes will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
