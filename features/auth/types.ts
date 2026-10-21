import type { z } from "zod";
import type { loginSchema, registerSchema } from "./schemas";
import { ReactNode } from "react";

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;


export type AuthCardProps = {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};