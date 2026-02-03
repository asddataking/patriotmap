# Patriot Map

An opt-in directory of businesses on a map. Users can browse approved businesses, favorite them, submit new businesses (pending review), and report listings. Admins can approve/reject submissions and review reports.

## Tech Stack

- Next.js 14+ (App Router) + TypeScript
- TailwindCSS
- Neon Postgres + Neon Auth (email magic link)
- Drizzle ORM
- Mapbox GL JS (map) + Mapbox Geocoding API
- Zod (validation)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

**Required variables:**

- **DATABASE_URL** – Neon Postgres connection string. Create a project at [neon.tech](https://neon.tech), then copy the connection string from the dashboard.
- **NEON_AUTH_BASE_URL** and **NEXT_PUBLIC_NEON_AUTH_URL** – Enable Neon Auth in your Neon project (Auth tab), then copy the Auth URL. Both vars use the same URL.
- **MAPBOX_ACCESS_TOKEN** and **NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN** – Create a Mapbox account at [mapbox.com](https://mapbox.com), create an access token, and use it for both (server geocoding + client map).
- **ADMIN_EMAILS** – Comma-separated list of admin emails (e.g. `admin@example.com,other@example.com`).

### 3. Neon Auth setup

1. Create a Neon project at [console.neon.tech](https://console.neon.tech).
2. Go to the **Auth** tab and enable Neon Auth.
3. Copy the Auth URL into `NEON_AUTH_BASE_URL` and `NEXT_PUBLIC_NEON_AUTH_URL`.

### 4. Run migrations

```bash
npm run db:migrate
```

To generate new migrations after schema changes:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Seed (optional)

Add a few approved businesses for testing:

```bash
npm run db:seed
```

### 6. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Moderation workflow

- New submissions have status `pending` and do not appear on the public map.
- Admins (emails in `ADMIN_EMAILS`) can go to `/admin` to approve or reject pending businesses.
- Only businesses with status `approved` appear on the Explore map and list.
- Reports are listed in the admin panel for review.

## Pages

- `/` – Landing (hero + featured businesses)
- `/auth` – Sign in / Sign up (email magic link)
- `/explore` – Map + list of approved businesses, search and filters
- `/business/[id]` – Business detail, favorite, report
- `/submit` – Submit a business (requires auth)
- `/account` – Favorites and my submissions (requires auth)
- `/admin` – Approve/reject pending, view reports (requires admin)

## Disclaimer

Listings are self-identified and opt-in. Patriot Map does not assign beliefs or political affiliation. No residential data is collected.
