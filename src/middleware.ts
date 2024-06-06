import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("token", token);

  const publicPaths = path === "/";
  const protectedPaths = path === "/sessions" || path === "/buddy-to-buddy" || path === "/sessions/[id]";
  if (token) {
    if (publicPaths) {
      return NextResponse.redirect(new URL("/sessions", request.nextUrl));
    }
    return NextResponse.next();
  }

  if (protectedPaths) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/buddy-to-buddy", "/sessions", "/sessions/[id]"],
};
