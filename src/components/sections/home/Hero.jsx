"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const HEADLINE = ["Powering", "Industry.", "Enabling", "Clean", "Energy."];

const STATS = [
  { value: 500, suffix: "+", label: "Installations" },
  { value: 50,  suffix: "+", label: "EV Stations"   },
  { value: 15,  suffix: "+", label: "Cities"         },
];

function useCountUp(to, active) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
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
      className="flex flex-col items-center px-4 py-4 rounded-2xl bg-white border border-brand-border shadow-warm hover:border-amber-400 hover:shadow-card-hover transition-all duration-300"
    >
      <span className="text-2xl sm:text-3xl font-bold font-display text-brand-gold tabular-nums">
        {n}{suffix}
      </span>
      <span className="text-[10px] text-brand-muted mt-1 text-center">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsOn(true), 900);
    return () => clearTimeout(t);
  }, []);

  const wordVariants = {
    hidden:  { opacity: 0, x: -40 },
    visible: (i) => ({
      opacity: 1, x: 0,
      transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-brand-bg overflow-hidden">
      {/* Warm radial gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(245,158,11,0.05), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(217,119,6,0.04), transparent)",
        }}
      />
      {/* Floating amber orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] h-80 w-80 rounded-full bg-amber-400/8 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[20%] right-[10%] h-64 w-64 rounded-full bg-amber-300/6 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[50%] right-[30%] h-40 w-40 rounded-full bg-amber-500/5 blur-2xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className="relative">
            <div className="relative z-10">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-6"
              >
                Odisha's Energy Future
              </motion.p>

              {/* Headline — word-by-word slide */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-[1.1] tracking-tight mb-6 overflow-hidden">
                {HEADLINE.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.28em]"
                  >
                    {["Industry.", "Energy."].includes(word)
                      ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{word}</span>
                      : word}
                  </motion.span>
                ))}
              </h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-base sm:text-lg text-brand-brown leading-relaxed mb-10 max-w-lg"
              >
                Solar installations, EV charging networks, and industrial power — built for Odisha, engineered to last.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.68 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link
                  href="/solutions"
                  className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 hover:border-amber-500 transition-all duration-300"
                >
                  Our Projects
                </Link>
              </motion.div>

              {/* Stat badges */}
              <div className="grid grid-cols-3 gap-3 max-w-sm">
                {STATS.map((s, i) => (
                  <StatBadge key={s.label} {...s} active={statsOn} i={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT VIDEO ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            {/* Gold glow behind video */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/10 blur-xl pointer-events-none" />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #fcd34d",
                boxShadow: "0 20px 60px rgba(120,80,20,0.15)",
              }}
            >
              <video
                src="/video/3738727067-preview.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-muted"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={13} />
      </motion.div>
    </section>
  );
}
