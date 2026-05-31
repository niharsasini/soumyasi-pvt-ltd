"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full py-28 bg-[#0f172a] relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(29,78,216,0.14), transparent)",
        }}
      />

      {/* Top + bottom cyan border lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(34,211,238,0.45), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(34,211,238,0.25), transparent)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-400/8 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 h-48 w-48 rounded-full bg-blue-600/12 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white leading-tight mb-6"
        >
          Ready to Switch to{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            }}
          >
            Clean Energy?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Get a free solar assessment or find your nearest EV charging station. Our experts are ready to power your future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-[#0f172a] bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300 hover:scale-105"
          >
            Get Free Assessment
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300"
          >
            Find EV Station
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
