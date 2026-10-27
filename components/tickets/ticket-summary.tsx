import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/utils/format-date";
import type { Ticket } from "@/features/tickets/types";
import { PriorityBadge } from "./priority-badge";
import { StatusBadge } from "./status-badge";

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export function TicketSummary({ ticket }: { ticket: Ticket }) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
        <CardTitle className="text-xl">
          #{ticket.id} {ticket.subject}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <Meta label="Customer" value={ticket.customer.name} />
          <Meta label="Agent" value={ticket.agent?.name ?? "Unassigned"} />
          <Meta label="Created" value={formatDateTime(ticket.created_at)} />
          <Meta label="Last activity" value={formatDateTime(ticket.last_activity_at)} />
        </dl>
        <p className="whitespace-pre-wrap break-words text-sm">{ticket.description}</p>
      </CardContent>
    </Card>
  );
}