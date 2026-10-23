"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/types/navigation";
import { SidebarNav } from "./sidebar-nav";

export function MobileNav({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu" />
                }
            >

                <Menu />

            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <SheetHeader>
                    <SheetTitle>Helpdesk</SheetTitle>
                </SheetHeader>
                <div className="px-4">
                    <SidebarNav items={items} onNavigate={() => setOpen(false)} />
                </div>
            </SheetContent>
        </Sheet>
    );
}