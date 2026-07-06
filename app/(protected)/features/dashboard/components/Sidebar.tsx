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

import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/features/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/features/students",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/features/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Fees",
    href: "/features/fees",
    icon: IndianRupee,
  },
  {
    title: "Reports",
    href: "/features/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/features/settings",
    icon: Settings,
  },
];

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}

      <div
        className={`flex h-20 shrink-0 items-center border-b ${
          collapsed ? "justify-center px-0" : "gap-3 px-6"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
          <GraduationCap size={28} />
        </div>

        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold">Chandni Tuition</h1>
            <p className="text-sm text-slate-500">Student Management</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.title : undefined}
                  className={`flex items-center rounded-xl py-3 transition-all ${
                    collapsed ? "justify-center px-0" : "gap-3 px-4"
                  } ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  {!collapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="border-t p-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold">Tuition Management System</p>
            <p className="mt-1 text-xs text-slate-500">Version 1.0</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  return (
    <>
      {/* Desktop */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r bg-white transition-all duration-300 lg:block ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile */}

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="h-screen w-72 p-0"
          showCloseButton={false}
        >
          <SidebarContent
            collapsed={false}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
