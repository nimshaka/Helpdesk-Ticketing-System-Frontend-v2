import { Ticket } from "lucide-react";
import type { ReactNode } from "react";
import type { NavItem } from "@/types/navigation";
import { MobileNav } from "./mobile-nav";
import { SidebarNav } from "./sidebar-nav";

type AppShellProps = {
  navItems: NavItem[];
  userMenu: ReactNode;
  children: ReactNode;
};

export function AppShell({ navItems, userMenu, children }: AppShellProps) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
      <aside className="hidden border-r bg-secondary/40 p-4 md:block">
        <div className="mb-6 flex items-center gap-2 px-3 text-lg font-semibold text-primary">
          <Ticket className="size-5" />
          Helpdesk
        </div>
        <SidebarNav items={navItems} />
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex h-14 items-center border-b px-4">
          <MobileNav items={navItems} />
          <div className="ml-auto">{userMenu}</div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}