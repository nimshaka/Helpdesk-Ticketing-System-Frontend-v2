import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { unwrap } from "@/lib/api/action-result";
import { addReplyAction } from "../api";
import type { ReplyValues } from "../types";

export function useAddReply(ticketId: number) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ReplyValues) => unwrap(await addReplyAction(ticketId, values)),
    onSuccess: ({ message }) => {
      toast.success(message || "Reply sent");
      router.refresh(); // re-fetch the server data: the new reply and any status change
    },
  });
}