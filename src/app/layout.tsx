/**
 * Root layout — minimal HTML shell shared by both domains.
 *
 * Domain-specific layouts (store vs. training) live in their respective
 * route groups: app/(store)/layout.tsx and app/training/layout.tsx.
 * Each adds its own <Metadata>, header, footer, and providers so the two
 * domains can evolve independently from a single Next.js codebase.
 */

import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
