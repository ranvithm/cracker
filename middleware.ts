import { auth } from "@/src/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/api/auth/login") {
    const newUrl = new URL("/api/auth/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
