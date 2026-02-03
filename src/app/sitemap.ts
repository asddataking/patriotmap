import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listApprovedBusinesses } from "@/app/actions/businesses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.siteUrl;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/explore`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const businesses = await listApprovedBusinesses({});
    const businessPages: MetadataRoute.Sitemap = businesses.map((b) => ({
      url: `${base}/business/${b.id}`,
      lastModified: b.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    return [...staticPages, ...businessPages];
  } catch {
    return staticPages;
  }
}
