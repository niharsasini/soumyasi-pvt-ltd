"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sun, Zap, Wind, Factory, ArrowRight,
  ShieldCheck, Award, Clock, MapPin,
} from "lucide-react";
import { VARIANTS } from "@/lib/animations/variants";

const CARDS = [
  {
    key: "solar",
    image: "/soumyasi/solar-field-odisha.png",
    objectPosition: "object-top",
    pillClass: "bg-amber-50 border-amber-200 text-amber-700",
    pillLabel: "☀️ Solar",
    Icon: Sun,
    iconClass: "text-amber-600",
    iconBgClass: "bg-amber-50",
    accentTextClass: "text-amber-600",
    accentDotClass: "bg-amber-600",
    hoverBorderClass: "hover:border-amber-400/40",
    hoverShadowClass: "hover:shadow-[0_20px_60px_rgba(217,119,6,0.15)]",
    title: "Solar Power Installation",
    desc: "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Cut electricity bills by up to 90%.",
    stats: [
      { value: "500+", label: "Installations" },
      { value: "25yr", label: "Warranty" },
    ],
    href: "/solutions/solar-rooftop",
  },
  {
    key: "ev",
    image: "/soumyasi/ev-charger-ultra60.png",
    objectPosition: "object-center",
    pillClass: "bg-emerald-50 border-emerald-200 text-emerald-700",
    pillLabel: "⚡ EV",
    Icon: Zap,
    iconClass: "text-emerald-600",
    iconBgClass: "bg-emerald-50",
    accentTextClass: "text-emerald-600",
    accentDotClass: "bg-emerald-600",
    hoverBorderClass: "hover:border-emerald-400/40",
    hoverShadowClass: "hover:shadow-[0_20px_60px_rgba(5,150,105,0.15)]",
    title: "EV Charging Network",
    desc: "Fast-charging stations across Odisha. Our 60kW Ultra Thunder Charge powers most EVs in under 30 minutes. Partner with us to earn revenue.",
    stats: [
      { value: "60kW", label: "Fast Charge" },
      { value: "50+", label: "Stations" },
    ],
    href: "/solutions/ev-charging",
  },
  {
    key: "wind",
    image: "/soumyasi/wind-power-plant.png",
    objectPosition: "object-center",
    pillClass: "bg-sky-50 border-sky-200 text-sky-700",
    pillLabel: "💨 Wind",
    Icon: Wind,
    iconClass: "text-sky-600",
    iconBgClass: "bg-sky-50",
    accentTextClass: "text-sky-600",
    accentDotClass: "bg-sky-600",
    hoverBorderClass: "hover:border-sky-400/40",
    hoverShadowClass: "hover:shadow-[0_20px_60px_rgba(2,132,199,0.15)]",
    title: "Wind Power Plant",
    desc: "Harnessing Odisha's coastal and inland wind corridors for clean energy generation. From small turbines to utility-scale wind farms.",
    stats: [
      { value: "2MW", label: "Max Capacity" },
      { value: "20yr", label: "Design Life" },
    ],
    href: "/solutions/wind-power",
  },
  {
    key: "industrial",
    image: "/soumyasi/industrial-power.png",
    objectPosition: "object-center",
    pillClass: "bg-orange-50 border-orange-200 text-orange-700",
    pillLabel: "🏭 Industrial",
    Icon: Factory,
    iconClass: "text-orange-600",
    iconBgClass: "bg-orange-50",
    accentTextClass: "text-orange-600",
    accentDotClass: "bg-orange-600",
    hoverBorderClass: "hover:border-orange-400/40",
    hoverShadowClass: "hover:shadow-[0_20px_60px_rgba(234,88,12,0.15)]",
    title: "Industrial Power Supply",
    desc: "Complete electrical infrastructure for factories, plants, and commercial complexes. Transformers, switchgear, substations — zero downtime guaranteed.",
    stats: [
      { value: "10MVA", label: "Max Load" },
      { value: "IE Rules", label: "Certified" },
    ],
    href: "/solutions/industrial-power",
  },
];

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: "MNRE Certified" },
  { Icon: Award, label: "IE Rules Compliant" },
  { Icon: Clock, label: "10+ Years Experience" },
  { Icon: MapPin, label: "15+ Cities Served" },
];

const linkFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } },
};

const subtitleVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
};

const trustStripVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } },
};

function ServiceCard({ card, index, isInView }) {
  const { Icon } = card;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className={`group bg-white rounded-3xl overflow-hidden border border-[#e8d5b0] shadow-[0_4px_24px_rgba(120,80,20,0.08)] cursor-pointer transition-all duration-300 ${card.hoverBorderClass} ${card.hoverShadowClass}`}
    >
      <Link href={card.href} className="block">
        {/* Image */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover ${card.objectPosition} transition-transform duration-700 ease-out group-hover:scale-110`}
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm bg-white/80 border ${card.pillClass}`}>
            {card.pillLabel}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBgClass}`}>
              <Icon className={`w-5 h-5 ${card.iconClass}`} />
            </div>
            <h3 className="font-display font-bold text-[#1a1208] text-base sm:text-lg leading-snug">{card.title}</h3>
          </div>

          <p className="text-[#78614a] text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">{card.desc}</p>

          {/* Stats row */}
          <div className="flex gap-2 mb-5">
            {card.stats.map((s) => (
              <div key={s.label} className="bg-[#FFFBF0] rounded-xl px-2 py-2 flex-1 text-center">
                <p className={`font-black text-xs ${card.accentTextClass}`}>{s.value}</p>
                <p className="text-[#a8917a] text-[9px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1 font-semibold text-xs sm:text-sm transition-all group-hover:gap-2 ${card.accentTextClass}`}>
              Learn More
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className={`w-2 h-2 rounded-full ${card.accentDotClass} opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full bg-[#FFF8E7] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="w-8 h-1 bg-amber-500 rounded-full mb-3 sm:hidden" />
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-1.5 text-amber-700 text-xs font-bold tracking-widest mb-4"
            >
              OUR SERVICES
            </motion.span>

            <motion.h2
              className="font-display font-black text-[#1a1208] text-2xl sm:text-4xl lg:text-5xl leading-tight"
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

            <motion.p
              variants={subtitleVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-[#78614a] text-sm sm:text-base max-w-lg mt-3"
            >
              Four pillars of clean energy infrastructure — from your rooftop to the open road.
            </motion.p>
          </div>

          <motion.div variants={linkFadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center lg:text-left">
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 text-amber-600 font-semibold text-sm sm:text-base hover:gap-3 transition-all duration-300"
            >
              View All Solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent mt-8 mb-12" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <ServiceCard key={card.key} card={card} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          variants={trustStripVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 bg-white rounded-2xl border border-[#e8d5b0] shadow-warm px-8 py-5 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 text-center sm:text-left"
        >
          <p className="text-[#78614a] text-sm font-medium">
            Trusted by 500+ customers across Odisha
          </p>

          <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-8">
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center justify-center sm:justify-start gap-2 text-[#78614a] text-sm">
                <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-6 py-2.5 text-sm font-bold hover:scale-105 transition shadow-md shadow-amber-500/20"
          >
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
