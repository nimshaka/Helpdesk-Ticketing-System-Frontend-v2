export const USER_ROLES = ["customer", "agent", "admin"] as const;

export const USER_ROLE_LABELS: Record<(typeof USER_ROLES)[number], string> = {
  customer: "Customer",
  agent: "Agent",
  admin: "Admin",
};