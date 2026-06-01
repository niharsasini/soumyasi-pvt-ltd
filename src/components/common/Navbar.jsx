"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS, NAV_CTA } from "@/lib/config/site.config";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FFFBF0] shadow-[0_2px_20px_rgba(120,80,20,0.1)] border-b border-brand-border"
            : "bg-[#FFFBF0]/95 backdrop-blur-xl"
        }`}
      >
        {/* Reading progress bar / accent line at very top */}
        <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {progress === 0 && (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent, rgba(217,119,6,0.35), transparent)" }}
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-md overflow-hidden">
              <Image
                src={BRAND.logo}
                alt={`${BRAND.name} logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base font-bold font-display text-brand-ink tracking-wide">
                {BRAND.shortName}
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-brand-gold">
                {BRAND.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative group text-sm font-medium text-brand-brown hover:text-brand-ink transition-colors duration-300"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-brand-gold"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href={NAV_CTA.href}
            className="btn-shimmer hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_4px_15px_rgba(217,119,6,0.3)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.45)] hover:scale-105 transition-all duration-300"
          >
            Get Free Quote
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-brand-ink"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen cream overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FFFBF0] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-brand-brown hover:text-brand-ink p-2"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="flex flex-col items-center gap-8"
            >
              {NAV_LINKS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden:  { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl sm:text-3xl font-bold font-display text-brand-brown hover:text-brand-gold transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden:  { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.05 } },
                }}
              >
                <Link
                  href={NAV_CTA.href}
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg shadow-gold"
                >
                  Get Free Quote
                </Link>
              </motion.div>
            </motion.nav>

            <div className="absolute bottom-8 text-brand-muted text-xs tracking-widest uppercase">
              Soumyashree Power Limited
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
