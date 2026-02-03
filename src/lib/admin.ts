export function isAdmin(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS ?? "";
  const list = adminEmails.split(",").map((e) => e.trim().toLowerCase());
  return list.includes(email.toLowerCase());
}
