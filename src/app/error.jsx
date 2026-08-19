"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Amber blur orbs — matches not-found.jsx */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] h-80 w-80 rounded-full bg-amber-400/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[15%] right-[8%] h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[50%] right-[30%] h-48 w-48 rounded-full bg-amber-500/15 blur-2xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex justify-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-gold-lg">
            <AlertTriangle size={36} className="text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Something Went Wrong
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink mb-4 leading-tight">
            Unexpected Error
          </h1>
          <p className="text-brand-brown text-lg leading-relaxed mb-10">
            We&apos;re sorry — something went wrong on our end. Try again, or head back to the home page.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] hover:scale-105 transition-all duration-300"
            >
              <RefreshCw size={15} /> Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300"
            >
              <Home size={15} /> Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
