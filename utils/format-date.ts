import { APP_LOCALE, APP_TIME_ZONE } from "@/config/app";

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat(APP_LOCALE, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: APP_TIME_ZONE,
  }).format(new Date(iso));
}