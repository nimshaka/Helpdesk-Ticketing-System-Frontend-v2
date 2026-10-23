import type { ReactNode } from "react";
import { AGENT_NAV } from "@/constants/navigation";
import { RoleShell } from "@/components/auth/role-shell";

export default function AgentLayout({ children }: { children: ReactNode }) {
  return <RoleShell navItems={AGENT_NAV}>{children}</RoleShell>;
}