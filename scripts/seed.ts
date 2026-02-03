import { config } from "dotenv";

config({ path: ".env.local" });

import { db } from "../src/lib/db";
import { businesses } from "../src/db/schema";

const SEED_USER_ID = "seed-user-id";

async function seed() {
  const existing = await db.select().from(businesses).limit(1);
  if (existing.length > 0) {
    console.log("Database already has businesses. Skipping seed.");
    process.exit(0);
  }

  await db.insert(businesses).values([
    {
      name: "Liberty Diner",
      category: "Restaurant",
      address1: "123 Main St",
      address2: null,
      city: "Austin",
      state: "TX",
      zip: "78701",
      lat: 30.2672,
      lng: -97.7431,
      phone: "512-555-0100",
      website: "https://example.com",
      description: "Family-owned diner serving American classics.",
      badges: ["family_owned", "made_in_usa"],
      status: "approved",
      createdBy: SEED_USER_ID,
    },
    {
      name: "Veteran Auto Repair",
      category: "Automotive",
      address1: "456 Oak Ave",
      address2: null,
      city: "Dallas",
      state: "TX",
      zip: "75201",
      lat: 32.7767,
      lng: -96.797,
      phone: "214-555-0200",
      website: null,
      description: "Veteran-owned auto repair shop.",
      badges: ["veteran_owned", "community_first"],
      status: "approved",
      createdBy: SEED_USER_ID,
    },
    {
      name: "Faith & Family Pharmacy",
      category: "Healthcare",
      address1: "789 Elm St",
      address2: "Suite 100",
      city: "Houston",
      state: "TX",
      zip: "77001",
      lat: 29.7604,
      lng: -95.3698,
      phone: "713-555-0300",
      website: null,
      description: "Community pharmacy with a focus on service.",
      badges: ["faith_friendly", "family_owned"],
      status: "approved",
      createdBy: SEED_USER_ID,
    },
  ]);

  console.log("Seeded 3 approved businesses.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
