import { GraduationCap } from "lucide-react";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 px-6 py-12">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Tuition Management
          </h1>

          <p className="mt-3 text-base text-slate-600">
            Sign in to access your dashboard.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
