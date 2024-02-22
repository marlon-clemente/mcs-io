import { NextRequest, NextResponse } from "next/server";
import { isSessionValid } from "./services/jwt";

export function middleware(req: NextRequest) {
  const url = new URL("/auth", req.url);

  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    if (req.nextUrl.pathname === "/auth") {
      console.log("middleware - token nao existe");
      NextResponse.next();
    }
    return NextResponse.redirect(url);
  }

  if (!isSessionValid()) {
    console.log("middleware - token expirou");
    return NextResponse.redirect(url);
  }

  console.log("middleware - token valido");

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
