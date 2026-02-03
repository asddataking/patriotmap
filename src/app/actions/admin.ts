"use server";

import { db } from "@/lib/db";
import { businesses, reports } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { eq, desc } from "drizzle-orm";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized", session: null };
  }
  if (!isAdmin(session.user.email ?? "")) {
    return { error: "Forbidden", session: null };
  }
  return { error: null, session };
}

export async function listPendingBusinesses() {
  const { error } = await requireAdmin();
  if (error) return [];

  const rows = await db
    .select()
    .from(businesses)
    .where(eq(businesses.status, "pending"))
    .orderBy(desc(businesses.createdAt));

  return rows;
}

export async function approveBusiness(id: string) {
  const { error } = await requireAdmin();
  if (error) return { success: false, error };

  try {
    await db
      .update(businesses)
      .set({ status: "approved", updatedAt: new Date() })
      .where(eq(businesses.id, id));
    return { success: true };
  } catch (err) {
    console.error("approveBusiness error:", err);
    return { success: false, error: "Failed to approve" };
  }
}

export async function rejectBusiness(id: string) {
  const { error } = await requireAdmin();
  if (error) return { success: false, error };

  try {
    await db
      .update(businesses)
      .set({ status: "rejected", updatedAt: new Date() })
      .where(eq(businesses.id, id));
    return { success: true };
  } catch (err) {
    console.error("rejectBusiness error:", err);
    return { success: false, error: "Failed to reject" };
  }
}

export async function listReports() {
  const { error } = await requireAdmin();
  if (error) return [];

  const rows = await db
    .select({
      report: reports,
      businessName: businesses.name,
      businessId: businesses.id,
    })
    .from(reports)
    .innerJoin(businesses, eq(reports.businessId, businesses.id))
    .orderBy(desc(reports.createdAt));

  return rows;
}
