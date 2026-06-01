"use client";

import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : {}}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className={`bg-white border border-brand-border rounded-2xl shadow-warm transition-all duration-300 
        ${hover ? "hover:border-amber-400 hover:shadow-card-hover cursor-pointer" : ""} 
        ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
