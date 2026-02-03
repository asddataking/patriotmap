import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SubmitForm } from "./SubmitForm";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "List a business",
  description: "Add your business to Patriot Map. Free, opt-in listings for values-aligned businesses.",
  alternates: { canonical: `${site.siteUrl}/submit` },
};

export default async function SubmitPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/magic-link");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Suggest a business</h1>
      <p className="mt-2 text-gray-600">
        Submissions are reviewed before appearing on the map. They will not be
        published immediately.
      </p>
      <SubmitForm />
    </div>
  );
}
