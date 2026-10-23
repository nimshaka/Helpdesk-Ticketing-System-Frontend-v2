import type { ReactNode } from "react";
import { CUSTOMER_NAV } from "@/constants/navigation";
import { RoleShell } from "@/components/auth/role-shell";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <RoleShell navItems={CUSTOMER_NAV}>{children}</RoleShell>;
}