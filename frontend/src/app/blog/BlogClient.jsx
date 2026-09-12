"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { VARIANTS } from "@/lib/animations/variants";

// NOTE: lib/data/blog-posts.js is placeholder content from the initial site
// build, not real published articles. Showing a "coming soon" state here
// instead of presenting invented posts as real content.

export default function BlogClient() {
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
            Knowledge Base
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-brand-ink leading-tight"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Energy", "Insights"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Insights"
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-brand-brown text-sm sm:text-base lg:text-lg">
            Expert guides on solar savings, EV infrastructure, and the future of clean energy in Odisha.
          </motion.p>
        </div>
      </section>

      {/* Empty state — no published articles yet */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl border border-brand-border shadow-warm py-16 sm:py-20 px-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-brand-ink font-display font-black text-xl sm:text-2xl">
            Our blog is coming soon.
          </p>
          <p className="text-brand-brown text-sm sm:text-base mt-2 max-w-md mx-auto">
            We're preparing guides on solar savings, EV infrastructure, and clean energy in Odisha. Check back soon.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-8 py-3.5 font-bold mt-6 hover:scale-105 transition shadow-lg shadow-amber-500/20"
          >
            Talk to Our Experts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-40 w-40 sm:h-56 sm:w-56 lg:h-64 lg:w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Take the Next Step</p>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight mb-5"
          >
            Power Up Your Knowledge
          </motion.h2>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
            className="text-amber-100 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Ready to go solar or install an EV charger? Talk to our experts.
          </motion.p>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
              Get Free Assessment
            </Link>
            <Link href="/solutions"
              className="inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/70 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
              Explore Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
