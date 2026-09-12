"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin, ArrowRight, X } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING_LINE_1 = ["Our", "Projects"];
const HEADING_LINE_2 = ["Across", "Odisha"];

const BASE_CATEGORIES = ["Solar", "EV Charging", "Wind Power", "Industrial"];

const CATEGORY_PILL_STYLES = {
  Solar: "bg-amber-500/20 border-amber-400/40 text-amber-300",
  "EV Charging": "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
  "Wind Power": "bg-sky-500/20 border-sky-400/40 text-sky-300",
  Industrial: "bg-orange-500/20 border-orange-400/40 text-orange-300",
};
const DEFAULT_PILL_STYLE = "bg-slate-500/20 border-slate-400/40 text-slate-300";

export default function Gallery() {
  const { ref, isInView } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "https://api.soumyashipower.in";

    fetch(`${API}/api/v1/gallery`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data)) {
          setGalleryItems(data.map((item, i) => ({
            size: "medium",
            accent: "amber",
            ...item,
            id: item.id || i,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...BASE_CATEGORIES,
    ...Array.from(new Set(galleryItems.map((i) => i.category))).filter(
      (c) => !BASE_CATEGORIES.includes(c)
    ),
  ];

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="w-full bg-brand-section py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4" ref={ref}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-amber-100 border border-amber-200 rounded-full px-4 py-2 inline-flex items-center gap-2"
            >
              <Camera className="text-amber-600 w-3.5 h-3.5" />
              <span className="text-amber-700 text-xs font-bold tracking-widest">
                OUR WORK IN ODISHA
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-brand-ink mt-4 leading-tight"
              variants={VARIANTS.container}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="block">
                {HEADING_LINE_1.map((w, i) => (
                  <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block text-amber-600">
                {HEADING_LINE_2.map((w, i) => (
                  <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                    {w}
                  </motion.span>
                ))}
              </span>
            </motion.h2>

            <motion.p
              variants={VARIANTS.fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="text-brand-brown text-sm sm:text-base mt-3 max-w-lg"
            >
              Real installations. Real impact. Every project is engineered for
              maximum performance and long-term reliability.
            </motion.p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="mt-10 bg-white rounded-3xl border border-brand-border shadow-warm py-16 sm:py-20 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
              <Camera className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-brand-ink font-display font-black text-xl sm:text-2xl">
              Our Gallery is Coming Soon
            </p>
            <p className="text-brand-brown text-sm sm:text-base mt-2 max-w-md mx-auto">
              We're documenting our installations across Odisha. Check back soon to see our work.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-8 py-3.5 font-bold mt-6 hover:scale-105 transition shadow-lg shadow-amber-500/20"
            >
              View Our Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
        <>
        {/* Filter tabs */}
        <div className="mt-10 mb-8 flex gap-2 flex-nowrap overflow-x-auto sm:flex-wrap pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex-none rounded-full px-5 py-2 text-sm border transition-colors ${
                  isActive
                    ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/25"
                    : "bg-white border-brand-border text-brand-brown hover:border-amber-300 hover:text-brand-ink"
                }`}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.08 }}
                onClick={() => setLightbox(item)}
                className={`relative overflow-hidden rounded-3xl border border-brand-border bg-white shadow-warm group cursor-pointer aspect-[4/3] sm:aspect-[4/3] ${
                  item.size === "large" ? "lg:col-span-2 lg:aspect-[16/7]" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.08]"
                />

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1a1208]/90 via-[#1a1208]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold backdrop-blur-sm border ${CATEGORY_PILL_STYLES[item.category] || DEFAULT_PILL_STYLE}`}
                    >
                      {item.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-white text-[10px] font-bold">
                      {item.capacity}
                    </span>
                  </div>

                  <h3 className="text-white font-display font-black text-lg sm:text-xl leading-tight">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-white/60" />
                    <span className="text-white/70 text-xs">{item.location}</span>
                  </div>

                  <p className="max-h-20 sm:max-h-0 sm:group-hover:max-h-20 overflow-hidden transition-all duration-300 text-white/80 text-xs leading-relaxed mt-2">
                    {item.description}
                  </p>

                  <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300 mt-3 flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 bg-white rounded-2xl border border-brand-border shadow-warm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <p className="text-brand-ink font-bold text-lg">Want to see more of our work?</p>
            <p className="text-brand-brown text-sm mt-1">
              Visit our Projects page for detailed case studies and completed installations.
            </p>
          </div>
          <Link
            href="/projects"
            className="flex-none inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-8 py-3.5 font-bold hover:scale-105 transition shadow-lg shadow-amber-500/20"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#1a1208] rounded-3xl overflow-hidden border border-[#2a2330]"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-video">
                <Image
                  src={lightbox.image}
                  alt={lightbox.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold backdrop-blur-sm border ${CATEGORY_PILL_STYLES[lightbox.category] || DEFAULT_PILL_STYLE}`}
                  >
                    {lightbox.category}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-white text-[10px] font-bold">
                    {lightbox.capacity}
                  </span>
                </div>

                <h3 className="text-white font-black text-2xl">{lightbox.title}</h3>

                <div className="text-white/60 text-sm flex items-center gap-2 mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {lightbox.location}
                </div>

                <p className="text-white/80 text-sm leading-relaxed mt-3">
                  {lightbox.description}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-6 py-2.5 font-bold text-sm mt-4 hover:scale-105 transition"
                >
                  Discuss a Similar Project
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
