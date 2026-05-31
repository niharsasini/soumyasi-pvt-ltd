"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Returns a ref to attach to a section wrapper, plus:
 *   isInView  — boolean
 *   VARIANTS  — framer-motion variant maps for headings, cards, and paragraphs
 *
 * Usage:
 *   const { ref, isInView, VARIANTS } = useScrollReveal();
 *   <motion.div ref={ref} variants={VARIANTS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
 *     {"Heading Text".split(" ").map((w, i) => (
 *       <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">{w}</motion.span>
 *     ))}
 *   </motion.div>
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", ...options });
  return { ref, isInView };
}

/* Shared variant definitions — import alongside the hook */
export const VARIANTS = {
  /* Heading wrapper — stagger children */
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  },

  /* Individual word in a heading */
  word: {
    hidden:   { opacity: 0, x: -40 },
    visible:  { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  },

  /* Card grid wrapper */
  cardGrid: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  },

  /* Individual card */
  card: {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },

  /* Paragraph / subtitle */
  para: {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
};
