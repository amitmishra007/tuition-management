import type { ReactNode } from "react";

import Sidebar from "@/app/features/dashboard/components/Sidebar";
import Topbar from "@/app/features/dashboard/components/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-72">
        <Topbar />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
