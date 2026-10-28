import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/constants/auth";
import { ApiError } from "@/lib/api/errors";
import { authedRequest } from "@/lib/api/authed-request";
import { ROLE_HOME } from "./constants";
import type { ApiUser} from "@/types/user";
import type { UserRole } from "@/types/user";

export async function setAuthCookie(token: string): Promise<void> {
  (await cookies()).set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export async function clearAuthCookie(): Promise<void> {
  (await cookies()).delete(AUTH_COOKIE_NAME);
}


export const getCurrentUser = cache(async (): Promise<ApiUser | null> => {
  try {
    const { data } = await authedRequest<ApiUser>("/auth/me");
    return data.is_active ? data : null;
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      return null;
    }
    throw error;
  }
});

export async function requireUser(): Promise<ApiUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/api/session/expired");
  return user;
}

export async function requireRole(role: UserRole): Promise<ApiUser> {
  const user = await requireUser();
  if (user.role !== role) redirect(ROLE_HOME[user.role]);
  return user;
}