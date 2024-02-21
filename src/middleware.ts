import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL("/auth", req.url);

  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    if (req.nextUrl.pathname === "/auth") {
      NextResponse.next();
    }
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
