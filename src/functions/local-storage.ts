import type { TSignUpSchema } from "@/lib/types";

export function setLocalStorageEmail({ email }: TSignUpSchema): void {
  localStorage.setItem("Email", email);
}

export function setLocalStoragePassword({ password }: TSignUpSchema) {
  const encrypted = btoa(password.split("").reverse().join(""));
  localStorage.setItem("Password", encrypted);
}
