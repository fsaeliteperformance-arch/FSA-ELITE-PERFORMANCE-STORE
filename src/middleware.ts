/**
 * Next.js Edge Middleware — multi-domain routing
 *
 * This single Next.js app is deployed behind two public hostnames:
 *   • store.fsaeliteperformance.com  — the FSA Elite merchandise store
 *   • training.fsaeliteperformance.com — the FSA Elite training portal
 *
 * How it works
 * ------------
 * Requests arriving from the training domain are transparently rewritten so
 * that the URL path is prefixed with "/training" before Next.js routing runs.
 * The visitor's browser still shows the training domain URL with no prefix.
 *
 *   training.fsaeliteperformance.com/           → rewritten to /training
 *   training.fsaeliteperformance.com/about      → rewritten to /training/about
 *
 * Requests from the store domain (or any other hostname) pass through without
 * modification and are served by the (store) route group at the normal paths.
 *
 * Environment variables
 * ---------------------
 * NEXT_PUBLIC_TRAINING_URL — Full URL of the training domain
 *   (e.g. https://training.fsaeliteperformance.com). Used to derive the
 *   hostname to match against. Defaults to the production hostname when unset.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Resolve the training hostname once at module load time.
 * We strip the port so that local dev (e.g. localhost:3001) still works when
 * NEXT_PUBLIC_TRAINING_URL is set to http://localhost:3001.
 */
const TRAINING_HOSTNAME = (() => {
  const raw = process.env.NEXT_PUBLIC_TRAINING_URL;
  if (raw) {
    try {
      return new URL(raw).hostname;
    } catch {
      // Malformed URL — fall through to the production default.
    }
  }
  return "training.fsaeliteperformance.com";
})();

export function middleware(request: NextRequest): NextResponse {
  // Strip the port from the Host header for comparison.
  const host = (request.headers.get("host") ?? "").split(":")[0];
  const { pathname } = request.nextUrl;

  if (host === TRAINING_HOSTNAME) {
    // Already routed inside /training — no rewrite needed (prevents loops).
    if (pathname.startsWith("/training")) {
      return NextResponse.next();
    }

    // Rewrite to the /training prefix so the training route group handles it.
    const url = request.nextUrl.clone();
    url.pathname = `/training${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Store domain or any other hostname — pass through as-is.
  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals and static assets so that
  // API routes and image optimisation are unaffected by domain rewriting.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
