"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

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
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px", ...options });
  // Skip scroll-triggered reveal when user prefers reduced motion — show content immediately
  return { ref, isInView: reducedMotion ? true : isInView };
}

export { VARIANTS } from "@/lib/animations/variants";
