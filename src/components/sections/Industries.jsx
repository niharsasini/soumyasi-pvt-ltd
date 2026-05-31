"use client";

import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/data/industries";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Industries() {
  return (
    <section className="w-full py-24 relative overflow-hidden" style={{ background: "#080e1a" }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(29,78,216,0.1), transparent)",
        }}
      />

      {/* Top divider */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">
            Industries We Serve
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white">
            Powering Every Sector
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            From manufacturing floors to hospital corridors — our solutions power every corner of Odisha's economy.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                variants={item}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/4 border border-white/8 hover:border-cyan-400/40 hover:bg-white/7 transition-all duration-300 cursor-default"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Icon */}
                <div className="w-13 h-13 w-12 h-12 rounded-xl bg-cyan-400/8 group-hover:bg-cyan-400/16 flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon size={24} className="text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                  {ind.title}
                </h3>

                {/* Description (visible on sm+) */}
                <p className="mt-2 text-[11px] text-gray-500 leading-relaxed hidden sm:block">
                  {ind.description.split(".")[0]}.
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
