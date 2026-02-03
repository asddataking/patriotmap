import { auth } from "@/lib/auth/server";

export async function getSession() {
  const result = await auth.getSession();
  const session = result?.session;
  const user = result?.user;
  if (!session || !user) return null;
  return { session: { ...session, user }, user };
}
