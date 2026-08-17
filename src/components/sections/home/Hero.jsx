"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Battery, ShieldCheck, Check, Wind, Factory, MapPin, Sun, ArrowRight, PhoneCall, ChevronDown, Star } from "lucide-react";
import { STATS as SITE_STATS } from "@/lib/config/stats.config";
import { CONTACT } from "@/lib/config/site.config";

const EASE = [0.25, 0.46, 0.45, 0.94];

const SLIDE_MS = 6000;

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

const HEADLINE_LINES = [
  { text: "Powering", cls: "text-[#1a1208]" },
  { text: "Industry.", cls: "text-[#1a1208]" },
  { text: "Enabling", cls: "text-[#1a1208]" },
  { text: "Clean Energy.", cls: "bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent" },
];

const FEATURE_PILLS = [
  { Icon: Sun, iconCls: "text-amber-600", label: "Solar Energy" },
  { Icon: Zap, iconCls: "text-emerald-600", label: "EV Charging" },
  { Icon: Factory, iconCls: "text-orange-600", label: "Industrial Power" },
];

function MainStatCard({ Icon, value, label, i, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
      className="bg-white rounded-2xl p-3 sm:p-4 border border-[#e8d5b0] shadow-[0_4px_16px_rgba(120,80,20,0.06)] text-center hover:border-amber-300 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mx-auto mb-2">
        <Icon className="w-4 h-4 text-amber-600" />
      </div>
      <p className="font-black text-xl sm:text-2xl text-[#1a1208]">{value}+</p>
      <p className="text-[#a8917a] text-[10px] sm:text-xs mt-0.5">{label}</p>
    </motion.div>
  );
}

function SlideMain({ isActive }) {
  const [showMobileVideo, setShowMobileVideo] = useState(false);

  const mainStats = [
    { Icon: Sun, value: SITE_STATS.installations, label: "Solar Installs" },
    { Icon: Zap, value: SITE_STATS.evStations, label: "EV Stations" },
    { Icon: MapPin, value: SITE_STATS.cities, label: "Cities Served" },
  ];

  return (
    <section className="relative w-full h-[90vh] min-h-[550px] overflow-hidden bg-[#FFFBF0]">
      {/* Background decorative elements */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(252,211,133,0.3), transparent 70%)" }}
      />
      <div className="absolute bottom-0 -left-16 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #d97706 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #d97706 0px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Main content grid */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — content */}
          <div>
            {/* 1. Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0 }}
              className="inline-flex items-center gap-2.5 bg-white border border-[#e8d5b0] rounded-full px-4 py-2 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-[#78614a] text-xs font-semibold">Odisha&apos;s Leading Energy Company</span>
              <span className="w-px h-3 bg-[#e8d5b0]" />
              <span className="text-[#a8917a] text-xs">Est. Bhubaneswar</span>
            </motion.div>

            {/* 2. Main headline */}
            <h1 className="font-display font-black leading-[1.1] mt-5 text-3xl sm:text-4xl lg:text-6xl">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={line.text}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                  className={`block ${line.cls}`}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            {/* 3. Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 text-[#78614a] text-base sm:text-lg leading-relaxed max-w-lg"
            >
              Solar installations, EV charging networks, wind power, and industrial electrical infrastructure — built for Odisha, engineered to last decades.
            </motion.p>

            {/* 4. Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {FEATURE_PILLS.map(({ Icon, iconCls, label }) => (
                <span
                  key={label}
                  className="bg-white border border-[#e8d5b0] rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs text-[#78614a] font-medium shadow-sm"
                >
                  <Icon className={`w-3.5 h-3.5 ${iconCls}`} />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* 5. CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/solutions"
                className="btn-shimmer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full px-8 py-3.5 text-sm sm:text-base shadow-[0_8px_30px_rgba(217,119,6,0.35)] hover:shadow-[0_12px_40px_rgba(217,119,6,0.5)] hover:scale-105 transition-all duration-300"
              >
                Explore Our Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#e8d5b0] text-[#1a1208] font-semibold rounded-full px-8 py-3.5 text-sm sm:text-base hover:border-amber-400 hover:bg-amber-50 transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4 text-amber-600" />
                Call Us Now
              </a>
            </motion.div>

            {/* 6. Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
              {mainStats.map((s, i) => (
                <MainStatCard key={s.label} {...s} i={i} isActive={isActive} />
              ))}
            </div>

            {/* Mobile-only: watch story */}
            <div className="lg:hidden mt-4 text-center">
              <button
                onClick={() => setShowMobileVideo((v) => !v)}
                className="inline-flex items-center gap-1.5 text-amber-600 text-xs font-semibold"
              >
                ▶ Watch our story
              </button>
              {showMobileVideo && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-amber-200/60 shadow-lg">
                  <video
                    src="/video/3738727067-preview.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — video + social proof */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-[520px] mx-auto">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200/40 to-emerald-200/30 blur-xl -z-10 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="relative rounded-[1.5rem] overflow-hidden border border-amber-200/60 shadow-[0_30px_80px_rgba(120,80,20,0.2)] aspect-video"
              >
                <video
                  src="/video/3738727067-preview.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#FFFBF0]/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating card 1 — active now */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl p-3.5 shadow-xl border border-[#e8d5b0] flex items-center gap-3 min-w-[160px]"
              >
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[#a8917a] text-[10px]">Active Right Now</p>
                  <p className="text-[#1a1208] font-bold text-sm">{SITE_STATS.evStations}+ EV Stations</p>
                </div>
              </motion.div>

              {/* Floating card 3 — years badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 bg-amber-500 rounded-xl p-3 shadow-lg text-center"
              >
                <p className="text-white font-black text-lg leading-none">{SITE_STATS.yearsExperience}+</p>
                <p className="text-amber-100 text-[10px]">Years</p>
              </motion.div>

              {/* Floating card 2 — satisfaction */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3.5 shadow-xl border border-[#e8d5b0] min-w-[180px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#78614a] text-[10px]">Client Satisfaction</p>
                  <p className="font-black text-sm text-amber-600">{SITE_STATS.satisfaction}%</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#a8917a] text-[10px] mt-1">Based on {SITE_STATS.installations}+ projects</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce"
      >
        <ChevronDown className="w-5 h-5 text-[#a8917a]" />
        <span className="text-[#a8917a] text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>
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
    <section className="relative w-full h-[90vh] min-h-[550px] overflow-hidden pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative order-2 lg:order-1 h-auto lg:h-full bg-[#0a0f1a] flex flex-col px-8 sm:px-12 pt-28 pb-16 lg:pt-20 lg:pb-20">
          <div className="flex-1 flex flex-col justify-center">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex self-start items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-4 py-2 text-emerald-400 text-xs font-bold tracking-widest mb-5">
              ⚡ EV CHARGING NETWORK
            </motion.span>
            <HeadlineLines isActive={isActive} size="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black mb-4" lines={[
              { text: "Charge", cls: "text-white" },
              { text: "Faster.", cls: "text-white" },
              { text: "Go Further.", cls: "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent" },
            ]} />
            <motion.p initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="text-white/60 text-base leading-relaxed max-w-sm">
              60kW DC fast charging at locations across Odisha. Our Ultra 60 Thunder Charge powers most EVs in under 30 minutes.
            </motion.p>
            <div className="mt-8 space-y-3">
              {EV_SPECS.map(({ Icon, text }, i) => (
                <motion.div key={text} initial={{ opacity: 0, x: -30 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className={`items-center gap-3 ${i === 2 ? "hidden sm:flex" : "flex"}`}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20"><Icon className="h-4 w-4 text-emerald-400" /></span>
                  <span className="text-white text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.85 }} className="flex flex-col gap-2 w-full sm:flex-row sm:flex-wrap sm:gap-4 sm:w-auto mt-10">
              <Link href="/solutions/ev-charging" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25 w-full text-center sm:w-auto">Find a Station</Link>
              <Link href="/solutions/ev-charging" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/10 transition-all duration-300 w-full text-center sm:w-auto">Learn More</Link>
            </motion.div>
          </div>
          <p className="hidden sm:block text-white/30 text-xs">Part of Odisha&apos;s growing EV infrastructure</p>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative order-1 lg:order-2 h-52 sm:h-64 lg:h-full">
          <Image src="/soumyasi/ev-charger-ultra60.png" alt="EV charging station" fill sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="object-cover object-center" />
        </motion.div>
      </div>
    </section>
  );
}
/* ───────────────────── SLIDE 3 — SOLAR POWER ───────────────────── */

function SlideSolar({ isActive }) {
  return (
    <div className="relative w-full h-[90vh] min-h-[550px] overflow-hidden">

      {/* Full bleed image — NO overlay */}
      <Image
        src="/soumyasi/solar-field-odisha.png"
        alt="Soumyashi Power solar installation at sunrise"
        fill
        className="object-cover object-center"
        priority={false}
        sizes="100vw"
      />

      {/* Floating compact card — desktop: right center (clear of the logo sign, bottom-left of image), mobile: bottom sheet */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute z-20 bottom-6 left-3 right-3 max-h-[50vh] overflow-y-auto lg:bottom-auto lg:left-auto lg:max-h-none lg:overflow-visible lg:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:w-[320px]"
      >
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-white/80 p-6">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 mb-3">
            <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">☀️ SOLAR ENERGY</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-[#1a1208] text-2xl leading-tight mb-0.5">
            {isActive && (
              <motion.span
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block"
              >
                Harvest the
              </motion.span>
            )}
          </h2>
          <h2 className="font-display font-black text-amber-600 text-2xl leading-tight mb-3">
            {isActive && (
              <motion.span
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block"
              >
                Odisha Sun.
              </motion.span>
            )}
          </h2>

          {/* Amber divider */}
          <div className="w-8 h-1 bg-amber-400 rounded-full mb-3" />

          {/* Description — short */}
          <p className="text-[#78614a] text-xs leading-relaxed mb-4 line-clamp-2">
            Monocrystalline panels built for Odisha&apos;s climate. Cut bills by up to 90%. 25-year warranty.
          </p>

          {/* 3 check items — compact */}
          <ul className="space-y-1.5 mb-5">
            {[
              "Up to 22% Efficiency",
              "25-Year Performance Warranty",
              "MNRE India Certified",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[#1a1208] text-xs font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTAs — side by side, compact */}
          <div className="flex gap-2">
            <Link
              href="/solutions/solar-rooftop"
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full py-2.5 text-xs font-bold text-center hover:scale-105 transition shadow-md shadow-amber-500/20"
            >
              Get Solar Quote
            </Link>
            <Link
              href="/solutions/solar-rooftop"
              className="flex-1 border border-amber-300 text-amber-700 rounded-full py-2.5 text-xs font-medium text-center hover:bg-amber-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats badge — top right, desktop only */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7 }}
        className="hidden sm:block absolute top-24 right-8 z-20"
      >
        <div className="bg-amber-500/90 backdrop-blur-xl rounded-xl p-3 text-center shadow-lg border border-amber-400/50">
          <p className="text-white font-black text-xl leading-none">500+</p>
          <p className="text-amber-100 text-[10px] font-medium mt-0.5">Installations</p>
        </div>
      </motion.div>

    </div>
  );
}
/* ───────────────────── SLIDE 4 — WIND POWER ───────────────────── */

const WIND_PILLS = ["50kW–2MW", "20yr Life", "OPTCL Approved"];

function SlideWind({ isActive }) {
  return (
    <section className="relative w-full h-[90vh] min-h-[550px] overflow-hidden pt-20">
      <Image src="/soumyasi/wind-power-plant.png" alt="Wind turbines in Odisha" fill sizes="100vw" loading="lazy" className="object-cover object-center" />

      <motion.div initial={{ y: -20, opacity: 0 }} animate={isActive ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="hidden sm:block absolute top-24 right-8 bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-xl">
        <Wind className="h-8 w-8 text-sky-500 mb-2" />
        <p className="text-[#1a1208] font-bold text-sm">Wind Energy</p>
        <p className="text-[#78614a] text-xs">Odisha Coast</p>
      </motion.div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={isActive ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 lg:bg-white/85 backdrop-blur-xl border-t border-white/60 px-6 pt-3 pb-10 sm:px-8 sm:py-8 lg:px-16 xl:px-24 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
        <div>
          <p className="text-sky-600 text-xs font-bold tracking-widest uppercase mb-2">💨 Wind Power</p>
          <HeadlineLines isActive={isActive} size="text-xl sm:text-2xl font-black" lines={[{ text: "Ride the Odisha Wind.", cls: "text-[#1a1208]", from: "left" }]} />
          <div className="lg:hidden mt-3">
            <Link href="/solutions/wind-power" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-400 transition w-full sm:w-auto">Explore Wind</Link>
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
    <section className="relative w-full h-[90vh] min-h-[550px] overflow-hidden pt-20">
      <div className="relative w-full h-full flex flex-col lg:grid lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex-none h-[45vw] min-h-[180px] max-h-[220px] lg:h-full lg:max-h-none order-1 lg:order-none">
          <Image src="/soumyasi/industrial-power.png" alt="Industrial power infrastructure" fill sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="object-cover object-center" />
        </motion.div>

        <div className="relative flex-1 bg-[#FFF8E7] overflow-y-auto order-2 lg:order-none px-6 py-5 lg:px-10 lg:py-0 lg:flex lg:flex-col lg:justify-center">
          <div className="hidden lg:block absolute -top-16 -right-16 h-64 w-64 rounded-full bg-orange-100 pointer-events-none" />
          <div className="hidden lg:block absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-amber-100 pointer-events-none" />

          <div className="relative z-10">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 text-orange-700 text-xs font-bold tracking-widest">
              <Factory className="h-3.5 w-3.5" /> INDUSTRIAL POWER
            </motion.span>

            <HeadlineLines isActive={isActive} size="text-3xl sm:text-4xl lg:text-5xl font-black leading-none mt-4" lines={[
              { text: "Zero Downtime.", cls: "text-[#1a1208]" },
              { text: "Total Control.", cls: "text-orange-500" },
            ]} />

            <span className="block w-16 h-1.5 bg-orange-400 rounded-full my-6" />

            <p className="text-[#78614a] text-base leading-relaxed max-w-xs">Complete electrical infrastructure for factories and commercial complexes. From substations to smart switchgear — zero downtime guaranteed.</p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-8 max-w-sm">
              {INDUSTRIAL_SPECS.map((s, i) => (
                <motion.div key={s.value} initial={{ opacity: 0, scale: 0.9 }} animate={isActive ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }} className="bg-white rounded-2xl p-3 sm:p-4 border border-[#e8d5b0]" style={{ boxShadow: "0 2px 8px rgba(120,80,20,0.06)" }}>
                  <p className="text-orange-500 font-black text-lg sm:text-xl">{s.value}</p>
                  <p className="text-[#78614a] text-xs font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3 mt-8">
              <Link href="/solutions/industrial-power" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 hover:scale-105 transition w-full text-center sm:w-auto">Industrial Solutions</Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-orange-600 border-2 border-orange-200 hover:bg-orange-50 transition w-full text-center sm:w-auto">Get Assessment</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ───────────────────── CAROUSEL CHROME ───────────────────── */

function CarouselChrome({ current, total, onPrev, onNext, onDot, isPlaying }) {
  return (
    <>
      <div className="absolute top-[64px] sm:top-0 left-0 right-0 z-50 h-1 bg-white/20">
        <motion.div key={current} className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: isPlaying ? SLIDE_MS / 1000 : 0, ease: "linear" }} />
      </div>
      <div className="hidden sm:block absolute top-6 right-6 z-30 text-white/60 text-sm font-mono">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onPrev} aria-label="Previous slide" className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition cursor-pointer text-white">
        <ChevronLeft size={22} />
      </motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onNext} aria-label="Next slide" className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition cursor-pointer text-white">
        <ChevronRight size={22} />
      </motion.button>
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => onDot(i)} aria-label={`Go to slide ${i + 1}`} className="p-1.5 sm:p-2 group">
            <span className={`block h-2 rounded-full transition-all duration-300 ${i === current ? "w-5 sm:w-8 bg-white" : "w-2 bg-white/40 group-hover:bg-white/60"}`} />
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
      className="relative w-full h-[90vh] min-h-[550px] overflow-hidden"
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
      <CarouselChrome current={currentSlide} total={SLIDES.length} onPrev={prev} onNext={next} onDot={goTo} isPlaying={isAutoPlaying} />
    </section>
  );
}
