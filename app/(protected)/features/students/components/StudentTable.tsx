"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  useTransition,
  startTransition,
} from "react";
import {
  ClipboardCheck,
  Eye,
  GraduationCap,
  IndianRupee,
  Pencil,
  Phone,
  Plus,
  School,
  Search,
  Trash2,
  Loader2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { deleteStudent } from "../action";
import type { Student } from "../types/student";
import type { Variants } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";

interface StudentTableProps {
  students: Student[];
  onView?: (student: Student) => void;
  onRecordFee?: (student: Student) => void;
  onAttendance?: (student: Student) => void;
}

const value = (v: unknown, fallback = "—") => {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "string" && !v.trim()) return fallback;
  return String(v);
};

const initials = (student: Student) => {
  const first = student.firstName?.trim()?.charAt(0) ?? "";
  const last = student.lastName?.trim()?.charAt(0) ?? "";
  return `${first}${last}`.toUpperCase() || "??";
};

const fullName = (student: Student) =>
  `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim() ||
  "Unnamed Student";

const currency = (n: unknown) => `₹ ${Number(n ?? 0).toLocaleString("en-IN")}`;

const getRelationLabel = (gender?: string | null) => {
  if (gender === "Male") return "S/O";
  if (gender === "Female") return "D/O";
  return "Child of";
};

const springSmooth = {
  type: "spring" as const,
  damping: 30,
  stiffness: 200,
};

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

export default function StudentTable({
  students,
  onView,
  onRecordFee,
  onAttendance,
}: StudentTableProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [pressedAction, setPressedAction] = useState<string | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 280);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    students.forEach((student) => {
      router.prefetch(`/features/students/${student.id}`);
      router.prefetch(`/features/students/${student.id}/edit`);
    });
  }, [students, router]);

  const filteredStudents = useMemo(() => {
    if (!debouncedSearch.trim()) return students;

    const q = debouncedSearch.toLowerCase();

    return students.filter((student) =>
      [
        student.firstName,
        student.lastName,
        student.admissionNo,
        student.fatherName,
        student.phone,
        student.school,
        student.studentClass,
        student.city,
        student.batch,
        student.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [students, debouncedSearch]);

  const pageVariants = {
    hidden: {
      opacity: 0,
      filter: prefersReducedMotion ? "none" : "blur(8px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ...springGentle,
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.04,
      },
    },
  };

  const blockVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 18,
      scale: prefersReducedMotion ? 1 : 0.985,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springGentle,
    },
  };

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.985,
      filter: prefersReducedMotion ? "none" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: springSmooth,
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -12,
      scale: prefersReducedMotion ? 1 : 0.98,
      filter: prefersReducedMotion ? "none" : "blur(8px)",
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  };

  const handleNavigate = (href: string, rowId: string) => {
    setActiveRow(rowId);
    startTransition(() => {
      router.push(href);
    });
  };

  const pulseAction = (key: string, cb: () => void) => {
    setPressedAction(key);
    cb();
    window.setTimeout(
      () => setPressedAction((prev) => (prev === key ? null : prev)),
      220,
    );
  };

  const handleEdit = (id: string) => {
    pulseAction(`edit-${id}`, () =>
      handleNavigate(`/features/students/${id}/edit`, id),
    );
  };

  const handleView = (student: Student) => {
    pulseAction(`view-${student.id}`, () => {
      onView?.(student);
      handleNavigate(`/features/students/${student.id}`, student.id);
    });
  };

  const handleAddStudent = () => {
    router.push("/features/students/add");
  };

  const handleDelete = () => {
    if (!studentToDelete) return;

    startDeleteTransition(async () => {
      try {
        await deleteStudent(studentToDelete.id);

        toast.success(
          `${studentToDelete.firstName} ${studentToDelete.lastName} ${
            studentToDelete.gender === "Male"
              ? "S/o"
              : studentToDelete.gender === "Female"
                ? "D/o"
                : "Child of"
          } Sh. ${studentToDelete.fatherName} & Smt. ${
            studentToDelete.motherName
          } deleted successfully.`,
        );

        setStudentToDelete(null);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Unable to delete student.");
      }
    });
  };

  const ActionIconButton = ({
    actionKey,
    onClick,
    children,
    label,
    variant = "outline",
    destructive = false,
    disabled = false,
  }: {
    actionKey: string;
    onClick: () => void;
    children: React.ReactNode;
    label: string;
    variant?: "outline" | "destructive";
    destructive?: boolean;
    disabled?: boolean;
  }) => {
    const isPressed = pressedAction === actionKey;

    return (
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.03 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        animate={
          isPressed && !prefersReducedMotion
            ? {
                scale: [1, 0.94, 1.02, 1],
                rotate: destructive ? [0, -2, 2, 0] : [0, -1.5, 1.5, 0],
              }
            : { scale: 1, rotate: 0 }
        }
        transition={springSnappy}
        className="relative"
      >
        <Button
          type="button"
          aria-label={label}
          variant={variant}
          size="icon"
          disabled={disabled}
          onClick={onClick}
          className={[
            "relative h-10 w-10 overflow-hidden rounded-2xl border-white/60 bg-white/75 backdrop-blur-xl transition-all",
            "shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
            "hover:border-white hover:bg-white",
            destructive
              ? "border-red-200/70 bg-red-50/80 text-red-600 hover:bg-red-50"
              : "",
          ].join(" ")}
        >
          <motion.span
            className="absolute inset-0"
            initial={false}
            animate={
              isPressed && !prefersReducedMotion
                ? { opacity: [0, 0.22, 0], scale: [0.7, 1.15, 1.35] }
                : { opacity: 0, scale: 0.7 }
            }
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: destructive
                ? "radial-gradient(circle, rgba(239,68,68,0.18) 0%, rgba(239,68,68,0) 72%)"
                : "radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 72%)",
            }}
          />
          <span className="relative z-10">{children}</span>
        </Button>
      </motion.div>
    );
  };

  return (
    <LayoutGroup>
      <motion.div
        className="space-y-6"
        variants={pageVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={blockVariants}>
          <Card className="overflow-hidden rounded-[32px] border-white/50 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))]" />
            <CardContent className="relative space-y-6 p-6 lg:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <motion.div
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, x: -10 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, ...springGentle }}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Student Registry
                  </motion.div>

                  <div>
                    <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 lg:text-4xl">
                      Students
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 lg:text-base">
                      A cinematic overview of every student, with faster
                      actions, richer hierarchy, and premium interaction
                      feedback.
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={springSnappy}
                >
                  <Button
                    size="lg"
                    onClick={handleAddStudent}
                    className="h-12 rounded-2xl border-0 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#0f766e_100%)] px-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </motion.div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <motion.div
                  layout
                  className="group relative"
                  whileFocus={
                    prefersReducedMotion ? undefined : { scale: 1.01 }
                  }
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_left,rgba(56,189,248,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,250,252,0.9))]" />
                  <Search className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-sky-600" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, admission no, father, phone, school..."
                    className="relative z-10 h-14 rounded-[22px] border-white/70 bg-white/70 pl-11 pr-4 text-[15px] shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                  />
                </motion.div>

                <motion.div
                  layout
                  className="flex items-center gap-3 self-start lg:self-center"
                >
                  <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-[0_10px_34px_rgba(15,23,42,0.05)] backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      Visible
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-900">
                      {filteredStudents.length}
                      <span className="ml-1 text-sm font-medium text-slate-500">
                        / {students.length}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={blockVariants} className="lg:hidden">
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <AnimatePresence initial={false}>
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
                  layout
                  variants={itemVariants}
                  exit="exit"
                >
                  <Card
                    className={[
                      "group overflow-hidden rounded-[28px] border-white/50 bg-white/75 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl",
                      activeRow === student.id
                        ? "pointer-events-none opacity-60"
                        : "",
                    ].join(" ")}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_28%)] opacity-80" />
                    <CardContent className="relative space-y-5 p-5">
                      <div className="flex items-center gap-4">
                        <motion.div
                          layoutId={`avatar-${student.id}`}
                          whileHover={
                            prefersReducedMotion ? undefined : { scale: 1.04 }
                          }
                          transition={springGentle}
                        >
                          <Avatar className="h-16 w-16 border-2 border-white shadow-xl">
                            <AvatarImage src={student.profilePhoto || ""} />
                            <AvatarFallback className="bg-slate-100 font-semibold text-slate-700">
                              {initials(student)}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-lg font-semibold tracking-[-0.03em] text-slate-900">
                            {fullName(student)}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Admission No. {value(student.admissionNo)}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <Badge
                              variant={
                                student.status === "Active"
                                  ? "success"
                                  : "danger"
                              }
                              className="rounded-full px-3 py-1"
                            >
                              {value(student.status)}
                            </Badge>
                            <Badge
                              variant={
                                student.feeStatus === "Paid"
                                  ? "success"
                                  : "warning"
                              }
                              className="rounded-full px-3 py-1"
                            >
                              {value(student.feeStatus)}
                            </Badge>
                          </div>
                        </div>

                        <motion.div
                          animate={
                            activeRow === student.id && !prefersReducedMotion
                              ? { x: [0, 4, 0] }
                              : { x: 0 }
                          }
                          transition={{ repeat: Infinity, duration: 1.1 }}
                          className="text-slate-300"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,0.78))] p-4 text-sm shadow-inner">
                        <InfoBlock
                          label="School"
                          value={value(student.school)}
                        />
                        <InfoBlock
                          label="Class"
                          value={value(student.studentClass)}
                        />
                        <InfoBlock
                          label="Father"
                          value={value(student.fatherName)}
                        />
                        <div>
                          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                            Phone
                          </p>
                          <a
                            href={`tel:+91${String(student.phone).replace(/\D/g, "")}`}
                            className="mt-1 block font-medium text-sky-700 underline-offset-4 transition-colors hover:text-sky-900 hover:underline"
                          >
                            {value(student.phone)}
                          </a>
                        </div>
                        <InfoBlock
                          label="Monthly Fee"
                          value={currency(student.monthlyFee)}
                          valueClassName="font-semibold text-emerald-700"
                        />
                        <InfoBlock
                          label="Relation"
                          value={getRelationLabel(student.gender)}
                        />
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        <ActionIconButton
                          actionKey={`view-${student.id}`}
                          label={`View ${fullName(student)}`}
                          onClick={() => handleView(student)}
                          disabled={activeRow === student.id}
                        >
                          <Eye className="h-4 w-4" />
                        </ActionIconButton>

                        <ActionIconButton
                          actionKey={`edit-${student.id}`}
                          label={`Edit ${fullName(student)}`}
                          onClick={() => handleEdit(student.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </ActionIconButton>

                        <ActionIconButton
                          actionKey={`fee-${student.id}`}
                          label={`Record fee for ${fullName(student)}`}
                          onClick={() =>
                            pulseAction(`fee-${student.id}`, () =>
                              onRecordFee?.(student),
                            )
                          }
                        >
                          <IndianRupee className="h-4 w-4" />
                        </ActionIconButton>

                        <ActionIconButton
                          actionKey={`attendance-${student.id}`}
                          label={`Attendance for ${fullName(student)}`}
                          onClick={() =>
                            pulseAction(`attendance-${student.id}`, () =>
                              onAttendance?.(student),
                            )
                          }
                        >
                          <ClipboardCheck className="h-4 w-4" />
                        </ActionIconButton>

                        <ActionIconButton
                          actionKey={`delete-${student.id}`}
                          label={`Delete ${fullName(student)}`}
                          variant="destructive"
                          destructive
                          onClick={() =>
                            pulseAction(`delete-${student.id}`, () =>
                              setStudentToDelete(student),
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </ActionIconButton>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredStudents.length === 0 && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={springGentle}
              >
                <Card className="rounded-[28px] border-white/50 bg-white/70 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                  <CardContent className="py-16 text-center">
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { opacity: [0.65, 1, 0.65], scale: [1, 1.03, 1] }
                      }
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                    >
                      <Search className="h-5 w-5" />
                    </motion.div>
                    <p className="text-base font-medium text-slate-700">
                      No students found.
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try a broader search term or add a new student.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div variants={blockVariants} className="hidden lg:block">
          <Card className="overflow-hidden rounded-[32px] border-white/50 bg-white/75 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="min-w-380 w-full">
                <thead className="bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(241,245,249,0.72))] backdrop-blur-xl">
                  <tr className="border-b border-slate-200/70 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <th className="px-6 py-5 text-left">Student</th>
                    <th className="px-6 py-5 text-left">Admission</th>
                    <th className="px-6 py-5 text-left">Father</th>
                    <th className="px-6 py-5 text-left">School</th>
                    <th className="px-6 py-5 text-left">Class</th>
                    <th className="px-6 py-5 text-left">Phone</th>
                    <th className="px-6 py-5 text-right">Monthly Fee</th>
                    <th className="px-6 py-5 text-center">Fee</th>
                    <th className="px-6 py-5 text-center">Status</th>
                    <th className="px-6 py-5 text-center">Actions</th>
                  </tr>
                </thead>

                <motion.tbody
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                >
                  <AnimatePresence initial={false}>
                    {filteredStudents.map((student) => (
                      <motion.tr
                        key={student.id}
                        layout
                        variants={itemVariants}
                        exit="exit"
                        className={[
                          "group border-b border-slate-200/60 bg-white/0 transition-colors",
                          activeRow === student.id
                            ? "pointer-events-none bg-slate-50/60 opacity-60"
                            : "hover:bg-slate-50/70",
                        ].join(" ")}
                      >
                        <td className="px-6 py-5">
                          <motion.div
                            layoutId={`card-${student.id}`}
                            className="flex items-center gap-4"
                          >
                            <div>
                              <Avatar className="h-16 w-16 border-2 border-white shadow-xl">
                                <AvatarImage
                                  src={student.profilePhoto || ""}
                                  alt={fullName(student)}
                                />
                                <AvatarFallback>
                                  {initials(student)}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold tracking-[-0.02em] text-slate-900">
                                {fullName(student)}
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                {getRelationLabel(student.gender)}{" "}
                                {value(student.fatherName)}
                              </p>
                            </div>
                          </motion.div>
                        </td>

                        <td className="px-6 text-slate-700">
                          {value(student.admissionNo)}
                        </td>
                        <td className="px-6 text-slate-700">
                          {value(student.fatherName)}
                        </td>

                        <td className="px-6">
                          <div className="flex items-center gap-2 text-slate-700">
                            <School className="h-4 w-4 text-slate-400" />
                            <span>{value(student.school)}</span>
                          </div>
                        </td>

                        <td className="px-6">
                          <div className="flex items-center gap-2 text-slate-700">
                            <GraduationCap className="h-4 w-4 text-slate-400" />
                            <span>{value(student.studentClass)}</span>
                          </div>
                        </td>

                        <td className="px-6">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Phone className="h-4 w-4 text-slate-400" />
                            <span>{value(student.phone)}</span>
                          </div>
                        </td>

                        <td className="px-6 text-right font-semibold text-emerald-700">
                          {currency(student.monthlyFee)}
                        </td>

                        <td className="px-6 text-center">
                          <Badge
                            variant={
                              student.feeStatus === "Paid"
                                ? "success"
                                : "warning"
                            }
                            className="rounded-full px-3 py-1"
                          >
                            {value(student.feeStatus)}
                          </Badge>
                        </td>

                        <td className="px-6 text-center">
                          <Badge
                            variant={
                              student.status === "Active" ? "success" : "danger"
                            }
                            className="rounded-full px-3 py-1"
                          >
                            {value(student.status)}
                          </Badge>
                        </td>

                        <td className="px-6">
                          <div className="flex justify-center gap-2">
                            <Link href={`/features/students/${student.id}`}>
                              <motion.div
                                whileHover={
                                  prefersReducedMotion
                                    ? undefined
                                    : { y: -2, scale: 1.03 }
                                }
                                whileTap={
                                  prefersReducedMotion
                                    ? undefined
                                    : { scale: 0.95 }
                                }
                                transition={springSnappy}
                              >
                                <Button
                                  size="icon"
                                  variant="outline"
                                  aria-label={`View ${fullName(student)}`}
                                  className="rounded-2xl border-white/60 bg-white/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                                  onClick={() => setActiveRow(student.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </Link>

                            <ActionIconButton
                              actionKey={`edit-${student.id}`}
                              label={`Edit ${fullName(student)}`}
                              onClick={() => handleEdit(student.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </ActionIconButton>

                            <ActionIconButton
                              actionKey={`fee-${student.id}`}
                              label={`Record fee for ${fullName(student)}`}
                              onClick={() =>
                                pulseAction(`fee-${student.id}`, () =>
                                  onRecordFee?.(student),
                                )
                              }
                            >
                              <IndianRupee className="h-4 w-4" />
                            </ActionIconButton>

                            <ActionIconButton
                              actionKey={`attendance-${student.id}`}
                              label={`Attendance for ${fullName(student)}`}
                              onClick={() =>
                                pulseAction(`attendance-${student.id}`, () =>
                                  onAttendance?.(student),
                                )
                              }
                            >
                              <ClipboardCheck className="h-4 w-4" />
                            </ActionIconButton>

                            <ActionIconButton
                              actionKey={`delete-${student.id}`}
                              label={`Delete ${fullName(student)}`}
                              variant="destructive"
                              destructive
                              onClick={() =>
                                pulseAction(`delete-${student.id}`, () =>
                                  setStudentToDelete(student),
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </ActionIconButton>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {filteredStudents.length === 0 && (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td
                        colSpan={10}
                        className="py-20 text-center text-slate-500"
                      >
                        No students found.
                      </td>
                    </motion.tr>
                  )}
                </motion.tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <AlertDialog
          open={!!studentToDelete}
          onOpenChange={(open) => !open && setStudentToDelete(null)}
        >
          <AnimatePresence>
            {studentToDelete && (
              <AlertDialogContent
                asChild
                forceMount
                className="overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-lg"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: prefersReducedMotion ? 1 : 0.92,
                    y: prefersReducedMotion ? 0 : 26,
                    filter: prefersReducedMotion ? "none" : "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: prefersReducedMotion ? 1 : 0.96,
                    y: prefersReducedMotion ? 0 : 18,
                    filter: prefersReducedMotion ? "none" : "blur(8px)",
                  }}
                  transition={springGentle}
                  className="overflow-hidden rounded-[34px] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72))] shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
                >
                  <div className="relative h-32 bg-[linear-gradient(135deg,#ef4444_0%,#e11d48_45%,#7f1d1d_100%)]">
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              opacity: [0.35, 0.55, 0.35],
                              scale: [1, 1.04, 1],
                            }
                      }
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.12),transparent_28%)]"
                    />
                  </div>

                  <div className="-mt-16 px-6 pb-6">
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, scale: 0.8 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.06, ...springGentle }}
                      className="flex flex-col items-center text-center"
                    >
                      <motion.div layoutId={`avatar-${studentToDelete.id}`}>
                        <Avatar className="h-28 w-28 border-[6px] border-white shadow-2xl">
                          <AvatarImage
                            src={studentToDelete.profilePhoto || ""}
                          />
                          <AvatarFallback className="bg-slate-100 text-2xl font-bold text-slate-700">
                            {initials(studentToDelete)}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>

                      <AlertDialogTitle className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                        {fullName(studentToDelete)}
                      </AlertDialogTitle>

                      <AlertDialogDescription asChild>
                        <div className="mt-3 max-w-xs text-sm leading-7 text-slate-500">
                          <span className="font-medium text-slate-600">
                            {getRelationLabel(studentToDelete.gender)}
                          </span>{" "}
                          <span className="font-semibold text-slate-900">
                            Sh. {studentToDelete.fatherName || "—"}
                          </span>
                          <br />
                          <span className="text-xs text-slate-400">&</span>
                          <br />
                          <span className="font-semibold text-slate-900">
                            Smt. {studentToDelete.motherName || "—"}
                          </span>
                        </div>
                      </AlertDialogDescription>
                    </motion.div>

                    <motion.div
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 10 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, ...springGentle }}
                      className="mt-8 rounded-[26px] border border-red-200/70 bg-[linear-gradient(180deg,rgba(254,242,242,0.95),rgba(255,255,255,0.82))] p-5 shadow-inner"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { rotate: [0, -6, 6, -4, 0] }
                          }
                          transition={{ duration: 0.5, delay: 0.22 }}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100"
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </motion.div>

                        <div className="space-y-2 text-left">
                          <h3 className="font-semibold text-red-700">
                            Permanently delete this student?
                          </h3>
                          <p className="text-sm font-medium text-red-600">
                            This action removes the student record and cannot be
                            undone.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <AlertDialogFooter className="mt-8 flex-col gap-3 sm:flex-row">
                      <AlertDialogCancel
                        disabled={isDeleting}
                        className="h-12 rounded-2xl border-white/60 bg-white/80 backdrop-blur-xl"
                      >
                        Cancel
                      </AlertDialogCancel>

                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { y: -1, scale: 1.01 }
                        }
                        whileTap={
                          prefersReducedMotion ? undefined : { scale: 0.985 }
                        }
                        transition={springSnappy}
                      >
                        <AlertDialogAction
                          disabled={isDeleting}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                          }}
                          className="h-12 rounded-2xl border-0 bg-[linear-gradient(135deg,#dc2626_0%,#be123c_50%,#7f1d1d_100%)] px-5 text-white shadow-[0_16px_36px_rgba(220,38,38,0.28)]"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Student
                            </>
                          )}
                        </AlertDialogAction>
                      </motion.div>
                    </AlertDialogFooter>
                  </div>
                </motion.div>
              </AlertDialogContent>
            )}
          </AnimatePresence>
        </AlertDialog>
      </motion.div>
    </LayoutGroup>
  );
}

function InfoBlock({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className={`mt-1 font-medium text-slate-800 ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}
