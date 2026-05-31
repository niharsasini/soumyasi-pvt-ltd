"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const SWAP_WORDS = ["Cleaner", "Greener", "Smarter"];

const STATS = [
  { value: 500, suffix: "+", label: "Solar Installations" },
  { value: 50, suffix: "+", label: "EV Stations" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return count;
}

function StatBadge({ value, suffix, label, active, delay }) {
  const count = useCountUp(value, 2000, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center px-4 py-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/40 transition-colors duration-300"
    >
      <span className="text-2xl sm:text-3xl font-bold font-display text-cyan-400 tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[11px] sm:text-xs text-gray-400 mt-1 text-center leading-snug">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % SWAP_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStatsActive(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* ── Animated gradient mesh background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base radial gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% -10%, rgba(29,78,216,0.25), transparent 60%),
              radial-gradient(ellipse 50% 50% at 80% 60%, rgba(34,211,238,0.07), transparent 60%),
              radial-gradient(ellipse 50% 50% at 15% 75%, rgba(29,78,216,0.1), transparent 60%)
            `,
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-blue-700/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 right-[10%] h-64 w-64 rounded-full bg-cyan-400/6 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-2/3 left-1/2 h-48 w-48 rounded-full bg-blue-600/8 blur-2xl"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 flex flex-col items-center text-center">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 text-cyan-400 text-xs font-semibold tracking-widest uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Solar · EV Charging · Industrial Power · Odisha
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold font-display text-white leading-[1.08] tracking-tight mb-4"
        >
          Powering Tomorrow's
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 60%, #6366f1 100%)",
            }}
          >
            Odisha
          </span>
        </motion.h1>

        {/* Word swap */}
        <div className="h-12 sm:h-14 flex items-center justify-center gap-3 mb-6">
          <span className="text-xl sm:text-2xl md:text-3xl font-display text-gray-400">
            Making it
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-cyan-400"
            >
              {SWAP_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed mb-10"
        >
          From rooftop solar to city-wide EV charging — we build the energy infrastructure Odisha needs to grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm sm:text-base text-[#0f172a] bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(34,211,238,0.5)] transition-all duration-300 hover:scale-105"
          >
            Explore Our Solutions
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm sm:text-base hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300"
          >
            See Our Projects
          </Link>
        </motion.div>

        {/* Stat badges */}
        <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-md mx-auto">
          {STATS.map((s, i) => (
            <StatBadge key={s.label} {...s} active={statsActive} delay={0.1 * i} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
