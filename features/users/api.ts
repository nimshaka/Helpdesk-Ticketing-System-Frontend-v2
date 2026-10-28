"use server";

import { authedRequest } from "@/lib/api/authed-request";
import { toActionError, type ActionResult } from "@/lib/api/action-result";
import type { ApiMeta } from "@/types/api";
import type { ApiUser, UserRole } from "@/types/user";
import { USERS_PER_PAGE } from "./constants";
import type { CreateUserValues, UpdateUserChanges, UserFilters } from "./types";

type UserList = { users: ApiUser[]; meta: ApiMeta };

// Runs a write request and turns the outcome into an ActionResult.
async function run(request: () => Promise<{ message: string }>): Promise<ActionResult> {
  try {
    const { message } = await request();
    return { ok: true, data: null, message };
  } catch (error) {
    return toActionError(error);
  }
}

export async function getUsers(filters: UserFilters): Promise<UserList> {
  const { data, meta } = await authedRequest<ApiUser[]>("/users", {
    query: { ...filters, per_page: USERS_PER_PAGE },
  });

  return {
    users: data,
    meta: meta ?? { current_page: 1, per_page: data.length, total: data.length, last_page: 1 },
  };
}

export async function getUser(id: number): Promise<ApiUser> {
  const { data } = await authedRequest<ApiUser>(`/users/${id}`);
  return data;
}

export async function createUserAction(values: CreateUserValues): Promise<ActionResult> {
  return run(() => authedRequest("/users", { method: "POST", body: values }));
}

export async function updateUserAction(id: number, changes: UpdateUserChanges): Promise<ActionResult> {
  return run(() => authedRequest(`/users/${id}`, { method: "PATCH", body: changes }));
}

export async function setUserRoleAction(id: number, role: UserRole): Promise<ActionResult> {
  return run(() => authedRequest(`/users/${id}/role`, { method: "PATCH", body: { role } }));
}

export async function setUserActiveAction(id: number, isActive: boolean): Promise<ActionResult> {
  const action = isActive ? "activate" : "deactivate";
  return run(() => authedRequest(`/users/${id}/${action}`, { method: "PATCH" }));
}