"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { LoginSchema, type LoginState } from "./schema";

export async function signIn(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  console.log("========== SIGN IN ACTION ==========");
  console.log("formData instanceof FormData:", formData instanceof FormData);
  console.log("Raw username:", JSON.stringify(formData.get("username")));
  console.log("Raw password:", JSON.stringify(formData.get("password")));

  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  console.log("Validation success:", parsed.success);

  if (!parsed.success) {
    console.log("Validation error:", parsed.error.flatten());

    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  console.log("Parsed username:", parsed.data.username);
  console.log("Parsed password:", JSON.stringify(parsed.data.password));

  const supabase = await createClient();

  const username = parsed.data.username.toLowerCase();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("username", username)
    .single();

  console.log("Profile:", profile);
  console.log("Profile error:", profileError);

  if (profileError || !profile) {
    return {
      success: false,
      error: "Invalid username or password.",
    };
  }

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password: parsed.data.password,
  });

  console.log("Auth data:", data);
  console.log("Auth error:", authError);

  if (authError) {
    return {
      success: false,
      error: authError.message,
    };
  }

  console.log("Login successful. Redirecting...");

  redirect("/features/dashboard");
}
