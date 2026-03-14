/**
 * Dynamic XML sitemap — generated at build time (and refreshed via ISR).
 *
 * Includes the home page, the products listing, and every individual product
 * detail page.  AI agents and search crawlers use this to discover all URLs
 * without having to follow every internal link.
 */

import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://store.fsaeliteperformance.com";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productEntries,
  ];
}
