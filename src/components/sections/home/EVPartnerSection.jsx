"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Check, Phone, PhoneCall, MapPin, FileText, Wrench, MessageCircle,
} from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import { CONTACT } from "@/lib/config/site.config";

/* ── Data ───────────────────────────────────────────────── */

const PARTNER_TYPES = [
  { icon: "🏨", title: "Hotels & Resorts", sub: "Guests charge overnight" },
  { icon: "⛽", title: "Petrol Pumps", sub: "Future-proof your station" },
  { icon: "🏬", title: "Shopping Malls", sub: "Shoppers stay longer" },
  { icon: "🛣️", title: "Highway Stops", sub: "Be the charging hub" },
  { icon: "🏢", title: "Office Complexes", sub: "Employee + visitor charging" },
  { icon: "🏭", title: "Industrial Parks", sub: "Fleet & logistics charging" },
];

const BENEFITS = [
  { title: "Complete Hardware Supply", sub: "60kW DC charger — fully supplied" },
  { title: "Full Installation", sub: "Civil, electrical, earthing — all done" },
  { title: "OCPP Network Setup", sub: "Connected to central management" },
  { title: "Payment Gateway", sub: "UPI, card, app — all configured" },
  { title: "24/7 Monitoring", sub: "Remote fault detection & support" },
  { title: "Monthly Revenue Report", sub: "Transparent earnings every month" },
];

const STATS = [
  { value: "₹8K–15K", label: "Monthly Revenue" },
  { value: "60kW", label: "Charger Output" },
  { value: "50+", label: "Active Stations", countTo: 50, suffix: "+" },
  { value: "6 Weeks", label: "Survey to Live" },
];

const STEPS = [
  { n: "01", icon: Phone, title: "Initial Enquiry", time: "Day 1", desc: "Call or WhatsApp us. Tell us your location." },
  { n: "02", icon: MapPin, title: "Site Survey", time: "Week 1", desc: "Our engineer assesses your space and electrical setup." },
  { n: "03", icon: FileText, title: "Agreement", time: "Week 2", desc: "Technical drawing and revenue-share agreement." },
  { n: "04", icon: Wrench, title: "Installation", time: "Week 3–5", desc: "Full setup by our certified team. Zero hassle." },
  { n: "05", icon: Zap, title: "Go Live & Earn", time: "Week 6", desc: "Charger live on network. Monthly revenue credited." },
];

/* ── Small helpers ──────────────────────────────────────── */

function CountUpStat({ to, suffix = "", active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
      else setN(to);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return <>{n}{suffix}</>;
}

function WordHeading({ isInView, lines, className }) {
  return (
    <motion.h2 className={className} variants={VARIANTS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(" ").map((w, i) => (
            <motion.span key={i} variants={VARIANTS.word} className={`inline-block mr-[0.25em] ${line.emerald ? "text-emerald-600" : ""}`}>
              {w}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

function StepCard({ step }) {
  const Icon = step.icon;
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e8d5b0] border-t-4 border-t-emerald-500 shadow-warm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full">
      <span className="absolute top-1 right-3 font-black text-5xl text-emerald-100 leading-none select-none">{step.n}</span>
      <Icon size={22} className="text-emerald-500 relative" />
      <h3 className="font-bold text-[#1a1208] text-sm mt-2 relative">{step.title}</h3>
      <p className="text-[#78614a] text-xs leading-relaxed mt-1 relative">{step.desc}</p>
      <span className="inline-block bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-[10px] font-bold mt-3 relative">{step.time}</span>
    </div>
  );
}

/* ── Section 1: Become an EV Partner ────────────────────── */

function BecomePartnerSection() {
  const { ref, isInView } = useScrollReveal();
  const [sessions, setSessions] = useState(15);
  const [duration, setDuration] = useState(30);
  const kwhPerSession = (duration / 60) * 60;
  const monthlyRevenue = Math.round(sessions * 30 * kwhPerSession * 12);

  return (
    <section className="w-full bg-[#FFF8E7] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-emerald-700 mb-4">
            <Zap size={14} className="text-emerald-600" />
            EV Charging Partner Programme
          </span>
          <WordHeading
            isInView={isInView}
            lines={[{ text: "Own a Charging Station." }, { text: "Earn Every Month.", emerald: true }]}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#1a1208] leading-tight"
          />
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-5 text-[#78614a] text-base max-w-2xl mx-auto leading-relaxed"
          >
            No technical expertise. No upfront equipment cost. Just your location — we handle everything else.
          </motion.p>
        </div>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Who Can Partner */}
          <motion.div
            variants={VARIANTS.slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <h3 className="text-lg font-bold text-[#1a1208] mb-4">Perfect Locations</h3>
            {PARTNER_TYPES.map((p) => (
              <div key={p.title} className="flex items-center gap-3 py-3 border-b border-[#e8d5b0] last:border-0">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{p.icon}</div>
                <div>
                  <div className="font-semibold text-[#1a1208] text-sm">{p.title}</div>
                  <div className="text-[#a8917a] text-xs">{p.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Revenue Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-1 lg:order-2 bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-[0_20px_60px_rgba(16,185,129,0.12)]"
          >
            <h3 className="text-xl font-bold text-[#1a1208] mb-6">Estimate Your Revenue</h3>
            <div className="mb-6">
              <label htmlFor="ev-sessions" className="flex items-center justify-between text-sm font-medium text-[#1a1208] mb-3">
                <span>Daily charging sessions</span>
                <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold tabular-nums">{sessions}</span>
              </label>
              <input
                id="ev-sessions"
                type="range"
                min={5}
                max={50}
                value={sessions}
                onChange={(e) => setSessions(Number(e.target.value))}
                aria-label="Daily charging sessions"
                className="w-full accent-emerald-600"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="ev-duration" className="flex items-center justify-between text-sm font-medium text-[#1a1208] mb-3">
                <span>Avg. session duration (min)</span>
                <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold tabular-nums">{duration}</span>
              </label>
              <input
                id="ev-duration"
                type="range"
                min={15}
                max={60}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                aria-label="Average session duration in minutes"
                className="w-full accent-emerald-600"
              />
            </div>
            <div className="border-t border-emerald-100 mt-6 pt-6 text-center">
              <p className="text-[#78614a] text-sm">Estimated monthly revenue</p>
              <p className="text-4xl font-black text-emerald-600 mt-1 tabular-nums">₹{monthlyRevenue.toLocaleString("en-IN")}</p>
              <p className="text-[#a8917a] text-xs mt-2">*Based on ₹12/kWh standard rate</p>
            </div>
            <Link
              href="/contact"
              className="btn-shimmer mt-6 block w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full px-8 py-3 font-bold hover:scale-105 transition-transform duration-300"
            >
              Apply as Partner
            </Link>
          </motion.div>

          {/* What We Provide */}
          <motion.div
            variants={VARIANTS.slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-3"
          >
            <h3 className="text-lg font-bold text-[#1a1208] mb-4">We Handle Everything</h3>
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-start gap-3 py-3 border-b border-[#e8d5b0] last:border-0">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a1208] text-sm">{b.title}</div>
                  <div className="text-[#a8917a] text-xs">{b.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 bg-white rounded-2xl border border-[#e8d5b0] shadow-warm p-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={VARIANTS.card} className="text-center">
              <span className="block text-3xl font-black text-emerald-600 tabular-nums">
                {s.countTo ? <CountUpStat to={s.countTo} suffix={s.suffix} active={isInView} /> : s.value}
              </span>
              <span className="block text-[#78614a] text-sm mt-1">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 2: How It Works ────────────────────────────── */

function HowItWorksSection() {
  const { ref, isInView } = useScrollReveal();
  const waHref = `https://wa.me/${CONTACT.phoneHref.replace(/\D/g, "")}`;

  return (
    <section className="w-full bg-[#FFFBF0] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <WordHeading
            isInView={isInView}
            lines={[{ text: "From First Call to First Charge" }]}
            className="text-3xl sm:text-4xl font-black font-display text-[#1a1208] leading-tight"
          />
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-[#78614a] text-base"
          >
            We make it simple. Here&rsquo;s exactly what happens when you partner with us.
          </motion.p>
        </div>
        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-200" />
          <motion.div
            variants={VARIANTS.cardGrid}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={VARIANTS.card} className="relative">
                <span className="absolute -left-8 top-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow" />
                <StepCard step={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-10 left-10 right-10 border-t-2 border-dashed border-emerald-200" />
          <motion.div
            variants={VARIANTS.cardGrid}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-5 gap-5 relative"
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={VARIANTS.card}>
                <StepCard step={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">Ready to Get Started?</h3>
              <p className="text-white/80 mt-2 max-w-md">No upfront cost. No technical knowledge needed. We earn only when you earn.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-white/20 border border-white/30 rounded-full px-5 py-3 text-white font-medium hover:bg-white/30 transition-colors duration-300"
              >
                <PhoneCall size={17} /> Call Us
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/20 border border-white/30 rounded-full px-5 py-3 text-white font-medium hover:bg-white/30 transition-colors duration-300"
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-emerald-700 font-bold rounded-full px-8 py-3 hover:scale-105 transition-transform duration-300"
              >
                Apply as Partner
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section export ─────────────────────────────────────── */

export default function EVPartnerSection() {
  return (
    <>
      <BecomePartnerSection />
      <HowItWorksSection />
    </>
  );
}
