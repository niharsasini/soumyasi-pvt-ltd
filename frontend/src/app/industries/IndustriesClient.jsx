"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/data/industries";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function IndustriesClient() {
  const { ref, isInView } = useScrollReveal();

  return (
    <div className="bg-brand-bg text-brand-ink overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 px-4 overflow-hidden bg-brand-bg">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,30,0], y:[0,-20,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[10%] left-[5%] h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x:[0,-25,0], y:[0,20,0] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute bottom-[10%] right-[8%] h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
          <div className="mb-5 flex justify-center">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          </div>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Industries We Serve
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-brand-ink leading-tight mb-6"
            variants={VARIANTS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}
          >
            {["Powering", "Every", "Sector"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Every"
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={VARIANTS.para} initial="hidden" animate={isInView ? "visible" : "hidden"}
            className="text-brand-brown text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From manufacturing floors to hospital corridors — our solutions power every corner of Odisha's economy.
          </motion.p>
        </div>
      </section>

      {/* ── GRID HEADING ── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Our Expertise"
            words={["Industry-Specific", "Solutions"]}
            goldWords={["Industry-Specific"]}
            subtitle="Soumyashi Power supports critical sectors with innovative electrical engineering solutions built for reliability."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
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
                  className="active:scale-[0.98] group bg-white p-4 sm:p-7 rounded-2xl border border-brand-border shadow-warm hover:border-amber-300 hover:shadow-card-hover transition-all duration-300 cursor-default"
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-amber-50 text-brand-gold mb-3 sm:mb-5 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors duration-300">
                    <Icon size={18} className="sm:hidden" />
                    <Icon size={26} className="hidden sm:block" />
                  </div>
                  <h3 className="text-xs sm:text-base font-bold font-display text-brand-ink mb-0 sm:mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="hidden sm:block text-brand-brown text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.1), transparent)" }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white mb-4">
            Partner With a Trusted Electrical Engineering Leader
          </motion.h2>
          <p className="text-amber-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            From industrial plants to smart commercial spaces, we power industries with precision and reliability.
          </p>
          <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
            <Link href="/contact"
              className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-amber-800 bg-white hover:bg-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300">
              Discuss Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
