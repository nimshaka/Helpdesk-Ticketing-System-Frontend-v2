import type { ReactNode } from "react";
import { ADMIN_NAV } from "@/constants/navigation";
import { RoleShell } from "@/components/auth/role-shell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <RoleShell navItems={ADMIN_NAV}>{children}</RoleShell>;
}