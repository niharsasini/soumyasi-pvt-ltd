"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Settings, Award, Clock, ArrowRight } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING  = ["Odisha's", "Most", "Trusted", "Energy", "Partner"];

const FEATURES = [
  {
    icon:  MapPin,
    title: "Local Expertise",
    desc:  "Born and built in Odisha — we know the terrain, the regulations, and the communities we serve.",
  },
  {
    icon:  Settings,
    title: "End-to-End Service",
    desc:  "From site survey and design to installation, commissioning, and ongoing maintenance.",
  },
  {
    icon:  Award,
    title: "Certified Engineers",
    desc:  "National certifications for solar, EV infrastructure, and industrial electrical systems.",
  },
  {
    icon:  Clock,
    title: "24/7 Support",
    desc:  "Round-the-clock monitoring and rapid-response support so your systems never go dark.",
  },
];

/* Concentric ring radii and colors */
const RINGS = [
  { r: 190, color: "rgba(217,119,6,0.15)",  dur: 10  },
  { r: 148, color: "rgba(245,158,11,0.12)", dur: 14  },
  { r: 108, color: "rgba(217,119,6,0.20)",  dur: 8   },
  { r: 72,  color: "rgba(245,158,11,0.18)", dur: 18  },
];

export default function WhyChooseUs() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-24 bg-brand-section relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — feature list */}
          <div ref={ref}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
              Why Choose Us
            </p>

            <motion.h2
              className="text-4xl sm:text-5xl font-bold font-display text-brand-ink leading-tight mb-5"
              variants={VARIANTS.container}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {HEADING.map((w, i) => (
                <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                  {["Trusted", "Partner"].includes(w)
                    ? <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{w}</span>
                    : w}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              variants={VARIANTS.para}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-brand-brown leading-relaxed mb-10"
            >
              We deliver high-performance power solutions built for efficiency, reliability, and long-term excellence.
            </motion.p>

            <motion.div
              variants={VARIANTS.cardGrid}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.title} variants={VARIANTS.card} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-300">
                      <Icon size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-brand-ink">{f.title}</h3>
                      <p className="text-sm text-brand-brown mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — animated concentric rings */}
          <div className="hidden lg:flex items-center justify-center h-[460px]">
            <div className="relative flex items-center justify-center">
              {RINGS.map(({ r, color, dur }, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
                  className="absolute rounded-full"
                  style={{ width: r, height: r, border: `1px solid ${color}` }}
                />
              ))}

              {/* Pulsing centre */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 text-center px-6"
              >
                <div
                  className="text-5xl font-bold font-display mb-1"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  10+
                </div>
                <div className="text-brand-ink font-display font-semibold text-base">Years in Odisha</div>
                <div className="text-brand-muted text-xs mt-1 tracking-wider uppercase">Power · Precision · Pride</div>
              </motion.div>

              {/* Corner stats on ring */}
              {[
                { label: "500+",    sub: "Projects",   angle: 45  },
                { label: "ISO",     sub: "Certified",  angle: 135 },
                { label: "50+",     sub: "EV Stations",angle: 225 },
                { label: "24/7",    sub: "Support",    angle: 315 },
              ].map(({ label, sub, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 110;
                return (
                  <div
                    key={label}
                    className="absolute bg-white border border-brand-border shadow-warm rounded-xl px-3 py-2 text-center"
                    style={{
                      left: `calc(50% + ${Math.cos(rad) * dist}px - 36px)`,
                      top:  `calc(50% + ${Math.sin(rad) * dist}px - 22px)`,
                    }}
                  >
                    <div className="text-brand-gold font-bold text-sm font-display">{label}</div>
                    <div className="text-brand-muted text-[10px]">{sub}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] hover:scale-105 transition-all duration-300"
          >
            Get Free Assessment <ArrowRight size={15} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300"
          >
            See Our Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
