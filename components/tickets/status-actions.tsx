"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CLOSED_TICKET_STATUS, STATUS_ACTION_LABELS } from "@/constants/ticket";
import type { TicketStatusTarget } from "@/types/ticket";
import { useChangeStatus } from "@/features/tickets/hooks/use-change-status";

type StatusActionsProps = {
  ticketId: number;
  targets: readonly TicketStatusTarget[];
};

export function StatusActions({ ticketId, targets }: StatusActionsProps) {
  const { mutate, isPending } = useChangeStatus(ticketId);
  const [isConfirmingClose, setIsConfirmingClose] = useState(false);

  if (isConfirmingClose) {
    return (
      <div role="group" aria-label="Confirm" className="flex flex-wrap items-center gap-2">
        <p className="text-sm">Resolving closes this ticket and turns replies off. Continue?</p>
        <Button
          disabled={isPending}
          onClick={() =>
            mutate(CLOSED_TICKET_STATUS, { onSuccess: () => setIsConfirmingClose(false) })
          }
        >
          {isPending ? "Saving..." : "Yes, resolve"}
        </Button>
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => setIsConfirmingClose(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {targets.map((target) => (
        <Button
          key={target}
          variant="outline"
          disabled={isPending}
          onClick={() => (target === CLOSED_TICKET_STATUS ? setIsConfirmingClose(true) : mutate(target))}
        >
          {STATUS_ACTION_LABELS[target]}
        </Button>
      ))}
    </div>
  );
}