"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/form-field";
import { getFieldError } from "@/utils/get-field-error";
import { useRegisterForm } from "../hooks/use-register-form";

export function RegisterForm() {
  const { form, isPending } = useRegisterForm();

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => (
          <FormField
            id="name"
            label="Full name"
            autoComplete="name"
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
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
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
            id="password"
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

      <form.Field name="password_confirmation">
        {(field) => (
          <FormField
            id="password_confirmation"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field.state.meta)}
          />
        )}
      </form.Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}