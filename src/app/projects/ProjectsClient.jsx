"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap, Sun, Factory, Wind } from "lucide-react";
import { VARIANTS } from "@/lib/animations/variants";
import { PROJECTS } from "@/lib/data/projects";

const CATEGORIES = ["All", "Solar", "EV", "Industrial", "Wind"];

const CATEGORY_ICON = { Solar: Sun, EV: Zap, Industrial: Factory, Wind: Wind };

const STATUS_COLOR = {
  Completed: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Coming Soon": "bg-amber-100 text-amber-700",
};

export default function ProjectsClient() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,25,0], y:[0,-18,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[8%] left-[4%] h-80 w-80 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x:[0,-20,0], y:[0,15,0] }} transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute top-[10%] right-[6%] h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
          <motion.div animate={{ x:[0,15,0], y:[0,-12,0] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:6 }}
            className="absolute bottom-[8%] left-[50%] h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
        </div>
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Our Portfolio
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-brand-ink leading-tight"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Our", "Work", "Across", "Odisha"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Odisha"
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-brand-brown text-base sm:text-lg">
            500+ installations across solar, EV infrastructure, and industrial power.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === cat
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-gold"
                    : "bg-white border border-brand-border text-brand-brown hover:border-amber-400 hover:text-brand-ink"
                }`}>
                {cat}
                {active === cat && (
                  <motion.div layoutId="tab-indicator" className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 -z-10" />
                )}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const Icon = CATEGORY_ICON[p.category] || Sun;
                return (
                  <motion.div key={p.slug}
                    layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: (i % 8) * 0.06 }}
                  >
                    <Link
                      href={`/projects/${p.slug}`}
                      className="block bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300"
                    >
                      <div className="h-40 relative">
                        <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
                        <div className="absolute inset-0 bg-black/15" />
                        <span className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-white/90 flex items-center justify-center">
                          <Icon size={16} className="text-amber-600" />
                        </span>
                        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLOR[p.status] || "bg-amber-100 text-amber-700"}`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-brand-ink text-sm leading-snug mb-2">{p.title}</h3>
                        <div className="flex items-center gap-1 text-brand-muted text-xs mb-1">
                          <MapPin size={11} /> {p.location}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-semibold text-brand-gold">{p.capacity}</span>
                          <span className="text-xs text-brand-muted">{p.completedDate}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Start Your Project</p>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
            className="text-amber-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ satisfied customers across Odisha.
          </motion.p>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Request a Quote
            </Link>
            <Link href="/solutions"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300">
              View Our Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
