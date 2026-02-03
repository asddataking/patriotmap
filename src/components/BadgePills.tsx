const BADGE_LABELS: Record<string, string> = {
  veteran_owned: "Veteran Owned",
  family_owned: "Family Owned",
  made_in_usa: "Made in USA",
  faith_friendly: "Faith Friendly",
  community_first: "Community First",
};

export function BadgePills({ badges }: { badges?: string[] | null }) {
  const list = badges ?? [];
  if (list.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map((badge) => (
        <span
          key={badge}
          className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
        >
          {BADGE_LABELS[badge] ?? badge}
        </span>
      ))}
    </div>
  );
}
