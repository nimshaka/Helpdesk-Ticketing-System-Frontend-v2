import type { USER_ROLES } from "@/constants/roles";

export type UserRole = (typeof USER_ROLES)[number];

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
};