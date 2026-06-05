"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Leaf, Lightbulb, Shield, Users, MapPin, Award } from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── CountUp ─────────────────────────────────────── */
function useCountUp(to, active) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 2000;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
      else setN(to);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return n;
}

/* ── Stat card ── */
function StatCard({ value, suffix, label, active, delay }) {
  const n = useCountUp(value, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="flex flex-col items-center py-6 px-4"
    >
      <span className="text-3xl sm:text-4xl font-bold font-display text-brand-gold tabular-nums">
        {n}{suffix}
      </span>
      <span className="mt-1 text-xs text-brand-muted font-medium text-center">{label}</span>
    </motion.div>
  );
}

/* ── Timeline item ── */
function TimelineItem({ year, title, desc, side, active, delay }) {
  return (
    <div className={`flex items-start gap-8 ${side === "right" ? "flex-row-reverse" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: side === "right" ? 40 : -40 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className={`flex-1 bg-white border border-brand-border rounded-2xl shadow-warm p-6 ${side === "right" ? "text-right" : ""}`}
      >
        <span className="text-xs font-bold text-brand-gold tracking-widest uppercase">{year}</span>
        <h4 className="font-bold font-display text-brand-ink mt-1 mb-2">{title}</h4>
        <p className="text-sm text-brand-brown leading-relaxed">{desc}</p>
      </motion.div>
      {/* Gold dot on center line */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={active ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: delay + 0.1 }}
          className="w-4 h-4 rounded-full bg-brand-gold border-2 border-amber-200 shadow-[0_0_12px_rgba(217,119,6,0.4)]"
        />
      </div>
      <div className="flex-1" />
    </div>
  );
}

/* ── TEAM DATA ── */
const TEAM = [
  { initials: "SP", name: "Suresh Kumar Pattnaik", title: "CEO & Founder", bio: "20 years in electrical engineering. Built SPL from a single installation in 2014.", gradient: "from-amber-400 to-amber-600" },
  { initials: "AB", name: "Anita Behera",           title: "Chief Technology Officer", bio: "IIT Kharagpur alumna. Leads solar design and smart energy automation.", gradient: "from-emerald-400 to-emerald-600" },
  { initials: "RM", name: "Rajesh Mohanty",          title: "Head of EV Infrastructure", bio: "Pioneered Odisha's first commercial EV charging hub in Bhubaneswar.", gradient: "from-indigo-400 to-indigo-600" },
  { initials: "PN", name: "Priya Nanda",              title: "Head of Operations",        bio: "Ensures 500+ installations run without a hitch, day and night.", gradient: "from-amber-500 to-orange-500" },
];

/* ── VALUES ── */
const VALUES = [
  { icon: Lightbulb, title: "Innovation",     desc: "We embrace new technology — smart solar systems, IoT monitoring, automated EV infrastructure — to deliver better outcomes." },
  { icon: Leaf,       title: "Sustainability", desc: "Every installation reduces carbon emissions. Clean energy is not just a product for us — it's our mission." },
  { icon: Shield,     title: "Reliability",    desc: "24/7 monitoring, rapid response support, and certified engineers ensure your systems never go dark." },
  { icon: Users,      title: "Community",      desc: "Built in Odisha, for Odisha. We hire locally, partner locally, and give back to the communities we serve." },
];

/* ── MILESTONES ── */
const MILESTONES = [
  { year: "2014", title: "Founded in Bhubaneswar", desc: "Started with a team of 5 engineers and a single solar rooftop installation for a local factory." },
  { year: "2016", title: "100th Solar Installation", desc: "Reached our first milestone — 100 solar installations across Bhubaneswar and Cuttack." },
  { year: "2019", title: "Launched EV Division",      desc: "Commissioned Odisha's first commercial EV fast-charging hub in Bhubaneswar." },
  { year: "2022", title: "50 EV Stations Live",        desc: "Expanded the EV network to Puri, Rourkela, Sambalpur and Berhampur — 50 stations operational." },
  { year: "2024", title: "15 Cities, 500+ Projects",   desc: "Today we power homes, hospitals, factories and highways across 15 cities in Odisha." },
];

/* ═══════════════════════════════════════════════════ */
export default function AboutClient() {
  const statsRef  = useRef(null);
  const [statsOn, setStatsOn] = useState(false);
  const { ref: tlRef, isInView: tlInView } = useScrollReveal();
  const { ref: heroRef, isInView: heroInView } = useScrollReveal();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-brand-bg text-brand-ink overflow-hidden">

      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-brand-bg">
        {/* Amber orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: [0,30,0], y:[0,-20,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[10%] left-[5%] h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x: [0,-25,0], y:[0,20,0] }} transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute bottom-[10%] right-[5%] h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div ref={heroRef}>
            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
              About Us
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight mb-6"
              variants={VARIANTS.container} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            >
              {["Powering", "Odisha", "Since", "Day", "One"].map((w, i) => (
                <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                  {w === "Odisha" ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span> : w}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.7 }}
              className="text-brand-brown text-lg leading-relaxed mb-8 max-w-lg">
              We started with a single solar installation in Bhubaneswar. Today we power hundreds of homes, businesses, and charging stations across Odisha.
            </motion.p>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.6 }}
              className="flex flex-wrap gap-4">
              <Link href="/solutions"
                className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300">
                Our Solutions
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300">
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Right: decorative gradient panel */}
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.9, delay:0.2 }}
            className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 blur-3xl" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_20px_60px_rgba(217,119,6,0.3)]">
                <div className="text-center text-white">
                  <div className="text-5xl font-bold font-display">10+</div>
                  <div className="text-sm font-semibold tracking-wider mt-1">Years of Excellence</div>
                </div>
              </div>
              {/* Orbiting dots */}
              {[0,90,180,270].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <motion.div key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                      style={{ top: `calc(50% + ${Math.sin(rad) * 148}px - 6px)`, left: `calc(50% + ${Math.cos(rad) * 148}px - 6px)` }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ COMPANY STORY ══ */}
      <section className="py-24 px-4 bg-brand-section relative">
        <div className="absolute inset-x-0 top-0 section-divider" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Story text */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink mb-6 leading-tight">
              From One Rooftop to an <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Odisha-wide Network</span>
            </h2>
            <div className="space-y-4 text-brand-brown leading-relaxed">
              <p>In 2014, founder Suresh Kumar Pattnaik installed his first solar system on a Bhubaneswar factory rooftop. The client's electricity bill fell by 68%. Word spread fast.</p>
              <p>By 2019, Soumyashree Power had completed 200+ installations and launched Odisha's first commercial EV charging hub — anticipating the electric vehicle wave years before it arrived.</p>
              <p>Today, with 500+ projects, 50+ EV stations, and operations in 15 cities, we remain what we've always been: a local team with deep Odisha roots, building infrastructure that will last decades.</p>
            </div>
          </motion.div>

          {/* Stats panel — solar field image with stat cards overlaid */}
          <motion.div ref={statsRef}
            initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ minHeight:"340px", boxShadow:"0 20px 60px rgba(217,119,6,0.15)" }}
          >
            <Image
              src="/soumyasi/solar-field-odisha.png"
              alt="Soumyasi Power solar installation in Odisha"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/55 to-amber-700/35" />

            {/* 2×2 stat cards */}
            <div className="relative z-10 grid grid-cols-2 gap-3 p-4 pb-14">
              {[
                { value:2014, suffix:"", label:"Year Founded" },
                { value:500,  suffix:"+", label:"Projects Completed" },
                { value:15,   suffix:"+", label:"Cities Covered" },
                { value:50,   suffix:"+", label:"Team Members" },
              ].map((s, i) => (
                <div key={s.label} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-warm">
                  <StatCard {...s} active={statsOn} delay={i * 0.1} />
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-white/90 backdrop-blur-sm border-t border-amber-200/50 flex items-center gap-2">
              <MapPin size={14} className="text-brand-gold" />
              <span className="text-xs text-brand-brown font-medium">Headquartered in Bhubaneswar, Odisha</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MISSION + VISION ══ */}
      <section className="py-24 px-4 bg-brand-bg">
        <div className="absolute inset-x-0 section-divider" />
        <div className="max-w-5xl mx-auto">
          <SectionHeading badge="What We Stand For" words={["Mission", "&", "Vision"]} goldWords={["Mission"]} />
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
              className="bg-white rounded-2xl border border-brand-border shadow-warm p-8 border-l-4 border-l-amber-500">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                <Target size={24} className="text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-ink mb-3">Our Mission</h3>
              <p className="text-brand-brown leading-relaxed">
                To make clean energy accessible to every home and business in Odisha — through reliable solar installations, growing EV infrastructure, and best-in-class engineering support.
              </p>
            </motion.div>
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
              className="bg-white rounded-2xl border border-brand-border shadow-warm p-8 border-l-4 border-l-emerald-500">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                <Leaf size={24} className="text-brand-emerald" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-ink mb-3">Our Vision</h3>
              <p className="text-brand-brown leading-relaxed">
                A fully solar-powered Odisha with an EV network connecting every city and town — where clean energy is the default, not the exception.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ══ */}
      <section className="py-24 px-4 bg-brand-section">
        <div className="absolute inset-x-0 section-divider" />
        <div className="max-w-5xl mx-auto">
          <SectionHeading badge="Our Principles" words={["What", "Drives", "Us"]} goldWords={["Drives"]} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ y:-6 }} transition_hover={{ type:"spring", stiffness:280, damping:18 }}
                className="bg-white border border-brand-border rounded-2xl shadow-warm p-6 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-brand-gold" />
                </div>
                <h3 className="font-bold font-display text-brand-ink mb-2">{title}</h3>
                <p className="text-sm text-brand-brown leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-24 px-4 bg-brand-bg">
        <div className="max-w-5xl mx-auto">
          <SectionHeading badge="The People Behind It" words={["Our", "Leadership"]} goldWords={["Leadership"]} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ initials, name, title, bio, gradient }, i) => (
              <motion.div key={name}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ y:-6 }}
                className="bg-white border border-brand-border rounded-2xl shadow-warm p-6 text-center hover:border-amber-400 hover:shadow-card-hover transition-all duration-300">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl font-display mx-auto mb-4 shadow-gold`}>
                  {initials}
                </div>
                <h3 className="font-bold font-display text-brand-ink text-sm">{name}</h3>
                <p className="text-brand-gold text-xs font-semibold mt-1 mb-3">{title}</p>
                <p className="text-brand-muted text-xs leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="py-24 px-4 bg-brand-section relative">
        <div className="absolute inset-x-0 top-0 section-divider" />
        <div className="max-w-4xl mx-auto" ref={tlRef}>
          <SectionHeading badge="How We Got Here" words={["Our", "Journey"]} goldWords={["Journey"]} />

          {/* Desktop: alternating. Mobile: single column */}
          <div className="hidden md:flex flex-col gap-8 relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-border to-transparent" />
            {MILESTONES.map((m, i) => (
              <TimelineItem key={m.year} {...m} side={i % 2 === 0 ? "left" : "right"} active={tlInView} delay={i * 0.12} />
            ))}
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="bg-white border border-brand-border rounded-2xl shadow-warm p-5 border-l-4 border-l-amber-500">
                <span className="text-xs font-bold text-brand-gold tracking-widest uppercase">{m.year}</span>
                <h4 className="font-bold font-display text-brand-ink mt-1 mb-1">{m.title}</h4>
                <p className="text-sm text-brand-brown leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-24 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.1), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.2,0.4,0.2] }} transition={{ duration:5, repeat:Infinity }}
          className="absolute top-1/2 left-[10%] -translate-y-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Let's Connect</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5">
            Join Our Journey
          </h2>
          <p className="text-amber-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you're a customer, partner, or future team member — we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-800 bg-white hover:bg-amber-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300">
              Get In Touch
            </Link>
            <Link href="/careers"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300">
              View Open Roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
