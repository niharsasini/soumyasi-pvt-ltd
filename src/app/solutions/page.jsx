"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";

const solutions = SOLUTIONS;

// Lazy-load the WebGL viewer client-side only so it never blocks SSR.
const SolarPanelViewer = dynamic(
  () => import("@/components/three/SolarPanelViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full animate-pulse rounded-2xl bg-gradient-to-b from-brand-dark to-brand-darker ring-1 ring-white/10 sm:h-[480px] lg:h-[560px]" />
    ),
  },
);

export default function SolutionsPage() {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold leading-tight"
          >
            Advanced Power Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-blue-100 text-lg"
          >
            Engineering excellence delivering sustainable, scalable and
            high-performance electrical infrastructure.
          </motion.p>
        </div>

        {/* Subtle Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[50px]" />
      </section>

      {/* ================= 3D SOLAR PANEL VIEWER ================= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-accentDark">
              <Sun size={18} /> Solar Energy Systems
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-brand-primaryDark">
              Engineered for Maximum Yield
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              High-efficiency photovoltaic arrays, precision-mounted and
              optimised for your site. Drag to orbit the module, scroll to zoom
              in on the cell layout, anti-reflective glass and aluminium frame.
            </p>

            <ul className="mt-8 space-y-3 text-gray-700">
              {[
                "Tier-1 monocrystalline modules",
                "Optimised tilt for peak generation",
                "Corrosion-resistant mounting structure",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 rounded-lg bg-brand-accent px-8 py-3 font-semibold text-black shadow-md transition hover:bg-brand-accentDark"
            >
              Request a Site Assessment
            </motion.button>
          </motion.div>

          {/* RIGHT — interactive 3D model */}
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

      {/* ================= SOLUTIONS GRID ================= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Our Core Expertise
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Comprehensive energy and electrical solutions built with modern
              engineering precision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {solutions.map((item, index) => {
              const Icon = item.icon;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-6 group-hover:bg-yellow-400 group-hover:text-black transition">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-blue-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-blue-900"
          >
            Our Engineering Approach
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16 text-left">
            {["Consultation", "Design & Planning", "Execution & Support"].map(
              (step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-blue-100 hover:shadow-lg transition"
                >
                  <div className="text-yellow-500 text-4xl font-bold mb-4">
                    0{index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    {step}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Structured workflow ensuring quality, efficiency and
                    long-term system reliability.
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold"
        >
          Let’s Power Your Next Project
        </motion.h2>

        <p className="mt-6 text-blue-100 max-w-xl mx-auto">
          Partner with Soumyashree Power Limited for innovative, future-ready
          electrical infrastructure.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition shadow-lg"
        >
          Get Consultation
        </motion.button>
      </section>
    </div>
  );
}
