"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const EnergyOrb = dynamic(() => import("@/components/three/EnergyOrb"), {
  ssr: false,
  loading: () => null,
});

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
      className="flex flex-col items-center px-4 py-4 rounded-2xl glass hover:border-amber-500/40 transition-colors duration-300"
    >
      <span className="text-2xl sm:text-3xl font-bold font-display text-amber-400 tabular-nums">
        {n}{suffix}
      </span>
      <span className="text-[10px] text-gray-500 mt-1 text-center">{label}</span>
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
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[5%] h-80 w-80 rounded-full bg-amber-500/6 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[20%] right-[10%] h-64 w-64 rounded-full bg-emerald-500/6 blur-3xl"
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className="relative">
            {/* EnergyOrb decorative */}
            <div className="absolute -right-8 top-0 h-full w-full opacity-20 pointer-events-none hidden lg:block">
              <EnergyOrb />
            </div>

            <div className="relative z-10">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-6"
              >
                Odisha's Energy Future
              </motion.p>

              {/* Headline — word-by-word slide */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white leading-[1.1] tracking-tight mb-6 overflow-hidden">
                {HEADLINE.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-lg"
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
                  className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:shadow-gold transition-all duration-300 hover:scale-105"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-amber-500/50 text-amber-400 font-semibold text-sm hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300"
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
                border: "1px solid rgba(245,158,11,0.3)",
                boxShadow: "0 0 40px rgba(245,158,11,0.12), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Gradient edge overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, rgba(10,15,30,0.6) 100%), linear-gradient(to right, rgba(10,15,30,0.3), transparent 20%, transparent 80%, rgba(10,15,30,0.3))",
                }}
              />

              <video
                src="/video/3738727067-preview.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] object-cover"
              />

              {/* Caption overlay */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <p className="text-xs font-semibold tracking-wider uppercase text-amber-400/80">
                  Precision · Automation · Reliability
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={13} />
      </motion.div>
    </section>
  );
}
