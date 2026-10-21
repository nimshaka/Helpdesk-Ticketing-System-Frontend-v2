type FieldMeta = { isTouched: boolean; errors: unknown[] };

export function getFieldError({ isTouched, errors }: FieldMeta): string | undefined {
  if (!isTouched) return undefined;
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    return String(first.message);
  }
  return undefined;
}