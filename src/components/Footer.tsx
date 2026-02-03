import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-900">
              Transparency & Privacy
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Listings are self-identified and opt-in. Patriot Map does not
              assign beliefs or political affiliation. No residential data is
              collected.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Links</h3>
            <nav className="mt-2 flex flex-wrap gap-4 text-sm">
              <Link href="/explore" className="text-gray-600 hover:text-gray-900">
                Explore
              </Link>
              <Link href="/submit" className="text-gray-600 hover:text-gray-900">
                List a business
              </Link>
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
              <Link href="/auth/magic-link" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {currentYear} Patriot Map. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
