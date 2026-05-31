"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sun, Zap, Building2, Settings, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";

const SolarPanelViewer = dynamic(
  () => import("@/components/three/SolarPanelViewer"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full animate-pulse rounded-2xl"
        style={{
          height: 420,
          background: "linear-gradient(to bottom, #020c1b, #0a1628)",
          boxShadow: "0 0 0 1px rgba(34,211,238,0.12)",
        }}
      />
    ),
  }
);

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    desc: "We visit your site, assess your energy needs, and design a tailored solution.",
  },
  {
    num: "02",
    title: "Design & Planning",
    desc: "Engineered blueprints, permits, and procurement — handled end to end.",
  },
  {
    num: "03",
    title: "Execution & Support",
    desc: "Professional installation, commissioning, and lifetime technical support.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#0f172a] text-white overflow-hidden">
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(29,78,216,0.2), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 text-cyan-400 text-xs font-semibold tracking-widest uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Our Core Expertise
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-tight mb-6"
          >
            Advanced Power{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #22d3ee, #3b82f6)" }}
            >
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Engineering excellence delivering sustainable, scalable, and high-performance electrical infrastructure across Odisha.
          </motion.p>
        </div>
      </section>

      {/* ── 3D SOLAR PANEL VIEWER ── */}
      <section className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(34,211,238,0.04), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto grid items-center gap-12 lg:grid-cols-2 relative z-10">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-5">
              <Sun size={16} /> Solar Energy Systems
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-5 leading-tight">
              Interactive Solar Panel Explorer
            </h2>

            <p className="text-gray-400 leading-relaxed mb-4">
              Drag to rotate, scroll to zoom. Every installation is engineered for maximum efficiency and built to last 25+ years.
            </p>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              High-efficiency photovoltaic arrays, precision-mounted and optimised for your site — anti-reflective glass, aluminium frame, and Tier-1 monocrystalline cells.
            </p>

            <ul className="space-y-3 text-gray-300 text-sm mb-8">
              {[
                "Tier-1 monocrystalline modules",
                "Optimised tilt for peak generation",
                "Corrosion-resistant mounting structure",
                "25-year performance warranty",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  {point}
                </li>
              ))}
            </ul>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[#0f172a] bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.4)] transition-all duration-300"
            >
              Request a Site Assessment <ArrowRight size={16} />
            </motion.a>
          </motion.div>

          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <SolarPanelViewer />
          </motion.div>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ── */}
      <section className="py-24 px-6 relative" style={{ background: "#080e1a" }}>
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">
              Core Capabilities
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white">
              Our Core Expertise
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Comprehensive energy and electrical solutions built with modern engineering precision.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-2xl bg-white/4 border border-white/8 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] transition-all duration-300 cursor-default"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-400/10 group-hover:bg-cyan-400/20 text-cyan-400 mb-6 transition-colors duration-300">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 bg-[#0f172a] relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(29,78,216,0.08), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">
              How We Work
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white">
              Our Engineering Approach
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/4 border border-white/8 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div
                  className="text-5xl font-bold font-display mb-4"
                  style={{
                    background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold font-display text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#080e1a" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(29,78,216,0.12), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(34,211,238,0.35), transparent)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-bold font-display text-white mb-6"
          >
            Let's Power Your Next Project
          </motion.h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Partner with Soumyashree Power Limited for innovative, future-ready electrical infrastructure. Serving all of Odisha.
          </p>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base text-[#0f172a] bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300"
          >
            Get Consultation <ArrowRight size={18} />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
