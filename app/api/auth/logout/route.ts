import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { authedRequest } from "@/lib/api/authed-request";

export async function POST() {
  let message = "Logged out.";

  try {
    const response = await authedRequest("/auth/logout", { method: "POST" });
    message = response.message;
  } catch {
    // The API token may already be invalid. We still clear the local cookie below.
  }

  const response = NextResponse.json({ success: true, data: null, message });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}