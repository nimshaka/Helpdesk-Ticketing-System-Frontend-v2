import Link from "next/link";
import { cn } from "@/utils/cn";

export type LinkTab = {
  label: string;
  href: string;
  active: boolean;
};

export function LinkTabs({ tabs, label }: { tabs: LinkTab[]; label: string }) {
  return (
    <nav aria-label={label} className="mb-4 flex gap-1 overflow-x-auto border-b">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          aria-current={tab.active ? "page" : undefined}
          className={cn(
            "-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors",
            tab.active
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}