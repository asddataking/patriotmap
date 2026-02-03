"use server";

import { db } from "@/lib/db";
import { businesses } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import type { BusinessStatus } from "@/db/schema";

const businessSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  category: z.string().min(1, "Category is required").max(100),
  address1: z.string().min(1, "Address is required").max(200),
  address2: z.string().max(200).optional().nullable(),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().length(2, "State must be 2 letters").toUpperCase(),
  zip: z.string().min(1, "ZIP is required").max(20),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  phone: z.string().max(20).optional().nullable(),
  website: z.string().url().optional().nullable().or(z.literal("")),
  description: z.string().max(500).optional().nullable(),
  badges: z.array(z.string()).optional().default([]),
});

export type BusinessSubmissionInput = z.infer<typeof businessSubmissionSchema>;

export async function createBusinessSubmission(form: BusinessSubmissionInput) {
  const session = await getSession();
  if (!session?.user) {
    return { success: false, error: "You must be signed in to submit a business" };
  }

  const parsed = businessSubmissionSchema.safeParse(form);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const data = parsed.data;

  const validBadges = ["veteran_owned", "family_owned", "made_in_usa", "faith_friendly", "community_first"];
  const badges = (data.badges ?? []).filter((b) => validBadges.includes(b));

  try {
    await db.insert(businesses).values({
      id: uuidv4(),
      name: data.name.trim(),
      category: data.category.trim(),
      address1: data.address1.trim(),
      address2: data.address2?.trim() || null,
      city: data.city.trim(),
      state: data.state,
      zip: data.zip.trim(),
      lat: data.lat,
      lng: data.lng,
      phone: data.phone?.trim() || null,
      website: data.website && data.website !== "" ? data.website.trim() : null,
      description: data.description?.trim() || null,
      badges,
      status: "pending",
      createdBy: session.user.id,
    });

    return { success: true };
  } catch (err) {
    console.error("createBusinessSubmission error:", err);
    return { success: false, error: "Failed to submit business" };
  }
}

export type ListFilters = {
  search?: string;
  category?: string;
  badges?: string[];
};

export async function listApprovedBusinesses(filters: ListFilters = {}) {
  let query = db
    .select()
    .from(businesses)
    .where(eq(businesses.status, "approved" as BusinessStatus));

  const results = await query;

  let filtered = results;

  if (filters.search?.trim()) {
    const search = filters.search.trim().toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(search) ||
        b.city.toLowerCase().includes(search) ||
        b.state.toLowerCase().includes(search)
    );
  }

  if (filters.category?.trim()) {
    const cat = filters.category.trim().toLowerCase();
    filtered = filtered.filter((b) => b.category.toLowerCase() === cat);
  }

  if (filters.badges?.length) {
    const badgeSet = new Set(filters.badges.map((b) => b.toLowerCase()));
    filtered = filtered.filter((b) =>
      (b.badges ?? []).some((badge) => badgeSet.has(badge.toLowerCase()))
    );
  }

  return filtered;
}

export async function getBusiness(id: string) {
  const [business] = await db.select().from(businesses).where(eq(businesses.id, id)).limit(1);

  if (!business) return null;

  if (business.status === "approved") {
    return business;
  }

  const session = await getSession();
  if (!session?.user) return null;

  const isCreator = business.createdBy === session.user.id;
  const adminEmails = process.env.ADMIN_EMAILS ?? "";
  const isAdmin = adminEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .includes(session.user.email?.toLowerCase() ?? "");

  if (isCreator || isAdmin) {
    return business;
  }

  return null;
}
