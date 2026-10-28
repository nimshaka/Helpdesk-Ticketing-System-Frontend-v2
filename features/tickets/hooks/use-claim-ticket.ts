import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ActionError, getErrorMessage, unwrap } from "@/lib/api/action-result";
import { claimTicketAction } from "../api";

export function useClaimTicket() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (ticketId: number) => unwrap(await claimTicketAction(ticketId)),
    onSuccess: ({ message }) => {
      toast.success(message || "Ticket claimed");
      router.refresh();
    },
    onError: (error) => {
      // 409: another agent claimed it first. Our screen is out of date, so reload it.
      if (error instanceof ActionError && error.status === 409) {
        toast.error("Another agent already took this ticket");
        router.refresh();
        return;
      }
      toast.error(getErrorMessage(error));
    },
  });
}