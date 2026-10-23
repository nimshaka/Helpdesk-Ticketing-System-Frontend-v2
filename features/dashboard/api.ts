"use server";

import { authedRequest } from "@/lib/api/authed-request";
import type { Dashboard } from "./types";

export async function getDashboard(): Promise<Dashboard> {
  const { data } = await authedRequest<Dashboard>("/dashboard");
  return data;
}