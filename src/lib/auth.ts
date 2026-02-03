import { auth } from "@/lib/auth/server";

export async function getSession() {
  const result = await auth.getSession();
  const res = result as { data?: { session: { id: string }; user: { id: string; email?: string } } } | null;
  const session = res?.data?.session;
  const user = res?.data?.user;
  if (!session || !user) return null;
  return { session: { ...session, user }, user };
}
