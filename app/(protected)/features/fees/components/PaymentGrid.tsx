"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Wallet } from "lucide-react";

import { Input } from "@/components/ui/input";

import FeeAnalytics from "./FeeAnalytics";
import PaymentCard from "./PaymentCard";
import PaymentDialog, { type PaymentFormData } from "./PaymentDialog";

import type { PaymentStudent } from "../types/fee";

interface Props {
  students: PaymentStudent[];
}

export default function PaymentGrid({ students }: Props) {
  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] = useState<PaymentStudent | null>(
    null,
  );

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) =>
      [
        student.firstName,
        student.lastName,
        student.admissionNo,
        student.studentClass,
        student.batch,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [students, search]);

  function handleRecordPayment(student: PaymentStudent) {
    setSelectedStudent(student);

    setPaymentDialogOpen(true);
  }

  function handlePaymentSubmit(data: PaymentFormData) {
    console.log("Payment payload:", data);

    /*
      Later:

      await recordPayment(data)

      refresh payment records

      refresh analytics

      refresh timeline
    */
  }

  return (
    <div className="space-y-6">
      <FeeAnalytics students={students} />

      {/* Search */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          rounded-3xl
          border
          bg-white
          p-5
          shadow-sm
        "
      >
        <div className="relative">
          <Search
            className="
              absolute
              left-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className="
              h-12
              rounded-2xl
              pl-12
            "
          />
        </div>
      </motion.div>

      {filteredStudents.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
              flex
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              bg-white
              py-20
              text-center
              shadow-sm
            "
        >
          <div
            className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-slate-100
              "
          >
            <Wallet
              className="
                  h-9
                  w-9
                  text-slate-400
                "
            />
          </div>

          <h3
            className="
                mt-6
                text-xl
                font-bold
                text-slate-800
              "
          >
            No students found
          </h3>

          <p
            className="
                mt-2
                text-sm
                text-slate-500
              "
          >
            Try changing your search.
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
        >
          {filteredStudents.map((student) => (
            <PaymentCard
              key={student.id}
              student={student}
              onRecordPayment={handleRecordPayment}
              onViewHistory={(student: PaymentStudent) => {
                console.log("History:", student.id);
              }}
            />
          ))}
        </motion.div>
      )}

      <PaymentDialog
        student={selectedStudent}
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
}
