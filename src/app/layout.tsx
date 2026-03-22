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
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | FSA Elite Performance Store",
    default: "FSA Elite Performance Store",
  },
  description:
    "Official merchandise and brand-input store for the FSA Elite sales community by " +
    "Fontenot's Sales Association LLC. Pressure-tested gear, messaging, and tools for serious salespeople.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fsaeliteperformance.com",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "FSA Elite Performance Store",
    type: "website",
  },
};

// Evaluated once at module load time (build time for static pages / ISR)
// so the footer year is never re-computed on every server render.
const CURRENT_YEAR = new Date().getFullYear();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand focus:shadow-md"
        >
          Skip to main content
        </a>
        {/* CartProvider wraps everything so any component can read cart state */}
        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <footer className="bg-brand text-white text-center py-6 text-sm mt-12">
            © {CURRENT_YEAR} FSA Elite Performance by Fontenot&apos;s Sales
            Association LLC. All rights reserved.
          </footer>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
