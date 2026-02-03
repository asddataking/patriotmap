"use server";

export type GeocodeResult = {
  lat: number;
  lng: number;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export async function geocodeAddress(
  address: string
): Promise<{ success: true; results: GeocodeResult[] } | { success: false; error: string }> {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    return { success: false, error: "Geocoding not configured" };
  }

  const trimmed = address.trim();
  if (!trimmed) {
    return { success: false, error: "Address is required" };
  }

  try {
    const url = new URL("https://api.mapbox.com/search/geocode/v6/forward");
    url.searchParams.set("q", trimmed);
    url.searchParams.set("access_token", token);
    url.searchParams.set("country", "us");
    url.searchParams.set("types", "address");
    url.searchParams.set("limit", "5");

    const res = await fetch(url.toString());
    if (!res.ok) {
      const text = await res.text();
      return { success: false, error: `Geocoding failed: ${res.status}` };
    }

    const data = (await res.json()) as {
      features?: Array<{
        geometry?: { coordinates?: [number, number] };
        properties?: {
          context?: {
            address?: { name?: string };
            place?: { name?: string };
            region?: { region_code?: string; name?: string };
            postcode?: { name?: string };
          };
        };
      }>;
    };

    const features = data.features ?? [];
    const results: GeocodeResult[] = features.map((f) => {
      const coords = f.geometry?.coordinates ?? [0, 0];
      const ctx = f.properties?.context ?? {};
      return {
        lng: coords[0],
        lat: coords[1],
        address1: ctx.address?.name ?? undefined,
        city: ctx.place?.name ?? undefined,
        state: ctx.region?.region_code ?? ctx.region?.name ?? undefined,
        zip: ctx.postcode?.name ?? undefined,
      };
    });

    return { success: true, results };
  } catch (err) {
    console.error("geocodeAddress error:", err);
    return { success: false, error: "Geocoding failed" };
  }
}
