import { APP_LOCALE, APP_TIME_ZONE } from "@/config/app";

// Most API dates are ISO 8601 with a "Z" ("2026-10-15T16:32:12.000000Z"). Some, like
// `assigned_at`, look like "2026-10-15 20:32:12" with no timezone. We treat those as UTC
// and normalise them, so every browser parses them the same way.
const HAS_TIMEZONE = /(Z|[+-]\d{2}:?\d{2})$/i;

function parseApiDate(value: string): Date {
  const iso = value.replace(" ", "T");
  return new Date(HAS_TIMEZONE.test(iso) ? iso : `${iso}Z`);
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat(APP_LOCALE, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: APP_TIME_ZONE,
  }).format(parseApiDate(value));
}