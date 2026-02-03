"use server";

import { db } from "@/lib/db";
import { favorites, businesses } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function toggleFavorite(businessId: string) {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, error: "You must be signed in to favorite" };
  }

  try {
    const existing = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, session.user.id),
          eq(favorites.businessId, businessId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(favorites)
        .where(
          and(
            eq(favorites.userId, session.user.id),
            eq(favorites.businessId, businessId)
          )
        );
      return { success: true, favorited: false };
    } else {
      await db.insert(favorites).values({
        userId: session.user.id,
        businessId,
      });
      return { success: true, favorited: true };
    }
  } catch (err) {
    console.error("toggleFavorite error:", err);
    return { success: false, error: "Failed to update favorite" };
  }
}

export async function listFavorites() {
  const session = await getSession();
  if (!session?.user) {
    return [];
  }

  const rows = await db
    .select({
      business: businesses,
    })
    .from(favorites)
    .innerJoin(businesses, eq(favorites.businessId, businesses.id))
    .where(eq(favorites.userId, session.user.id));

  return rows.map((r) => r.business).filter((b) => b.status === "approved");
}

export async function isFavorited(businessId: string): Promise<boolean> {
  const session = await getSession();
  if (!session?.user) return false;

  const [row] = await db
    .select()
    .from(favorites)
    .where(
      and(
        eq(favorites.userId, session.user.id),
        eq(favorites.businessId, businessId)
      )
    )
    .limit(1);

  return !!row;
}
