"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/data/industries";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import SectionHeading from '@/components/ui/SectionHeading';

export default function IndustriesClient() {
  const { ref, isInView } = useScrollReveal();

  return (
    <div className="bg-brand-bg text-brand-ink overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-brand-bg">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,30,0], y:[0,-20,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[10%] left-[5%] h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x:[0,-25,0], y:[0,20,0] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute bottom-[10%] right-[8%] h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Industries We Serve
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight mb-6"
            variants={VARIANTS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}
          >
            {["Powering", "Every", "Sector"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Every"
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={VARIANTS.para} initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="text-brand-brown text-lg leading-relaxed max-w-2xl mx-auto">
            From manufacturing floors to hospital corridors — our solutions power every corner of Odisha's economy.
          </motion.p>
        </div>
      </section>

      {/* ── GRID HEADING ── */}
      <section className="pb-24 px-4 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Our Expertise"
            words={["Industry-Specific", "Solutions"]}
            goldWords={["Industry-Specific"]}
            subtitle="Soumyashree Power supports critical sectors with innovative electrical engineering solutions built for reliability."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity:0, y:40 }}
                  whileInView={{ opacity:1, y:0 }}
                  transition={{ duration:0.5, delay:(index % 4) * 0.1 }}
                  viewport={{ once:true }}
                  whileHover={{ y:-6 }}
                  className="group bg-white p-7 rounded-2xl border border-brand-border shadow-warm hover:border-amber-300 hover:shadow-card-hover transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 text-brand-gold mb-5 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors duration-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-base font-bold font-display text-brand-ink mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-brand-brown text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.1), transparent)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
            Partner With a Trusted Electrical Engineering Leader
          </motion.h2>
          <p className="text-amber-100 max-w-xl mx-auto mb-8 leading-relaxed">
            From industrial plants to smart commercial spaces, we power industries with precision and reliability.
          </p>
          <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-800 bg-white hover:bg-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300">
              Discuss Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
