"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sun, Zap, Wind, Factory,
  TrendingDown, TrendingUp, Shield, Leaf,
  Users, Award, BarChart3, Wrench, ShieldCheck, Cpu, FileCheck,
  ChevronDown, Star, ArrowRight,
  DollarSign, Clock, Settings, Headphones, Check,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { VARIANTS } from "@/lib/animations/variants";
import dynamic from 'next/dynamic'

const SolarPanelViewer = dynamic(
  () => import('@/components/three/SolarPanelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] sm:h-[420px] lg:h-[450px] rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-amber-600 text-sm">Loading 3D viewer...</p>
        </div>
      </div>
    )
  }
)

const ICON_MAP = {
  Sun, Zap, Wind, Factory,
  TrendingDown, TrendingUp, Shield, Leaf,
  Users, Award, BarChart3, Wrench, ShieldCheck, Cpu, FileCheck,
  DollarSign, Clock, Settings, Headphones,
};

const ACCENT = {
  amber: {
    pill:        "bg-amber-100 text-amber-700",
    border:      "border-amber-400",
    gradient:    "from-amber-500 to-amber-600",
    icon:        "text-amber-600",
    iconBg:      "bg-amber-50 group-hover:bg-amber-100",
    orb:         "bg-amber-400/25",
    spec:        "bg-amber-50",
    ctaText:     "text-amber-700",
    hoverBorder: "#fbbf24",
    hoverShadow: "0 12px 40px rgba(217,119,6,0.18)",
    glowOrb:     "rgba(251,191,36,0.15)",
    lineColor:   "#fde68a",
  },
  emerald: {
    pill:        "bg-emerald-100 text-emerald-700",
    border:      "border-emerald-400",
    gradient:    "from-emerald-500 to-emerald-600",
    icon:        "text-emerald-600",
    iconBg:      "bg-emerald-50 group-hover:bg-emerald-100",
    orb:         "bg-emerald-400/25",
    spec:        "bg-emerald-50",
    ctaText:     "text-emerald-700",
    hoverBorder: "#34d399",
    hoverShadow: "0 12px 40px rgba(16,185,129,0.18)",
    glowOrb:     "rgba(52,211,153,0.15)",
    lineColor:   "#a7f3d0",
  },
  blue: {
    pill:        "bg-sky-100 text-sky-700",
    border:      "border-sky-400",
    gradient:    "from-sky-500 to-sky-600",
    icon:        "text-sky-600",
    iconBg:      "bg-sky-50 group-hover:bg-sky-100",
    orb:         "bg-sky-400/25",
    spec:        "bg-sky-50",
    ctaText:     "text-sky-700",
    hoverBorder: "#38bdf8",
    hoverShadow: "0 12px 40px rgba(2,132,199,0.18)",
    glowOrb:     "rgba(56,189,248,0.15)",
    lineColor:   "#bae6fd",
  },
  orange: {
    pill:        "bg-orange-100 text-orange-700",
    border:      "border-orange-400",
    gradient:    "from-orange-500 to-orange-600",
    icon:        "text-orange-600",
    iconBg:      "bg-orange-50 group-hover:bg-orange-100",
    orb:         "bg-orange-400/25",
    spec:        "bg-orange-50",
    ctaText:     "text-orange-700",
    hoverBorder: "#fb923c",
    hoverShadow: "0 12px 40px rgba(234,88,12,0.18)",
    glowOrb:     "rgba(251,146,60,0.15)",
    lineColor:   "#fed7aa",
  },
};

const vp            = { once: true, margin: "-80px" };
const FLOAT         = { animate: { y: [0, -8, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
const staggerGrid   = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function AccordionItem({ item, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={vp} transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#e8d5b0] overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200"
        style={{ background: open ? "rgba(255,248,231,0.6)" : "transparent" }}
      >
        <span className="text-base font-bold font-display text-[#1a1208]">{item.title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className={a.icon} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-[#e8d5b0]">
              <ul className="mt-4 space-y-2 mb-4">
                {item.items.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#78614a] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.hoverBorder }} />
                    {line}
                  </li>
                ))}
              </ul>
              {item.checklist.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#e8d5b0]">
                  <p className={`text-xs font-bold tracking-widest uppercase ${a.icon} mb-3`}>Installation Checklist</p>
                  <ul className="space-y-2">
                    {item.checklist.map((check, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-[#1a1208]">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-md ${a.spec} border ${a.border} flex items-center justify-center ${a.icon} text-xs font-bold`}>
                          ☑
                        </span>
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SolutionPageClient({ solution }) {
  const a = ACCENT[solution.accentColor];
  const heroRef   = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [imgError, setImgError] = useState({});

  const FallbackIcon = ICON_MAP[solution.icon];

  return (
    <div className="bg-[#FFFBF0] text-[#1a1208] overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#FFFBF0] relative overflow-hidden flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 px-4">
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: [0, 25, 0], y: [0, -18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-[8%] left-[4%] h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-full ${a.orb} blur-3xl`} />
          <motion.div animate={{ x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className={`absolute top-[10%] right-[6%] h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64 rounded-full ${a.orb} blur-3xl opacity-70`} />
        </div>

        <div ref={heroRef} className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left — text */}
          <div>
            <div className="mb-5">
              <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: solution.title }]} />
            </div>
            {/* Animated "Now serving Odisha" badge */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white border border-[#e8d5b0] rounded-full px-4 py-2 text-sm text-[#78614a] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Now serving Odisha
            </motion.div>

            {/* Category pill */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
              className="block mb-2">
              <span className={`inline-block rounded-full text-xs font-semibold px-3 py-1 ${a.pill}`}>
                {solution.category}
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-xs font-bold tracking-[0.3em] uppercase ${a.icon} mb-4`}>
              {solution.eyebrow}
            </motion.p>

            {/* Heading */}
            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-[#1a1208] leading-tight mb-6"
              variants={VARIANTS.container} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
              {solution.heroHeading.split(" ").map((w, i) => (
                <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                  {solution.heroGoldWords?.includes(w)
                    ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
                    : w}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
              className="text-[#78614a] text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              {solution.heroSubtext}
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={solution.heroCTAPrimary.href}
                className={`btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r ${a.gradient} hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-lg w-full sm:w-auto`}>
                {solution.heroCTAPrimary.label} <ArrowRight size={15} />
              </Link>
              <Link href={solution.heroCTASecondary.href}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 ${a.border} ${a.icon} font-semibold text-sm hover:opacity-80 active:scale-[0.98] transition-all duration-300 w-full sm:w-auto`}>
                {solution.heroCTASecondary.label}
              </Link>
            </motion.div>

            {/* Stats row */}
            {solution.heroStats && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-8 border-t border-[#e8d5b0]">
                {solution.heroStats.map((stat, i) => (
                  <span key={i} className={`text-sm font-bold ${a.icon}`}>{stat}</span>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right — hero image with float */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            {...FLOAT} className={`hidden lg:block rounded-3xl overflow-hidden border ${a.border} relative`}
            style={{ boxShadow: `0 30px 80px rgba(0,0,0,0.12)` }}>
            {imgError.hero ? (
              <div className="w-full min-h-[250px] sm:min-h-[350px] lg:min-h-[420px] bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center rounded-3xl">
                {FallbackIcon && <FallbackIcon size={80} className={a.icon} />}
              </div>
            ) : (
              <Image src={solution.heroImage} alt={solution.title} width={620} height={520}
                className="w-full h-auto object-cover object-center" priority
                onError={() => setImgError((e) => ({ ...e, hero: true }))} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────── */}
      <section className="bg-[#FFF8E7] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="Why Choose This Solution"
            words={["Why", "Choose", "This", "Solution"]} goldWords={["Why", "Choose"]} />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" variants={staggerGrid} initial="hidden" whileInView="visible" viewport={vp}>
            {solution.benefits.map((b, i) => {
              const BIcon = ICON_MAP[b.icon];
              const num   = String(i + 1).padStart(2, "0");
              return (
                <motion.div key={b.title} variants={VARIANTS.card}
                  whileHover={{ y: -8, borderColor: a.hoverBorder, boxShadow: a.hoverShadow, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white rounded-2xl border border-[#e8d5b0] p-5 sm:p-6 lg:p-8 cursor-default relative overflow-hidden"
                  style={{ borderTop: `3px solid ${a.hoverBorder}`, boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                  {/* Decorative number badge */}
                  <span className="absolute top-5 right-6 text-3xl font-bold font-display leading-none select-none pointer-events-none"
                    style={{ color: a.glowOrb.replace("0.15", "0.35") }}>
                    {num}
                  </span>
                  {BIcon && (
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${a.iconBg}`}>
                      <BIcon size={22} className={`sm:hidden ${a.icon}`} />
                      <BIcon size={26} className={`hidden sm:block ${a.icon}`} />
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold font-display text-[#1a1208] mb-2">{b.title}</h3>
                  <p className="text-[#78614a] text-xs sm:text-sm leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ───────────────────────────────────── */}
      {solution.slug === 'solar-rooftop' ? (
        <section className="bg-[#FFFBF0] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className={`${a.icon} text-xs font-bold tracking-[0.2em] uppercase mb-3`}>
                  INTERACTIVE 3D EXPLORER
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1a1208] mb-4">
                  See Your Solar Panel Up Close
                </h2>
                <p className="text-[#78614a] text-sm sm:text-base mb-6 leading-relaxed">
                  Every panel we install uses monocrystalline technology
                  for maximum efficiency. Drag to rotate, scroll to zoom —
                  explore the same technology powering homes across Odisha.
                </p>
                <ul className="space-y-3 mb-8">
                  {solution.product?.specs?.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${a.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[#1a1208] text-xs sm:text-sm">
                        <strong>{spec.label}:</strong> {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center bg-gradient-to-r ${a.gradient} text-white font-semibold rounded-full px-8 py-3.5 hover:scale-105 active:scale-[0.98] transition-all shadow-lg w-full sm:w-auto`}
                >
                  Get Solar Quote
                </Link>
              </div>
              <div>
                <div className="rounded-3xl border border-amber-200/60 bg-amber-50/30 p-4 shadow-[0_20px_60px_rgba(217,119,6,0.12)]">
                  <SolarPanelViewer />
                  <p className="text-center text-[#a8917a] text-xs mt-2">
                    <span className="hidden sm:inline">🖱 Drag to rotate · Scroll to zoom</span>
                    <span className="sm:hidden">👆 Drag to rotate · Pinch to zoom</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : solution.product ? (
        <section className="bg-[#FFFBF0] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-3xl blur-2xl scale-110 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${a.glowOrb} 0%, transparent 70%)` }} />
                <div className="relative rounded-3xl overflow-hidden border border-[#e8d5b0] shadow-2xl aspect-[4/3]">
                  {imgError.product ? (
                    <div className="w-full min-h-[250px] sm:min-h-[350px] lg:min-h-[400px] bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center rounded-3xl">
                      {FallbackIcon && <FallbackIcon size={80} className={a.icon} />}
                    </div>
                  ) : (
                    <Image
                      src={solution.product.image}
                      alt={solution.product.heading}
                      fill
                      className="object-cover object-center"
                      onError={() => setImgError((e) => ({ ...e, product: true }))}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </motion.div>
              <div>
                <p className={`${a.icon} text-xs font-bold tracking-[0.2em] uppercase mb-3`}>
                  {solution.product.eyebrow}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1a1208] mb-4">
                  {solution.product.heading}
                </h2>
                <p className="text-[#78614a] text-sm sm:text-base mb-8 leading-relaxed">
                  {solution.product.description}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 mb-8">
                  {solution.product.specs?.map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`${a.spec} border border-[#e8d5b0] rounded-xl p-2.5 sm:p-3 text-center`}
                    >
                      <p className="text-[#a8917a] text-[9px] sm:text-xs mb-1">{spec.label}</p>
                      <p className={`${a.icon} font-bold text-xs sm:text-sm`}>{spec.value}</p>
                    </motion.div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center bg-gradient-to-r ${a.gradient} text-white font-semibold rounded-full px-8 py-3.5 hover:scale-105 active:scale-[0.98] transition-all shadow-lg w-full sm:w-auto`}
                >
                  Get Free Assessment
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── REQUIREMENTS ACCORDION ─────────────────────────────── */}
      {solution.requirements?.length > 0 && (
        <section className="bg-[#FFF8E7] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeading badge="Before Installation"
              words={["Site", "Requirements", "&", "Checklist"]} goldWords={["Requirements"]}
              subtitle="Our team will assess everything during the site visit — this checklist helps you prepare." />
            <div className="space-y-4">
              {solution.requirements.map((item) => (
                <AccordionItem key={item.title} item={item} a={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS ────────────────────────────────────────────── */}
      <section className="bg-[#FFFBF0] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="How We Work" words={["Our", "Installation", "Process"]} goldWords={["Installation"]} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
            {/* Connecting dashed line */}
            <div className="hidden lg:block absolute top-[3.5rem] left-[10%] right-[10%] h-px pointer-events-none"
              style={{ borderTop: `2px dashed ${a.lineColor}` }} />
            {solution.process.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={vp} transition={{ duration: 0.55, delay: i * 0.12 }}
                className="bg-white rounded-2xl border border-[#e8d5b0] p-4 sm:p-6 relative"
                style={{ borderLeft: `4px solid ${a.hoverBorder}`, boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                {/* Time badge */}
                {solution.processTimings?.[i] && (
                  <span className={`absolute top-4 right-4 text-[9px] font-bold tracking-wide ${a.pill} rounded-full px-2 py-0.5`}>
                    {solution.processTimings[i]}
                  </span>
                )}
                <p className={`font-display text-3xl sm:text-4xl font-bold leading-none mb-2 select-none bg-gradient-to-br ${a.gradient} bg-clip-text text-transparent`}>
                  {step.step}
                </p>
                <h3 className="font-bold font-display text-[#1a1208] mb-2 text-sm">{step.title}</h3>
                <p className="text-[#78614a] text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="bg-[#FFF8E7] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="Customer Stories" words={["Trusted", "Across", "Odisha"]} goldWords={["Trusted"]} />
          {solution.testimonialsIntro && (
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              className={`text-center text-sm font-semibold ${a.icon} mb-8 -mt-6`}>
              {solution.testimonialsIntro}
            </motion.p>
          )}
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" variants={staggerGrid} initial="hidden" whileInView="visible" viewport={vp}>
            {solution.testimonials.map((t) => (
              <motion.div key={t.name} variants={VARIANTS.fadeUp}
                className="bg-white rounded-2xl border border-[#e8d5b0] p-5 sm:p-7"
                style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-[#78614a] text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold font-display text-[#1a1208] text-sm">{t.name}</p>
                    <p className="text-[#a8917a] text-xs mt-0.5">{t.location}</p>
                  </div>
                  {t.detail && (
                    <span className="text-[10px] font-semibold text-[#78614a] bg-[#FFF8E7] border border-[#e8d5b0] rounded-full px-2.5 py-1 whitespace-nowrap">
                      {t.detail}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${a.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-40 w-40 sm:h-56 sm:w-56 lg:h-64 lg:w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <motion.div animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 right-[6%] -translate-y-1/2 h-36 w-36 sm:h-48 sm:w-48 lg:h-56 lg:w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight mb-5"
            variants={VARIANTS.container} initial="hidden" whileInView="visible" viewport={vp}>
            {solution.ctaHeading.split(" ").map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">{w}</motion.span>
            ))}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.4 }}
            className="text-white/80 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            {solution.ctaSubtext}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href={solution.ctaPrimary.href}
              className={`btn-shimmer inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base bg-white hover:bg-white/90 hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-lg w-full sm:w-auto ${a.ctaText}`}>
              {solution.ctaPrimary.label}
            </Link>
            <a href={solution.ctaSecondary.href}
              className="inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/70 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
              {solution.ctaSecondary.label}
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
