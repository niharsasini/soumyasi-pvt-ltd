"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap, Sun, Factory, Wind, FolderOpen, ArrowRight } from "lucide-react";
import { VARIANTS } from "@/lib/animations/variants";

// NOTE: lib/data/projects.js contains illustrative, unverified example
// profiles (see the disclaimer at the top of that file) — not real,
// publishable case studies, so it's not used here. This page fetches real
// published projects from the backend and shows an honest empty state
// until real projects are added via the admin panel.

const CATEGORIES = ["All", "Solar", "EV", "Industrial", "Wind"];
const CATEGORY_ICON = { Solar: Sun, EV: Zap, Industrial: Factory, Wind: Wind };

export default function ProjectsClient() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "https://api.soumyashipower.in";
    fetch(`${API}/api/v1/projects/`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,25,0], y:[0,-18,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[8%] left-[4%] h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x:[0,-20,0], y:[0,15,0] }} transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute top-[10%] right-[6%] h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64 rounded-full bg-amber-300/20 blur-3xl" />
          <motion.div animate={{ x:[0,15,0], y:[0,-12,0] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:6 }}
            className="absolute bottom-[8%] left-[50%] h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full bg-amber-400/15 blur-3xl" />
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
            className="mt-5 max-w-2xl mx-auto text-brand-brown text-sm sm:text-base lg:text-lg">
            Solar, EV infrastructure, and industrial power installations across Odisha.
          </motion.p>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        /* Empty state — no published projects yet */
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl border border-brand-border shadow-warm py-16 sm:py-20 px-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
              <FolderOpen className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-brand-ink font-display font-black text-xl sm:text-2xl">
              Our project portfolio is growing.
            </p>
            <p className="text-brand-brown text-sm sm:text-base mt-2 max-w-md mx-auto">
              Contact us to discuss your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-8 py-3.5 font-bold mt-6 hover:scale-105 transition shadow-lg shadow-amber-500/20"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 mb-10 sm:mb-12 pb-1 sm:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActive(cat)}
                  className={`relative flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    active === cat
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-gold"
                      : "bg-white border border-brand-border text-brand-brown hover:border-amber-400 hover:text-brand-ink"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => {
                  const Icon = CATEGORY_ICON[p.category] || Sun;
                  return (
                    <motion.div key={p._id || p.slug}
                      layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: (i % 8) * 0.06 }}
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        className="block bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col"
                      >
                        <div className="h-44 sm:h-48 relative flex-shrink-0">
                          {p.image_url ? (
                            <Image src={p.image_url} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-amber-50 flex items-center justify-center">
                              <Icon size={32} className="text-amber-400" />
                            </div>
                          )}
                          <span className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-white/90 flex items-center justify-center">
                            <Icon size={16} className="text-amber-600" />
                          </span>
                          <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                            {p.status}
                          </span>
                        </div>
                        <div className="p-4 sm:p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-brand-ink text-sm sm:text-base leading-snug mb-2">{p.title}</h3>
                          <div className="flex items-center gap-1 text-brand-muted text-xs mb-1">
                            <MapPin size={11} /> {p.location}
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-3">
                            <span className="text-xs font-semibold text-brand-gold">{p.capacity}</span>
                            <span className="text-xs text-brand-muted">{p.completed_date}</span>
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
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-40 w-40 sm:h-56 sm:w-56 lg:h-64 lg:w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Start Your Project</p>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight mb-5"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
            className="text-amber-100 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Talk to our team about solar, EV charging, or industrial power for your site.
          </motion.p>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
              Request a Quote
            </Link>
            <Link href="/solutions"
              className="inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/70 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
              View Our Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
