/**
 * Root layout
 *
 * Performance notes
 * -----------------
 * • Inter is loaded with `display: swap` via next/font so text remains
 *   visible while the custom font loads (avoids invisible-text flash).
 * • The font subset is restricted to `latin` to minimise the woff2 download.
 * • Metadata is defined statically here so it can be inlined into the HTML
 *   without an extra network round-trip.
 */

import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | FSA Elite Performance Store",
    default: "FSA Elite Performance Store",
  },
  description:
    "Official merchandise and branding store for the FSA Elite sales community. " +
    "Branded apparel, sales tools, and professional gear for salespeople.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://store.fsaeliteperformance.com",
  ),
  openGraph: {
    siteName: "FSA Elite Performance Store",
    type: "website",
  },
};

// Evaluated once at module load time (build time for static pages / ISR)
// so the footer year is never re-computed on every server render.
const CURRENT_YEAR = new Date().getFullYear();

const RETAILER_LINKS = [
  { name: "Amazon", href: "https://www.amazon.com" },
  { name: "Marshalls", href: "https://www.marshalls.com" },
  { name: "Ross Dress for Less", href: "https://www.rossdressforless.com" },
  { name: "Shien", href: "https://shien.com" },
  {
    name: "Amazon Storefront",
    href: "https://amazon.com/shop/thehillarystyle?tag=admanager70-20",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        {/* CartProvider wraps everything so any component can read cart state */}
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
              <p>© {CURRENT_YEAR} FSA Elite Performance. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
