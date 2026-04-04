/**
 * Shared runtime constants for the FSA Elite Performance Store.
 *
 * Environment variables are read here so they are defined in one place
 * and the rest of the application can import them without repeating the
 * fallback logic.
 */

/** URL of the FSA Elite Sales Training platform, used for cross-app links. */
export const TRAINING_URL =
  process.env.NEXT_PUBLIC_TRAINING_URL ??
  "https://training.fsaeliteperformance.com";
