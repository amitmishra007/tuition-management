"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Search, PanelLeft, PanelLeftClose, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  username: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({
  username,
  collapsed,
  setCollapsed,
  setMobileOpen,
}: TopbarProps) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const hour = time?.getHours() ?? new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, [time]);

  const displayName = useMemo(() => {
    return username
      ? username.charAt(0).toUpperCase() + username.slice(1)
      : "User";
  }, [username]);

  const initials = useMemo(() => {
    return username
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [username]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setCollapsed((p) => !p)}
          >
            {collapsed ? (
              <PanelLeft className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl lg:text-2xl">
              {greeting}, {displayName} 👋
            </h1>

            <time
              suppressHydrationWarning
              className="block truncate text-xs text-slate-500 sm:text-sm"
            >
              {time.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              • {time.toLocaleTimeString("en-IN")}
            </time>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Search students..."
              className="w-64 rounded-xl pl-10 xl:w-80"
            />
          </div>

          <Button variant="outline" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              3
            </span>
          </Button>

          <Avatar className="h-10 w-10 cursor-pointer border transition hover:shadow-md">
            <AvatarFallback className="bg-blue-600 font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
