import { NextResponse, type NextRequest } from "next/server";
import { ROLE_HOME } from "@/features/auth/constants";
import { getCurrentUser } from "@/features/auth/utils";

// Sends the signed-in user to the home page of their role.
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  const target = user ? ROLE_HOME[user.role] : "/api/session/expired";

  return NextResponse.redirect(new URL(target, request.url));
}