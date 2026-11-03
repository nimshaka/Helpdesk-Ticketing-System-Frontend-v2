import { useLayoutEffect } from "react";

type Resettable = { reset: () => void };

/**
 * With Cache Components, Next.js keeps a page you left alive but hidden, so a form would
 * still show the old values when you come back. This empties the form every time the
 * user leaves the page (after a redirect, Cancel, or using the sidebar).
 */
export function useResetFormOnLeave(form: Resettable): void {
  useLayoutEffect(() => {
    return () => form.reset();
  }, [form]);
}