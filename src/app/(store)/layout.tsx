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
    images: [{ url: "/opengraph-image" }],
  },
};


const RETAILER_LINKS = [
  { name: "Amazon", href: "https://www.amazon.com" },
  { name: "Marshalls", href: "https://www.marshalls.com" },
  { name: "Ross Dress for Less", href: "https://www.rossdressforless.com" },
  { name: "Shein", href: "https://shein.com" },
  {
    name: "Amazon Storefront",
    href: "https://amazon.com/shop/thehillarystyle?tag=admanager70-20",
  },
];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div>
            <p className="font-semibold text-white">Shop our favorite retailers</p>
            <nav aria-label="Retailer links">
              <ul className="mt-2 flex flex-wrap justify-center gap-4 text-white/90">
                {RETAILER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="hover:text-brand-accent transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p>
            © {CURRENT_YEAR} FSA Elite Performance. All rights reserved.{" "}
            <a
              href={TRAINING_URL}
              className="underline hover:text-brand-accent transition-colors ml-2"
            >
              Training Portal →
            </a>
          </p>
        </div>
      </footer>
    </CartProvider>
  );
}
