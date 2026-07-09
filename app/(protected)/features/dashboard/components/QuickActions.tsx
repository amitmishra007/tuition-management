"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserPlus,
  ClipboardCheck,
  IndianRupee,
  FileBarChart,
} from "lucide-react";

const actions = [
  {
    title: "Add Student",
    subtitle: "New Admission",
    href: "features/students/add",
    icon: UserPlus,
    color: "from-blue-500 to-sky-500",
  },
  {
    title: "Attendance",
    subtitle: "Mark Today",
    href: "features/attendance",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Fees",
    subtitle: "Collect Fees",
    href: "/fees",
    icon: IndianRupee,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Reports",
    subtitle: "View Analytics",
    href: "/reports",
    icon: FileBarChart,
    color: "from-purple-500 to-indigo-500",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold">Quick Actions</h2>

        <p className="text-sm text-slate-500">Frequently used shortcuts</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -3 }}
            >
              <Link href={action.href}>
                <div
                  className={`
                    rounded-3xl
                    bg-linear-to-br
                    ${action.color}
                    p-5
                    text-white
                    shadow-lg
                  `}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 font-semibold">{action.title}</h3>

                  <p className="mt-1 text-xs text-white/80">
                    {action.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
