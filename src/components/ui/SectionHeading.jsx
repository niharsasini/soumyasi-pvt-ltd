"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { VARIANTS } from "@/lib/animations/variants";

export default function SectionHeading({ badge, words = [], goldWords = [], subtitle, center = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`} ref={ref}>
      {badge && (
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
          {badge}
        </p>
      )}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold font-display text-brand-ink leading-tight"
        variants={VARIANTS.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
            {goldWords.includes(w)
              ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
              : w}
          </motion.span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={VARIANTS.para}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`mt-4 text-brand-brown max-w-xl text-base leading-relaxed ${center ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
