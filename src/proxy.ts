import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const hasRefreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  if (!hasRefreshToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasRefreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/hire/:path*", "/login", "/signup"],
};
