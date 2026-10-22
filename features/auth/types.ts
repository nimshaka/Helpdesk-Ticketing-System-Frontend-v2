import type { z } from "zod";
import type { loginSchema, registerSchema } from "./schemas";
import type { USER_ROLES } from "./constants";

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type UserRole = (typeof USER_ROLES)[number];

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}


