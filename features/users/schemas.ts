import { z } from "zod";
import { USER_ROLES } from "@/constants/roles";

const name = z.string().trim().min(2, "Name must be at least 2 characters").max(255, "Name is too long");
const email = z.string().min(1, "Email is required").email("Enter a valid email address");

export const createUserSchema = z.object({
  name,
  email,
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(USER_ROLES),
  is_active: z.boolean(),
});

export const editUserSchema = z.object({ name, email });