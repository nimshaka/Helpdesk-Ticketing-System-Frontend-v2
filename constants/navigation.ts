import type { NavItem } from "@/types/navigation";

export const CUSTOMER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/customer/dashboard", icon: "dashboard" },
  { label: "My tickets", href: "/customer/tickets", icon: "tickets" },
];

export const AGENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/agent/dashboard", icon: "dashboard" },
  { label: "Tickets", href: "/agent/tickets", icon: "tickets" },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Tickets", href: "/admin/tickets", icon: "tickets" },
  { label: "Users", href: "/admin/users", icon: "users" },
];