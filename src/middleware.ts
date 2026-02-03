import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/auth/magic-link",
});

export const config = {
  // Only protect routes that require login. All other routes (/, /explore, /business/*, etc.) are public.
  matcher: ["/account", "/account/:path*", "/submit", "/admin", "/admin/:path*"],
};
