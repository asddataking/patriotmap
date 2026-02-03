"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = [
  "Restaurant",
  "Retail",
  "Service",
  "Healthcare",
  "Automotive",
  "Other",
];

const BADGES = [
  { id: "veteran_owned", label: "Veteran Owned" },
  { id: "family_owned", label: "Family Owned" },
  { id: "made_in_usa", label: "Made in USA" },
  { id: "faith_friendly", label: "Faith Friendly" },
  { id: "community_first", label: "Community First" },
];

export function ExploreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) next.set(k, v);
        else next.delete(k);
      });
      router.push(`/explore?${next.toString()}`);
    },
    [router, searchParams]
  );

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const badgesParam = searchParams.get("badges") ?? "";
  const activeBadges = badgesParam ? badgesParam.split(",") : [];

  const toggleBadge = (id: string) => {
    const next = activeBadges.includes(id)
      ? activeBadges.filter((b) => b !== id)
      : [...activeBadges, id];
    updateParams({ badges: next.length ? next.join(",") : undefined });
  };

  return (
    <form
      className="mt-4 flex flex-wrap gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="search"]');
        updateParams({ search: input?.value?.trim() || undefined });
      }}
    >
      <input
        name="search"
        type="text"
        placeholder="Search name, city, state..."
        defaultValue={search}
        className="rounded border border-gray-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Search
      </button>
      <select
        value={category}
        onChange={(e) =>
          updateParams({ category: e.target.value || undefined })
        }
        className="rounded border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap gap-2">
        {BADGES.map((b) => (
          <label key={b.id} className="flex cursor-pointer items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={activeBadges.includes(b.id)}
              onChange={() => toggleBadge(b.id)}
              className="rounded"
            />
            {b.label}
          </label>
        ))}
      </div>
    </form>
  );
}
