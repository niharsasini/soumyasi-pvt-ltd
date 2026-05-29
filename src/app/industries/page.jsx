"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Factory,
  Building2,
  Hospital,
  School,
  Landmark,
  Cpu,
  Warehouse,
  Hotel,
} from "lucide-react";

const industries = [
  {
    icon: <Factory size={28} />,
    title: "Manufacturing & Industrial Plants",
    description:
      "Complete electrical infrastructure solutions for factories, heavy industries, and production facilities.",
  },
  {
    icon: <Building2 size={28} />,
    title: "Commercial Complexes",
    description:
      "High-performance electrical systems for offices, malls, IT parks, and commercial buildings.",
  },
  {
    icon: <Hospital size={28} />,
    title: "Healthcare Facilities",
    description:
      "Reliable and compliant electrical installations for hospitals, clinics, and medical institutions.",
  },
  {
    icon: <School size={28} />,
    title: "Educational Institutions",
    description:
      "Safe and energy-efficient power systems for schools, colleges, and universities.",
  },
  {
    icon: <Landmark size={28} />,
    title: "Government & Infrastructure",
    description:
      "Large-scale electrification projects supporting public infrastructure and utilities.",
  },
  {
    icon: <Cpu size={28} />,
    title: "IT & Data Centers",
    description:
      "Smart power management systems for data centers and technology-driven enterprises.",
  },
  {
    icon: <Warehouse size={28} />,
    title: "Warehousing & Logistics",
    description:
      "Robust electrical setups designed for distribution hubs and logistics operations.",
  },
  {
    icon: <Hotel size={28} />,
    title: "Hospitality & Real Estate",
    description:
      "Energy-efficient solutions for hotels, residential complexes, and real estate developments.",
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Industries We Serve
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-blue-100 text-lg"
          >
            Delivering reliable and scalable electrical solutions across diverse
            industries powering growth and innovation.
          </motion.p>
        </div>
      </section>

      {/* ================= INDUSTRIES GRID ================= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Our Industry Expertise
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Soumyashree Power Limited supports critical sectors with
              innovative electrical engineering solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-5 group-hover:bg-yellow-400 group-hover:text-black transition">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-blue-900 mb-3">
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

      {/* ================= CTA ================= */}
      <section className="bg-blue-50 py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-blue-900"
        >
          Partner With a Trusted Electrical Engineering Leader
        </motion.h2>

        <p className="mt-6 text-gray-600 max-w-xl mx-auto">
          From industrial plants to smart commercial spaces, we power industries
          with precision and reliability.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition shadow-md"
        >
          Discuss Your Project
        </motion.button>
      </section>
    </div>
  );
}
