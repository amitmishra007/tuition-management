import type { ReactNode } from "react";

import DashboardShell from "./DashboardShell";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

import { Toaster } from "sonner";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", session.user.id)
    .single();

  return (
    <>
      <DashboardShell username={profile?.username ?? "User"}>
        {children}
      </DashboardShell>

      <Toaster position="top-right" richColors closeButton duration={4000} />
    </>
  );
}
