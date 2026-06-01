"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/data/industries";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING = ["Powering", "Every", "Sector"];

export default function Industries() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(217,119,6,0.04), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Industries We Serve
          </p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-display text-brand-ink"
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {HEADING.map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-brand-brown max-w-xl mx-auto text-base"
          >
            From manufacturing floors to hospital corridors — our solutions power every corner of Odisha's economy.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                variants={VARIANTS.card}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-brand-border shadow-warm hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon size={22} className="text-brand-muted group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-brand-ink leading-snug group-hover:text-brand-gold transition-colors duration-300">
                  {ind.title}
                </h3>
                <p className="mt-1.5 text-[11px] text-brand-muted leading-relaxed hidden sm:block">
                  {ind.description.split(".")[0]}.
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
