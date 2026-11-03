import "server-only";
import { env } from "@/config/env";
import type { ApiSuccess } from "@/types/api";
import { ApiError } from "./errors";

type Options = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | null | undefined>;
  token?: string;
};

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, query, token }: Options = {},
): Promise<ApiSuccess<T>> {
  const url = new URL(env.apiBaseUrl + path);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: serializeBody(body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Cannot reach the server. Please try again.");
  }

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new ApiError(
      res.status,
      json?.error?.code ?? "UNKNOWN_ERROR",
      json?.error?.message ?? "Something went wrong.",
      json?.error?.details ?? null,
    );
  }
  return json as ApiSuccess<T>;
}

function serializeBody(body: unknown): BodyInit | undefined {
  if (body === undefined) return undefined;
  return body instanceof FormData ? body : JSON.stringify(body);
}