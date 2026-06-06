"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sun, Zap, Wind, Factory, TrendingDown, TrendingUp, Shield, Leaf,
  BadgeDollarSign, Users, Award, BarChart3, Wrench, ShieldCheck,
  Cpu, FileCheck, ChevronDown, Star, ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { VARIANTS } from "@/lib/animations/variants";

const ICON_MAP = {
  Sun, Zap, Wind, Factory, TrendingDown, TrendingUp, Shield, Leaf,
  BadgeDollarSign, Users, Award, BarChart3, Wrench, ShieldCheck,
  Cpu, FileCheck,
};

const ACCENT = {
  amber: {
    pill:        "bg-amber-100 text-amber-700",
    border:      "border-amber-400",
    gradient:    "from-amber-600 to-amber-800",
    icon:        "text-amber-600",
    iconBg:      "bg-amber-50 group-hover:bg-amber-100",
    orb:         "bg-amber-400/25",
    spec:        "bg-amber-50",
    ctaText:     "text-amber-700",
    hoverBorder: "#fcd34d",
    hoverShadow: "0 12px 40px rgba(217,119,6,0.18)",
  },
  emerald: {
    pill:        "bg-emerald-100 text-emerald-700",
    border:      "border-emerald-400",
    gradient:    "from-emerald-600 to-emerald-800",
    icon:        "text-emerald-600",
    iconBg:      "bg-emerald-50 group-hover:bg-emerald-100",
    orb:         "bg-emerald-400/25",
    spec:        "bg-emerald-50",
    ctaText:     "text-emerald-700",
    hoverBorder: "#34d399",
    hoverShadow: "0 12px 40px rgba(16,185,129,0.18)",
  },
  blue: {
    pill:        "bg-blue-100 text-blue-700",
    border:      "border-blue-400",
    gradient:    "from-blue-600 to-blue-800",
    icon:        "text-blue-600",
    iconBg:      "bg-blue-50 group-hover:bg-blue-100",
    orb:         "bg-blue-400/25",
    spec:        "bg-blue-50",
    ctaText:     "text-blue-700",
    hoverBorder: "#60a5fa",
    hoverShadow: "0 12px 40px rgba(59,130,246,0.18)",
  },
  orange: {
    pill:        "bg-orange-100 text-orange-700",
    border:      "border-orange-400",
    gradient:    "from-orange-600 to-orange-800",
    icon:        "text-orange-600",
    iconBg:      "bg-orange-50 group-hover:bg-orange-100",
    orb:         "bg-orange-400/25",
    spec:        "bg-orange-50",
    ctaText:     "text-orange-700",
    hoverBorder: "#fb923c",
    hoverShadow: "0 12px 40px rgba(234,88,12,0.18)",
  },
};

const vp = { once: true, margin: "-80px" };
const FLOAT = { animate: { y: [0, -8, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
const staggerGrid = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function AccordionItem({ item, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={vp} transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#e8d5b0] overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
    >
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50/40 transition-colors duration-200">
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
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
              {item.checklist.length > 0 && (
                <div className="mt-4 pt-4 border-t border-amber-100">
                  <p className={`text-xs font-bold tracking-widest uppercase ${a.icon} mb-3`}>
                    Installation Checklist
                  </p>
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
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-[#FFFBF0] text-[#1a1208] overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#FFFBF0] relative overflow-hidden flex items-center pt-28 pb-16 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: [0, 25, 0], y: [0, -18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-[8%] left-[4%] h-80 w-80 rounded-full ${a.orb} blur-3xl`} />
          <motion.div animate={{ x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className={`absolute top-[10%] right-[6%] h-64 w-64 rounded-full ${a.orb} blur-3xl opacity-70`} />
        </div>

        <div ref={heroRef} className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[55%_45%] gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className={`inline-block rounded-full text-xs font-semibold px-3 py-1 mb-5 ${a.pill}`}>
              {solution.category}
            </motion.span>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-xs font-bold tracking-[0.3em] uppercase ${a.icon} mb-4`}>
              {solution.eyebrow}
            </motion.p>
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[#1a1208] leading-tight mb-6"
              variants={VARIANTS.container} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
              {solution.heroHeading.split(" ").map((w, i) => (
                <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                  {solution.heroGoldWords?.includes(w)
                    ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span>
                    : w}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
              className="text-[#78614a] text-lg leading-relaxed mb-8 max-w-lg">
              {solution.heroSubtext}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4">
              <Link href={solution.heroCTAPrimary.href}
                className={`btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r ${a.gradient} hover:scale-105 transition-all duration-300 shadow-lg`}>
                {solution.heroCTAPrimary.label} <ArrowRight size={15} />
              </Link>
              <Link href={solution.heroCTASecondary.href}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 ${a.border} ${a.icon} font-semibold text-sm hover:opacity-80 transition-all duration-300`}>
                {solution.heroCTASecondary.label}
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            {...FLOAT} className={`hidden lg:block rounded-3xl overflow-hidden border ${a.border}`}
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.12)" }}>
            <Image src={solution.heroImage} alt={solution.title} width={620} height={520}
              className="w-full h-auto object-cover object-center" priority />
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section className="bg-[#FFF8E7] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="Why Choose This Solution"
            words={["Why", "Choose", "This", "Solution"]} goldWords={["Why", "Choose"]} />
          <motion.div className="grid sm:grid-cols-2 gap-6" variants={staggerGrid} initial="hidden" whileInView="visible" viewport={vp}>
            {solution.benefits.map((b) => {
              const BIcon = ICON_MAP[b.icon];
              return (
                <motion.div key={b.title} variants={VARIANTS.card}
                  whileHover={{ y: -8, borderColor: a.hoverBorder, boxShadow: a.hoverShadow, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group bg-white rounded-2xl border border-[#e8d5b0] p-8 cursor-default"
                  style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                  {BIcon && (
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${a.iconBg}`}>
                      <BIcon size={26} className={a.icon} />
                    </div>
                  )}
                  <h3 className="text-xl font-bold font-display text-[#1a1208] mb-2">{b.title}</h3>
                  <p className="text-[#78614a] text-sm leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ───────────────────────────────── */}
      {solution.product && (
        <section className="bg-[#FFFBF0] py-24 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideLeft}
              {...FLOAT} className={`rounded-3xl overflow-hidden border ${a.border}`}
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.1)" }}>
              <Image src={solution.product.image} alt={solution.product.heading} width={620} height={520}
                className="w-full h-auto object-cover object-center" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideRight}>
              <p className={`text-xs font-bold tracking-[0.3em] uppercase ${a.icon} mb-4`}>{solution.product.eyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1a1208] leading-tight mb-4">{solution.product.heading}</h2>
              <p className="text-[#78614a] leading-relaxed mb-8">{solution.product.description}</p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {solution.product.specs.map((s) => (
                  <div key={s.label} className={`rounded-xl border border-[#e8d5b0] p-4 text-center ${a.spec}`}
                    style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                    <p className="text-xs font-semibold text-[#1a1208] leading-tight">{s.label}</p>
                    <p className={`text-xs font-bold ${a.icon} mt-1 leading-tight`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <Link href={solution.heroCTAPrimary.href}
                className={`btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r ${a.gradient} hover:scale-105 transition-all duration-300 shadow-lg`}>
                {solution.heroCTAPrimary.label} <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── REQUIREMENTS ACCORDION ─────────────────────────── */}
      {solution.requirements && (
        <section className="bg-[#FFF8E7] py-24 px-4">
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

      {/* ── PROCESS ────────────────────────────────────────── */}
      <section className="bg-[#FFFBF0] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="How We Work" words={["Our", "Installation", "Process"]} goldWords={["Installation"]} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
            <div className="hidden lg:block absolute top-[3.25rem] left-[10%] right-[10%] h-px border-t-2 border-dashed border-amber-200 pointer-events-none" />
            {solution.process.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={vp} transition={{ duration: 0.55, delay: i * 0.12 }}
                className="bg-white rounded-2xl border border-[#e8d5b0] p-6 transition-all duration-300 relative"
                style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                <p className={`font-display text-4xl font-bold leading-none mb-2 select-none bg-gradient-to-br ${a.gradient} bg-clip-text text-transparent`}>
                  {step.step}
                </p>
                <h3 className="font-bold font-display text-[#1a1208] mb-2 text-sm">{step.title}</h3>
                <p className="text-[#78614a] text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section className="bg-[#FFF8E7] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="Customer Stories" words={["Trusted", "Across", "Odisha"]} goldWords={["Trusted"]} />
          <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerGrid} initial="hidden" whileInView="visible" viewport={vp}>
            {solution.testimonials.map((t) => (
              <motion.div key={t.name} variants={VARIANTS.fadeUp}
                className="bg-white rounded-2xl border border-[#e8d5b0] p-7"
                style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-[#78614a] text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold font-display text-[#1a1208] text-sm">{t.name}</p>
                  <p className="text-[#a8917a] text-xs mt-0.5">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className={`py-24 px-4 bg-gradient-to-br ${a.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <motion.div animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 right-[6%] -translate-y-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5"
            variants={VARIANTS.container} initial="hidden" whileInView="visible" viewport={vp}>
            {solution.ctaHeading.split(" ").map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">{w}</motion.span>
            ))}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.4 }}
            className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {solution.ctaSubtext}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={solution.ctaPrimary.href}
              className={`btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base bg-white hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg ${a.ctaText}`}>
              {solution.ctaPrimary.label}
            </Link>
            <a href={solution.ctaSecondary.href}
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300">
              {solution.ctaSecondary.label}
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
