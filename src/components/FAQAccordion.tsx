"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/jsonld";

export function FAQAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FAQItem[];
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            {item.question}
            <span
              className={`ml-2 shrink-0 text-gray-500 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 pt-0 text-sm text-gray-600">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
