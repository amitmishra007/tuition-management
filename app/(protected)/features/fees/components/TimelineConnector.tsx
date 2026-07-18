"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  paid: boolean;
}

export default function TimelineConnector({ paid }: Props) {
  return (
    <div
      className="
        relative
        flex
        w-20
        items-center
        justify-center
      "
    >
      {/* Base line */}

      <div
        className={cn(
          `
          h-1
          w-full
          rounded-full
          bg-slate-200
          `,
          paid && "bg-emerald-200",
        )}
      />

      {/* Animated flowing gradient */}

      <motion.div
        animate={{
          x: [-40, 40],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          `
          absolute
          h-1
          w-8
          rounded-full
          `,
          paid
            ? "bg-linear-to-r from-emerald-400 via-green-500 to-teal-400"
            : "bg-linear-to-r from-violet-400 via-sky-400 to-cyan-400",
        )}
      />

      {/* Glow */}

      <div
        className={cn(
          `
          absolute
          h-3
          w-full
          blur-md
          opacity-30
          `,
          paid ? "bg-emerald-300" : "bg-violet-300",
        )}
      />
    </div>
  );
}
