"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

/**
 * items: [{ label, href }, ...] — last item has no href and renders as the current page.
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-transparent"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={13} className="text-[#a8917a]" aria-hidden="true" />}
              {isLast || !item.href ? (
                <span className="text-[#1a1208] font-medium" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-[#a8917a] hover:text-amber-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
