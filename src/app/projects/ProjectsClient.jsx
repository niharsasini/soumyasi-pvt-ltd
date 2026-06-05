"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap, Sun, Factory } from "lucide-react";

const CATEGORIES = ["All", "Solar", "EV", "Industrial"];

const PROJECTS = [
  {
    title: "Bhubaneswar Corporate Solar Rooftop",
    location: "Bhubaneswar, Odisha",
    scale: "500 kW",
    category: "Solar",
    badge: "Completed",
    badgeColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-amber-400 to-amber-600",
    icon: Sun,
    year: "2024",
  },
  {
    title: "Cuttack EV Charging Hub",
    location: "Cuttack, Odisha",
    scale: "24 Stations",
    category: "EV",
    badge: "Live",
    badgeColor: "bg-indigo-100 text-indigo-700",
    gradient: "from-indigo-400 to-indigo-600",
    icon: Zap,
    year: "2024",
  },
  {
    title: "NALCO Industrial Substation",
    location: "Angul, Odisha",
    scale: "33 kV",
    category: "Industrial",
    badge: "Completed",
    badgeColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-emerald-400 to-emerald-600",
    icon: Factory,
    year: "2023",
  },
  {
    title: "Puri Temple Town Solar Initiative",
    location: "Puri, Odisha",
    scale: "200 kW",
    category: "Solar",
    badge: "Completed",
    badgeColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-amber-500 to-orange-500",
    icon: Sun,
    year: "2023",
  },
  {
    title: "Rourkela EV Network Expansion",
    location: "Rourkela, Odisha",
    scale: "15 Stations",
    category: "EV",
    badge: "Live",
    badgeColor: "bg-indigo-100 text-indigo-700",
    gradient: "from-violet-400 to-indigo-600",
    icon: Zap,
    year: "2024",
  },
  {
    title: "Sambalpur Industrial Park Electrification",
    location: "Sambalpur, Odisha",
    scale: "2 MW",
    category: "Industrial",
    badge: "In Progress",
    badgeColor: "bg-amber-100 text-amber-700",
    gradient: "from-emerald-500 to-teal-600",
    icon: Factory,
    year: "2025",
  },
  {
    title: "AIIMS Bhubaneswar Solar Backup",
    location: "Bhubaneswar, Odisha",
    scale: "350 kW",
    category: "Solar",
    badge: "Completed",
    badgeColor: "bg-emerald-100 text-emerald-700",
    gradient: "from-amber-400 to-yellow-500",
    icon: Sun,
    year: "2023",
  },
  {
    title: "Berhampur Smart EV Corridor",
    location: "Berhampur, Odisha",
    scale: "10 Stations",
    category: "EV",
    badge: "Coming Soon",
    badgeColor: "bg-slate-100 text-slate-600",
    gradient: "from-indigo-500 to-blue-600",
    icon: Zap,
    year: "2025",
  },
];

export default function ProjectsClient() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.05), transparent)" }} />
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
          Our Portfolio
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight">
          Our Work Across{" "}
          <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Odisha</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-5 max-w-xl mx-auto text-brand-brown text-lg">
          500+ installations across solar, EV infrastructure, and industrial power.
        </motion.p>
      </section>

      {/* Filter tabs */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === cat
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-gold"
                    : "bg-white border border-brand-border text-brand-brown hover:border-amber-400 hover:text-brand-ink"
                }`}>
                {cat}
                {active === cat && (
                  <motion.div layoutId="tab-indicator" className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 -z-10" />
                )}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title}
                    layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 cursor-default">
                    {/* Image placeholder */}
                    <div className={`h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}>
                      <Icon size={40} className="text-white/80" />
                      <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-brand-ink text-sm leading-snug mb-2">{p.title}</h3>
                      <div className="flex items-center gap-1 text-brand-muted text-xs mb-1">
                        <MapPin size={11} /> {p.location}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-semibold text-brand-gold">{p.scale}</span>
                        <span className="text-xs text-brand-muted">{p.year}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
