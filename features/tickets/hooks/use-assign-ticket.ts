import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { unwrap } from "@/lib/api/action-result";
import { assignTicketAction } from "../api";

type AssignVariables = { ticketId: number; agentId: number };

export function useAssignTicket() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ ticketId, agentId }: AssignVariables) =>
      unwrap(await assignTicketAction(ticketId, agentId)),
    onSuccess: ({ message }) => toast.success(message || "Ticket assigned"),
    // Success or failure the ticket may have changed, so show the latest state.
    onSettled: () => router.refresh(),
  });
}