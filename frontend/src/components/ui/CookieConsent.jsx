"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) setVisible(true);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie-consent", "accepted"); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem("cookie-consent", "declined"); } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-0 inset-x-0 z-[60] bg-[#1a1208]/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 sm:px-6 sm:py-4"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-[#c4b8a8] text-center sm:text-left leading-relaxed">
              We use cookies to improve your experience. By continuing, you agree to our{" "}
              <Link href="/privacy-policy" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors">
                Privacy Policy
              </Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="px-5 py-2 rounded-full border border-white/20 text-[#c4b8a8] text-sm font-medium hover:border-white/40 hover:text-white transition-all duration-200"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="btn-shimmer px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-gold hover:scale-105 transition-all duration-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
