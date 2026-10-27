import { useForm } from "@tanstack/react-form";
import { toFormErrors } from "@/utils/to-form-errors";
import { replySchema } from "../schemas";
import type { ReplyValues } from "../types";
import { useAddReply } from "./use-add-reply";

const defaultValues: ReplyValues = { body: "" };

export function useReplyForm(ticketId: number) {
  const { mutateAsync, isPending } = useAddReply(ticketId);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: replySchema,
      onSubmitAsync: async ({ value }) => {
        try {
          await mutateAsync(value);
          return null;
        } catch (error) {
          return toFormErrors(error);
        }
      },
    },
    // Runs only after the reply was accepted: empty the textarea.
    onSubmit: ({ formApi }) => {
      formApi.reset();
    },
  });

  return { form, isPending };
}