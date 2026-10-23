import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { AUTH_ROUTES } from "@/features/auth/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has(AUTH_COOKIE_NAME);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!hasToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (hasToken && (isAuthRoute || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};