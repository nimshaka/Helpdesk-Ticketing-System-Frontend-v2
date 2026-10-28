import type { z } from "zod";
import type { loginSchema, registerSchema } from "./schemas";


export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;





