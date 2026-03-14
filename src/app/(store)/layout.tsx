/**
 * Store layout — wraps every page served on store.fsaeliteperformance.com.
 *
 * Middleware rewrites requests arriving from the store domain to these routes,
 * while requests from training.fsaeliteperformance.com are rewritten to
 * /training/* and handled by app/training/layout.tsx instead.
 */

import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import { TRAINING_URL, STORE_URL } from "@/lib/domains";

export const metadata: Metadata = {
  title: {
    template: "%s | FSA Elite Performance Store",
    default: "FSA Elite Performance Store",
  },
  description:
    "Official merchandise and branding store for the FSA Elite sales community. " +
    "Branded apparel, sales tools, and professional gear for salespeople.",
  metadataBase: new URL(STORE_URL),
  openGraph: {
    siteName: "FSA Elite Performance Store",
    type: "website",
  },
};

// Evaluated once at module load time so the year is never recomputed on each render.
const CURRENT_YEAR = new Date().getFullYear();

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="bg-brand text-white text-center py-6 text-sm mt-12">
        © {CURRENT_YEAR} FSA Elite Performance. All rights reserved.{" "}
        <a
          href={TRAINING_URL}
          className="underline hover:text-brand-accent transition-colors ml-2"
        >
          Training Portal →
        </a>
      </footer>
    </CartProvider>
  );
}
