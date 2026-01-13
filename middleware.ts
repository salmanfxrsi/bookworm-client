import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthToken } from "./types/next-auth";

export default withAuth(
  async (req: NextRequest) => {
    const url = req.nextUrl.clone();
    const token = req.nextauth?.token as AuthToken | undefined;

    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

if (url.pathname.startsWith("/admin") && token.role !== "admin") {
  url.pathname = "/dashboard"; 
  return NextResponse.redirect(url);
}

if ((url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/books")) && token.role !== "user") {
  url.pathname = "/admin"; 
  return NextResponse.redirect(url);
}


    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
    pages: { signIn: "/auth/login" },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/books/:path*"],
};
