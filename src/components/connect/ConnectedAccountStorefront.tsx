"use client";

import { useEffect, useMemo, useState } from "react";

type StripeStoreProduct = {
  id: string;
  name: string | null;
  description: string | null;
  default_price:
    | null
    | string
    | {
        id: string;
        unit_amount: number | null;
        currency: string;
      };
};

function formatMoney(amountInCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

export default function ConnectedAccountStorefront({ accountId }: { accountId: string }) {
  const [products, setProducts] = useState<StripeStoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const title = useMemo(() => `Connected Account Storefront: ${accountId}`, [accountId]);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/connect/storefront?accountId=${encodeURIComponent(accountId)}`);
        const data = (await res.json()) as {
          error?: string;
          products?: { data?: StripeStoreProduct[] };
        };

        if (!res.ok) {
          throw new Error(data.error ?? "Unable to load connected account products.");
        }

        if (isMounted) {
          setProducts(data.products?.data ?? []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load storefront.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [accountId]);

  async function startCheckout(productId: string) {
    setError("");
    try {
      const res = await fetch("/api/connect/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId,
          productId,
          quantity: 1,
        }),
      });

      const data = (await res.json()) as { error?: string; url?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }
      if (!data.url) {
        throw new Error("Stripe did not return checkout URL.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout.");
    }
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-brand">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">
        Demo storefront for a connected account. This route uses the account ID in the URL for simplicity.
      </p>
      <p className="mt-1 text-sm text-gray-600">
        {/* Use a stable business identifier instead of exposing account IDs in production URLs. */}
        In production, use a merchant slug or internal tenant ID instead of a raw account ID.
      </p>

      {loading ? <p className="mt-6 text-sm text-gray-600">Loading products...</p> : null}
      {!loading && products.length === 0 ? (
        <p className="mt-6 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          No active products found. Create one from /connect/dashboard first.
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {products.map((product) => {
          const defaultPrice =
            product.default_price && typeof product.default_price !== "string"
              ? product.default_price
              : null;

          return (
            <article key={product.id} className="rounded-lg border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-brand">{product.name ?? "Untitled product"}</h2>
              <p className="mt-1 text-sm text-gray-600">{product.description ?? "No description provided."}</p>
              <p className="mt-3 text-sm font-semibold text-gray-800">
                {defaultPrice?.unit_amount != null
                  ? formatMoney(defaultPrice.unit_amount, defaultPrice.currency)
                  : "Default price missing"}
              </p>
              <button
                className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
                type="button"
                onClick={() => startCheckout(product.id)}
                disabled={!defaultPrice}
              >
                Buy with Stripe Checkout
              </button>
            </article>
          );
        })}
      </div>

      {error ? <p className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
    </section>
  );
}
