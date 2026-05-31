"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Zap, MapPin, Clock } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import { EV_STATIONS } from "@/lib/data/ev-stations";

const EVStationMap = dynamic(() => import("@/components/map/EVStationMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center rounded-2xl"
      style={{ background: "linear-gradient(to bottom, #020c1b, #0a1628)" }}
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2"
        style={{ borderColor: "rgba(245,158,11,0.2)", borderTopColor: "#f59e0b" }}
      />
    </div>
  ),
});

const HEADING = ["Our", "EV", "Charging", "Network"];

const activeCount    = EV_STATIONS.filter((s) => s.status === "Active").length;
const comingSoonCount = EV_STATIONS.filter((s) => s.status === "Coming Soon").length;
const citiesCount    = [...new Set(EV_STATIONS.map((s) => s.city))].length;

const STATS = [
  { icon: Zap,    value: activeCount,     label: "Active Stations" },
  { icon: MapPin, value: citiesCount,     label: "Cities Covered"  },
  { icon: Clock,  value: comingSoonCount, label: "Coming Soon"     },
];

export default function EVMapSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-24 bg-brand-surface relative overflow-hidden">
      {/* Decorative borders */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.4), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.15), transparent)" }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.05), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12" ref={ref}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
            EV Infrastructure
          </p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-display text-white"
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {HEADING.map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "EV" || w === "Charging"
                  ? <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-gray-400 max-w-xl mx-auto text-base"
          >
            50+ charging stations and growing across Odisha. Find your nearest station.
          </motion.p>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full rounded-2xl overflow-hidden"
          style={{
            height: "clamp(350px, 50vw, 500px)",
            border: "1px solid rgba(245,158,11,0.2)",
            boxShadow: "0 0 40px rgba(245,158,11,0.08), 0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          <EVStationMap />
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={VARIANTS.card}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl glass hover:border-amber-500/40 transition-all duration-300"
            >
              <Icon size={20} className="text-amber-400" />
              <span className="text-2xl sm:text-3xl font-bold font-display text-amber-400 tabular-nums">
                {value}
              </span>
              <span className="text-xs text-gray-500 text-center">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
