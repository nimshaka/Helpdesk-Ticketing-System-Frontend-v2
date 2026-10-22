export const USER_ROLES = ["customer", "agent", "admin"] as const;

export const ROLE_HOME: Record<(typeof USER_ROLES)[number], string> = {
  customer: "/customer/dashboard",
  agent: "/agent/dashboard",
  admin: "/admin/dashboard",
};

export const AUTH_ROUTES = ["/login", "/register"];