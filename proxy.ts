import { auth } from "@/lib/auth/server";

export default auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: "/auth/magic-link",
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    "/account",
    "/account/:path*",
    "/submit",
    "/admin",
    "/admin/:path*",
  ],
};
