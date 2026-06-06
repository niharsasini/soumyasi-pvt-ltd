"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg text-brand-ink px-4 text-center">
      <div className="max-w-md">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">Something Went Wrong</p>
        <h1 className="text-4xl font-bold font-display text-brand-ink mb-4">Unexpected Error</h1>
        <p className="text-brand-brown text-base mb-8">
          We&apos;re sorry — something went wrong on our end. Please try again or go back to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-full border border-brand-border text-brand-ink font-semibold text-sm hover:border-amber-400 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
