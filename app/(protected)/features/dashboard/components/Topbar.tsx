"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, PanelLeft, PanelLeftClose, Menu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  const [time, setTime] = useState(new Date());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

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
        top-0
        left-0
        right-0
        z-50

        border-b
        bg-white/90
        backdrop-blur-xl
        shadow-sm

        transition-transform
        duration-300

        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div
        className="
          flex
          h-20
          items-center
          justify-between
          gap-3
          px-4
          sm:px-6
          lg:px-8
        "
      >
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
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? (
              <PanelLeft className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>

          <div className="min-w-0">
            <p
              className="
              text-xs
              font-medium
              text-slate-500
            "
            >
              {greeting}
            </p>

            <h1
              className="
    truncate
    text-lg
    font-bold
    tracking-tight

    sm:text-xl
  "
            >
              <span
                className="
      bg-linear-to-r
      from-sky-600
      via-indigo-600
      to-purple-600
      bg-clip-text
      text-transparent
    "
              >
                {displayName}
              </span>

              <span className="ml-1">👋</span>
            </h1>

            <p
              suppressHydrationWarning
              className="
    hidden
    text-xs
    text-slate-500
    sm:block
  "
            >
              {time.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}{" "}
              •{" "}
              {time.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
          flex
          items-center
          gap-2
        "
        >
          {/* Notification placeholder */}

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />

            <span
              className="
                absolute
                right-1
                top-1
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />
          </Button>

          <Avatar
            className="
              h-10
              w-10
              border
              shadow-sm
            "
          >
            <AvatarFallback
              className="
                bg-blue-600
                font-semibold
                text-white
              "
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
