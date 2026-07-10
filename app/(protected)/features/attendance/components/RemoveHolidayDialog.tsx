"use client";

import { Loader2, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  onConfirm: () => void;
};

export default function RemoveHolidayDialog({
  open,
  onOpenChange,
  loading,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <AlertDialogContent
            asChild
            forceMount
            className="overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 30,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.35,
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
              className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
            >
              {/* Header */}

              <div className="h-28 bg-linear-to-br from-red-500 via-rose-600 to-red-700" />

              {/* Body */}

              <div className="-mt-14 px-6 pb-6">
                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-white bg-white shadow-2xl">
                    <Trash2 className="h-12 w-12 text-red-600" />
                  </div>

                  <AlertDialogTitle className="mt-5 text-2xl font-bold tracking-tight">
                    Remove Holiday
                  </AlertDialogTitle>

                  <AlertDialogDescription className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                    The selected date will no longer be treated as a holiday.
                    Attendance can be marked again immediately.
                  </AlertDialogDescription>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="mt-8 rounded-2xl border border-red-200 bg-linear-to-br from-red-50 via-white to-rose-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-red-700">
                        Remove this holiday?
                      </h3>

                      <p className="text-sm text-red-600">
                        You can mark this date as a holiday again whenever
                        needed.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <AlertDialogFooter className="mt-8 flex-col gap-3 sm:flex-row">
                  <AlertDialogCancel
                    disabled={loading}
                    className="h-12 rounded-xl"
                  >
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      onConfirm();
                    }}
                    className="h-12 rounded-xl bg-linear-to-r from-red-600 to-rose-700 text-white shadow-lg transition-all hover:scale-[1.02] hover:from-red-700 hover:to-rose-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Holiday
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </motion.div>
          </AlertDialogContent>
        )}
      </AnimatePresence>
    </AlertDialog>
  );
}
