"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export function Header() {
  const session = authClient.useSession();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-gray-900">
          Patriot Map
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/explore" className="text-sm text-gray-600 hover:text-gray-900">
            Explore
          </Link>
          <Link href="/submit" className="text-sm text-gray-600 hover:text-gray-900">
            List a business
          </Link>
          <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          {session.isPending ? (
            <span className="text-sm text-gray-400">...</span>
          ) : session.data ? (
            <>
              <Link href="/account" className="text-sm text-gray-600 hover:text-gray-900">
                Account
              </Link>
              <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </>
          ) : (
            <Link href="/auth/magic-link" className="text-sm text-gray-600 hover:text-gray-900">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
