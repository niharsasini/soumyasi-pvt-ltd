"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { VARIANTS } from "@/lib/animations/variants";

const ARTICLES = [
  {
    slug: "solar-savings-guide",
    title: "How Solar Power Can Cut Your Electricity Bill by 70%",
    excerpt: "A practical guide to understanding net metering, government subsidies, and ROI calculations for rooftop solar in Odisha.",
    category: "Solar",
    date: "May 28, 2026",
    readTime: "5 min",
    catColor: "bg-amber-100 text-amber-700",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    slug: "ev-adoption-odisha-2026",
    title: "EV Adoption in Odisha: 2026 State of the Market",
    excerpt: "Electric vehicle registrations in Odisha surged 3x in the past year. Here's what's driving the growth and where the infrastructure is heading.",
    category: "EV",
    date: "May 15, 2026",
    readTime: "7 min",
    catColor: "bg-indigo-100 text-indigo-700",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    slug: "net-metering-odisha-guide",
    title: "Net Metering in Odisha: Complete 2026 Guide",
    excerpt: "CESU and SOUTHCO policies, step-by-step application process, and how to maximize credits from your solar installation.",
    category: "Policy",
    date: "May 5, 2026",
    readTime: "9 min",
    catColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    slug: "industrial-power-quality",
    title: "Industrial Power Quality: Why It Matters for Manufacturing",
    excerpt: "Voltage fluctuations, harmonics, and power factor issues cost Odisha manufacturers crores annually. Here's how to fix it.",
    category: "Industrial",
    date: "April 22, 2026",
    readTime: "6 min",
    catColor: "bg-orange-100 text-orange-700",
    gradient: "from-orange-400 to-amber-600",
  },
  {
    slug: "solar-myths-debunked",
    title: "Top 5 Myths About Solar Energy in India — Debunked",
    excerpt: "From 'solar doesn't work on cloudy days' to 'it's too expensive' — we bust the most common solar myths with real data from Odisha installations.",
    category: "Solar",
    date: "April 10, 2026",
    readTime: "4 min",
    catColor: "bg-amber-100 text-amber-700",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    slug: "choosing-ev-charger-business",
    title: "Choosing the Right EV Charger for Your Business",
    excerpt: "AC vs DC fast chargers, installation requirements, and cost-benefit analysis for commercial EV charging stations in Odisha.",
    category: "EV",
    date: "March 30, 2026",
    readTime: "8 min",
    catColor: "bg-indigo-100 text-indigo-700",
    gradient: "from-violet-400 to-indigo-500",
  },
];

export default function BlogClient() {
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
            Knowledge Base
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Energy", "Insights"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Insights"
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-brand-brown text-lg">
            Expert guides on solar savings, EV infrastructure, and the future of clean energy in Odisha.
          </motion.p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="section-divider mb-14" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((art, i) => (
              <Link key={art.title} href={`/blog/${art.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Take the Next Step</p>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5"
          >
            Power Up Your Knowledge
          </motion.h2>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
            className="text-amber-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Ready to go solar or install an EV charger? Talk to our experts.
          </motion.p>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Free Assessment
            </Link>
            <Link href="/solutions"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300">
              Explore Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
