import z, { email } from "zod";

const passwordRegex =
  /^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,128}$/;

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(128, "Password must be at most 128 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and no spaces"
    ),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    role: z.enum(["student", "tutor"]),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and no spaces"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const resetSchema = z.object({
  email: z.email(),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and no spaces"
    ),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});
