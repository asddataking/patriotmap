import Link from "next/link";
import { BadgePills } from "./BadgePills";
import type { Business } from "@/db/schema";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={`/business/${business.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
    >
      <h3 className="font-semibold text-gray-900">{business.name}</h3>
      <p className="text-sm text-gray-500">
        {business.city}, {business.state}
      </p>
      <p className="text-sm text-gray-600">{business.category}</p>
      <BadgePills badges={business.badges} />
    </Link>
  );
}
