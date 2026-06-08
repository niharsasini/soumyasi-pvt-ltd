"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className="flex flex-col items-center px-4 py-4 rounded-2xl bg-white border border-brand-border shadow-warm"
    >
      <span className="text-2xl sm:text-3xl font-bold font-display text-brand-gold tabular-nums">{n}{suffix}</span>
      <span className="text-[10px] text-brand-muted mt-1 text-center">{label}</span>
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
            <div className="grid grid-cols-3 gap-3 max-w-sm">
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

function SlideEV({ isActive }) {
  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: "#0d1117" }}>
      <Image src="/soumyasi/ev-charger-ultra60.png" alt="EV charging station" fill sizes="100vw" loading="lazy" className="object-cover object-center" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.75) 50%, rgba(16,185,129,0.15) 100%)" }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 text-center">
        <motion.span initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-[0.25em] uppercase mb-6">
          ⚡ EV Charging Network
        </motion.span>
        <HeadlineLines isActive={isActive} align="center" size="text-6xl sm:text-7xl lg:text-8xl mb-6" lines={[
          { text: "Charge Faster.", cls: "text-white" },
          { text: "Go Further.", cls: "bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent" },
        ]} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          60kW DC fast charging across Odisha. Our Ultra 60 Thunder Charge stations power your EV in under 30 minutes.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-wrap justify-center gap-3 mb-8">
          {["60kW Output", "Dual Connector", "CMVR Certified"].map((t) => (
            <span key={t} className="bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-white text-sm">{t}</span>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-wrap justify-center gap-4">
          <Link href="/solutions/ev-charging" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 transition-all duration-300">Find a Station</Link>
          <Link href="/solutions/ev-charging" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300">Learn More</Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, x: -40 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.9 }} className="hidden sm:flex absolute bottom-8 left-8 items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/20 border-l-4 border-l-emerald-400 rounded-2xl p-4 shadow-2xl max-w-xs">
        <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image src="/soumyasi/ev-charger-ultra60.png" alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Ultra 60 Thunder Charge</p>
          <p className="text-white/60 text-xs">60kW DC Fast Charger</p>
        </div>
      </motion.div>
    </section>
  );
}
/* ───────────────────── SLIDE 3 — SOLAR POWER ───────────────────── */

function SlideSolar({ isActive }) {
  return (
    <section className="relative w-full h-full flex items-stretch overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0a00 0%, #3d1f00 40%, #7c3d00 70%, #d97706 100%)" }}>
      <motion.div initial={{ x: -20, opacity: 0 }} animate={isActive ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.8, ease: EASE }} className="relative hidden lg:block w-[55%] h-full">
        <div className="relative h-full w-full rounded-r-3xl overflow-hidden">
          <Image src="/soumyasi/solar-field-odisha.png" alt="Solar field in Odisha" fill sizes="55vw" loading="lazy" className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(26,10,0,0.6) 100%)" }} />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="absolute top-24 right-8 z-20 bg-amber-400/20 backdrop-blur-xl border border-amber-400/40 rounded-2xl p-4 text-center">
        <p className="text-amber-200 font-bold text-2xl leading-none">500+</p>
        <p className="text-amber-200/80 text-xs mt-1">Installations in Odisha</p>
      </motion.div>
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 lg:px-12 pt-24 pr-16 sm:pr-20 py-16">
        <div className="w-full">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-amber-300 tracking-[0.3em] uppercase text-xs font-bold mb-5 text-right">☀️ Solar Energy</motion.p>
          <HeadlineLines isActive={isActive} align="right" size="text-5xl sm:text-6xl mb-6" lines={[
            { text: "Harvest the", cls: "text-white", from: "right" },
            { text: "Odisha Sun.", cls: "text-amber-300 italic", from: "right" },
          ]} />
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-md ml-auto text-right">
            Monocrystalline panels engineered for tropical conditions. Up to 90% reduction in electricity bills. 25-year performance warranty.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col items-end gap-2 mb-8">
            {["Up to 22% Efficiency", "25-Year Warranty", "MNRE Certified"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-white">
                {t}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-black text-xs">✓</span>
              </span>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-wrap gap-4 justify-end mt-8 pr-16">
            <Link href="/solutions/solar-rooftop" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-amber-400 text-black hover:scale-105 transition-all duration-300">Get Solar Quote</Link>
            <Link href="/projects" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-amber-400/60 text-amber-300 font-semibold text-sm hover:bg-amber-400/10 transition-all duration-300">See Installations</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
/* ───────────────────── SLIDE 4 — WIND POWER ───────────────────── */

function SlideWind({ isActive }) {
  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: "#030f1c" }}>
      <div className="absolute inset-0" style={{ clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
        <Image src="/soumyasi/wind-power-plant.png" alt="Wind turbines in Odisha" fill sizes="100vw" loading="lazy" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(3,15,28,0.95) 0%, rgba(3,15,28,0.88) 45%, rgba(3,15,28,0.5) 100%)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute h-1 w-1 rounded-full bg-sky-400/60 animate-float1" style={{ top: "22%", left: "8%" }} />
        <span className="absolute h-1 w-1 rounded-full bg-sky-400/60 animate-float2" style={{ top: "40%", left: "24%" }} />
        <span className="absolute h-1 w-1 rounded-full bg-sky-400/60 animate-float3" style={{ top: "64%", left: "13%" }} />
        <span className="absolute h-1 w-1 rounded-full bg-sky-400/60 animate-float4" style={{ top: "80%", left: "32%" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 h-full flex items-center">
        <div className="max-w-lg relative z-10 bg-[#030f1c]/60 backdrop-blur-sm rounded-2xl p-8">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-sky-400 tracking-[0.3em] uppercase text-xs font-bold mb-5">💨 Wind Power</motion.p>
          <HeadlineLines isActive={isActive} size="text-5xl sm:text-6xl mb-6" lines={[
            { text: "Ride the", cls: "text-sky-200", from: "left" },
            { text: "Odisha Wind.", cls: "text-white", from: "left" },
          ]} />
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="text-blue-200/80 text-base sm:text-lg leading-relaxed mb-8">
            Odisha&apos;s coastline offers some of India&apos;s best wind resources. We turn that natural advantage into reliable, large-scale clean energy.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col gap-3 mb-8 max-w-xs">
            {["50kW–2MW Capacity", "20+ Year Design Life", "OPTCL Grid Approved"].map((t) => (
              <div key={t} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="h-2 w-2 rounded-full bg-sky-400 flex-shrink-0" />
                <span className="text-white text-sm">{t}</span>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-wrap gap-4">
            <Link href="/solutions/wind-power" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-sky-500 text-white hover:scale-105 transition-all duration-300">Explore Wind Solutions</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-sky-400/50 text-sky-300 font-semibold text-sm hover:bg-sky-400/10 transition-all duration-300">Wind Assessment</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
/* ───────────────────── SLIDE 5 — INDUSTRIAL POWER ───────────────────── */

function SlideIndustrial({ isActive }) {
  return (
    <section className="relative w-full h-full overflow-hidden" style={{ background: "#0f0800" }}>
      <Image src="/soumyasi/industrial-power.png" alt="Industrial power infrastructure" fill sizes="100vw" loading="lazy" className="object-cover object-center" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,8,0,0.98) 0%, rgba(15,8,0,0.92) 35%, rgba(15,8,0,0.7) 60%, rgba(15,8,0,0.3) 85%, rgba(15,8,0,0.1) 100%)" }} />
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isActive ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="absolute top-20 right-8 flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/20 border-2 border-orange-500/40">
        <motion.span animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-orange-300 font-bold text-xs text-center leading-tight">SINCE<br />2014</motion.span>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-end">
          <div className="lg:col-span-3">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-orange-400 tracking-[0.3em] uppercase text-xs font-bold mb-5">🏭 Industrial Power Supply</motion.p>
            <HeadlineLines isActive={isActive} size="text-6xl sm:text-7xl mb-6" lines={[
              { text: "Zero Downtime.", cls: "text-white" },
              { text: "Total Control.", cls: "bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent" },
            ]} />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Complete electrical infrastructure for factories, plants, and commercial complexes across Odisha. From substations to smart switchgear.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-wrap gap-4">
              <Link href="/solutions/industrial-power" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-orange-500 text-white hover:scale-105 transition-all duration-300">Industrial Solutions</Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-orange-400/50 text-orange-300 font-semibold text-sm hover:bg-orange-400/10 transition-all duration-300">Get Assessment</Link>
            </motion.div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {["Up to 10 MVA", "11kV – 33kV", "IE Rules", "2yr Warranty"].map((t, i) => (
              <motion.div key={t} initial={{ opacity: 0, x: 30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className="bg-white/8 border border-white/15 rounded-xl p-4 text-center">
                <span className="text-white text-sm font-semibold">{t}</span>
              </motion.div>
            ))}
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => onDot(i)} aria-label={`Go to slide ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"}`} />
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
