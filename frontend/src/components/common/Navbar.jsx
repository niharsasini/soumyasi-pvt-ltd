"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Zap, Wind, Factory, ChevronDown, ArrowRight } from "lucide-react";
import { BRAND, NAV_LINKS, NAV_CTA } from "@/lib/config/site.config";

const SOLUTIONS = [
  {
    icon: Sun,
    title: "Solar Solutions",
    desc: "Rooftop & ground-mount solar for homes, businesses and industries.",
    href: "/solutions/solar-rooftop",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Zap,
    title: "EV Charging",
    desc: "60kW DC fast charging stations — site assessment, installation and support.",
    href: "/solutions/ev-charging",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Wind,
    title: "Wind Power",
    desc: "Coastal and inland wind energy for commercial and industrial use.",
    href: "/solutions/wind-power",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: Factory,
    title: "Industrial Power",
    desc: "Switchgear, substations and transformers for Odisha's industries.",
    href: "/solutions/industrial-power",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const HamburgerIcon = ({ open }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <motion.path
      initial={false}
      animate={{ d: open ? "M6 6 L18 18" : "M4 7 L20 7" }}
      transition={{ duration: 0.25 }}
    />
    <motion.path
      d="M4 12 L20 12"
      initial={false}
      animate={{ opacity: open ? 0 : 1 }}
      transition={{ duration: 0.15 }}
    />
    <motion.path
      initial={false}
      animate={{ d: open ? "M6 18 L18 6" : "M4 17 L20 17" }}
      transition={{ duration: 0.25 }}
    />
  </svg>
);

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const isActiveLink = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [megaOpen, setMegaOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const megaTimeout = useRef(null);
  const megaRef = useRef(null);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 20);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    fn();
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

  // Close mega menu on outside click / Escape / route change
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setMegaOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  useEffect(() => { setMegaOpen(false); setOpen(false); }, [pathname]);

  const openMega = () => { if (isTouchDevice) return; clearTimeout(megaTimeout.current); setMegaOpen(true); };
  const closeMega = () => { if (isTouchDevice) return; megaTimeout.current = setTimeout(() => setMegaOpen(false), 120); };

  // Touch devices have no hover, so tapping "Solutions" navigates directly.
  const handleSolutionsClick = () => {
    if (isTouchDevice) router.push("/solutions");
    else setMegaOpen((v) => !v);
  };

  const itemBase =
    "relative flex items-center gap-1 px-4 py-2 rounded-full cursor-pointer text-sm transition-all duration-200";

  const renderItemInner = (item, active, extra) => (
    <>
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-amber-500 shadow-sm"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1">
        {item.label}
        {extra}
      </span>
    </>
  );

  const itemClass = (active) =>
    `${itemBase} ${
      active
        ? "text-white font-semibold"
        : "text-[#78614a] font-medium hover:bg-[#FFF8E7] hover:text-[#1a1208]"
    }`;

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-amber-100 shadow-[0_2px_20px_rgba(120,80,20,0.08)]"
            : "bg-white/90 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        {/* Reading progress bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden pointer-events-none">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden">
            <Image src={BRAND.logo} alt={`${BRAND.name} logo`} fill className="object-contain" priority />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-[#1a1208]">{BRAND.shortName}</span>
            <span className="hidden sm:block text-[9px] font-semibold tracking-widest uppercase text-[#a8917a]">
              {BRAND.tagline}
            </span>
          </div>
        </Link>

        {/* ── Desktop pill nav + CTA ── */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-[#e8d5b0] rounded-full px-2 py-1.5 shadow-[0_4px_20px_rgba(120,80,20,0.08)]">
            {NAV_LINKS.map((item) => {
              const active = isActiveLink(item.href);

              if (item.label === "Solutions") {
                return (
                  // Not `relative`, so the mega menu positions against the fixed header.
                  <div key={item.label} ref={megaRef} onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <button
                      onClick={handleSolutionsClick}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      className={`${itemClass(active)} ${megaOpen && !active ? "bg-[#FFF8E7] !text-[#1a1208]" : ""}`}
                    >
                      {renderItemInner(
                        item,
                        active,
                        <motion.span
                          animate={{ rotate: megaOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex"
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      )}
                    </button>

                    <AnimatePresence>
                      {megaOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{ transformOrigin: "top" }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl border border-[#e8d5b0] shadow-[0_20px_60px_rgba(120,80,20,0.15)] p-6 w-[min(640px,92vw)]"
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {SOLUTIONS.map(({ icon: Icon, title, desc, href, iconBg, iconColor }) => (
                                <Link
                                  key={title}
                                  href={href}
                                  onClick={() => setMegaOpen(false)}
                                  className="group flex items-start gap-3 rounded-xl p-4 hover:bg-[#FFF8E7] transition cursor-pointer"
                                >
                                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${iconBg}`}>
                                    <Icon size={20} className={iconColor} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-[#1a1208] flex items-center gap-1">
                                      {title}
                                      <ArrowRight
                                        size={14}
                                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-amber-600"
                                      />
                                    </p>
                                    <p className="text-xs text-[#a8917a] mt-1 leading-relaxed">{desc}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-[#e8d5b0]/70 text-center">
                              <Link
                                href={item.href}
                                onClick={() => setMegaOpen(false)}
                                className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                              >
                                View all solutions →
                              </Link>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={itemClass(active)}>
                  {renderItemInner(item, active)}
                </Link>
              );
            })}
          </nav>

          <Link
            href={NAV_CTA.href}
            className="group relative overflow-hidden shrink-0 inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full px-5 py-2.5 text-sm hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[150%] transition-all duration-700"
            />
            <span className="relative">Get Free Quote</span>
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-1.5 text-[#1a1208]"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <HamburgerIcon open={open} />
        </button>
      </motion.header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#FFFBF0] flex flex-col pt-24 pb-10 px-6 overflow-y-auto"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              className="flex flex-col flex-1"
            >
              {NAV_LINKS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: 60 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block text-2xl font-bold py-4 border-b border-[#e8d5b0] transition-colors ${
                      isActiveLink(item.href) ? "text-amber-500" : "text-[#1a1208] hover:text-amber-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-8"
            >
              <Link
                href={NAV_CTA.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg shadow-lg shadow-amber-500/25"
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
