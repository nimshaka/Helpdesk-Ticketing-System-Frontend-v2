import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";
import { TICKET_PRIORITY_STYLES } from "@/features/tickets/constants";
import type { TicketPriority } from "@/features/tickets/types";

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return (
    <Badge variant="outline" className={cn("font-medium capitalize", TICKET_PRIORITY_STYLES[priority])}>
      {priority}
    </Badge>
  );
}
