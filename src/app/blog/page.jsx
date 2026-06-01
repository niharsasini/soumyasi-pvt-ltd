"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const ARTICLES = [
  {
    title: "How Solar Power Can Cut Your Electricity Bill by 70%",
    excerpt: "A practical guide to understanding net metering, government subsidies, and ROI calculations for rooftop solar in Odisha.",
    category: "Solar",
    date: "May 28, 2026",
    readTime: "5 min",
    catColor: "bg-amber-100 text-amber-700",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "EV Adoption in Odisha: 2026 State of the Market",
    excerpt: "Electric vehicle registrations in Odisha surged 3x in the past year. Here's what's driving the growth and where the infrastructure is heading.",
    category: "EV",
    date: "May 15, 2026",
    readTime: "7 min",
    catColor: "bg-indigo-100 text-indigo-700",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    title: "Net Metering in Odisha: Complete 2026 Guide",
    excerpt: "CESU and SOUTHCO policies, step-by-step application process, and how to maximize credits from your solar installation.",
    category: "Policy",
    date: "May 5, 2026",
    readTime: "9 min",
    catColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Industrial Power Quality: Why It Matters for Manufacturing",
    excerpt: "Voltage fluctuations, harmonics, and power factor issues cost Odisha manufacturers crores annually. Here's how to fix it.",
    category: "Industrial",
    date: "April 22, 2026",
    readTime: "6 min",
    catColor: "bg-slate-100 text-slate-700",
    gradient: "from-slate-400 to-gray-600",
  },
  {
    title: "Top 5 Myths About Solar Energy in India — Debunked",
    excerpt: "From 'solar doesn't work on cloudy days' to 'it's too expensive' — we bust the most common solar myths with real data from Odisha installations.",
    category: "Solar",
    date: "April 10, 2026",
    readTime: "4 min",
    catColor: "bg-amber-100 text-amber-700",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    title: "Choosing the Right EV Charger for Your Business",
    excerpt: "AC vs DC fast chargers, installation requirements, and cost-benefit analysis for commercial EV charging stations in Odisha.",
    category: "EV",
    date: "March 30, 2026",
    readTime: "8 min",
    catColor: "bg-indigo-100 text-indigo-700",
    gradient: "from-violet-400 to-indigo-500",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.05), transparent)" }} />
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
          Knowledge Base
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight">
          Energy{" "}
          <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Insights</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-5 max-w-xl mx-auto text-brand-brown text-lg">
          Expert guides on solar savings, EV infrastructure, and the future of clean energy in Odisha.
        </motion.p>
      </section>

      {/* Articles grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-divider mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((art, i) => (
              <motion.article
                key={art.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Cover */}
                <div className={`h-36 bg-gradient-to-br ${art.gradient} flex items-center justify-center`}>
                  <Tag size={28} className="text-white/70" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className={`inline-flex self-start text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 ${art.catColor}`}>
                    {art.category}
                  </span>
                  <h2 className="font-bold font-display text-brand-ink text-base leading-snug mb-3 flex-1">
                    {art.title}
                  </h2>
                  <p className="text-brand-brown text-sm leading-relaxed mb-5">
                    {art.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                    <div className="flex items-center gap-1.5 text-brand-muted text-xs">
                      <Calendar size={12} />
                      <span>{art.date}</span>
                      <span className="mx-1">·</span>
                      <span>{art.readTime} read</span>
                    </div>
                    <span className="text-brand-gold text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
