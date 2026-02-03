"use server";

import { db } from "@/lib/db";
import { reports } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const reportSchema = z.object({
  reason: z.string().min(1, "Reason is required").max(500),
  details: z.string().max(1000).optional().nullable(),
});

export async function createReport(
  businessId: string,
  reason: string,
  details?: string | null
) {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, error: "You must be signed in to report" };
  }

  const parsed = reportSchema.safeParse({ reason, details });
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  try {
    await db.insert(reports).values({
      id: uuidv4(),
      businessId,
      userId: session.user.id,
      reason: parsed.data.reason.trim(),
      details: parsed.data.details?.trim() || null,
    });

    return { success: true };
  } catch (err) {
    console.error("createReport error:", err);
    return { success: false, error: "Failed to submit report" };
  }
}
