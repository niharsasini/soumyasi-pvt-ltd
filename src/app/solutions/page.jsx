"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, CheckCircle, ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const SolarPanelViewer = dynamic(() => import("@/components/three/SolarPanelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden animate-pulse"
      style={{ background: "linear-gradient(135deg, #FEF3C7, #FDE68A, #FCD34D)" }} />
  ),
});

const SPECS = [
  "Tier-1 monocrystalline modules",
  "Optimised tilt for peak generation",
  "Anti-reflective tempered glass",
  "25-year performance warranty",
];

const STEPS = [
  { num: "01", title: "Site Assessment",    desc: "We visit your site, assess energy needs, roof structure, and shading — then produce a precise proposal." },
  { num: "02", title: "Design & Planning",  desc: "Engineered system layouts, government permit handling, net-metering registration, and procurement." },
  { num: "03", title: "Install & Support",  desc: "Professional installation by certified engineers, commissioning, and lifetime technical support." },
];

export default function SolutionsPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView }  = useScrollReveal();
  const { ref: procRef, isInView: procInView }  = useScrollReveal();

  return (
    <div className="bg-brand-bg text-brand-ink overflow-hidden">

      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-brand-bg">
        {/* Amber orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,30,0], y:[0,-20,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[10%] left-[5%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <motion.div animate={{ x:[0,-25,0], y:[0,20,0] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute bottom-[10%] right-[8%] h-56 w-56 rounded-full bg-amber-300/8 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10" ref={heroRef}>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-5">
            Our Solutions
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight mb-6"
            variants={VARIANTS.container} initial="hidden" animate={heroInView ? "visible" : "hidden"}
          >
            {["Energy", "Solutions", "Built", "for", "Odisha"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {["Solutions", "Odisha"].includes(w)
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.7 }}
            className="text-brand-brown text-lg leading-relaxed max-w-2xl mx-auto">
            From rooftop solar to fast EV charging — complete energy infrastructure, end to end.
          </motion.p>
        </div>
      </section>

      {/* ══ 3D SOLAR VIEWER ══ */}
      <section className="py-24 px-4 bg-brand-section relative">
        <div className="absolute inset-x-0 top-0 section-divider" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-5 flex items-center gap-2">
              <Sun size={14} /> Interactive Explorer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink leading-tight mb-4">
              See Your Solar Panel <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Up Close</span>
            </h2>
            <p className="text-brand-brown leading-relaxed mb-4">
              Drag to rotate, scroll to zoom. Every panel we install is engineered for 25+ years of performance in Odisha's climate.
            </p>
            <ul className="space-y-2.5 mb-8">
              {SPECS.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-brand-brown">
                  <CheckCircle size={15} className="text-brand-emerald shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300">
              Get a Quote <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Right: 3D viewer */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="rounded-2xl overflow-hidden border border-amber-200"
            style={{ boxShadow:"0 20px 60px rgba(217,119,6,0.12)" }}>
            <SolarPanelViewer />
          </motion.div>
        </div>
      </section>

      {/* ══ SOLUTIONS GRID ══ */}
      <section className="py-24 px-4 bg-brand-bg">
        <div className="absolute inset-x-0 section-divider" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14" ref={gridRef}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">Core Capabilities</p>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold font-display text-brand-ink"
              variants={VARIANTS.container} initial="hidden" animate={gridInView ? "visible" : "hidden"}
            >
              {["What", "We", "Offer"].map((w, i) => (
                <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                  {w === "Offer" ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span> : w}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p variants={VARIANTS.para} initial="hidden" animate={gridInView ? "visible" : "hidden"}
              className="mt-4 text-brand-brown max-w-xl mx-auto">
              Comprehensive energy and electrical solutions built with modern engineering precision.
            </motion.p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={VARIANTS.cardGrid} initial="hidden" animate={gridInView ? "visible" : "hidden"}
          >
            {SOLUTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={VARIANTS.card}
                  whileHover={{ y:-8 }}
                  transition={{ type:"spring", stiffness:280, damping:18 }}
                  className="group bg-white border border-brand-border rounded-2xl shadow-warm p-7 hover:border-amber-300 hover:shadow-[0_12px_40px_rgba(217,119,6,0.15)] transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon size={28} className="text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-brand-ink mb-3">{item.title}</h3>
                  <p className="text-brand-brown text-sm leading-relaxed mb-5">{item.description}</p>
                  <Link href="/contact" className="text-sm font-semibold text-brand-gold hover:text-amber-700 transition-colors inline-flex items-center gap-1">
                    Learn More <ArrowRight size={13} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-24 px-4 bg-brand-section relative">
        <div className="absolute inset-x-0 top-0 section-divider" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" ref={procRef}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">Our Approach</p>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold font-display text-brand-ink"
              variants={VARIANTS.container} initial="hidden" animate={procInView ? "visible" : "hidden"}
            >
              {["How", "We", "Work"].map((w, i) => (
                <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">{w}</motion.span>
              ))}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Dashed connector line on desktop */}
            <div className="hidden md:block absolute top-12 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px border-t-2 border-dashed border-amber-200" />

            {STEPS.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.15 }}
                className="bg-white rounded-2xl border border-brand-border shadow-warm p-7 hover:border-amber-300 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg font-display mb-5 shadow-gold">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold font-display text-brand-ink mb-3">{step.title}</h3>
                <p className="text-brand-brown text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.1), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.2,0.4,0.2] }} transition={{ duration:5, repeat:Infinity }}
          className="absolute top-1/2 left-[10%] -translate-y-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Start Today</p>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5">
            Ready to Get Started?
          </motion.h2>
          <p className="text-amber-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Schedule a free site assessment — no obligation. Our engineers will visit, assess, and design a solution tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-800 bg-white hover:bg-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300">
              Book Assessment
            </Link>
            <a href="tel:+919876543210"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300">
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
