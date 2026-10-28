import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage, unwrap } from "@/lib/api/action-result";
import type { TicketStatusTarget } from "@/types/ticket";
import { changeStatusAction } from "../api";

export function useChangeStatus(ticketId: number) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (status: TicketStatusTarget) =>
      unwrap(await changeStatusAction(ticketId, status)),
    onSuccess: ({ message }) => toast.success(message || "Status updated"),
    onError: (error) => toast.error(getErrorMessage(error)),
    // Success or failure, the ticket may have changed, so show the latest state.
    onSettled: () => router.refresh(),
  });
}