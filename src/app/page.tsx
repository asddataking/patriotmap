import Link from "next/link";
import { listApprovedBusinesses } from "@/app/actions/businesses";
import { BusinessCard } from "@/components/BusinessCard";

export default async function LandingPage() {
  const businesses = await listApprovedBusinesses({});
  const preview = businesses.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Patriot Map
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover opt-in businesses in your community
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/explore"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Explore the map
          </Link>
          <Link
            href="/submit"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            List a business
          </Link>
        </div>
      </section>

      {preview.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-gray-900">
            Featured businesses
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/explore"
              className="text-sm text-blue-600 hover:underline"
            >
              View all on map →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
