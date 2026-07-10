"use client";

import { useState } from "react";

import Sidebar from "@/app/(protected)/features/dashboard/components/Sidebar";
import Topbar from "@/app/(protected)/features/dashboard/components/Topbar";
import { UserProvider } from "@/app/(protected)/features/dashboard/context/UserContext";

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
    <UserProvider username={username}>
      <div className="min-h-screen bg-slate-50">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div
          className={`
            flex
            min-h-screen
            flex-col
            transition-all
            duration-500
            ease-[cubic-bezier(.22,1,.36,1)]

            ${collapsed ? "lg:ml-24" : "lg:ml-66"}
          `}
        >
          <Topbar
            username={username}
            avatarUrl="/chandnitiwarimishra.png"
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setMobileOpen={setMobileOpen}
          />

          <main
            className="
              min-w-0
              flex-1
              overflow-x-hidden

              pt-28
              pb-4
              px-4

              sm:px-6
              sm:pb-6

              lg:px-8
              lg:pb-8
            "
          >
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
