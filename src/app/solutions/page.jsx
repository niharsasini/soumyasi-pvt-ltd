"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Sun, Building2, Settings, ShieldCheck, Cpu } from "lucide-react";

const solutions = [
  {
    icon: <Sun size={30} />,
    title: "Solar Energy Systems",
    description:
      "High-efficiency solar installations designed for commercial and residential energy optimization.",
  },
  {
    icon: <Zap size={30} />,
    title: "Power Distribution",
    description:
      "Reliable electrical distribution networks engineered for scalable infrastructure growth.",
  },
  {
    icon: <Building2 size={30} />,
    title: "Industrial Electrification",
    description:
      "Turnkey electrical solutions for factories, plants, and industrial facilities.",
  },
  {
    icon: <Settings size={30} />,
    title: "Maintenance & AMC",
    description:
      "Preventive maintenance ensuring uninterrupted system performance and reliability.",
  },
  {
    icon: <ShieldCheck size={30} />,
    title: "Safety & Compliance",
    description:
      "Electrical audits and safety compliance aligned with national standards.",
  },
  {
    icon: <Cpu size={30} />,
    title: "Smart Energy Automation",
    description:
      "IoT-enabled smart monitoring systems for intelligent energy management.",
  },
];

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
            {solutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-6 group-hover:bg-yellow-400 group-hover:text-black transition">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
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
