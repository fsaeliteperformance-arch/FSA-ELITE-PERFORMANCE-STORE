/**
 * Root layout
 *
 * Performance notes
 * -----------------
 * • Inter is loaded with `display: swap` via next/font so text remains
 *   visible while the custom font loads (avoids invisible-text flash).
 * • The font is self-hosted by Next.js — no extra DNS lookup to
 *   fonts.googleapis.com at runtime, which improves FCP and eliminates a
 *   cross-origin render-blocking resource.
 * • The font subset is restricted to `latin` to minimise the woff2 download.
 * • Metadata is defined statically here so it can be inlined into the HTML
 *   without an extra network round-trip.
 */

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

// Self-host Inter via Next.js font optimisation.  The woff2 file is committed
// to public/fonts/ so the build is fully self-contained — no DNS lookup to
// fonts.googleapis.com is required.
const inter = localFont({
  src: "../../public/fonts/inter-variable.woff2",
  variable: "--font-inter",
  display: "swap",
  // Inter Variable supports weights 100–900 in a single file.
  weight: "100 900",
});

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
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        {/* CartProvider wraps everything so any component can read cart state */}
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="bg-brand text-white text-center py-6 text-sm mt-12">
            © {new Date().getFullYear()} FSA Elite Performance. All rights
            reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
