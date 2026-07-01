"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  IndianRupee,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Fees",
    href: "/fees",
    icon: IndianRupee,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r bg-white">
      {/* Logo */}

      <div className="flex h-20 items-center gap-3 border-b px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
          <GraduationCap size={28} />
        </div>

        <div>
          <h1 className="text-lg font-bold">Chandni Tuition</h1>
          <p className="text-sm text-gray-500">Student Management</p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  <Icon size={20} />

                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}

      <div className="absolute bottom-5 left-0 w-full px-6">
        <div className="rounded-xl border bg-gray-50 p-4">
          <p className="text-sm font-semibold">Tuition Management System</p>

          <p className="mt-1 text-xs text-gray-500">Version 1.0</p>
        </div>
      </div>
    </aside>
  );
}
