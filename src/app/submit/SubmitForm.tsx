"use client";

import { useState } from "react";
import { createBusinessSubmission } from "@/app/actions/businesses";
import { geocodeAddress } from "@/app/actions/geocode";
import type { BusinessSubmissionInput } from "@/app/actions/businesses";
import { BADGE_OPTIONS } from "@/db/schema";

const CATEGORIES = [
  "Restaurant",
  "Retail",
  "Service",
  "Healthcare",
  "Automotive",
  "Other",
];

const BADGE_LABELS: Record<string, string> = {
  veteran_owned: "Veteran Owned",
  family_owned: "Family Owned",
  made_in_usa: "Made in USA",
  faith_friendly: "Faith Friendly",
  community_first: "Community First",
};

const initialForm: BusinessSubmissionInput = {
  name: "",
  category: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  lat: 0,
  lng: 0,
  phone: "",
  website: "",
  description: "",
  badges: [],
};

export function SubmitForm() {
  const [form, setForm] = useState<BusinessSubmissionInput>(initialForm);
  const [loading, setLoading] = useState(false);
  const [geocodeLoading, setGeocodeLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const update = (updates: Partial<BusinessSubmissionInput>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleGeocode = async () => {
    const addr = [form.address1, form.city, form.state, form.zip]
      .filter(Boolean)
      .join(", ");
    if (!addr.trim()) {
      setMessage({ type: "error", text: "Enter address fields first" });
      return;
    }
    setGeocodeLoading(true);
    setMessage(null);
    const result = await geocodeAddress(addr);
    if (result.success && result.results.length > 0) {
      const r = result.results[0];
      update({
        lat: r.lat,
        lng: r.lng,
        address1: r.address1 ?? form.address1,
        city: r.city ?? form.city,
        state: r.state ?? form.state,
        zip: r.zip ?? form.zip,
      });
      setMessage({ type: "success", text: "Address looked up. You can edit lat/lng if needed." });
    } else {
      setMessage({
        type: "error",
        text: result.success ? "No results found" : result.error,
      });
    }
    setGeocodeLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const result = await createBusinessSubmission(form);
    if (result.success) {
      setMessage({
        type: "success",
        text: "Business submitted! It will be reviewed before appearing on the map.",
      });
      setForm(initialForm);
    } else {
      setMessage({ type: "error", text: result.error ?? "Failed" });
    }
    setLoading(false);
  };

  const toggleBadge = (badge: string) => {
    const next = form.badges?.includes(badge)
      ? (form.badges ?? []).filter((b) => b !== badge)
      : [...(form.badges ?? []), badge];
    update({ badges: next });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {message && (
        <p
          className={
            message.type === "success"
              ? "rounded bg-green-50 p-3 text-sm text-green-800"
              : "rounded bg-red-50 p-3 text-sm text-red-800"
          }
        >
          {message.text}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Name *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update({ name: e.target.value })}
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          value={form.category}
          onChange={(e) => update({ category: e.target.value })}
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="">Select...</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address 1 *
        </label>
        <input
          type="text"
          value={form.address1}
          onChange={(e) => update({ address1: e.target.value })}
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address 2
        </label>
        <input
          type="text"
          value={form.address2 ?? ""}
          onChange={(e) =>
            update({ address2: e.target.value || undefined })
          }
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">City *</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update({ city: e.target.value })}
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State (2-letter) *
          </label>
          <input
            type="text"
            value={form.state}
            onChange={(e) =>
              update({ state: e.target.value.toUpperCase().slice(0, 2) })
            }
            required
            maxLength={2}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ZIP *</label>
          <input
            type="text"
            value={form.zip}
            onChange={(e) => update({ zip: e.target.value })}
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Lat / Lng *
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              step="any"
              value={form.lat || ""}
              onChange={(e) =>
                update({ lat: parseFloat(e.target.value) || 0 })
              }
              required
              placeholder="Latitude"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            <input
              type="number"
              step="any"
              value={form.lng || ""}
              onChange={(e) =>
                update({ lng: parseFloat(e.target.value) || 0 })
              }
              required
              placeholder="Longitude"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleGeocode}
          disabled={geocodeLoading}
          className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {geocodeLoading ? "Looking up..." : "Address → Lookup"}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={form.phone ?? ""}
          onChange={(e) => update({ phone: e.target.value || undefined })}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          value={form.website ?? ""}
          onChange={(e) =>
            update({
              website: e.target.value || undefined,
            })
          }
          placeholder="https://"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description (max 500 chars)
        </label>
        <textarea
          value={form.description ?? ""}
          onChange={(e) =>
            update({
              description: e.target.value.slice(0, 500) || undefined,
            })
          }
          rows={4}
          maxLength={500}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Badges</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {BADGE_OPTIONS.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-1">
              <input
                type="checkbox"
                checked={(form.badges ?? []).includes(b)}
                onChange={() => toggleBadge(b)}
                className="rounded"
              />
              {BADGE_LABELS[b]}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
