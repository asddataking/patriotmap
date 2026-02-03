import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import {
  listPendingBusinesses,
  approveBusiness,
  rejectBusiness,
  listReports,
} from "@/app/actions/admin";
import { AdminActions } from "./AdminActions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/magic-link");
  }
  if (!isAdmin(session.user.email ?? "")) {
    redirect("/");
  }

  const [pending, reports] = await Promise.all([
    listPendingBusinesses(),
    listReports(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
      <p className="mt-1 text-gray-600">Moderation panel</p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Pending businesses ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-2 text-gray-500">No pending submissions.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {pending.map((b) => (
              <div
                key={b.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{b.name}</h3>
                    <p className="text-sm text-gray-600">
                      {b.category} • {b.city}, {b.state}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {b.address1}, {b.city}, {b.state} {b.zip}
                    </p>
                    {b.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {b.description}
                      </p>
                    )}
                  </div>
                  <AdminActions businessId={b.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">
          Reports ({reports.length})
        </h2>
        {reports.length === 0 ? (
          <p className="mt-2 text-gray-500">No reports.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {reports.map((r) => (
              <div
                key={r.report.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/business/${r.businessId}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {r.businessName}
                    </Link>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      Reason: {r.report.reason}
                    </p>
                    {r.report.details && (
                      <p className="mt-1 text-sm text-gray-600">
                        {r.report.details}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(r.report.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
