"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Loader2, LockKeyhole, User, X } from "lucide-react";

import { signIn } from "./actions";
import type { LoginState } from "./schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: LoginState = {
  success: false,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full cursor-pointer rounded-2xl bg-sky-600 text-base font-semibold text-white shadow-lg shadow-sky-200 transition-all duration-200 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Signing In...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Card className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
      <CardContent className="space-y-1 p-9 md:p-10">
        <form action={formAction} className="space-y-7">
          {/* Username */}

          <div className="space-y-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium tracking-wide text-slate-600"
            >
              Username
            </label>

            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <Input
                id="username"
                name="username"
                autoFocus
                autoComplete="username"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                placeholder="Enter username"
                className="h-13 rounded-2xl border-slate-200 bg-slate-50/70 pl-12 pr-12 text-[15px] shadow-sm transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />

              {username.length > 0 && (
                <button
                  type="button"
                  onClick={() => setUsername("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 transition hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Password */}

          <div className="space-y-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium tracking-wide text-slate-600"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter password"
                className="h-13 rounded-2xl border-slate-200 bg-slate-50/70 pl-12 pr-12 text-[15px] shadow-sm transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2 text-slate-500 transition-all hover:bg-slate-200 active:scale-95"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {state.error && (
            <div className="rounded-2xl border border-red-200/70 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-500">
              {state.error}
            </div>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
