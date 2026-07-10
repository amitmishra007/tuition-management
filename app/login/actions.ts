"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema, type LoginState } from "./schema";

export async function signIn(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
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

    const username = parsed.data.username.trim().toLowerCase();

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
      return {
        success: false,
        error: "Invalid username or password.",
      };
    }

    redirect("/features/dashboard");
  } catch (error) {
    console.error("Sign in error:", error);

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
