import {
  pgTable,
  uuid,
  text,
  doublePrecision,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const BUSINESS_STATUSES = ["pending", "approved", "rejected"] as const;
export type BusinessStatus = (typeof BUSINESS_STATUSES)[number];

export const BADGE_OPTIONS = [
  "veteran_owned",
  "family_owned",
  "made_in_usa",
  "faith_friendly",
  "community_first",
] as const;
export type BadgeOption = (typeof BADGE_OPTIONS)[number];

export const businesses = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  address1: text("address1").notNull(),
  address2: text("address2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  phone: text("phone"),
  website: text("website"),
  description: text("description"),
  badges: text("badges").array().$type<string[]>().$defaultFn(() => []),
  status: text("status").$type<BusinessStatus>().default("pending").notNull(),
  createdBy: text("created_by").notNull(),
  claimedBy: text("claimed_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const favorites = pgTable(
  "favorites",
  {
    userId: text("user_id").notNull(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.businessId] })]
);

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  reason: text("reason").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
  userId: text("user_id").primaryKey(),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type Report = typeof reports.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
