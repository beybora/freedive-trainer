import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = path === "/";
  const protectedPaths = path.startsWith("/sessions"); // Assuming protected paths start with /sessions

  // Redirect with token to appropriate location (not just root)
  if (token) {
    if (publicPaths) {
      // Redirect to a protected route (e.g., /dashboard)
      return NextResponse.redirect(new URL("/sessions", request.nextUrl));
    }
    // Allow access to protected paths with token
    return NextResponse.next();
  }

  // Redirect without token based on path
  if (protectedPaths) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // Allow access to public paths without token
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sessions", "/sessions/[id]"],
};
