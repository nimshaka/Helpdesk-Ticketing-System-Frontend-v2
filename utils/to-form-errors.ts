import { ActionError } from "@/lib/api/action-result";

type FormErrors = { form?: string; fields?: Record<string, string> };

export function toFormErrors(error: unknown): FormErrors {
  if (!(error instanceof ActionError)) {
    return { form: "Something went wrong. Please try again." };
  }

  const fields = Object.fromEntries(
    Object.entries(error.fieldErrors ?? {}).map(([name, messages]) => [name, messages[0]]),
  );
  const hasFieldErrors = Object.keys(fields).length > 0;

  return hasFieldErrors ? { fields } : { form: error.message };
}