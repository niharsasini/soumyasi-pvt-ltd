"use client";

import { motion } from "framer-motion";
import { MapPin, Settings, Award, Clock } from "lucide-react";

const FEATURES = [
  {
    icon: MapPin,
    title: "Local Expertise",
    desc: "Born and built in Odisha — we know the terrain, the regulations, and the communities we serve.",
  },
  {
    icon: Settings,
    title: "End-to-End Service",
    desc: "From site survey and design to installation, commissioning, and ongoing maintenance.",
  },
  {
    icon: Award,
    title: "Certified Engineers",
    desc: "Our team holds national certifications for solar, EV infrastructure, and industrial electrical work.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock monitoring and rapid-response support so your systems never go dark.",
  },
];

const CORNER_STATS = [
  { stat: "ISO 9001", sub: "Certified", pos: "top-6 left-6" },
  { stat: "10+", sub: "Years", pos: "top-6 right-6" },
  { stat: "500+", sub: "Projects", pos: "bottom-6 left-6" },
  { stat: "24/7", sub: "Support", pos: "bottom-6 right-6" },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Left glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 0% 50%, rgba(29,78,216,0.07), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT – Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-4 block"
            >
              Why Choose Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5"
            >
              Odisha's Most Trusted{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #22d3ee, #3b82f6)" }}
              >
                Energy Partner
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 leading-relaxed mb-10"
            >
              We deliver high-performance power solutions engineered for efficiency, reliability, and long-term excellence — helping Odisha grow sustainably.
            </motion.p>

            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div key={feat.title} variants={itemVariants} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-cyan-400/10 group-hover:bg-cyan-400/20 flex items-center justify-center transition-colors duration-300">
                      <Icon size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{feat.title}</h3>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT – Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div
              className="relative h-[480px] w-full rounded-3xl overflow-hidden border border-white/8"
              style={{
                background: "linear-gradient(135deg, rgba(29,78,216,0.12), rgba(34,211,238,0.04))",
              }}
            >
              {/* Pulsing orbs */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/3 h-36 w-36 rounded-full bg-cyan-400/15 blur-2xl"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-1/3 right-1/3 h-28 w-28 rounded-full bg-blue-600/20 blur-2xl"
              />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-6xl mb-4"
                    style={{ filter: "drop-shadow(0 0 20px rgba(34,211,238,0.4))" }}
                  >
                    ⚡
                  </div>
                  <div className="text-white font-display font-bold text-xl tracking-wide">
                    Power. Precision. Pride.
                  </div>
                  <div className="text-cyan-400 text-sm mt-2 tracking-widest uppercase">
                    Made in Odisha
                  </div>
                </div>
              </div>

              {/* Corner stat chips */}
              {CORNER_STATS.map((s) => (
                <div
                  key={s.stat}
                  className={`absolute ${s.pos} bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center backdrop-blur-sm`}
                >
                  <div className="text-cyan-400 font-bold text-lg font-display">{s.stat}</div>
                  <div className="text-gray-400 text-[11px]">{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
