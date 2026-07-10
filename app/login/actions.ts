"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { LoginSchema, type LoginState } from "./schema";

export async function signIn(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  const supabase = await createClient();

  const username = parsed.data.username.toLowerCase();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    return {
      success: false,
      error: "Invalid username or password.",
    };
  }

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password: parsed.data.password,
  });

  if (authError) {
    console.log("SUPABASE ERROR:", authError);
    return {
      success: false,
      error: authError.message,
    };
  }

  redirect("/features/dashboard");
}
