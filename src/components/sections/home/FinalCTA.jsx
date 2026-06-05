"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING = ["Ready", "to", "Power", "Up?"];

export default function FinalCTA() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-28 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
      {/* Warm light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.1), transparent)" }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[15%] -translate-y-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-[15%] -translate-y-1/2 h-48 w-48 rounded-full bg-white/8 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-6">
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
                ? <span className="text-amber-200">{w}</span>
                : w}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          variants={VARIANTS.para}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-amber-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
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
            className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-800 bg-white hover:bg-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300"
          >
            Get Free Assessment
          </Link>
          <Link
            href="/solutions/ev-charging"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Explore EV Network
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
