import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQ_ITEMS, FAQ_BY_GROUP } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Patriot Map—opt-in businesses, listings, privacy, and more.",
  alternates: { canonical: `${site.siteUrl}/faq` },
};

export default function FAQPage() {
  const jsonLd = faqPageJsonLd(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold text-gray-900">FAQ</h1>
      <p className="mt-4 text-gray-600">
        Answers to common questions about Patriot Map, how listings work, and our
        approach to privacy.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">General</h2>
        <div className="mt-4">
          <FAQAccordion items={FAQ_BY_GROUP.general} defaultOpen={0} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Businesses</h2>
        <div className="mt-4">
          <FAQAccordion items={FAQ_BY_GROUP.businesses} defaultOpen={0} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">
          Privacy & Safety
        </h2>
        <div className="mt-4">
          <FAQAccordion items={FAQ_BY_GROUP.privacy} defaultOpen={0} />
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          href="/explore"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Explore the map
        </Link>
        <Link
          href="/submit"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          List your business
        </Link>
      </div>
    </div>
  );
}
