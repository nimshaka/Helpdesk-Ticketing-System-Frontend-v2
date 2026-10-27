import type { UserRole } from "@/types/user";

export const ROLE_HOME: Record<UserRole, string> = {
  customer: "/customer/dashboard",
  agent: "/agent/dashboard",
  admin: "/admin/dashboard",
};

export const AUTH_ROUTES = ["/login", "/register"];