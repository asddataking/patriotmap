export const site = {
  siteName: "Patriot Map",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://patriotmap.vercel.app",
  siteDescription:
    "Discover opt-in businesses in your community. A community-driven map of values-aligned local businesses.",
  ogImage: "/opengraph-image",
  twitterHandle: undefined as string | undefined,
  defaultKeywords: [
    "patriot map",
    "opt-in businesses",
    "local businesses",
    "community map",
    "values-aligned",
    "veteran owned",
    "family owned",
  ],
} as const;
