
"use client";

import { Field } from "@/components/shared/field";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField } from "@/components/shared/form-field";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { USER_ROLES, USER_ROLE_LABELS } from "@/constants/roles";
import type { UserRole } from "@/types/user";
import { getFieldError } from "@/utils/get-field-error";
import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";

type CreateUserFormProps = {
  onDone: () => void;
};

export function CreateUserForm({ onDone }: CreateUserFormProps) {
  const { form, isPending } = useCreateUserForm(onDone);

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
            id="create-name"
            label="Full name"
            autoComplete="off"
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
            id="create-email"
            label="Email"
            type="email"
            autoComplete="off"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field.state.meta)}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <FormField
            id="create-password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field.state.meta)}
          />
        )}
      </form.Field>

      <form.Field name="role">
        {(field) => (
          <Field id="create-role" label="Role" error={getFieldError(field.state.meta)}>
            <NativeSelect
              id="create-role"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value as UserRole)}
              onBlur={field.handleBlur}
            >
              {USER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {USER_ROLE_LABELS[role]}
                </option>
              ))}
            </NativeSelect>
          </Field>
        )}
      </form.Field>

      <form.Field name="is_active">
        {(field) => (
          <div className="flex items-center gap-2">
            <input
              id="create-is-active"
              type="checkbox"
              className="size-4 accent-primary"
              checked={field.state.value}
              onChange={(event) => field.handleChange(event.target.checked)}
            />
            <Label htmlFor="create-is-active">Active (can use the account)</Label>
          </div>
        )}
      </form.Field>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" disabled={isPending} onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create user"}
        </Button>
      </div>
    </form>
  );
}