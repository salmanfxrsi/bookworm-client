import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const url = req.nextUrl.clone();
    const token = req.nextauth.token; 

    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/admin") && token.role !== "admin") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      (url.pathname.startsWith("/dashboard") ||
        url.pathname.startsWith("/books")) &&
      token.role !== "user"
    ) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/books/:path*"],
};
