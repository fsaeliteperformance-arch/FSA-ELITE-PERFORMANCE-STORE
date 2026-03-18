/**
 * ProductCard — Server Component
 *
 * Performance notes
 * -----------------
 * • Rendered on the server so no JavaScript is shipped for the card itself.
 * • `next/image` automatically generates srcset for responsive images and
 *   serves avif/webp when the browser supports them.
 * • `sizes` tells the browser the rendered width at each breakpoint, letting
 *   it pick the smallest adequate image variant.
 */

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  /** Pass `priority` for above-the-fold images to trigger LCP preloading. */
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="group rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Image wrapper — fixed aspect ratio prevents layout shift (CLS = 0) */}
      <Link href={`/products/${product.slug}`} className="block aspect-square relative overflow-hidden bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
          {product.category} • {product.color}
        </span>
        <h3 className="font-bold text-brand mt-1 mb-2 leading-tight">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-brand">
            {formatPrice(product.price)}
          </span>
          {product.inStock && <AddToCartButton product={product} compact />}
        </div>
      </div>
    </article>
  );
}
