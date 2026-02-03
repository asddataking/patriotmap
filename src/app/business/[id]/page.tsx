import { notFound } from "next/navigation";
import Link from "next/link";
import { getBusiness } from "@/app/actions/businesses";
import { isFavorited } from "@/app/actions/favorites";
import { BadgePills } from "@/components/BadgePills";
import { FavoriteButton } from "./FavoriteButton";
import { ReportButton } from "./ReportButton";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getBusiness(id);

  if (!business) notFound();

  const favorited = await isFavorited(id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/explore" className="text-sm text-blue-600 hover:underline">
        ← Back to Explore
      </Link>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
            <p className="text-gray-600">{business.category}</p>
            <BadgePills badges={business.badges} />
          </div>
          <div className="flex gap-2">
            <FavoriteButton businessId={id} initialFavorited={favorited} />
            <ReportButton businessId={id} />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Address</h2>
            <p className="text-gray-900">
              {business.address1}
              {business.address2 && `, ${business.address2}`}
            </p>
            <p className="text-gray-900">
              {business.city}, {business.state} {business.zip}
            </p>
          </div>

          {business.phone && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Phone</h2>
              <a
                href={`tel:${business.phone}`}
                className="text-blue-600 hover:underline"
              >
                {business.phone}
              </a>
            </div>
          )}

          {business.website && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Website</h2>
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {business.website}
              </a>
            </div>
          )}

          {business.description && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Description</h2>
              <p className="text-gray-900 whitespace-pre-wrap">
                {business.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
