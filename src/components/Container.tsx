/**
 * Container — layout primitive
 *
 * Provides the consistent page-level max-width + horizontal padding used
 * across every page.  Accepts an optional `maxWidth` to switch between the
 * widths used in the app and an optional `className` for per-page tweaks
 * (e.g. `text-center`, extra vertical padding).
 */

import type { ReactNode } from "react";

type MaxWidth = "lg" | "2xl" | "5xl" | "7xl";
type PaddingY = "py-8" | "py-12" | "py-16" | "py-24";

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
  lg: "max-w-lg",
  "2xl": "max-w-2xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
};

interface ContainerProps {
  children: ReactNode;
  maxWidth?: MaxWidth;
  /** Tailwind vertical padding class. Defaults to "py-12". */
  paddingY?: PaddingY;
  className?: string;
}

export default function Container({
  children,
  maxWidth = "7xl",
  paddingY = "py-12",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`${MAX_WIDTH_CLASS[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 ${paddingY} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
