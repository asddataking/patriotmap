import type { FAQItem } from "@/lib/jsonld";

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Patriot Map?",
    answer:
      "Patriot Map is a community-driven directory of local businesses that have opted in to be listed. It helps you discover values-aligned businesses in your area.",
  },
  {
    question: "Who can be listed?",
    answer:
      "Any business can list themselves. Listings are self-identified and opt-in. Businesses choose their own tags (e.g., Veteran Owned, Family Owned) and provide their information.",
  },
  {
    question: "Does Patriot Map verify beliefs or politics?",
    answer:
      "No. Patriot Map does not assign beliefs or political affiliation to any listing. Businesses self-identify with optional tags. We do not verify or endorse any political views.",
  },
  {
    question: "How do I list my business?",
    answer:
      "Click 'List a business' and sign in. Fill out the form with your business details, address, and optional tags. Submissions are reviewed before appearing on the map.",
  },
  {
    question: "Is it free to list?",
    answer:
      "Yes. Listing your business on Patriot Map is free.",
  },
  {
    question: "How do featured businesses work?",
    answer:
      "Featured businesses are approved listings that appear on the homepage and map. All approved businesses can appear in search and on the map. The homepage shows a sample of recent or notable listings.",
  },
  {
    question: "Do you collect residential addresses or personal data?",
    answer:
      "No. Patriot Map does not collect residential addresses or personal data beyond what businesses voluntarily provide for their listing (business address, contact info). No residential data is collected.",
  },
  {
    question: "Can someone report a listing?",
    answer:
      "Yes. Users can report listings that appear to have incorrect information or violate our guidelines. Reports are reviewed and listings may be removed if appropriate.",
  },
  {
    question: "How do you prevent misuse?",
    answer:
      "Listings are opt-in and self-identified. We review submissions before publishing. Users can report problematic listings. We do not allow false claims or impersonation.",
  },
];

export const FAQ_BY_GROUP = {
  general: FAQ_ITEMS.slice(0, 3),
  businesses: FAQ_ITEMS.slice(3, 6),
  privacy: FAQ_ITEMS.slice(6, 9),
} as const;
