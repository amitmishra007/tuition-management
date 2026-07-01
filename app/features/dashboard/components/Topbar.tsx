"use client";

import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Topbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = currentTime.getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, Chandni 👋
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {currentTime.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" • "}
          {currentTime.toLocaleTimeString("en-IN")}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Search students..." className="pl-10" />
        </div>

        <button className="relative rounded-xl border p-2 transition hover:bg-muted">
          <Bell className="h-5 w-5" />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <Avatar className="h-11 w-11">
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
