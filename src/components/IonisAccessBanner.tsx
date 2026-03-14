"use client";

/**
 * IonisAccessBanner
 *
 * Displays the store URL in a read-only input so users can copy it
 * with one click when requesting access through Ionis.
 */

import { useState, useRef, useEffect } from "react";

const STORE_URL = "https://store.fsaeliteperformance.com";

export default function IonisAccessBanner() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(STORE_URL);
      setCopied(true);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select the input text so the user can copy manually
      const input = document.getElementById(
        "ionis-url-input",
      ) as HTMLInputElement | null;
      input?.select();
    }
  }

  return (
    <div className="mt-6 mx-auto max-w-2xl rounded-lg border border-brand/15 bg-brand/5 px-4 py-3 text-left text-sm text-gray-700">
      <p className="font-semibold text-brand">Need access through Ionis?</p>
      <p className="mt-1">
        Copy the URL below and paste it into Ionis when requesting access to
        the FSA Elite Performance Store.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <input
          id="ionis-url-input"
          type="text"
          readOnly
          value={STORE_URL}
          aria-label="Store URL for Ionis access request"
          className="flex-1 rounded border border-brand/20 bg-white px-3 py-1.5 font-mono text-xs sm:text-sm text-gray-800 select-all focus:outline-none focus:ring-2 focus:ring-brand/40"
          onFocus={(e) => e.currentTarget.select()}
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy store URL to clipboard"
          className="shrink-0 rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
