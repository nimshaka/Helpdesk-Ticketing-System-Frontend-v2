import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";
import { TICKET_STATUS_STYLES } from "@/constants/ticket";
import type { Ticket } from "@/features/tickets/types";

export function StatusBadge({ status }: { status: Ticket["status"] }) {
  return (
    <Badge variant="outline" className={cn("font-medium", TICKET_STATUS_STYLES[status.value])}>
      {status.label}
    </Badge>
  );
}