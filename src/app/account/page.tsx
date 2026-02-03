import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { listFavorites } from "@/app/actions/favorites";
import { db } from "@/lib/db";
import { businesses } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { BusinessCard } from "@/components/BusinessCard";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/magic-link");
  }

  const [favoritesList, myBusinesses] = await Promise.all([
    listFavorites(),
    db
      .select()
      .from(businesses)
      .where(eq(businesses.createdBy, session.user.id))
      .orderBy(desc(businesses.createdAt)),
  ]);

  const pending = myBusinesses.filter((b) => b.status === "pending");
  const approved = myBusinesses.filter((b) => b.status === "approved");
  const rejected = myBusinesses.filter((b) => b.status === "rejected");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Account</h1>
      <p className="mt-1 text-gray-600">
        {session.user.email}
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
        {favoritesList.length === 0 ? (
          <p className="mt-2 text-gray-500">No favorites yet.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {favoritesList.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">My Submissions</h2>

        {pending.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-amber-700">Pending</h3>
            <div className="mt-2 space-y-2">
              {pending.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded border border-amber-200 bg-amber-50 p-3"
                >
                  <div>
                    <Link
                      href={`/business/${b.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {b.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {b.city}, {b.state}
                    </p>
                  </div>
                  <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-medium text-amber-800">
                    Pending review
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {approved.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-green-700">Approved</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {approved.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          </div>
        )}

        {rejected.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-red-700">Rejected</h3>
            <div className="mt-2 space-y-2">
              {rejected.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded border border-red-200 bg-red-50 p-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{b.name}</p>
                    <p className="text-sm text-gray-500">
                      {b.city}, {b.state}
                    </p>
                  </div>
                  <span className="rounded bg-red-200 px-2 py-0.5 text-xs font-medium text-red-800">
                    Rejected
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {myBusinesses.length === 0 && (
          <p className="mt-2 text-gray-500">No submissions yet.</p>
        )}
      </section>
    </div>
  );
}
