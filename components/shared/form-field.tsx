import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "./field";

type FormFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: string;
};

export function FormField({ id, label, error, ...inputProps }: FormFieldProps) {
  return (
    <Field id={id} label={label} error={error}>
      <Input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
    </Field>
  );
}