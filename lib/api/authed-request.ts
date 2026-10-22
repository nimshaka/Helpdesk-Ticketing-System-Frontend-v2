import "server-only";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { apiRequest } from "./client";
import { ApiError } from "./errors";

type ApiRequestOptions = Parameters<typeof apiRequest>[1];

export async function authedRequest<T>(path: string, options: Omit<NonNullable<ApiRequestOptions>, "token"> = {}) {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    throw new ApiError(401, "UNAUTHENTICATED", "You are not signed in.");
  }
  return apiRequest<T>(path, { ...options, token });
}