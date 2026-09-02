"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/data/industries";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING = ["Powering", "Every", "Sector"];

export default function Industries() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(217,119,6,0.04), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14" ref={ref}>
          <div className="w-8 h-1 bg-amber-500 rounded-full mb-3 mx-auto sm:hidden" />
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Industries We Serve
          </p>
          <motion.h2
            className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-ink"
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
            className="mt-4 text-brand-brown max-w-xl mx-auto text-sm sm:text-base"
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
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border border-brand-border shadow-warm hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 cursor-default"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-300">
                  <Icon size={18} className="text-brand-muted group-hover:text-brand-gold transition-colors duration-300 sm:hidden" />
                  <Icon size={22} className="text-brand-muted group-hover:text-brand-gold transition-colors duration-300 hidden sm:block" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold sm:font-semibold text-brand-ink leading-snug group-hover:text-brand-gold transition-colors duration-300">
                  {ind.title}
                </h3>
                <p className="mt-1.5 text-[11px] text-brand-muted leading-relaxed hidden sm:block">
                  {ind.description.split(".")[0]}.
                </p>
                <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] font-semibold text-amber-600 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  Learn More →
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
