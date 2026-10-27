import type { z } from "zod";
import type { loginSchema, registerSchema } from "./schemas";
import type { UserRole } from "@/types/user";

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;


export type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}


