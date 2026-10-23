import { ActionError } from "@/lib/api/action-result";

// TanStack Form only treats the object as { form, fields } when the `fields`
// key exists, so we must always return it (even when empty).
type FormErrors = { form?: string; fields: Record<string, string> };

export function toFormErrors(error: unknown): FormErrors {
  if (!(error instanceof ActionError)) {
    return { form: "Something went wrong. Please try again.", fields: {} };
  }

 
  const fields = Object.fromEntries(
    Object.entries(error.fieldErrors ?? {}).map(([name, messages]) => [name, messages[0]]),
  );
  const hasFieldErrors = Object.keys(fields).length > 0;

 
  return { form: hasFieldErrors ? undefined : error.message, fields };
}