"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "EV Stations" },
  { value: 15, suffix: "+", label: "Cities Covered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 2200;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [target, active]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function StatsStrip() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #080e1a, #0a1020, #080e1a)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(29,78,216,0.08), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col items-center py-12 px-6"
            >
              {/* Divider (not on last) */}
              {i < STATS.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/8 hidden md:block" />
              )}

              <span
                className="text-4xl sm:text-5xl font-bold font-display tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #22d3ee, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              </span>
              <span className="mt-2 text-xs sm:text-sm text-gray-400 text-center font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
