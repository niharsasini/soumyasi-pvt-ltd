"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Sun, Zap, Factory } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const FloatingPanel = dynamic(() => import("@/components/three/FloatingPanel"), {
  ssr: false,
  loading: () => null,
});

const HEADING = ["Energy", "Solutions", "for", "a", "New", "Odisha"];

const CARDS = [
  {
    icon:   Sun,
    title:  "Solar Power",
    desc:   "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Clean energy, real savings.",
    accent: "amber",
    border: "hover:border-amber-500/50",
    glow:   "hover:shadow-gold",
    iconCn: "text-amber-400 bg-amber-400/10 group-hover:bg-amber-400/20",
    href:   "/solutions",
  },
  {
    icon:   Zap,
    title:  "EV Charging Network",
    desc:   "Our fast-charging network spans Bhubaneswar, Cuttack, Puri, and growing. Find a station, charge up, move on.",
    accent: "emerald",
    border: "hover:border-emerald-500/50",
    glow:   "hover:shadow-grn",
    iconCn: "text-emerald-400 bg-emerald-400/10 group-hover:bg-emerald-400/20",
    href:   "/solutions",
  },
  {
    icon:   Factory,
    title:  "Industrial Power",
    desc:   "Switchgear, substations, transformers — we handle the full spectrum of electrical infrastructure for Odisha's industries.",
    accent: "blue",
    border: "hover:border-blue-500/50",
    glow:   "hover:shadow-blue",
    iconCn: "text-blue-400 bg-blue-400/10 group-hover:bg-blue-400/20",
    href:   "/solutions",
  },
];

export default function WhatWeDo() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-24 bg-brand-bg relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14" ref={ref}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
            What We Do
          </p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-display text-white"
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {HEADING.map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Odisha"
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
            Three core pillars. One mission — power Odisha's future cleanly and reliably.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 relative"
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={VARIANTS.card}
                whileHover={{ y: -10 }}
                className={`group relative p-8 rounded-2xl glass ${card.border} ${card.glow} transition-all duration-300 cursor-default`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${card.iconCn}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.desc}</p>
                <a href={card.href} className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                  Learn More →
                </a>

                {/* Floating panel decoration on Solar card */}
                {i === 0 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-28 w-20 opacity-50 hidden xl:block pointer-events-none">
                    <FloatingPanel />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
