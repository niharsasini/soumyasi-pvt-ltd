"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Battery, ShieldCheck, Check, Wind, Factory } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94];

const SLIDE_MS = 6000;

const STATS = [
  { value: 500, suffix: "+", label: "Installations" },
  { value: 50, suffix: "+", label: "EV Stations" },
  { value: 15, suffix: "+", label: "Cities" },
];

function useCountUp(to, active) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    const start = performance.now();
    const dur = 2000;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
      else setN(to);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return n;
}

function StatBadge({ value, suffix, label, active, i }) {
  const n = useCountUp(value, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.12 }}
      className="flex flex-col items-center px-2 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white border border-brand-border shadow-warm"
    >
      <span className="text-lg sm:text-xl font-bold font-display text-brand-gold tabular-nums">{n}{suffix}</span>
      <span className="text-[9px] sm:text-[10px] text-brand-muted mt-1 text-center">{label}</span>
    </motion.div>
  );
}

function Word({ children, i, isActive, from = "bottom", className = "" }) {
  const initial = from === "left" ? { opacity: 0, x: -40 } : from === "right" ? { opacity: 0, x: 40 } : { opacity: 0, y: 30 };
  return (
    <motion.span
      className={`inline-block mr-[0.28em] ${className}`}
      initial={initial}
      animate={isActive ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

function HeadlineLines({ lines, isActive, size, align = "left" }) {
  let idx = 0;
  const alignCls = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
  return (
    <h1 className={`font-bold font-display leading-[1.05] tracking-tight ${alignCls} ${size}`}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.text.split(" ").map((w) => {
            const i = idx++;
            return (
              <Word key={i} i={i} isActive={isActive} from={line.from || "bottom"} className={line.cls}>
                {w}
              </Word>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
/* ───────────────────── SLIDE 1 — MAIN BRAND HERO ───────────────────── */

function SlideMain({ isActive }) {
  const [statsOn, setStatsOn] = useState(false);
  useEffect(() => {
    if (!isActive) { setStatsOn(false); return; }
    const t = setTimeout(() => setStatsOn(true), 900);
    return () => clearTimeout(t);
  }, [isActive]);
  return (
    <section className="relative w-full h-full flex items-center bg-brand-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(245,158,11,0.05), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(217,119,6,0.04), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[5%] h-80 w-80 rounded-full bg-amber-400/8 blur-3xl" />
        <motion.div animate={{ x: [0, -25, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-[20%] right-[10%] h-64 w-64 rounded-full bg-amber-300/6 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-brand-gold">Odisha&apos;s Energy Future</span>
            </motion.div>
            <HeadlineLines isActive={isActive} size="text-4xl sm:text-5xl md:text-6xl mb-6" lines={[
              { text: "Powering Industry.", cls: "text-brand-ink" },
              { text: "Enabling Clean", cls: "text-brand-ink" },
              { text: "Energy.", cls: "bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent" },
            ]} />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }} className="text-base sm:text-lg text-brand-brown leading-relaxed mb-8 max-w-lg">
              Solar installations, EV charging networks, and industrial power — built for Odisha, engineered to last.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.62 }} className="flex flex-wrap gap-4 mb-10">
              <Link href="/solutions" className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300">Explore Solutions</Link>
              <Link href="/projects" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 hover:border-amber-500 transition-all duration-300">Our Projects</Link>
            </motion.div>
            <div className="grid grid-cols-3 gap-1.5 max-w-sm">
              {STATS.map((s, i) => <StatBadge key={s.label} {...s} active={statsOn} i={i} />)}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.3 }} className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/10 blur-xl pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border border-amber-200/60 animate-float" style={{ boxShadow: "0 30px 80px rgba(217,119,6,0.18)" }}>
              <video src="/video/3738727067-preview.mp4" autoPlay muted loop playsInline preload="none" className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
/* ───────────────────── SLIDE 2 — EV CHARGING ───────────────────── */

const EV_SPECS = [
  { Icon: Zap, text: "60kW DC Output" },
  { Icon: Battery, text: "Dual CCS2 + CHAdeMO" },
  { Icon: ShieldCheck, text: "CMVR Certified" },
];

function SlideEV({ isActive }) {
  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative order-2 lg:order-1 h-auto lg:h-full bg-[#0a0f1a] flex flex-col px-8 sm:px-12 py-10 lg:py-20">
          <div className="flex-1 flex flex-col justify-center">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex self-start items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-4 py-2 text-emerald-400 text-xs font-bold tracking-widest mb-5">
              ⚡ EV CHARGING NETWORK
            </motion.span>
            <HeadlineLines isActive={isActive} size="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4" lines={[
              { text: "Charge", cls: "text-white" },
              { text: "Faster.", cls: "text-white" },
              { text: "Go Further.", cls: "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent" },
            ]} />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-white/60 text-base leading-relaxed max-w-sm">
              60kW DC fast charging at locations across Odisha. Our Ultra 60 Thunder Charge powers most EVs in under 30 minutes.
            </motion.p>
            <div className="mt-8 space-y-3">
              {EV_SPECS.map(({ Icon, text }, i) => (
                <motion.div key={text} initial={{ opacity: 0, x: -30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20"><Icon className="h-4 w-4 text-emerald-400" /></span>
                  <span className="text-white text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.85 }} className="flex flex-wrap gap-4 mt-10">
              <Link href="/solutions/ev-charging" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25">Find a Station</Link>
              <Link href="/solutions/ev-charging" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/10 transition-all duration-300">Learn More</Link>
            </motion.div>
          </div>
          <p className="hidden lg:block text-white/30 text-xs">Part of Odisha&apos;s growing EV infrastructure</p>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative order-1 lg:order-2 h-48 lg:h-full">
          <Image src="/soumyasi/ev-charger-ultra60.png" alt="EV charging station" fill sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="object-cover object-center" />
        </motion.div>
      </div>
    </section>
  );
}
/* ───────────────────── SLIDE 3 — SOLAR POWER ───────────────────── */

const SOLAR_CHECKS = ["Up to 22% Efficiency", "25-Year Warranty", "MNRE Certified"];

function SlideSolar({ isActive }) {
  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      <Image src="/soumyasi/solar-field-odisha.png" alt="Solar field in Odisha" fill sizes="100vw" loading="lazy" className="object-cover object-top" />

      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={isActive ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 90, damping: 16 }}
        className="absolute left-4 right-4 bottom-20 sm:left-8 sm:right-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-[384px] md:left-16 lg:left-24 max-w-sm max-h-[70vh] overflow-y-auto bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-8 border border-white/60"
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
      >
        <span className="inline-flex items-center bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-xs font-bold mb-4">☀️ SOLAR ENERGY</span>
        <HeadlineLines isActive={isActive} size="text-4xl font-black" lines={[
          { text: "Harvest the", cls: "text-[#1a1208]", from: "left" },
          { text: "Odisha Sun.", cls: "text-amber-600", from: "left" },
        ]} />
        <span className="block w-12 h-1 bg-amber-400 rounded-full my-4" />
        <p className="text-[#78614a] text-sm leading-relaxed">Monocrystalline panels engineered for tropical conditions. Up to 90% reduction in electricity bills.</p>
        <div className="mt-4 space-y-2">
          {SOLAR_CHECKS.map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400"><Check className="h-3 w-3 text-white" /></span>
              <span className="text-[#1a1208] text-sm font-medium">{t}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/solutions/solar-rooftop" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30 hover:scale-105 transition">Get Solar Quote</Link>
          <Link href="/projects" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-amber-600 border border-amber-200 hover:bg-amber-50 transition">Learn More</Link>
        </div>
      </motion.div>

      <motion.div initial={{ y: -20, opacity: 0 }} animate={isActive ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="hidden sm:block absolute right-8 top-28 bg-amber-400/90 backdrop-blur rounded-2xl p-4 shadow-xl text-center">
        <p className="text-white font-black text-2xl">500+</p>
        <p className="text-white/80 text-xs">Installations</p>
      </motion.div>
    </section>
  );
}
/* ───────────────────── SLIDE 4 — WIND POWER ───────────────────── */

const WIND_PILLS = ["50kW–2MW", "20yr Life", "OPTCL Approved"];

function SlideWind({ isActive }) {
  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      <Image src="/soumyasi/wind-power-plant.png" alt="Wind turbines in Odisha" fill sizes="100vw" loading="lazy" className="object-cover object-center" />

      <motion.div initial={{ y: -20, opacity: 0 }} animate={isActive ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="hidden sm:block absolute top-24 right-8 bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-xl">
        <Wind className="h-8 w-8 text-sky-500 mb-2" />
        <p className="text-[#1a1208] font-bold text-sm">Wind Energy</p>
        <p className="text-[#78614a] text-xs">Odisha Coast</p>
      </motion.div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={isActive ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="absolute bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-xl border-t border-white/60 px-4 py-5 sm:px-8 sm:py-8 lg:px-16 xl:px-24 pb-16 sm:pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
        <div>
          <p className="text-sky-600 text-xs font-bold tracking-widest uppercase mb-2">💨 Wind Power</p>
          <HeadlineLines isActive={isActive} size="text-3xl sm:text-4xl font-black" lines={[{ text: "Ride the Odisha Wind.", cls: "text-[#1a1208]", from: "left" }]} />
          <div className="lg:hidden mt-3">
            <Link href="/solutions/wind-power" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-400 transition">Explore Wind</Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          {WIND_PILLS.map((t) => (
            <span key={t} className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-full px-4 py-2">
              <Wind className="h-4 w-4 text-sky-500" />
              <span className="text-[#1a1208] text-sm">{t}</span>
            </span>
          ))}
        </div>
        <div className="hidden lg:block max-w-xs">
          <p className="text-[#78614a] text-sm mb-3">Odisha&apos;s coastline offers some of India&apos;s best wind resources for clean energy generation.</p>
          <Link href="/solutions/wind-power" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-400 transition">Explore Wind</Link>
        </div>
      </motion.div>
    </section>
  );
}
/* ───────────────────── SLIDE 5 — INDUSTRIAL POWER ───────────────────── */

const INDUSTRIAL_SPECS = [
  { value: "10 MVA", label: "Up to" },
  { value: "33kV", label: "Up to" },
  { value: "IE Rules", label: "Certified" },
  { value: "2yr", label: "Warranty" },
];

function SlideIndustrial({ isActive }) {
  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative h-52 sm:h-64 lg:h-full">
          <Image src="/soumyasi/industrial-power.png" alt="Industrial power infrastructure" fill sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="object-cover object-center" />
        </motion.div>

        <div className="relative overflow-hidden bg-[#FFF8E7] flex flex-col justify-center px-8 sm:px-10 py-10 lg:py-20">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-orange-100 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-amber-100 pointer-events-none" />

          <div className="relative z-10">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 text-orange-700 text-xs font-bold tracking-widest">
              <Factory className="h-3.5 w-3.5" /> INDUSTRIAL POWER
            </motion.span>

            <HeadlineLines isActive={isActive} size="text-5xl lg:text-6xl font-black leading-none mt-4" lines={[
              { text: "Zero", cls: "text-[#1a1208]" },
              { text: "Downtime.", cls: "text-[#1a1208]" },
              { text: "Total Control.", cls: "text-orange-500" },
            ]} />

            <span className="block w-16 h-1.5 bg-orange-400 rounded-full my-6" />

            <p className="text-[#78614a] text-base leading-relaxed max-w-xs">Complete electrical infrastructure for factories and commercial complexes. From substations to smart switchgear — zero downtime guaranteed.</p>

            <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm">
              {INDUSTRIAL_SPECS.map((s, i) => (
                <motion.div key={s.value} initial={{ opacity: 0, scale: 0.9 }} animate={isActive ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }} className="bg-white rounded-2xl p-4 border border-[#e8d5b0]" style={{ boxShadow: "0 2px 8px rgba(120,80,20,0.06)" }}>
                  <p className="text-orange-500 font-black text-xl">{s.value}</p>
                  <p className="text-[#78614a] text-xs font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/solutions/industrial-power" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 hover:scale-105 transition">Industrial Solutions</Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-orange-600 border-2 border-orange-200 hover:bg-orange-50 transition">Get Assessment</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ───────────────────── CAROUSEL CHROME ───────────────────── */

function CarouselChrome({ current, total, onPrev, onNext, onDot }) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-white/20">
        <motion.div key={current} className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />
      </div>
      <div className="absolute top-6 right-6 z-30 text-white/60 text-sm font-mono">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onPrev} aria-label="Previous slide" className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors">
        <ChevronLeft size={22} />
      </motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onNext} aria-label="Next slide" className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors">
        <ChevronRight size={22} />
      </motion.button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => onDot(i)} aria-label={`Go to slide ${i + 1}`} className="p-2 group">
            <span className={`block h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40 group-hover:bg-white/60"}`} />
          </button>
        ))}
      </div>
    </>
  );
}
/* ───────────────────── HERO CAROUSEL ───────────────────── */

const SLIDES = [SlideMain, SlideEV, SlideSolar, SlideWind, SlideIndustrial];

const slideVariants = {
  enter: { opacity: 0, scale: 1.02 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: EASE } },
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const goTo = useCallback((i) => setCurrentSlide(((i % SLIDES.length) + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const prev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => setCurrentSlide((c) => (c + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [isAutoPlaying, currentSlide]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);
  useEffect(() => {
    const onVis = () => setIsAutoPlaying(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  const onTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const onTouchMove = (e) => { touchEnd.current = e.targetTouches[0].clientX; };
  const onTouchEnd = () => {
    if (touchStart.current == null || touchEnd.current == null) return;
    const delta = touchStart.current - touchEnd.current;
    if (Math.abs(delta) > 50) (delta > 0 ? next() : prev());
    touchStart.current = null;
    touchEnd.current = null;
  };
  const Slide = SLIDES[currentSlide];
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div key={currentSlide} variants={slideVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0">
          <Slide isActive />
        </motion.div>
      </AnimatePresence>
      <CarouselChrome current={currentSlide} total={SLIDES.length} onPrev={prev} onNext={next} onDot={goTo} />
    </section>
  );
}
