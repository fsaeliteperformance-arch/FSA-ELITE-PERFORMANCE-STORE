/**
 * Shared domain constants
 *
 * Both the store and training domains are served from the same Next.js app.
 * These helpers centralise the URL resolution so that a single change to an
 * environment variable (or a default) propagates everywhere automatically.
 *
 * NEXT_PUBLIC_SITE_URL     — public URL of the merchandise store
 * NEXT_PUBLIC_TRAINING_URL — public URL of the training portal
 */

/** Full origin URL of the FSA Elite merchandise store (no trailing slash). */
export const STORE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://store.fsaeliteperformance.com";

/** Full origin URL of the FSA Elite training portal (no trailing slash). */
export const TRAINING_URL =
  process.env.NEXT_PUBLIC_TRAINING_URL ??
  "https://training.fsaeliteperformance.com";
