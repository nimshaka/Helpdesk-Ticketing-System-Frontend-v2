"use client";

import Link from "next/link";
import { Field } from "@/components/shared/field";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField } from "@/components/shared/form-field";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TICKET_PRIORITIES, TICKET_PRIORITY_LABELS } from "@/constants/ticket";
import type { TicketPriority } from "@/types/ticket";
import { getFieldError } from "@/utils/get-field-error";
import { CUSTOMER_TICKETS_PATH } from "@/features/tickets/constants";
import { useCreateTicketForm } from "@/features/tickets/hooks/use-create-ticket-form";

export function CreateTicketForm() {
  const { form, isPending } = useCreateTicketForm();

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
        {(error) => <FormAlert error={error} />}
      </form.Subscribe>

      <form.Field name="subject">
        {(field) => (
          <FormField
            id="subject"
            label="Subject"
            placeholder="Short summary of the problem"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field.state.meta)}
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => {
          const error = getFieldError(field.state.meta);

          return (
            <Field id="description" label="Description" error={error}>
              <Textarea
                id="description"
                rows={6}
                placeholder="What happened? Include any error messages."
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "description-error" : undefined}
              />
            </Field>
          );
        }}
      </form.Field>

      <form.Field name="priority">
        {(field) => (
          <Field id="priority" label="Priority" error={getFieldError(field.state.meta)}>
            <NativeSelect
              id="priority"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value as TicketPriority)}
              onBlur={field.handleBlur}
            >
              {TICKET_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {TICKET_PRIORITY_LABELS[priority]}
                </option>
              ))}
            </NativeSelect>
          </Field>
        )}
      </form.Field>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create ticket"}
        </Button>
        <Button variant="outline" render={<Link href={CUSTOMER_TICKETS_PATH} />} nativeButton={false}>
          Cancel
        </Button>
      </div>
    </form>
  );
}