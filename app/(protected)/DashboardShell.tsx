"use client";

import { useState, Suspense } from "react";

import Sidebar from "@/app/(protected)/features/dashboard/components/Sidebar";
import Topbar from "@/app/(protected)/features/dashboard/components/Topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  username: string;
}

function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-sky-100 bg-linear-to-r from-sky-50 via-white to-indigo-50 px-10 py-8 shadow-lg">
        {/* Animated ring */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-sky-100"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-sky-600 border-r-indigo-500"></div>

          {/* Inner pulse dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-pulse rounded-full bg-sky-500 shadow-md" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            Loading Student ERP
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Fetching records securely...
          </p>
        </div>

        {/* Shimmer bar */}
        <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse bg-linear-to-r from-sky-300 via-indigo-300 to-sky-300" />
        </div>
      </div>
    </div>
  );
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
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
