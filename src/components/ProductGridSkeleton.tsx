/**
 * ProductGridSkeleton — loading placeholder
 *
 * Shown inside a Suspense boundary while the product data is being fetched.
 * Using a skeleton (instead of a spinner) reduces Cumulative Layout Shift
 * because the skeleton matches the dimensions of the real cards.
 */

interface Props {
  count: number;
}

export default function ProductGridSkeleton({ count }: Props) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading products</span>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div aria-hidden="true" className="aspect-square bg-gray-200" />
            <div className="p-4 space-y-2">
              <div aria-hidden="true" className="h-3 bg-gray-200 rounded w-1/4" />
              <div aria-hidden="true" className="h-5 bg-gray-200 rounded w-3/4" />
              <div aria-hidden="true" className="h-5 bg-gray-200 rounded w-1/3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
