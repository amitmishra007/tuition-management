"use client";
import { motion, Variants } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  User,
  X,
  LogIn,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { signIn } from "./actions";
import type { LoginState } from "./schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: LoginState = {
  success: false,
  error: null,
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  const loadingToastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (pending) {
      loadingToastId.current = toast.loading("Signing you in...", {
        description: "Please wait while we verify your credentials.",
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
      });
    } else if (loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }
  }, [pending]);

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full cursor-pointer rounded-2xl bg-linear-to-r from-sky-500 via-sky-600 to-blue-600 text-base font-semibold text-white shadow-lg shadow-sky-300/40 transition-all duration-300 hover:scale-[1.02] hover:from-sky-600 hover:to-blue-700 hover:shadow-xl hover:shadow-sky-400/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Signing In...
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-5 w-5" />
          Sign In
        </>
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");

  const lastError = useRef<string | null>(null);

  useEffect(() => {
    if (!state) return;

    if (state.error && state.error !== lastError.current) {
      lastError.current = state.error;

      toast.error("Sign in failed", {
        description: state.error,
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    }

    if (state.success) {
      toast.success("Welcome back!", {
        description: "Login successful.",
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });
    }
  }, [state]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.96,
        filter: "blur(14px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <CardContent className="space-y-1 p-9 md:p-10">
          <motion.form
            action={formAction}
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            {/* Username */}

            <motion.div variants={item} className="space-y-3">
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
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/\s/g, ""))
                  }
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
            </motion.div>

            {/* Password */}

            <motion.div variants={item} className="space-y-3">
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
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <SubmitButton />
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
