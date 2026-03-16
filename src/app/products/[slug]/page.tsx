/**
 * /products/[slug] — Static Product Detail Page
 *
 * Performance notes
 * -----------------
 * • `generateStaticParams` pre-renders every product page at build time so
 *   the HTML is served from the CDN edge without hitting the origin server.
 * • `revalidate = 3600` triggers ISR so stale pages are regenerated in the
 *   background at most once per hour when traffic arrives.
 * • The page returns a 404 immediately if the slug is unknown, avoiding wasted
 *   dynamic rendering for bad URLs.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllProductSlugs, getProductBySlug, formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/types";

// ISR — regenerate the page at most once per hour after the first visit post-build.
export const revalidate = 3600;

interface Params {
  slug: string;
}

/** Pre-render all known product slugs at build time. */
export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.imageUrl }],
    },
  };
}

/** Builds a Schema.org Product JSON-LD object for a given product. */
function buildProductJsonLd(product: Product) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://store.fsaeliteperformance.com";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${baseUrl}/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Short-circuit: return 404 for unknown slugs rather than rendering a broken page.
  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD structured data for AI agents and search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductJsonLd(product)),
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Product details */}
        <div className="flex flex-col justify-center gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold text-brand">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <p className="text-3xl font-bold text-brand">
            {formatPrice(product.price)}
          </p>

          {product.inStock ? (
            <AddToCartButton product={product} />
          ) : (
            <p className="text-red-500 font-semibold">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
