"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, GraduationCap, Pencil, Phone, School, X } from "lucide-react";

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-lg"
          />

          {/* Ambient Glow */}

          <div className="pointer-events-none fixed inset-0 z-51 overflow-hidden">
            <motion.div
              animate={{
                x: [-60, 50, -60],
                y: [-40, 30, -40],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-130 w-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/15 blur-[120px]"
            />

            <motion.div
              animate={{
                x: [40, -40, 40],
                y: [20, -20, 20],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[120px]"
            />
          </div>

          {/* Dialog */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: 16,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className="fixed left-1/2 top-1/2 z-60 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-[30px] bg-linear-to-br from-sky-300 via-indigo-300 to-cyan-300 p-px shadow-[0_40px_100px_rgba(15,23,42,.28)]">
              <div className="relative overflow-hidden rounded-[29px] bg-white">
                {/* Hero */}

                <div className="relative h-28 overflow-hidden md:h-36">
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-size-[250%_250%] bg-linear-to-br from-sky-500 via-indigo-500 to-cyan-400"
                  />

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,.18),transparent_40%)]" />

                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/20 text-white backdrop-blur-xl hover:bg-white/30"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Profile */}

                <div className="relative px-6 pb-5">
                  <div className="-mt-10 flex flex-col items-center gap-5 md:-mt-12 md:flex-row md:items-center">
                    {/* Avatar */}

                    <motion.div
                      initial={{
                        scale: 0.9,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.08,
                      }}
                      className="relative shrink-0"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.08, 1],
                          opacity: [0.35, 0.55, 0.35],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 rounded-full bg-sky-300 blur-2xl"
                      />

                      <div className="relative rounded-full bg-white p-1 shadow-xl">
                        <div className="rounded-full bg-linear-to-br from-sky-400 via-cyan-400 to-indigo-500 p-0.75">
                          <Image
                            src={student.profilePhoto || "/images/avatar.png"}
                            alt={student.firstName}
                            width={88}
                            height={88}
                            className="h-20 w-20 rounded-full border-4 border-white object-cover md:h-24 md:w-24"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Identity */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.15,
                        duration: 0.35,
                      }}
                      className="flex-1 text-center md:text-left"
                    >
                      <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                        {student.firstName} {student.lastName}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Class {student.studentClass} •{" "}
                        <span
                          className={
                            student.status === "Active"
                              ? "font-semibold text-emerald-600"
                              : "font-semibold text-rose-600"
                          }
                        >
                          {student.status}
                        </span>
                      </p>

                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                        {student.admissionNo}
                      </p>
                    </motion.div>
                  </div>

                  {/* Information */}

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
                      delay: 0.22,
                      duration: 0.35,
                    }}
                    className="mt-6 grid gap-3 md:grid-cols-2"
                  >
                    <InfoTile
                      icon={GraduationCap}
                      title="Class"
                      value={student.studentClass || "-"}
                      gradient="from-sky-500 via-cyan-500 to-blue-500"
                    />

                    <InfoTile
                      icon={School}
                      title="School"
                      value={student.school || "-"}
                      href="#"
                      gradient="from-violet-500 via-indigo-500 to-fuchsia-500"
                    />

                    <PhoneTile
                      phone={student.phone}
                      className="md:col-span-2"
                    />
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.28,
                    duration: 0.3,
                  }}
                  className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/80 p-4"
                >
                  <Link href={`/features/students/${student.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href={`/features/students/${student.id}/edit`}>
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-xl bg-linear-to-r from-sky-500 to-indigo-500 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface InfoTileProps {
  icon: React.ElementType;
  title: string;
  value: string;
  gradient: string;
  href?: string;
}

function InfoTile({ icon: Icon, title, value, gradient, href }: InfoTileProps) {
  const card = (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.99,
      }}
      transition={{
        duration: 0.18,
      }}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white shadow`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
          {title}
        </p>

        <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </motion.div>
  );

  if (!href) return card;

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {card}
    </a>
  );
}

interface PhoneTileProps {
  phone: string | null;
  className?: string;
}

function PhoneTile({ phone, className }: PhoneTileProps) {
  return (
    <motion.a
      href={phone ? `tel:${phone}` : undefined}
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.99,
      }}
      transition={{
        duration: 0.18,
      }}
      className={`
        group flex items-center gap-3 rounded-2xl border border-slate-200
        bg-white p-3 shadow-sm transition-all
        hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md
        ${className ?? ""}
      `}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-cyan-500 text-white shadow">
        <Phone className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
          Phone
        </p>

        <p className="truncate text-sm font-semibold text-slate-900">
          {phone || "-"}
        </p>
      </div>
    </motion.a>
  );
}
