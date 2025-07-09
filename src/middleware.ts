import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/create-account" || path === "/login" || path === "/verify-email" || path === "/";

  const token = request.cookies.get("token")?.value || "";


  // If logged in and trying to access public auth pages, redirect to /profile
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }


  // If not logged in and trying to access protected routes, redirect to /
  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/",
    "/create-account",
    "/verify-email",
    "/login",
    "/profile"
  ]
};