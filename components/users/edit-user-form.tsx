"use client";

import { FormAlert } from "@/components/shared/form-alert";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApiUser } from "@/types/user";
import { getFieldError } from "@/utils/get-field-error";
import { useEditUserForm } from "@/features/users/hooks/use-edit-user-form";
import { useUser } from "@/features/users/hooks/use-user";

type EditUserFormProps = {
  userId: number;
  onDone: () => void;
};

export function EditUserForm({ userId, onDone }: EditUserFormProps) {
  const query = useUser(userId);

  if (query.isPending) return <Skeleton className="h-40 w-full" />;

  if (query.isError) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md border border-destructive/40 p-3 text-sm">
        <span>Could not load this user.</span>
        <Button type="button" variant="outline" size="sm" onClick={() => query.refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  // Mounted only once the fresh user has arrived: the form reads its defaults a single time.
  return <EditUserFields user={query.data} onDone={onDone} />;
}

function EditUserFields({ user, onDone }: { user: ApiUser; onDone: () => void }) {
  const { form, isPending } = useEditUserForm(user, onDone);

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

      <form.Field name="name">
        {(field) => (
          <FormField
            id="edit-name"
            label="Full name"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field.state.meta)}
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <FormField
            id="edit-email"
            label="Email"
            type="email"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field.state.meta)}
          />
        )}
      </form.Field>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" disabled={isPending} onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}