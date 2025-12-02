import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("path inside of middleware: ", path);
  const pathName = path === "/login" || path === "/signup"

  const token = request.cookies.get('token')?.value || ''
  if (pathName && token) {
    return NextResponse.redirect(new URL("/home", request.nextUrl))
  }
  if (!pathName && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

interface MiddlewareConfig {
  matcher: string[];
}

export const config: MiddlewareConfig = {
  matcher: [
    "/",
    "/createtask",
    "/login"
  ]
}