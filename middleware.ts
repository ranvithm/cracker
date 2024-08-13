export { auth as middleware } from "@/src/lib/auth";

// import { auth } from "@/src/lib/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   // if (!req.auth && req.nextUrl.pathname !== "/login") {
//   //   const newUrl = new URL("/login", req.nextUrl.origin);
//   //   return Response.redirect(newUrl);
//   // }
//   const pathname = req.nextUrl.pathname;
//   const headers = new Headers(req.headers);
//   headers.set("x-current-path", pathname);
//   return NextResponse.next({
//     request: {
//       headers,
//     },
//   });
// });

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
