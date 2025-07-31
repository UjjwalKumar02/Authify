import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'



export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ["/", "/login", "/create-account", "/verify-email"].includes(path);


  const token = request.cookies.get("refreshToken")?.value;
  let isLoggedIn = false;


  if (token) {
    try {
      // jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
      isLoggedIn = true;
    } catch (error) {
      console.warn("Invalid refresh token:", error);
    }
  }


  if (isPublicPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  if (!isPublicPath && !isLoggedIn) {
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