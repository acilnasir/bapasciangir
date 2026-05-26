import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;

    const pathname = req.nextUrl.pathname;

    // SUDAH LOGIN TIDAK BOLEH KE LOGIN
    if (token && pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // BELUM LOGIN TIDAK BOLEH KE ADMIN
    if (!token && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
