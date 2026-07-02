"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

import type { Student } from "../types/student";

interface StudentProfileCardProps {
  student: Student;
}

export default function StudentProfileCard({
  student,
}: StudentProfileCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <Image
            src={student.profilePhoto}
            alt={student.firstName}
            width={110}
            height={110}
            className="rounded-full border object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {student.firstName} {student.lastName}
            </h1>

            <p className="mt-1 text-muted-foreground">
              Admission No. {student.admissionNo}
            </p>

            <p className="text-muted-foreground">
              {student.gender === "Male"
                ? "S/O"
                : student.gender === "Female"
                  ? "D/O"
                  : "Child of"}{" "}
              {student.fatherName}
            </p>

            <div className="mt-4">
              <Badge
                variant={
                  student.status === "Active" ? "default" : "destructive"
                }
              >
                {student.status}
              </Badge>
            </div>
          </div>
        </div>

        <Link href={`/students/${student.id}/edit`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Student
          </Button>
        </Link>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Personal Details */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold border-b pb-3">
            Personal Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-muted-foreground">First Name</p>
              <p className="font-medium">{student.firstName}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Last Name</p>
              <p className="font-medium">{student.lastName}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Gender</p>
              <p className="font-medium">{student.gender}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{student.dob}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Joining Date</p>
              <p className="font-medium">{student.joiningDate}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">{student.status}</p>
            </div>
          </div>
        </div>

        {/* Parent Details */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold border-b pb-3">
            Parent Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-muted-foreground">Father&apos;s Name</p>
              <p className="font-medium">{student.fatherName}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Mother&apos;s Name</p>
              <p className="font-medium">{student.motherName || "-"}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{student.phone}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Alternate Phone</p>
              <p className="font-medium">{student.alternatePhone || "-"}</p>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{student.email || "-"}</p>
            </div>
          </div>
        </div>

        {/* Academic Details */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold border-b pb-3">
            Academic Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-muted-foreground">Admission No.</p>
              <p className="font-medium">{student.admissionNo}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Class</p>
              <p className="font-medium">{student.studentClass}</p>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground">School</p>
              <p className="font-medium">{student.school}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Batch</p>
              <p className="font-medium">{student.batch}</p>
            </div>
          </div>
        </div>

        {/* Fee Details */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold border-b pb-3">
            Fee Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-muted-foreground">Monthly Fee</p>
              <p className="font-semibold text-lg">
                ₹ {student.monthlyFee.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Fee Status</p>
              <p className="font-medium">{student.feeStatus}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Last Fee Paid</p>
              <p className="font-medium">{student.lastFeePaid}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Next Due Date</p>
              <p className="font-medium">{student.nextDueDate}</p>
            </div>
          </div>
        </div>

        {/* Address */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-5 text-lg font-semibold border-b pb-3">Address</h2>

          <div className="grid gap-5 md:grid-cols-4 text-sm">
            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium">{student.address}</p>
            </div>

            <div>
              <p className="text-muted-foreground">City</p>
              <p className="font-medium">{student.city}</p>
            </div>

            <div>
              <p className="text-muted-foreground">State</p>
              <p className="font-medium">{student.state}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Pincode</p>
              <p className="font-medium">{student.pincode}</p>
            </div>
          </div>
        </div>

        {/* Remarks */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-5 text-lg font-semibold border-b pb-3">Remarks</h2>

          <p className="text-sm leading-7 text-muted-foreground">
            {student.remarks || "No remarks added."}
          </p>
        </div>
      </div>
    </div>
  );
}
