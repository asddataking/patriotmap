CREATE TABLE IF NOT EXISTS "businesses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "category" text NOT NULL,
  "address1" text NOT NULL,
  "address2" text,
  "city" text NOT NULL,
  "state" text NOT NULL,
  "zip" text NOT NULL,
  "lat" double precision NOT NULL,
  "lng" double precision NOT NULL,
  "phone" text,
  "website" text,
  "description" text,
  "badges" text[] DEFAULT '{}',
  "status" text DEFAULT 'pending' NOT NULL,
  "created_by" text NOT NULL,
  "claimed_by" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "favorites" (
  "user_id" text NOT NULL,
  "business_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  PRIMARY KEY ("user_id", "business_id")
);

CREATE TABLE IF NOT EXISTS "reports" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "business_id" uuid NOT NULL,
  "user_id" text NOT NULL,
  "reason" text NOT NULL,
  "details" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "profiles" (
  "user_id" text PRIMARY KEY NOT NULL,
  "display_name" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "reports" ADD CONSTRAINT "reports_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
