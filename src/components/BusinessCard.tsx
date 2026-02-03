import Link from "next/link";
import { BadgePills } from "./BadgePills";
import type { Business } from "@/db/schema";

const CATEGORY_ICONS: Record<string, string> = {
  Restaurant: "🍽️",
  Retail: "🛒",
  Service: "🔧",
  Healthcare: "⚕️",
  Automotive: "🚗",
  Other: "📍",
};

export function BusinessCard({ business }: { business: Business }) {
  const icon = CATEGORY_ICONS[business.category] ?? "📍";
  return (
    <Link
      href={`/business/${business.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md hover:bg-gray-50/50"
    >
      <div>
        <h3 className="font-semibold text-gray-900">{business.name}</h3>
        <p className="text-sm text-gray-500">
          {business.city}, {business.state}
        </p>
        <p className="text-sm text-gray-600">
          {icon} {business.category}
        </p>
        <BadgePills badges={business.badges} />
      </div>
    </Link>
  );
}
