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
  Sparkles,
  ChevronRight,
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
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 rounded-[30px] bg-white/80 backdrop-blur-2xl" />

      {/* Soft Glow */}

      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-linear-to-b from-sky-50/60 via-white/10 to-purple-50/40" />

      {/* Accent */}

      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-sky-500 via-indigo-500 to-purple-600" />

      <div className="relative flex h-full flex-col">
        {/* ================= LOGO ================= */}
        <div
          className={`border-b border-white/60 transition-all duration-500 ${
            collapsed ? "flex justify-center px-0 py-6" : "px-6 py-7"
          }`}
        >
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-4"
            }`}
          >
            <div
              className="
                group
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-linear-to-br
                from-sky-500
                via-indigo-500
                to-purple-600
                text-white
                shadow-lg
                transition-all
                duration-500
                hover:scale-105
                hover:rotate-3
              "
            >
              <GraduationCap className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />

              <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                collapsed ? "w-0 opacity-0" : "w-45 opacity-100"
              }`}
            >
              <h2 className="bg-linear-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
                Chandni Tuition
              </h2>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Sparkles className="h-3 w-3 text-sky-500" />
                Student Management
              </div>
            </div>
          </div>
        </div>
        {/* ================= NAVIGATION ================= */}
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
                    className={`
                      group
                      relative
                      flex
                      items-center
                      overflow-hidden
                      rounded-2xl
                      transition-all
                      duration-300
                      ease-[cubic-bezier(.22,1,.36,1)]
                      ${
                        collapsed
                          ? "justify-center px-0 py-4"
                          : "gap-4 px-4 py-4"
                      }
                      ${
                        active
                          ? "bg-linear-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                          : "text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                      }
                    `}
                  >
                    {/* Hover Glow */}

                    {!active && (
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-linear-to-r from-sky-50 via-indigo-50 to-purple-50" />
                      </div>
                    )}

                    <Icon
                      className={`
                        relative
                        z-10
                        h-5
                        w-5
                        shrink-0
                        transition-all
                        duration-300
                        ${
                          active
                            ? "scale-110"
                            : "group-hover:scale-110 group-hover:rotate-6"
                        }
                      `}
                    />

                    {!collapsed && (
                      <>
                        <span className="relative z-10 flex-1 font-medium">
                          {item.title}
                        </span>

                        <ChevronRight
                          className={`
                            relative
                            z-10
                            h-4
                            w-4
                            transition-all
                            duration-300
                            ${
                              active
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                          `}
                        />
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
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
      {/* ================= Desktop ================= */}

      <aside
        className={`
          fixed
          left-4
          top-28
          bottom-4
          z-40
          hidden
          transition-all
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          lg:block
          ${collapsed ? "w-24" : "w-66"}
        `}
      >
        <div
          className="
            relative
            h-full
            overflow-hidden
            rounded-[30px]
            border
            border-white/70
            bg-white/80
            backdrop-blur-2xl
            shadow-[0_20px_60px_rgba(15,23,42,0.10)]
          "
        >
          <SidebarContent collapsed={collapsed} />
        </div>
      </aside>

      {/* ================= Mobile ================= */}

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="
            top-24
            left-4
            h-[calc(100vh-7.5rem)]
            w-[320px]
            rounded-[30px]
            border
            border-white/70
            bg-transparent
            p-0
            shadow-none
          "
        >
          <div
            className="
              h-full
              overflow-hidden
              rounded-[30px]
              border
              border-white/70
              bg-white/80
              backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(15,23,42,0.15)]
            "
          >
            <SidebarContent
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
