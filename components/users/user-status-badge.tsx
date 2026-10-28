import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

export function UserStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        isActive
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-slate-200 bg-slate-50 text-slate-600",
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}