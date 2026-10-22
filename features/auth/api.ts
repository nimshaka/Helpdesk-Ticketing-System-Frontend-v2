"use server";


import { apiRequest } from "@/lib/api/client";
import { toActionError, type ActionResult } from "@/lib/api/action-result";
import type { LoginValues, RegisterValues } from "./types";
import {  setAuthCookie } from "./utils";

type LoginResponse = { token: string };

async function authenticate(credentials: LoginValues): Promise<string> {
  const { data, message } = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: credentials,
  });
  await setAuthCookie(data.token);
  return message;
}

export async function loginAction(values: LoginValues): Promise<ActionResult> {
  try {
    const message = await authenticate(values);
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function registerAction(values: RegisterValues): Promise<ActionResult> {
  try {
    const {message} = await apiRequest("/auth/register", { method: "POST", body: values });
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}

