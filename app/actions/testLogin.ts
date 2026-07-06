"use server";

import { createClient } from "@/lib/supabase/server";

export async function testLogin() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: "amitkrmishra000@gmail.com",
    password: "YOUR_PASSWORD_HERE",
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  return { data, error };
}
