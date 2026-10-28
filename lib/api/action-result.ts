import { ApiError } from "./errors";

export type ActionErrorInfo = {
  status: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type ActionResult<T = null> =
  | { ok: true; data: T; message?: string }
  | { ok: false; error: ActionErrorInfo };

export function toActionError(error: unknown): ActionResult<never> {
  if (error instanceof ApiError) {
    return {
      ok: false,
      error: {
        status: error.status,
        code: error.code,
        message: error.message,
        fieldErrors: error.details ?? undefined,
      },
    };
  }
  return {
    ok: false,
    error: { status: 500, code: "UNKNOWN_ERROR", message: "Something went wrong." },
  };
}

/** Client-side error thrown by `unwrap`, so TanStack Query can enter its error state. */
export class ActionError extends Error {
  status: number;
  code: string;
  fieldErrors?: Record<string, string[]>;

  constructor({ status, code, message, fieldErrors }: ActionErrorInfo) {
    super(message);
    this.name = "ActionError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

export type ActionSuccess<T> = Extract<ActionResult<T>, { ok: true }>;

export function unwrap<T>(result: ActionResult<T>):  ActionSuccess<T> {
  if (!result.ok) throw new ActionError(result.error);
  return result;
}


export function getErrorMessage(error: unknown): string {
  return error instanceof ActionError ? error.message : "Something went wrong. Please try again.";
}