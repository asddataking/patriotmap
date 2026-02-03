import Link from "next/link";
import { listApprovedBusinesses } from "@/app/actions/businesses";
import { BusinessCard } from "@/components/BusinessCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata = {
  title: "Patriot Map",
  description:
    "Discover opt-in businesses in your community. A community-driven map of values-aligned local businesses.",
  alternates: { canonical: "/" },
};

export default async function LandingPage() {
  const businesses = await listApprovedBusinesses({});
  const featured = businesses.slice(0, 6);
  const faqTeaser = FAQ_ITEMS.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Support businesses that share your values
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            A community-driven map of opt-in, values-aligned local businesses.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/explore"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Explore the map
            </Link>
            <Link
              href="/submit"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              List a business (free)
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Opt-in listings • Privacy-first • No residential data
          </p>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Opt-in only</h3>
              <p className="mt-1 text-sm text-gray-600">
                Every listing is self-identified. Businesses choose to be on the map.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Self-identified tags</h3>
              <p className="mt-1 text-sm text-gray-600">
                Veteran Owned, Family Owned, and more—businesses select their own tags.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">Privacy-first</h3>
              <p className="mt-1 text-sm text-gray-600">
                No residential data collected. We don&apos;t assign beliefs or politics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured businesses
          </h2>
          <p className="mt-2 text-gray-600">
            Discover values-aligned businesses in your community.
          </p>
          {featured.length > 0 ? (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((b) => (
                  <BusinessCard key={b.id} business={b} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/explore"
                  className="text-blue-600 hover:underline font-medium"
                >
                  View all on map →
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-6 text-gray-500">
              No businesses yet. Be the first to list yours!
            </p>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">
            How it works
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <span className="text-2xl font-bold text-blue-600">1</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Businesses list themselves
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Owners add their business with optional tags and details.
              </p>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">2</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                Community discovers locally
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Browse the map and find businesses that align with your values.
              </p>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">3</span>
              <h3 className="mt-2 font-semibold text-gray-900">
                You choose where to spend
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Support the businesses that matter to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-gray-600">
            Quick answers to common questions.
          </p>
          <div className="mt-8 max-w-2xl">
            <FAQAccordion items={faqTeaser} defaultOpen={0} />
          </div>
          <div className="mt-6">
            <Link
              href="/faq"
              className="text-blue-600 hover:underline font-medium"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-200 bg-blue-50 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Own a business? Get listed.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Join the map and get discovered by values-driven customers in your area.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              List a business
            </Link>
            <Link
              href="/faq"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
