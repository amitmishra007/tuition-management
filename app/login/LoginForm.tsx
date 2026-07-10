"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  LogIn,
  User,
  X,
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  const loadingToast = useRef<string | number | null>(null);

  useEffect(() => {
    if (pending && !loadingToast.current) {
      loadingToast.current = toast.loading("Signing you in...", {
        description: "Verifying your credentials...",
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
      });
    }

    if (!pending && loadingToast.current) {
      toast.dismiss(loadingToast.current);
      loadingToast.current = null;
    }
  }, [pending]);

  return (
    <motion.div
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.985,
      }}
    >
      <Button
        type="submit"
        disabled={pending}
        className="
          h-12
          w-full
          cursor-pointer
          rounded-2xl

          bg-linear-to-r
          from-sky-500
          via-sky-600
          to-blue-600

          text-base
          font-semibold
          text-white

          shadow-lg
          shadow-sky-300/40

          transition-all
          duration-300

          hover:shadow-xl
          hover:shadow-sky-400/40

          disabled:pointer-events-none
          disabled:opacity-70
        "
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
    </motion.div>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");

  const previousError = useRef<string | null>(null);

  useEffect(() => {
    if (!state.error) return;

    if (previousError.current === state.error) return;

    previousError.current = state.error;

    toast.error("Sign in failed", {
      description: state.error,
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    });
  }, [state.error]);

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
      <Card
        className="
          relative
          overflow-hidden
          rounded-[28px]

          border
          border-slate-200/70

          bg-white/90
          backdrop-blur-2xl

          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >
        <div className="absolute inset-0 bg-linear-to-br from-sky-50/40 via-transparent to-blue-50/40 pointer-events-none" />

        <CardContent className="relative p-9 md:p-10">
          <motion.form
            action={formAction}
            variants={container}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
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
                  className="
                    h-13
                    rounded-2xl

                    border-slate-200
                    bg-slate-50/70

                    pl-12
                    pr-12

                    text-[15px]

                    shadow-sm

                    transition-all
                    duration-300

                    focus:border-sky-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-sky-100
                  "
                />

                <AnimatePresence>
                  {username.length > 0 && (
                    <motion.button
                      initial={{
                        scale: 0,
                        rotate: -90,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      exit={{
                        scale: 0,
                        rotate: 90,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      type="button"
                      onClick={() => setUsername("")}
                      className="
                        absolute
                        right-3
                        top-1/2

                        -translate-y-1/2

                        rounded-full
                        p-1.5

                        text-slate-500

                        transition-colors

                        hover:bg-slate-200
                      "
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
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
                  className="
                    h-13
                    rounded-2xl

                    border-slate-200
                    bg-slate-50/70

                    pl-12
                    pr-12

                    text-[15px]

                    shadow-sm

                    transition-all
                    duration-300

                    focus:border-sky-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-sky-100
                  "
                />

                <motion.button
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    absolute
                    right-3
                    top-1/2

                    -translate-y-1/2

                    rounded-full
                    p-2

                    text-slate-500

                    transition-colors

                    hover:bg-slate-200
                  "
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit */}

            <motion.div
              variants={item}
              transition={{
                delay: 0.15,
              }}
            >
              <SubmitButton />
            </motion.div>

            {/* Footer */}

            <motion.div
              variants={item}
              className="
                flex
                items-center
                justify-center
                pt-2
              "
            >
              <p className="text-center text-xs leading-relaxed text-slate-500">
                Protected access for{" "}
                <span className="font-semibold text-slate-700">
                  Chandni Tuition
                </span>{" "}
                administrators.
              </p>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
