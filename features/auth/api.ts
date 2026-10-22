"use server";

import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/api/client";
import { authedRequest } from "@/lib/api/authed-request";
import { toActionError, type ActionResult } from "@/lib/api/action-result";
import type { LoginValues, RegisterValues } from "./types";
import { clearAuthCookie, setAuthCookie } from "./utils";

type LoginResponse = { token: string };

async function authenticate(credentials: LoginValues): Promise<void> {
  const { data } = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: credentials,
  });
  await setAuthCookie(data.token);
}

export async function loginAction(values: LoginValues): Promise<ActionResult> {
  try {
    await authenticate(values);
    return { ok: true, data: null };
  } catch (error) {
    return toActionError(error);
  }
}

export async function registerAction(values: RegisterValues): Promise<ActionResult> {
  try {
    await apiRequest("/auth/register", { method: "POST", body: values });
    await authenticate({ email: values.email, password: values.password });
    return { ok: true, data: null };
  } catch (error) {
    return toActionError(error);
  }
}

export async function logoutAction(): Promise<void> {
  await authedRequest("/auth/logout", { method: "POST" }).catch(() => undefined);
  await clearAuthCookie();
  redirect("/login");
}