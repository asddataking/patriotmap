import { listApprovedBusinesses } from "@/app/actions/businesses";
import { MapboxMap } from "@/components/MapboxMap";
import { BusinessCard } from "@/components/BusinessCard";
import { ExploreFilters } from "./ExploreFilters";

export const dynamic = "force-dynamic";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; badges?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const category = params.category ?? "";
  const badges = params.badges ? params.badges.split(",").filter(Boolean) : [];

  const businesses = await listApprovedBusinesses({
    search: search || undefined,
    category: category || undefined,
    badges: badges.length ? badges : undefined,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
      <ExploreFilters />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="sticky top-4 h-[500px]">
            <MapboxMap businesses={businesses} />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="space-y-4">
            {businesses.length === 0 ? (
              <p className="text-gray-500">No businesses found.</p>
            ) : (
              businesses.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
