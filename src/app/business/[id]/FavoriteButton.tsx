"use client";

import { useState } from "react";
import { toggleFavorite } from "@/app/actions/favorites";

export function FavoriteButton({
  businessId,
  initialFavorited,
}: {
  businessId: string;
  initialFavorited: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await toggleFavorite(businessId);
    if (result.success && result.favorited !== undefined) {
      setFavorited(result.favorited);
    } else if (result.error?.includes("signed in")) {
      window.location.href = "/auth/magic-link";
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
    >
      {favorited ? "★ Favorited" : "☆ Favorite"}
    </button>
  );
}
