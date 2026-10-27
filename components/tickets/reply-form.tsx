"use client";

import { Field } from "@/components/shared/field";
import { FormAlert } from "@/components/shared/form-alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getFieldError } from "@/utils/get-field-error";
import { useReplyForm } from "@/features/tickets/hooks/use-reply-form";

export function ReplyForm({ ticketId }: { ticketId: number }) {
  const { form, isPending } = useReplyForm(ticketId);

  return (
    <form
      noValidate
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
        {(error) => <FormAlert error={error} />}
      </form.Subscribe>

      <form.Field name="body">
        {(field) => {
          const error = getFieldError(field.state.meta);

          return (
            <Field id="reply-body" label="Your reply" error={error}>
              <Textarea
                id="reply-body"
                rows={4}
                placeholder="Write your reply..."
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "reply-body-error" : undefined}
              />
            </Field>
          );
        }}
      </form.Field>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send reply"}
      </Button>
    </form>
  );
}