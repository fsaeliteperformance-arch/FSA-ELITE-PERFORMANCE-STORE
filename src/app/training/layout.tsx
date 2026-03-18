/**
 * Training layout — wraps every page served on training.fsaeliteperformance.com.
 *
 * Middleware rewrites requests arriving from the training domain so that the
 * root path ("/") becomes "/training" inside this Next.js app, and every
 * sub-path ("/foo") becomes "/training/foo".  This layout therefore owns the
 * full visual shell (header, footer) for those requests.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { STORE_URL, TRAINING_URL } from "@/lib/domains";

export const metadata: Metadata = {
  title: {
    template: "%s | FSA Elite Performance Training",
    default: "FSA Elite Performance Training",
  },
  description:
    "Elite sales training programs, coaching, and resources for FSA Elite Performance members.",
  metadataBase: new URL(TRAINING_URL),
  openGraph: {
    siteName: "FSA Elite Performance Training",
    type: "website",
  },
};

const CURRENT_YEAR = new Date().getFullYear();

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Training header — no cart; links to the store domain instead */}
      <header className="bg-brand text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-xl tracking-tight">
            FSA Elite Training
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <a
              href={STORE_URL}
              className="hover:text-brand-accent transition-colors"
            >
              Store →
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-brand text-white text-center py-6 text-sm mt-12">
        © {CURRENT_YEAR} FSA Elite Performance. All rights reserved.{" "}
        <a
          href={STORE_URL}
          className="underline hover:text-brand-accent transition-colors ml-2"
        >
          Visit the Store →
        </a>
      </footer>
    </>
  );
}
