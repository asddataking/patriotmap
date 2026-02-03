"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Business } from "@/db/schema";

export function MapboxMap({ businesses }: { businesses: Business[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token || !mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283],
      zoom: 3,
    });

    mapInstanceRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (businesses.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();

    businesses.forEach((b) => {
      const el = document.createElement("div");
      el.className = "map-marker";
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "#2563eb";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([b.lng, b.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2 min-w-[160px]">
              <p class="font-semibold text-gray-900">${escapeHtml(b.name)}</p>
              <p class="text-sm text-gray-600">${escapeHtml(b.category)}</p>
              ${(b.badges ?? []).length ? `<p class="text-xs text-gray-500 mt-1">${(b.badges ?? []).map((x) => BADGE_LABELS[x] ?? x).join(", ")}</p>` : ""}
              <a href="/business/${b.id}" class="text-sm text-blue-600 hover:underline mt-1 block">View details</a>
            </div>`
          )
        )
        .addTo(map);

      markersRef.current.push(marker);
      bounds.extend([b.lng, b.lat]);
    });

    if (businesses.length > 1) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    } else if (businesses.length === 1) {
      map.flyTo({ center: [businesses[0].lng, businesses[0].lat], zoom: 12 });
    }
  }, [businesses]);

  return (
    <div
      ref={mapRef}
      className="h-full min-h-[300px] w-full rounded-lg border border-gray-200"
    />
  );
}

const BADGE_LABELS: Record<string, string> = {
  veteran_owned: "Veteran Owned",
  family_owned: "Family Owned",
  made_in_usa: "Made in USA",
  faith_friendly: "Faith Friendly",
  community_first: "Community First",
};

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
