"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteStats } from "@/lib/hooks/useSiteStats";

function CountUp({ to, active }) {
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
  return <>{n}</>;
}

export default function StatsStrip() {
  const ref    = useRef(null);
  const [on, setOn] = useState(false);
  const { stats, loaded } = useSiteStats();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const STATS = [
    { value: stats.completedProjects, label: "Projects Completed",  href: "/projects" },
    { value: stats.activeEvStations,  label: "EV Stations Live",    href: "/solutions/ev-charging" },
    { value: stats.citiesCovered,     label: "Cities Covered",      href: "/about" },
    { value: stats.partnerEnquiries,  label: "Partner Enquiries",   href: null },
  ];

  return (
    <section ref={ref} className="w-full py-16 bg-gradient-to-r from-amber-500 to-amber-600 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(255,255,255,0.15), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 gap-x-0">
          {STATS.map((s, i) => {
            const inner = (
              <>
                {i < STATS.length - 1 && (
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/20 hidden md:block" />
                )}
                {i < 2 && (
                  <div className="absolute -bottom-3 left-1/4 right-1/4 h-px bg-white/20 md:hidden" />
                )}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tabular-nums">
                  {loaded ? <CountUp to={s.value} active={on} /> : "—"}
                </span>
                <span className="mt-2 text-xs sm:text-sm text-amber-100 text-center font-medium">
                  {s.label}
                </span>
              </>
            );
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={on ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col items-center py-10 px-6 text-center"
              >
                {s.href ? (
                  <Link href={s.href} className="flex flex-col items-center hover:opacity-80 transition-opacity duration-200">
                    {inner}
                  </Link>
                ) : inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
