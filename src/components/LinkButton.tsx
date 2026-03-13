/**
 * LinkButton — a Next.js Link styled as a primary CTA button.
 *
 * Used wherever a navigation link needs the same pill-button appearance as
 * an action button (e.g. "Shop Now" and "Continue Shopping").  Keeps the
 * brand-button style from diverging across pages.
 */

import Link from "next/link";
import type { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function LinkButton({ href, children, className = "" }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
