"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cake, Clock3, Pencil } from "lucide-react";
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

export default function StudentProfileCard({
  student,
}: StudentProfileCardProps) {
  return (
    <>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-6 shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <Image
              src={student.profilePhoto}
              alt={student.firstName}
              width={120}
              height={120}
              className="rounded-full border-4 border-sky-200 object-cover shadow-md"
            />

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {student.firstName} {student.lastName}
              </h1>

              <p className="mt-2 text-slate-500">
                Admission No.{" "}
                <span className="font-semibold text-sky-700">
                  {student.admissionNo}
                </span>
              </p>

              <p className="text-slate-500">
                {student.gender === "Male"
                  ? "S/O"
                  : student.gender === "Female"
                    ? "D/O"
                    : "Child of"}{" "}
                <span className="font-medium text-slate-700">
                  {student.fatherName}
                </span>
              </p>

              <div className="mt-4">
                <Badge
                  className={
                    student.status === "Active"
                      ? "border-green-200 bg-green-100 text-green-700 hover:bg-green-100"
                      : "border-red-200 bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {student.status}
                </Badge>
              </div>
            </div>
          </div>

          <Link href={`/students/${student.id}/edit`}>
            <Button className="mt-4 lg:mt-0 cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Student
            </Button>
          </Link>
        </div>
      </div>

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
              <p className="font-semibold text-slate-800">{student.lastName}</p>
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

        <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-md">
          <h2 className="mb-5 border-b border-indigo-100 pb-3 text-lg font-bold text-indigo-700">
            Academic Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Admission No.
              </p>
              <p className="font-semibold text-slate-800">
                {student.admissionNo}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Class
              </p>
              <p className="font-semibold text-slate-800">
                {student.studentClass}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                School
              </p>
              <p className="font-semibold text-slate-800">{student.school}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Batch
              </p>
              <p className="font-semibold text-slate-800">{student.batch}</p>
            </div>
          </div>
        </div>

        {/* Fee */}

        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-md">
          <h2 className="mb-5 border-b border-emerald-100 pb-3 text-lg font-bold text-emerald-700">
            Fee Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Monthly Fee
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                ₹ {student.monthlyFee.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Fee Status
              </p>
              <Badge
                className={
                  student.feeStatus === "Paid"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                }
              >
                {student.feeStatus}
              </Badge>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last Fee Paid
              </p>
              <p className="font-semibold text-slate-800">
                {formatDate(student.lastFeePaid)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Next Due
              </p>
              <p className="font-semibold text-red-400">
                {formatDate(student.nextDueDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}

        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-md lg:col-span-2">
          <h2 className="mb-5 border-b border-orange-100 pb-3 text-lg font-bold text-orange-700">
            Address
          </h2>

          <div className="grid gap-5 md:grid-cols-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Address
              </p>
              <p className="font-semibold text-slate-800">{student.address}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                City
              </p>
              <p className="font-semibold text-slate-800">{student.city}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                State
              </p>
              <p className="font-semibold text-slate-800">{student.state}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pincode
              </p>
              <p className="font-semibold text-slate-800">{student.pincode}</p>
            </div>
          </div>
        </div>

        {/* Remarks */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md lg:col-span-2">
          <h2 className="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-700">
            Remarks
          </h2>

          <p className="leading-7 text-slate-600">
            {student.remarks || "No remarks added."}
          </p>
        </div>
      </div>
    </>
  );
}
