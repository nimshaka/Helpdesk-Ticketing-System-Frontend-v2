"use client";

import { LayoutDashboard, Ticket, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavIconName, NavItem } from "@/types/navigation";
import { cn } from "@/utils/cn";

const ICONS: Record<NavIconName, LucideIcon> = {
    dashboard: LayoutDashboard,
    tickets: Ticket,
    users: Users,
};

type SidebarNavProps = {
    items: NavItem[];
    onNavigate?: () => void;
};

export function SidebarNav({ items, onNavigate }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav aria-label="Main" className="flex flex-col gap-1">
            {items.map(({ label, href, icon }) => {
                const Icon = ICONS[icon];
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                    >
                        <Icon className="size-4" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}