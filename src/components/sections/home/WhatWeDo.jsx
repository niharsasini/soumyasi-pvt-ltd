"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Zap, Factory } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

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
    productImage: "/soumyasi/solar-field-odisha.png",
    eyebrow: "Rooftop & Ground-Mount Solar",
  },
  {
    icon:   Zap,
    title:  "EV Charging Network",
    desc:   "Our fast-charging network spans Bhubaneswar, Cuttack, Puri, and growing. Find a station, charge up, move on.",
    border: "hover:border-indigo-400",
    shadow: "hover:shadow-[0_8px_32px_rgba(79,70,229,0.15)]",
    iconCn: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100",
    link:   "text-indigo-600 hover:text-indigo-700",
    href:   "/solutions/ev-charging",
    productImage: "/soumyasi/ev-charger-ultra60.png",
    eyebrow: "Ultra 60 · Fast Charger",
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
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={VARIANTS.card}
                whileHover={{ y: -10 }}
                className={`group relative rounded-2xl bg-white border border-brand-border shadow-warm ${card.border} ${card.shadow} transition-all duration-300 cursor-default overflow-hidden`}
              >
                {card.productImage ? (
                  <>
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={card.productImage}
                        alt={card.title}
                        fill
                        className="object-cover object-center rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                    </div>
                    <div className="p-7 pt-5">
                      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-muted mb-1">{card.eyebrow}</p>
                      <h3 className="text-xl font-bold font-display text-brand-ink mb-3">{card.title}</h3>
                      <p className="text-brand-brown text-sm leading-relaxed mb-5">{card.desc}</p>
                      <Link href={card.href} className={`text-sm font-semibold transition-colors inline-flex items-center gap-1 ${card.link}`}>
                        Learn More →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="p-8">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${card.iconCn}`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand-ink mb-3">{card.title}</h3>
                    <p className="text-brand-brown text-sm leading-relaxed mb-5">{card.desc}</p>
                    <Link href={card.href} className={`text-sm font-semibold transition-colors inline-flex items-center gap-1 ${card.link}`}>
                      Learn More →
                    </Link>
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
