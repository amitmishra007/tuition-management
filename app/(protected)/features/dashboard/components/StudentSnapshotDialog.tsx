"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  GraduationCap,
  MapPin,
  Calendar,
  IndianRupee,
  School,
  User,
  BookOpen,
  Pencil,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DashboardStudent } from "../types/dashboard";

interface Props {
  open: boolean;
  onClose: () => void;
  student: DashboardStudent | null;
}

export default function StudentSnapshotDialog({
  open,
  onClose,
  student,
}: Props) {
  if (!student) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed left-1/2 top-1/2 z-60 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/40 bg-white shadow-2xl"
          >
            {/* Decorative */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,.08),transparent_35%)]" />

            <div className="relative">
              {/* Header */}

              <div className="flex items-start justify-between border-b p-8">
                <div className="flex gap-6">
                  <Image
                    src={student.profilePhoto ? student.profilePhoto : ""}
                    alt={student.firstName}
                    width={110}
                    height={110}
                    className="rounded-3xl object-cover shadow-xl"
                  />

                  <div>
                    <h2 className="text-3xl font-bold">
                      {student.firstName} {student.lastName}
                    </h2>

                    <p className="mt-2 text-slate-500">{student.admissionNo}</p>

                    <div className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                      {student.status}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X />
                </Button>
              </div>

              {/* Body */}

              <div className="grid gap-6 p-8 md:grid-cols-2">
                <Info
                  icon={<GraduationCap size={18} />}
                  title="Class"
                  value={student.studentClass}
                />

                <Info
                  icon={<School size={18} />}
                  title="School"
                  value={student.school}
                />

                <Info
                  icon={<Phone size={18} />}
                  title="Phone"
                  value={student.phone}
                />

                <Info
                  icon={<Mail size={18} />}
                  title="Email"
                  value={student.email}
                />

                <Info
                  icon={<User size={18} />}
                  title="Father"
                  value={student.fatherName}
                />

                <Info
                  icon={<User size={18} />}
                  title="Mother"
                  value={student.motherName}
                />

                <Info
                  icon={<Calendar size={18} />}
                  title="Birthday"
                  value={student.dob}
                />

                <Info
                  icon={<IndianRupee size={18} />}
                  title="Monthly Fee"
                  value={`₹${student.monthlyFee}`}
                />

                <Info
                  icon={<BookOpen size={18} />}
                  title="Batch"
                  value={student.batch}
                />

                <Info
                  icon={<Calendar size={18} />}
                  title="Next Due"
                  value={student.nextDueDate}
                />
              </div>

              {/* Address */}

              <div className="border-t px-8 py-6">
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <MapPin size={18} />
                  Address
                </div>

                <p className="text-slate-600">
                  {student.address}, {student.city}, {student.state} -{" "}
                  {student.pincode}
                </p>
              </div>

              {/* Remarks */}

              {student.remarks && (
                <div className="border-t px-8 py-6">
                  <h3 className="mb-2 font-semibold">Remarks</h3>

                  <p className="leading-7 text-slate-600">{student.remarks}</p>
                </div>
              )}

              {/* Footer */}

              <div className="flex justify-end gap-4 border-t bg-slate-50 p-6">
                <Link href={`/features/students/${student.id}`}>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </Link>

                <Link href={`/features/students/${student.id}/edit`}>
                  <Button>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Student
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number | null;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        {icon}

        <span className="text-sm">{title}</span>
      </div>

      <p className="font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}
