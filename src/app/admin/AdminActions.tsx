"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveBusiness, rejectBusiness } from "@/app/actions/admin";

export function AdminActions({ businessId }: { businessId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  const handleApprove = async () => {
    setLoading("approve");
    await approveBusiness(businessId);
    setLoading(null);
    router.refresh();
  };

  const handleReject = async () => {
    setLoading("reject");
    await rejectBusiness(businessId);
    setLoading(null);
    router.refresh();
  };

  return (
    <div className="flex shrink-0 gap-2">
      <button
        onClick={handleApprove}
        disabled={!!loading}
        className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading === "approve" ? "..." : "Approve"}
      </button>
      <button
        onClick={handleReject}
        disabled={!!loading}
        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading === "reject" ? "..." : "Reject"}
      </button>
    </div>
  );
}
