import { useForm } from "@tanstack/react-form";
import { toFormErrors } from "@/utils/to-form-errors";
import { createTicketSchema } from "../schemas";
import type { CreateTicketValues } from "../types";
import { useCreateTicket } from "./use-create-ticket";
import { useResetFormOnLeave } from "@/hooks/use-reset-form-on-leave";

const defaultValues: CreateTicketValues = {
  subject: "",
  description: "",
  priority: "medium",
  attachments: [],
};

export function useCreateTicketForm() {
  const { mutateAsync, isPending } = useCreateTicket();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: createTicketSchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await mutateAsync(value);
          return null;
        } catch (error) {
          return toFormErrors(error);
        }
      },
    },
  });
   useResetFormOnLeave(form);
  return { form, isPending };
}