"use client";

import { useState } from "react";

import Sidebar from "@/app/(protected)/features/dashboard/components/Sidebar";
import Topbar from "@/app/(protected)/features/dashboard/components/Topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  username: string;
}

export default function DashboardShell({
  children,
  username,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ease-in-out ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        <Topbar
          username={username}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
