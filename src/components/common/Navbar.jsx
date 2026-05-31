"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS, NAV_CTA } from "@/lib/config/site.config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
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
            ? "bg-brand-bg/90 backdrop-blur-xl border-b border-brand-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Scroll top-border glow */}
        {scrolled && (
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: "linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)",
            }}
          />
        )}

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
              <span className="text-sm sm:text-base font-bold font-display text-white tracking-wide">
                {BRAND.shortName}
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-amber-400">
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
                className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href={NAV_CTA.href}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-600 hover:shadow-gold transition-all duration-300 hover:scale-105"
          >
            Get Free Quote
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-bg/96 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2"
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
                    hidden:   { opacity: 0, y: 24 },
                    visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl sm:text-3xl font-bold font-display text-white hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden:   { opacity: 0, y: 24 },
                  visible:  { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.05 } },
                }}
              >
                <Link
                  href={NAV_CTA.href}
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-lg"
                >
                  Get Free Quote
                </Link>
              </motion.div>
            </motion.nav>

            <div className="absolute bottom-8 text-gray-700 text-xs tracking-widest uppercase">
              Soumyashree Power Limited
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
