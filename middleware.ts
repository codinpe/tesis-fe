// /middleware.ts  ← EN LA RAÍZ
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  debugger

  // No autenticado → dashboard → /login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Autenticado → auth routes → /dashboard
  if (token && ["/login", "/forgot", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/forgot", "/register"],
};
