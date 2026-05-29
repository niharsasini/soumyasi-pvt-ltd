"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Button({
  href = "#",
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon: Icon,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary";

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primaryDark",
    outline:
      "border border-slate-400 text-slate-700 hover:border-brand-primary hover:text-brand-primary",
    dark: "bg-gray-900 text-white hover:bg-black",
    ghost: "text-brand-primary hover:bg-blue-50",
  };

  const disabledStyles = "opacity-50 pointer-events-none";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={`
          ${base}
          ${sizes[size]}
          ${variants[variant]}
          ${disabled ? disabledStyles : ""}
        `}
      >
        {Icon && <Icon size={16} />}
        {children}
      </Link>
    </motion.div>
  );
}
