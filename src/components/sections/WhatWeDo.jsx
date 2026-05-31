"use client";

import { motion } from "framer-motion";
import { Sun, Zap, Factory } from "lucide-react";

const CARDS = [
  {
    icon: Sun,
    title: "Solar Power",
    description:
      "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Clean energy, real savings.",
    gradient: "from-amber-500/15 to-orange-600/8",
    borderHover: "hover:border-amber-400/50",
    glowHover: "hover:shadow-[0_0_40px_rgba(251,191,36,0.12)]",
    iconBg: "bg-amber-400/10 group-hover:bg-amber-400/20",
    iconColor: "text-amber-400",
    tag: "Rooftop · Ground-Mount · Odisha-wide",
  },
  {
    icon: Zap,
    title: "EV Charging Network",
    description:
      "Our fast-charging EV network spans Bhubaneswar, Cuttack, Puri, and growing. Find a station, charge up, move on.",
    gradient: "from-cyan-500/15 to-blue-600/8",
    borderHover: "hover:border-cyan-400/50",
    glowHover: "hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]",
    iconBg: "bg-cyan-400/10 group-hover:bg-cyan-400/20",
    iconColor: "text-cyan-400",
    tag: "Bhubaneswar · Cuttack · Puri · And More",
  },
  {
    icon: Factory,
    title: "Industrial Power",
    description:
      "Industrial switchgear, substations, transformers — we handle the full spectrum of electrical infrastructure for Odisha's industries.",
    gradient: "from-blue-500/15 to-indigo-600/8",
    borderHover: "hover:border-blue-400/50",
    glowHover: "hover:shadow-[0_0_40px_rgba(96,165,250,0.12)]",
    iconBg: "bg-blue-400/10 group-hover:bg-blue-400/20",
    iconColor: "text-blue-400",
    tag: "Switchgear · Substations · Transformers",
  },
];

export default function WhatWeDo() {
  return (
    <section className="w-full py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Section divider top */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight">
            Energy Solutions for a{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              }}
            >
              New Odisha
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base">
            Three core pillars. One mission: power Odisha's future, cleanly and reliably.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className={`group relative p-8 rounded-2xl bg-white/4 border border-white/8 ${card.borderHover} ${card.glowHover} transition-all duration-400 overflow-hidden cursor-default`}
              >
                {/* Card gradient fill on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center mb-5 transition-colors duration-300 ${card.iconColor}`}
                  >
                    <Icon size={28} />
                  </div>

                  {/* Tag */}
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500 mb-3">
                    {card.tag}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-white mb-3">{card.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-sm">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
