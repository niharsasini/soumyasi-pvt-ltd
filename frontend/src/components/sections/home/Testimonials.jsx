"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquareHeart, ArrowRight } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING = ["What", "Our", "Clients", "Say"];

export default function Testimonials() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 section-divider" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(217,119,6,0.04), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14" ref={ref}>
          <div className="w-8 h-1 bg-amber-500 rounded-full mb-3 mx-auto sm:hidden" />
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            Testimonials
          </p>
          <motion.h2
            className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-brand-ink"
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {HEADING.map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Clients"
                  ? <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Empty state */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center bg-white rounded-3xl border border-brand-border shadow-warm py-16 sm:py-20 px-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
            <MessageSquareHeart className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-brand-ink font-display font-black text-xl sm:text-2xl">
            Be the first to share your experience.
          </p>
          <p className="text-brand-brown text-sm sm:text-base mt-2 max-w-md mx-auto">
            Contact us to share your feedback — we'd love to feature real stories from our customers here.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-8 py-3.5 font-bold mt-6 hover:scale-105 transition shadow-lg shadow-amber-500/20"
          >
            Share Your Feedback <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
