import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/constants/auth";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}