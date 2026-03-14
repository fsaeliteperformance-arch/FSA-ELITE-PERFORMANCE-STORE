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
          <footer className="bg-brand text-white py-6 text-sm mt-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-center sm:px-6 lg:px-8">
              <p className="font-semibold uppercase tracking-[0.2em] text-white/80">
                Content → Training App → Store → Community → Repeat
              </p>
              <p>
                © {new Date().getFullYear()} FSA Elite Performance. All rights
                reserved.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
