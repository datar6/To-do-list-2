import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .refine(
    (data) => {
      const encrypted = localStorage.getItem("Password");
      const decrypted = atob(encrypted as string)
        .split("")
        .reverse()
        .join("");
      return decrypted === data.password;
    },
    {
      message: "Password don't match with localStorage",
      path: ["password"],
    }
  );

export type TSignInSchema = z.infer<typeof signInSchema>;
