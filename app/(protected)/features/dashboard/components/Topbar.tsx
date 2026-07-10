"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, PanelLeft, PanelLeftClose, Menu, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  username: string;
  avatarUrl?: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TopbarProps {
  username: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({
  username,
  avatarUrl,
  collapsed,
  setCollapsed,
  setMobileOpen,
}: TopbarProps) {
  const [time, setTime] = useState(new Date());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const greeting = useMemo(() => {
    const hour = time.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  }, [time]);

  const displayName = useMemo(() => {
    return username
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }, [username]);

  const initials = useMemo(() => {
    return username
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [username]);

  return (
    <header
      className={`
        fixed
        top-4
        left-4
        right-4
        z-50

        transition-all
        duration-300

        ${visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}
      `}
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-white/70
          bg-white/80
          backdrop-blur-2xl
          shadow-[0_20px_60px_rgba(15,23,42,0.10)]
        "
      >
        {/* Accent */}

        <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-sky-500 via-indigo-500 to-purple-600" />

        {/* Soft Glow */}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-sky-50/40 via-transparent to-purple-50/40" />

        <div className="relative flex h-20 items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-xl border bg-white shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden h-11 w-11 rounded-xl border bg-white shadow-sm transition-all hover:scale-105 hover:bg-white hover:shadow-md lg:flex"
              onClick={() => setCollapsed((v) => !v)}
            >
              {collapsed ? (
                <PanelLeft className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </Button>

            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                <Sparkles className="h-3.5 w-3.5" />
                {greeting}
              </div>

              <h1 className="mt-2 truncate text-xl font-bold tracking-tight sm:text-2xl">
                <span className="bg-linear-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {displayName}
                </span>

                <span className="ml-2">👋</span>
              </h1>

              <p
                suppressHydrationWarning
                className="mt-1 hidden text-xs text-slate-500 sm:block"
              >
                {time.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}

                {" • "}

                {time.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="
                relative
                h-11
                w-11
                rounded-xl
                border
                bg-white
                shadow-sm
                transition-all
                hover:scale-105
                hover:bg-white
                hover:shadow-md
              "
            >
              <Bell className="h-5 w-5 text-slate-700" />

              <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
            </Button>

            <div className="rounded-full bg-linear-to-br from-sky-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg">
              <Avatar className="h-11 w-11 border-2 border-white">
                <AvatarImage
                  src={avatarUrl}
                  alt={displayName}
                  className="object-cover"
                />

                <AvatarFallback className="bg-white font-bold text-slate-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
