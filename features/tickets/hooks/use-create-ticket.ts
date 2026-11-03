import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { unwrap } from "@/lib/api/action-result";
import { createTicketAction } from "../api";
import { CUSTOMER_TICKETS_PATH } from "../constants";
import type { CreateTicketValues } from "../types";
import { buildCreateTicketFormData } from "../utils";

export function useCreateTicket() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: CreateTicketValues) =>
      unwrap(await createTicketAction(buildCreateTicketFormData(values))), onSuccess: ({ data, message }) => {
        toast.success(message || "Ticket created");
        router.replace(`${CUSTOMER_TICKETS_PATH}/${data.id}`);
      },
  });
}