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
    border: "hover:border-amber-400",
    shadow: "hover:shadow-card-hover",
    iconCn: "text-brand-gold bg-amber-50 group-hover:bg-amber-100",
    link:   "text-brand-gold hover:text-amber-700",
    href:   "/solutions",
  },
  {
    icon:   Zap,
    title:  "EV Charging Network",
    desc:   "Our fast-charging network spans Bhubaneswar, Cuttack, Puri, and growing. Find a station, charge up, move on.",
    border: "hover:border-indigo-400",
    shadow: "hover:shadow-[0_8px_32px_rgba(79,70,229,0.15)]",
    iconCn: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100",
    link:   "text-indigo-600 hover:text-indigo-700",
    href:   "/solutions",
  },
  {
    icon:   Factory,
    title:  "Industrial Power",
    desc:   "Switchgear, substations, transformers — we handle the full spectrum of electrical infrastructure for Odisha's industries.",
    border: "hover:border-emerald-400",
    shadow: "hover:shadow-[0_8px_32px_rgba(5,150,105,0.15)]",
    iconCn: "text-brand-emerald bg-emerald-50 group-hover:bg-emerald-100",
    link:   "text-brand-emerald hover:text-emerald-700",
    href:   "/solutions",
  },
];

export default function WhatWeDo() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-24 bg-brand-section relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14" ref={ref}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            What We Do
          </p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-display text-brand-ink"
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
            className="mt-4 text-brand-brown max-w-xl mx-auto text-base"
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
                className={`group relative p-8 rounded-2xl bg-white border border-brand-border shadow-warm ${card.border} ${card.shadow} transition-all duration-300 cursor-default`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${card.iconCn}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold font-display text-brand-ink mb-3">{card.title}</h3>
                <p className="text-brand-brown text-sm leading-relaxed mb-5">{card.desc}</p>
                <a href={card.href} className={`text-sm font-semibold transition-colors inline-flex items-center gap-1 ${card.link}`}>
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
