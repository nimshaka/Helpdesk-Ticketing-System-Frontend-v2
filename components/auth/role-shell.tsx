import { Suspense, type ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui/skeleton";
import type { NavItem } from "@/types/navigation";
import { UserMenu } from "./user-menu";

type RoleShellProps = {
  navItems: NavItem[];
  children: ReactNode;
};

export function RoleShell({ navItems, children }: RoleShellProps) {
  return (
    <AppShell
      navItems={navItems}
      userMenu={
        <Suspense fallback={<Skeleton className="h-8 w-40" />}>
          <UserMenu />
        </Suspense>
      }
    >
      {children}
    </AppShell>
  );
}