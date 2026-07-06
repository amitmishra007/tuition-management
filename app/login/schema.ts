import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Username can only contain letters, numbers, dots, underscores and hyphens.",
    )
    .transform((v) => v.trim().toLowerCase()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password is too long."),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export type LoginState = {
  success: boolean;
  error: string | null;
};
