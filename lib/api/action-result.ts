import { ApiError } from "./errors";

export type ActionResult<T = null> =
  | { ok: true; data: T; message?: string }
  | {
      ok: false;
      error: {
        status: number;
        code: string;
        message: string;
        fieldErrors?: Record<string, string[]>;
      };
    };

export function toActionError(e: unknown): ActionResult<never> {
  if (e instanceof ApiError) {
    return {
      ok: false,
      error: {
        status: e.status,
        code: e.code,
        message: e.message,
        fieldErrors: e.details ?? undefined,
      },
    };
  }
  return {
    ok: false,
    error: { status: 500, code: "UNKNOWN_ERROR", message: "Something went wrong." },
  };
}