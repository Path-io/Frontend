import z from "zod";

const passwordRegex = /^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,128}$/;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5, "Password must be at least 5 characters")
        .max(128, "Password must be at most 128 characters")
        .regex(passwordRegex, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and no spaces"),
})