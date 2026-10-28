import { Card, CardContent } from "@/components/ui/card";
import { TICKET_STATUS_TARGETS } from "@/constants/ticket";
import type { Ticket, TicketViewer } from "@/features/tickets/types";
import { canChangeStatus, canClaimTicket } from "@/features/tickets/utils";
import { ClaimButton } from "./claim-button";
import { StatusActions } from "./status-actions";

type TicketActionsProps = {
  viewer: TicketViewer;
  ticket: Ticket;
};

export function TicketActions({ viewer, ticket }: TicketActionsProps) {
  const canClaim = canClaimTicket(viewer, ticket);
  const targets = canChangeStatus(viewer, ticket) ? TICKET_STATUS_TARGETS[ticket.status.value] : [];

  if (!canClaim && targets.length === 0) return null;

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-3">
        {canClaim && <ClaimButton ticketId={ticket.id} />}
        {targets.length > 0 && <StatusActions ticketId={ticket.id} targets={targets} />}
      </CardContent>
    </Card>
  );
}