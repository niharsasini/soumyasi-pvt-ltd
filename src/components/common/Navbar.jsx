"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS, NAV_CTA } from "@/lib/config/site.config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#0f172a]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        {/* Top cyan glow border on scroll */}
        <div
          className={`absolute top-0 inset-x-0 h-[1px] transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(to right, transparent, rgba(34,211,238,0.6), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10">
              <Image
                src={BRAND.logo}
                alt={BRAND.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base font-bold tracking-wide text-white font-display">
                {BRAND.shortName}
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-cyan-400">
                {BRAND.tagline}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <Link
            href={NAV_CTA.href}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-[#0f172a] bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105"
          >
            {NAV_CTA.label}
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0f172a]/96 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
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
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl sm:text-3xl font-semibold font-display text-white hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.05, ease: "easeOut" } },
                }}
              >
                <Link
                  href={NAV_CTA.href}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center mt-4 px-10 py-3.5 rounded-full bg-cyan-400 text-[#0f172a] font-bold text-lg hover:bg-cyan-300 transition-all"
                >
                  {NAV_CTA.label}
                </Link>
              </motion.div>
            </motion.nav>

            {/* Bottom brand */}
            <div className="absolute bottom-8 text-gray-600 text-xs tracking-widest uppercase">
              Soumyashree Power Limited
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
