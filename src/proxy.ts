import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// export function proxy(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   console.log("path inside of middleware: ", path);
//   const pathName = path === "/login" || path === "/signup" || path === "/home"

//   const token = request.cookies.get('token')?.value || ''
//   if (pathName && token) {
//     return NextResponse.redirect(new URL("/home", request.nextUrl))
//   }
//   if (!pathName && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }

export function proxy(request: NextRequest){
  const path = request.nextUrl.pathname;
  const protectedPath = path.includes("/createtask") || path.includes("/api/todo/createtodo") || path.includes("/api/todo/deletetodo");

  const token = request.cookies.get('token')?.value || ''

  if(protectedPath && !token){
    return NextResponse.json({
      message: "You are not allowed to perform this action!",
      success: false,
    },{status: 403})
  }

  return NextResponse.next();
}

interface MiddlewareConfig {
  matcher: string[];
}

export const config: MiddlewareConfig = {
  matcher: [
    "/createtask",
    "/api/todo/createtodo",
    "/api/todo/deletetodo",
    "/api/todo/show",
    "/signup"
  ]
}