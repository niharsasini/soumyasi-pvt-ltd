"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { VARIANTS } from "@/lib/animations/variants";

const CARDS = [
  {
    image: "/soumyasi/solar-field-odisha.png",
    pillBg: "bg-amber-100",
    pillText: "text-amber-700",
    pillLabel: "☀️ Solar",
    title: "Solar Power Installation",
    desc: "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Clean energy, real savings — guaranteed for 25 years.",
    href: "/solutions/solar-rooftop",
    hoverBorder: "hover:border-amber-400",
  },
  {
    image: "/soumyasi/ev-charger-ultra60.png",
    pillBg: "bg-emerald-100",
    pillText: "text-emerald-700",
    pillLabel: "⚡ EV Charging",
    title: "EV Charging Network",
    desc: "Our fast-charging EV network spans Bhubaneswar, Cuttack, Puri, and growing. 60kW DC fast chargers — charge most EVs in under 30 minutes.",
    href: "/solutions/ev-charging",
    hoverBorder: "hover:border-emerald-400",
  },
  {
    image: "/soumyasi/wind-power-plant.png",
    pillBg: "bg-blue-100",
    pillText: "text-blue-700",
    pillLabel: "💨 Wind Power",
    title: "Wind Power Plant",
    desc: "Harnessing Odisha's coastal and inland wind corridors to generate reliable, renewable power. From small turbines to utility-scale wind farms — we plan, install, and maintain.",
    href: "/solutions/wind-power",
    hoverBorder: "hover:border-blue-400",
  },
  {
    image: "/soumyasi/industrial-power.png",
    pillBg: "bg-orange-100",
    pillText: "text-orange-700",
    pillLabel: "🏭 Industrial",
    title: "Industrial Power Supply",
    desc: "Complete electrical infrastructure for factories, plants, and commercial complexes. Switchgear, transformers, substations, and 24/7 power management — engineered for zero downtime.",
    href: "/solutions/industrial-power",
    hoverBorder: "hover:border-orange-400",
  },
];

const cardGridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const linkFadeIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } },
};

const subtitleVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
};

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#FFF8E7] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row — heading left, link right */}
        <div ref={ref} className="flex items-end justify-between mb-3">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-display text-[#1a1208] leading-tight"
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {["What", "We", "Do"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            variants={linkFadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Link
              href="/solutions"
              className="group flex items-center gap-1 text-amber-600 font-medium text-sm pb-1"
            >
              View All Solutions
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[#78614a] text-base leading-relaxed mb-10 max-w-xl"
        >
          Four pillars of clean energy — from your rooftop to the open road,
          from the wind to your factory floor.
        </motion.p>

        {/* Decorative gradient divider */}
        <div
          className="h-px w-full mb-10"
          style={{
            background:
              "linear-gradient(to right, transparent, #e8c96a, transparent)",
          }}
        />

        {/* 4-card grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={cardGridVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={VARIANTS.card}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 50px rgba(217,119,6,0.18)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`group bg-white rounded-3xl overflow-hidden border border-[#e8d5b0] shadow-[0_4px_24px_rgba(120,80,20,0.08)] cursor-pointer ${card.hoverBorder} transition-colors duration-300`}
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(255,251,240,0.9) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span
                  className={`inline-block rounded-full text-xs font-semibold px-3 py-1 ${card.pillBg} ${card.pillText}`}
                >
                  {card.pillLabel}
                </span>
                <h3 className="font-display text-xl font-bold text-[#1a1208] mt-3">
                  {card.title}
                </h3>
                <p className="text-[#78614a] text-sm leading-relaxed mt-2 line-clamp-3">
                  {card.desc}
                </p>
                <div className="mt-5">
                  <Link
                    href={card.href}
                    className="group/link text-amber-600 font-medium text-sm inline-flex items-center gap-1"
                  >
                    Learn More
                    <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
