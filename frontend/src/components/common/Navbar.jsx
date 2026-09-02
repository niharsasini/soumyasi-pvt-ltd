"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Zap, Wind, Factory, ChevronDown } from "lucide-react";
import { BRAND, NAV_LINKS, NAV_CTA } from "@/lib/config/site.config";

const MEGA_COLS = [
  {
    icon: Sun,
    title: "Solar Solutions",
    desc: "Rooftop & ground-mount solar for homes, businesses and industries.",
    href: "/solutions/solar-rooftop",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    titleHover: "group-hover:text-amber-600",
    linkColor: "text-amber-600",
  },
  {
    icon: Zap,
    title: "EV Charging",
    desc: "Install a 60kW DC fast charging station at your location — site assessment, installation, and support.",
    href: "/solutions/ev-charging",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    titleHover: "group-hover:text-emerald-600",
    linkColor: "text-emerald-600",
  },
  {
    icon: Wind,
    title: "Wind Power",
    desc: "Coastal and inland wind energy for commercial and industrial use.",
    href: "/solutions/wind-power",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    titleHover: "group-hover:text-sky-600",
    linkColor: "text-sky-600",
  },
  {
    icon: Factory,
    title: "Industrial Power",
    desc: "Switchgear, substations and transformers for Odisha's industries.",
    href: "/solutions/industrial-power",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    titleHover: "group-hover:text-orange-600",
    linkColor: "text-orange-600",
  },
];

const HamburgerIcon = ({ open }) => (
  <div className="relative w-[22px] h-[22px] flex items-center justify-center">
    <motion.span
      className="absolute h-0.5 w-[18px] rounded-full bg-current"
      animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    />
    <motion.span
      className="absolute h-0.5 w-[18px] rounded-full bg-current"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute h-0.5 w-[18px] rounded-full bg-current"
      animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
      transition={{ duration: 0.25 }}
    />
  </div>
);

export default function Navbar() {
  const router = useRouter();
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [megaOpen,  setMegaOpen]  = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const megaTimeout = useRef(null);

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
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const openMega  = () => { if (isTouchDevice) return; clearTimeout(megaTimeout.current); setMegaOpen(true); };
  const closeMega = () => { if (isTouchDevice) return; megaTimeout.current = setTimeout(() => setMegaOpen(false), 120); };

  // Touch/tablet devices without hover: tapping "Solutions" navigates directly
  // instead of relying on hover to reveal the mega dropdown.
  const handleSolutionsClick = () => {
    if (isTouchDevice) router.push("/solutions");
    else setMegaOpen((v) => !v);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 bg-[#FFFBF0]/95 backdrop-blur-xl ${
          scrolled ? "border-b border-[#e8d5b0]" : ""
        }`}
        style={scrolled ? { boxShadow: "0 4px 30px rgba(120,80,20,0.10)" } : {}}
      >
        {/* Reading progress bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
          {progress === 0 && (
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent, rgba(217,119,6,0.3), transparent)" }} />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative h-9 w-9 rounded-lg overflow-hidden shadow-sm">
              <Image src={BRAND.logo} alt={`${BRAND.name} logo`} fill className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-[15px] font-bold font-display text-[#1a1208] tracking-wide">
                {BRAND.shortName}
              </span>
              <span className="hidden sm:block text-[9px] font-semibold tracking-widest uppercase text-[#a8917a]">
                {BRAND.tagline}
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isSolutions = item.label === "Solutions";
              return isSolutions ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={handleSolutionsClick}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      megaOpen
                        ? "bg-amber-100 text-[#d97706] border border-amber-300 shadow-[0_4px_12px_rgba(217,119,6,0.2)]"
                        : "text-[#78614a] hover:bg-amber-50 hover:text-[#d97706] hover:border hover:border-amber-200 hover:shadow-[0_4px_12px_rgba(217,119,6,0.15)]"
                    }`}
                  >
                    {item.label}
                    <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={13} />
                    </motion.span>
                  </motion.button>

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scaleY: 0.97 }}
                        animate={{ opacity: 1, y: 0,  scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.97 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                        onMouseEnter={openMega}
                        onMouseLeave={closeMega}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(700px,95vw)] overflow-hidden bg-[#FFFBF0] border border-[#e8d5b0] rounded-2xl shadow-[0_20px_60px_rgba(120,80,20,0.15)]"
                      >
                        <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {MEGA_COLS.map(({ icon: Icon, title, desc, href, iconBg, iconColor, titleHover, linkColor }) => (
                            <Link
                              key={title}
                              href={href}
                              onClick={() => setMegaOpen(false)}
                              className="group flex flex-col gap-3 p-4 rounded-xl hover:bg-white hover:shadow-[0_4px_20px_rgba(120,80,20,0.08)] transition-all duration-200"
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                                <Icon size={20} className={iconColor} />
                              </div>
                              <div>
                                <p className={`text-sm font-bold text-[#1a1208] ${titleHover} transition-colors`}>{title}</p>
                                <p className="text-xs text-[#a8917a] mt-1 leading-relaxed">{desc}</p>
                              </div>
                              <span className={`text-xs font-semibold ${linkColor} flex items-center gap-1`}>
                                Explore →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div key={item.label}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-2 rounded-full text-sm font-medium text-[#78614a] hover:bg-amber-50 hover:text-[#d97706] hover:border hover:border-amber-200 hover:shadow-[0_4px_12px_rgba(217,119,6,0.15)] transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="hidden md:block shrink-0"
          >
            <Link
              href={NAV_CTA.href}
              className="btn-shimmer inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 border border-amber-400/50"
              style={{ boxShadow: "0 4px 20px rgba(217,119,6,0.35)" }}
            >
              Get Free Quote
            </Link>
          </motion.div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-1.5 text-[#1a1208]"
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#FFFBF0] flex flex-col pt-24 pb-10 px-8 overflow-y-auto"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col gap-3 flex-1"
            >
              {NAV_LINKS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden:  { opacity: 0, x: 60 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center px-5 py-4 rounded-2xl text-xl font-bold font-display text-[#78614a] border-b border-[#e8d5b0] hover:bg-amber-50 hover:text-[#d97706] hover:border-amber-200 hover:shadow-[0_4px_16px_rgba(217,119,6,0.12)] transition-all duration-200 active:scale-[0.98]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                href={NAV_CTA.href}
                onClick={() => setOpen(false)}
                className="btn-shimmer flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg"
                style={{ boxShadow: "0 4px 20px rgba(217,119,6,0.35)" }}
              >
                Get Free Quote
              </Link>
              <p className="text-center text-[#a8917a] text-xs tracking-widest uppercase mt-6">
                Soumyashi Power Limited
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
