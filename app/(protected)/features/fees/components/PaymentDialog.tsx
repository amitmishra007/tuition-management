"use client";

import { useState } from "react";

import {
  CalendarDays,
  IndianRupee,
  ReceiptIndianRupee,
  UserRound,
  WalletCards,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { PaymentStudent } from "../types/fee";

interface Props {
  student: PaymentStudent | null;

  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSubmit?: (data: PaymentFormData) => void;
}

export interface PaymentFormData {
  studentId: string;

  amount: number;

  paymentDate: string;

  paymentMethod: "Cash" | "UPI" | "Bank" | "Other";

  remarks?: string;
}

const METHODS = ["Cash", "UPI", "Bank", "Other"] as const;

export default function PaymentDialog({
  student,
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [amount, setAmount] = useState("");

  const [method, setMethod] =
    useState<PaymentFormData["paymentMethod"]>("Cash");

  const [remarks, setRemarks] = useState("");

  if (!student) {
    return null;
  }

  const currentStudent = student;

  function submitPayment() {
    const value = Number(amount);

    if (!value) return;

    onSubmit?.({
      studentId: currentStudent.id,

      amount: value,

      paymentDate: new Date().toISOString().split("T")[0],

      paymentMethod: method,

      remarks,
    });

    onOpenChange(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            px-4
            backdrop-blur-sm
          "
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
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
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-slate-950
              p-6
              shadow-2xl
            "
          >
            {/* Aurora */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
              "
            >
              <div
                className="
                  absolute
                  -left-20
                  -top-20
                  h-56
                  w-56
                  rounded-full
                  bg-violet-500/20
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  right-0
                  top-20
                  h-48
                  w-48
                  rounded-full
                  bg-blue-500/20
                  blur-3xl
                "
              />
            </div>

            <div
              className="
                relative
                z-10
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/10
                  "
                >
                  <UserRound
                    className="
                      text-white
                    "
                    size={22}
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    Record Payment
                  </h2>

                  <p
                    className="
                      text-sm
                      text-white/50
                    "
                  >
                    {currentStudent.firstName} {currentStudent.lastName}
                  </p>
                </div>
              </div>
              {/* Outstanding */}
              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/4
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-sm
                      text-white/50
                    "
                  >
                    Monthly Fee
                  </span>

                  <WalletCards
                    size={18}
                    className="
                      text-white/60
                    "
                  />
                </div>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-1
                  "
                >
                  <IndianRupee
                    size={22}
                    className="
                      text-white/70
                    "
                  />

                  <span
                    className="
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    {currentStudent.monthlyFee?.toLocaleString("en-IN") ?? 0}
                  </span>
                </div>
              </div>{" "}
              {/* Amount */}
              <div
                className="
                  mt-5
                "
              >
                <label
                  className="
                    text-xs
                    font-medium
                    text-white/50
                  "
                >
                  Payment Amount
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/4
                    px-4
                  "
                >
                  <IndianRupee
                    size={18}
                    className="
                      text-white/50
                    "
                  />

                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="Enter amount"
                    className="
                      h-12
                      w-full
                      bg-transparent
                      px-3
                      text-white
                      outline-none
                      placeholder:text-white/30
                    "
                  />
                </div>
              </div>
              {/* Payment Method */}
              <div
                className="
                  mt-5
                "
              >
                <label
                  className="
                    text-xs
                    font-medium
                    text-white/50
                  "
                >
                  Payment Method
                </label>

                <div
                  className="
                    mt-2
                    grid
                    grid-cols-4
                    gap-2
                  "
                >
                  {METHODS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMethod(item)}
                      className={`
                        rounded-xl
                        border
                        px-2
                        py-2
                        text-xs
                        transition

                        ${
                          method === item
                            ? "border-white bg-white text-black"
                            : "border-white/10 bg-white/4 text-white/70"
                        }

                      `}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              {/* Date */}
              <div
                className="
                  mt-5
                "
              >
                <label
                  className="
                    text-xs
                    font-medium
                    text-white/50
                  "
                >
                  Payment Date
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/4
                    px-4
                  "
                >
                  <CalendarDays
                    size={18}
                    className="
                      text-white/50
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-white/80
                    "
                  >
                    {new Date().toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              {/* Remarks */}
              <div
                className="
                  mt-5
                "
              >
                <label
                  className="
                    text-xs
                    font-medium
                    text-white/50
                  "
                >
                  Notes
                </label>

                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Optional note..."
                  rows={3}
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/4
                    p-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/30
                  "
                />
              </div>
              {/* Actions */}
              <div
                className="
                  mt-6
                  flex
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/4
                    py-3
                    text-sm
                    font-medium
                    text-white/70
                    transition
                    hover:bg-white/8
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={submitPayment}
                  className="
                    group
                    flex-1
                    rounded-2xl
                    bg-white
                    py-3
                    text-sm
                    font-semibold
                    text-black
                    transition
                    hover:scale-[1.02]
                    active:scale-95
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <ReceiptIndianRupee
                      size={17}
                      className="
                        transition
                        group-hover:rotate-6
                      "
                    />
                    Save Payment
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
