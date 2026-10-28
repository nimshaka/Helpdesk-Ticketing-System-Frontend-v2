"use client";

import { Button } from "@/components/ui/button";
import { useClaimTicket } from "@/features/tickets/hooks/use-claim-ticket";

type ClaimButtonProps = {
  ticketId: number;
  size?: "default" | "sm";
};

export function ClaimButton({ ticketId, size = "default" }: ClaimButtonProps) {
  const { mutate, isPending } = useClaimTicket();

  return (
    <Button size={size} disabled={isPending} onClick={() => mutate(ticketId)}>
      {isPending ? "Claiming..." : "Claim"}
    </Button>
  );
}