import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  console.log("MIDDLEWAAAAARE");
  const path = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = path === "/";
  const protectedPaths =
    path === "/sessions" ||
    path === "/buddy-to-buddy" ||
    path === "/sessions/[id]" ||
    path === "/group-training";

  if (token) {
    const userId = token.sub as string;

    if (publicPaths) {
      return NextResponse.redirect(new URL("/sessions", request.nextUrl));
    }
    return NextResponse.next({
      headers: {
        userId: userId,
      }, 
    });
  }

  if (protectedPaths) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/buddy-to-buddy",
    "/sessions",
    "/sessions/[id]",
    "/group-training",
    "/api/group-training",
    "/api/group-training/:id*",
  ],
};
