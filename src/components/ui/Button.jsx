"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const STYLES = {
  primary: "btn-shimmer bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-full hover:shadow-gold active:scale-95",
  ghost:   "border-2 border-amber-500/50 text-amber-400 font-semibold rounded-full hover:bg-amber-500/10 hover:border-amber-500",
  outline: "border border-white/20 text-white font-semibold rounded-full hover:border-white/40 hover:bg-white/5",
  danger:  "bg-red-600 text-white font-semibold rounded-full hover:bg-red-700",
};

const SIZES = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function Button({
  variant  = "primary",
  size     = "md",
  href,
  children,
  className = "",
  onClick,
  disabled  = false,
  ...rest
}) {
  const base = `inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
    ${STYLES[variant] ?? STYLES.primary}
    ${SIZES[size] ?? SIZES.md}
    ${disabled ? "opacity-50 pointer-events-none" : ""}
    ${className}`;

  const inner = href ? (
    <Link href={href} className={base} tabIndex={disabled ? -1 : undefined} {...rest}>
      {children}
    </Link>
  ) : (
    <button className={base} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="inline-block"
    >
      {inner}
    </motion.div>
  );
}
