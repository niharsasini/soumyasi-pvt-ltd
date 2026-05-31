"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING = ["Ready", "to", "Power", "Up?"];

export default function FinalCTA() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-28 bg-brand-surface relative overflow-hidden">
      {/* Gold radial at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,158,11,0.08), transparent)" }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[15%] -translate-y-1/2 h-56 w-56 rounded-full bg-amber-500/8 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-[15%] -translate-y-1/2 h-48 w-48 rounded-full bg-emerald-500/8 blur-3xl pointer-events-none"
      />

      {/* Border lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.4), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-6">
          Get Started Today
        </p>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white leading-tight mb-6"
          variants={VARIANTS.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {HEADING.map((w, i) => (
            <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.3em]">
              {w === "Power" || w === "Up?"
                ? <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{w}</span>
                : w}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          variants={VARIANTS.para}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Get a free solar assessment or find your nearest EV charging station. Our experts are ready to help you make the switch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-black bg-gradient-to-r from-amber-400 to-amber-600 hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
          >
            Get Free Assessment
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-amber-500/50 text-amber-400 font-semibold text-base hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300"
          >
            Find EV Station
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
