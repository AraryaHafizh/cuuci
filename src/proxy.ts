import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/super-admin/:path*"],
};
