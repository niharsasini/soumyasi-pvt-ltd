"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 50,  suffix: "+", label: "EV Stations Live"   },
  { value: 15,  suffix: "+", label: "Cities Covered"     },
  { value: 98,  suffix: "%", label: "Client Satisfaction" },
];

function CountUp({ to, suffix, active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur   = 2200;
    const tick  = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
      else setN(to);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return <>{n}{suffix}</>;
}

export default function StatsStrip() {
  const ref    = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full py-20 bg-brand-surface relative overflow-hidden">
      {/* Subtle gold top line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.3), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.15), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.35)" }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-center py-12 px-6 bg-brand-surface"
            >
              {/* Gold divider (not last) */}
              {i < STATS.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/6 hidden md:block" />
              )}

              <span
                className="text-4xl sm:text-5xl font-bold font-display tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #d97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUp to={s.value} suffix={s.suffix} active={on} />
              </span>
              <span className="mt-2 text-xs sm:text-sm text-gray-400 text-center font-medium">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
