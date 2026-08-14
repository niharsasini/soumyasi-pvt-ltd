"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, CheckCircle2, Star, PhoneCall, MapPin, FileText,
  Wrench, MessageCircle, Mail, ArrowRight,
} from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import { CONTACT } from "@/lib/config/site.config";

/* ── Data ───────────────────────────────────────────────── */

const HERO_PILLS = [
  "Zero Technical Knowledge Needed",
  "We Handle Everything",
  "Earn ₹8,000–₹15,000/month",
];

const HERO_STATS = [
  { value: "₹8K–15K", label: "Monthly Revenue Potential" },
  { value: "60kW", label: "Fast Charger Output" },
  { value: "30 min", label: "Average Charge Time" },
  { value: "50+", label: "Active Stations in Odisha", countTo: 50, suffix: "+" },
];

const PARTNER_TYPES = [
  { icon: "🏨", title: "Hotels & Resorts", desc: "Guests charge overnight — you earn passively" },
  { icon: "⛽", title: "Petrol Pumps", desc: "Complement fuel with EV charging. Future-proof your station" },
  { icon: "🏬", title: "Shopping Malls", desc: "Customers shop longer when their car is charging" },
  { icon: "🛣️", title: "Highway Dhabas", desc: "Highway travellers need pit stops — be the charging hub" },
  { icon: "🏢", title: "Office Complexes", desc: "Employee benefit + revenue from 9-to-5 charging" },
  { icon: "🏭", title: "Industrial Parks", desc: "Fleet charging for logistics and commercial vehicles" },
];

const STEPS = [
  { n: "01", icon: PhoneCall, title: "Initial Enquiry", time: "Day 1", desc: "Call or WhatsApp us. Tell us your location and available space. Takes 5 minutes." },
  { n: "02", icon: MapPin, title: "Site Survey", time: "Week 1", desc: "Our engineer visits your location. We assess electrical capacity, parking layout, and connectivity." },
  { n: "03", icon: FileText, title: "Agreement & Design", time: "Week 2", desc: "We prepare the technical drawing, site plan, and partnership agreement. You review and sign." },
  { n: "04", icon: Wrench, title: "Installation", time: "Week 3–5", desc: "Our certified team handles civil work, electrical setup, and charger installation. Zero hassle for you." },
  { n: "05", icon: Zap, title: "Go Live & Earn", time: "Week 6", desc: "Charger goes live on our network. Revenue credited to your account monthly. We handle all maintenance." },
];

const BENEFITS = [
  { title: "Complete Hardware Supply", desc: "Ultra 60 Thunder Charge (60kW DC) — fully supplied by us" },
  { title: "Full Installation", desc: "Civil work, electrical wiring, earthing — handled entirely" },
  { title: "OCPP Network Integration", desc: "Connected to our central management system" },
  { title: "Payment Gateway Setup", desc: "UPI, card, app payments — all configured" },
  { title: "24/7 Remote Monitoring", desc: "Real-time fault detection and remote diagnostics" },
  { title: "Maintenance & Support", desc: "Annual service visits + dedicated helpline" },
  { title: "Monthly Revenue Reports", desc: "Transparent earnings statement every month" },
  { title: "CMVR Certification", desc: "All chargers certified — you stay legally compliant" },
];

const REQUIREMENTS = [
  { title: "Parking Space", desc: "Minimum 2 dedicated parking bays near the charger" },
  { title: "Electrical Connection", desc: "3-phase power connection (we help with upgrades if needed)" },
  { title: "Internet Access", desc: "4G SIM, WiFi, or LAN — at least one available" },
  { title: "Location Agreement", desc: "A simple revenue-sharing agreement. No upfront cost to you." },
];

const PARTNER_TESTIMONIALS = [
  {
    name: "Rajesh Kumar Sahoo",
    role: "Hotel Swosti, Bhubaneswar",
    stars: 5,
    message: "We installed the charger in our hotel parking 6 months ago. Guests love it, and we're earning ₹11,000+ every month without doing anything. Soumyashi handled everything from wiring to app setup.",
  },
  {
    name: "Pradeep Nayak",
    role: "Nayak Filling Station, Cuttack",
    stars: 5,
    message: "Our petrol pump now has an EV charger too. The installation took 3 weeks. Revenue has been consistent — ₹9,500 last month. Future-proof decision.",
  },
  {
    name: "Sunita Agarwal",
    role: "City Centre Mall, Bhubaneswar",
    stars: 5,
    message: "Shoppers stay 40 minutes longer on average when their car is charging. The footfall benefit alone was worth it, plus the monthly revenue. Very professional team.",
  },
];

const staggerFast = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ── Small helpers ──────────────────────────────────────── */

function CountUpStat({ to, suffix = "", active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1800;
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

function RevealHeading({ isInView, eyebrow, words, emeraldWords = [], subtitle }) {
  return (
    <div className="text-center mb-14">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-emerald-700 mb-5">
          {eyebrow}
        </span>
      )}
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#1a1208] leading-tight"
        variants={VARIANTS.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
            {emeraldWords.includes(w) ? <span className="text-emerald-600">{w}</span> : w}
          </motion.span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={VARIANTS.para}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-4 text-[#78614a] max-w-xl mx-auto text-base leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── 1. Hero banner ─────────────────────────────────────── */

function HeroBanner() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="w-full bg-[#FFF8E7] py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center" ref={ref}>
          <div className="lg:col-span-3">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-emerald-700 mb-6"
            >
              <Zap size={14} className="text-emerald-600" />
              EV Charging Partner Programme
            </motion.span>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-[1.1]"
              variants={VARIANTS.container}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="block text-[#1a1208]">
                {"Own an EV Charging".split(" ").map((w, i) => (
                  <motion.span key={`a${i}`} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block text-emerald-600">
                {"Station. Earn Revenue.".split(" ").map((w, i) => (
                  <motion.span key={`b${i}`} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                    {w}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={VARIANTS.para}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-6 text-[#78614a] text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Join Soumyashi Power&rsquo;s growing EV network across Odisha. We supply, install, and maintain everything — you provide the location and earn from every charge.
            </motion.p>

            <motion.div
              variants={VARIANTS.cardGrid}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap gap-3 mt-6"
            >
              {HERO_PILLS.map((p) => (
                <motion.span
                  key={p}
                  variants={VARIANTS.card}
                  className="inline-flex items-center gap-2 bg-white border border-emerald-200 rounded-full px-4 py-2 text-sm font-medium text-[#1a1208]"
                >
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  {p}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Link
                href="/contact"
                className="btn-shimmer inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full px-8 py-4 font-bold text-base shadow-lg shadow-emerald-500/25 hover:scale-105 transition-transform duration-300"
              >
                Become a Partner <ArrowRight size={17} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-emerald-400 text-emerald-700 rounded-full px-8 py-4 font-medium text-base hover:bg-emerald-50 transition-colors duration-300"
              >
                Download Partner Brochure
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 border border-[#e8d5b0] shadow-[0_20px_60px_rgba(120,80,20,0.12)]">
              <div className="grid grid-cols-2 gap-6">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <span className="block font-black text-3xl text-emerald-600 tabular-nums">
                      {s.countTo ? <CountUpStat to={s.countTo} suffix={s.suffix} active={isInView} /> : s.value}
                    </span>
                    <span className="block text-[#78614a] text-sm mt-1">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-emerald-200 my-6" />
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[#78614a] text-xs">Join 50+ location partners across Odisha</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Who can partner ─────────────────────────────────── */

function WhoCanPartner() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="w-full bg-[#FFFBF0] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealHeading
          isInView={isInView}
          eyebrow="Partner Eligibility"
          words={["Who", "Can", "Become", "a", "Partner?"]}
          emeraldWords={["Partner?"]}
          subtitle="If you have footfall and parking space, you're a perfect EV charging location."
        />
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {PARTNER_TYPES.map((c) => (
            <motion.div
              key={c.title}
              variants={VARIANTS.card}
              whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(16,185,129,0.15)" }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e8d5b0] shadow-warm hover:border-emerald-400 transition-colors duration-300"
            >
              <span className="text-3xl sm:text-4xl">{c.icon}</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#1a1208] mt-4">{c.title}</h3>
              <p className="text-[#78614a] text-sm leading-relaxed mt-2">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── 3. How it works ────────────────────────────────────── */

function HowItWorks() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="w-full bg-[#FFF8E7] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealHeading
          isInView={isInView}
          eyebrow="The Process"
          words={["How", "the", "Partnership", "Works"]}
          emeraldWords={["Works"]}
          subtitle="From first call to first charge — we handle everything. You just provide the space."
        />
        <div className="relative">
          <div className="hidden md:block absolute top-[52px] left-8 right-8 border-t-2 border-dashed border-emerald-300" />
          <motion.div
            variants={VARIANTS.cardGrid}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-5 gap-5 relative"
          >
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  variants={VARIANTS.card}
                  className="bg-white rounded-2xl p-6 border border-[#e8d5b0] border-l-4 border-l-emerald-500 relative overflow-hidden"
                >
                  <span className="absolute top-1 right-4 font-black text-5xl text-emerald-100 select-none leading-none">
                    {s.n}
                  </span>
                  <Icon size={22} className="text-emerald-600 relative" />
                  <h3 className="font-display font-bold text-[#1a1208] mt-3 relative">{s.title}</h3>
                  <p className="text-[#78614a] text-sm leading-relaxed mt-2 relative">{s.desc}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-medium mt-4 relative">
                    {s.time}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. What you get ────────────────────────────────────── */

function WhatYouGet() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="w-full bg-[#FFFBF0] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-600 mb-3">Our Commitment</p>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#1a1208] mb-8">
              What Soumyashi Power Provides
            </h2>
            <motion.div
              variants={VARIANTS.cardGrid}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-5"
            >
              {BENEFITS.map((b) => (
                <motion.div key={b.title} variants={VARIANTS.slideLeft} className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#1a1208]">{b.title}</h4>
                    <p className="text-[#78614a] text-sm mt-0.5">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#1a1208] mb-2">
              Your Side of the Partnership
            </h2>
            <p className="text-[#78614a] text-sm mb-8">Minimal requirements. We keep it simple.</p>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl p-8 border border-[#e8d5b0] shadow-warm"
            >
              <div className="space-y-6">
                {REQUIREMENTS.map((r, i) => (
                  <div key={r.title} className="flex items-start gap-4">
                    <span className="flex-shrink-0 h-9 w-9 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#1a1208]">{r.title}</h4>
                      <p className="text-[#78614a] text-sm mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-6 bg-emerald-500 rounded-2xl p-6 text-white text-center">
              <p className="font-bold text-lg">No upfront investment required</p>
              <p className="text-emerald-50 text-sm mt-1">Soumyashi Power bears all equipment and installation costs</p>
              <p className="text-emerald-100 text-xs mt-3">Revenue sharing model — we earn when you earn</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Revenue calculator ──────────────────────────────── */

function RevenueCalculator() {
  const { ref, isInView } = useScrollReveal();
  const [daily, setDaily] = useState(15);
  const [duration, setDuration] = useState(30);

  const kwhPerSession = (duration / 60) * 60;
  const monthlySessions = daily * 30;
  const monthlyRevenue = Math.round(monthlySessions * kwhPerSession * 12);

  return (
    <section className="w-full bg-[#FFF8E7] py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealHeading
          isInView={isInView}
          eyebrow="Revenue Estimator"
          words={["Estimate", "Your", "Monthly", "Revenue"]}
          emeraldWords={["Revenue"]}
          subtitle="Based on typical utilisation rates at similar locations."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.12)]"
        >
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="daily-sessions" className="flex justify-between text-sm font-semibold text-[#1a1208] mb-3">
                <span>Daily charging sessions</span>
                <span className="text-emerald-600 tabular-nums">{daily}</span>
              </label>
              <input
                id="daily-sessions"
                type="range"
                min={5}
                max={50}
                value={daily}
                onChange={(e) => setDaily(Number(e.target.value))}
                aria-label="Daily charging sessions"
                className="w-full accent-emerald-600"
              />
            </div>
            <div>
              <label htmlFor="session-duration" className="flex justify-between text-sm font-semibold text-[#1a1208] mb-3">
                <span>Average session duration (minutes)</span>
                <span className="text-emerald-600 tabular-nums">{duration}</span>
              </label>
              <input
                id="session-duration"
                type="range"
                min={15}
                max={60}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                aria-label="Average session duration in minutes"
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          <div className="text-center border-t border-emerald-100 pt-8">
            <span className="block font-black text-3xl sm:text-4xl text-emerald-600 tabular-nums">
              ₹{monthlyRevenue.toLocaleString("en-IN")}
            </span>
            <span className="block text-[#78614a] text-sm mt-2">estimated monthly revenue</span>
            <span className="block text-[#a8917a] text-xs mt-4">
              *Actual revenue depends on utilisation and tariff rates
            </span>
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <p className="font-display font-bold text-lg text-[#1a1208] mb-4">Ready to get started?</p>
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] hover:scale-105 transition-all duration-300"
          >
            Apply for Partnership <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Testimonials ────────────────────────────────────── */

function PartnerTestimonials() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="w-full bg-[#FFFBF0] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealHeading
          isInView={isInView}
          eyebrow="Partner Stories"
          words={["What", "Our", "Partners", "Say"]}
          emeraldWords={["Partners"]}
        />
        <motion.div
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {PARTNER_TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={VARIANTS.card}
              className="flex flex-col h-full p-6 rounded-2xl bg-white border border-[#e8d5b0] shadow-warm hover:border-emerald-400 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array(t.stars).fill(0).map((_, i) => (
                  <Star key={i} size={13} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-[#78614a] text-sm leading-relaxed flex-1">&ldquo;{t.message}&rdquo;</p>
              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-[#e8d5b0]">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[#1a1208] font-semibold text-sm">{t.name}</div>
                  <div className="text-emerald-600 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── 7. Final CTA banner ────────────────────────────────── */

function FinalCtaBanner() {
  const { ref, isInView } = useScrollReveal();
  const waHref = `https://wa.me/${CONTACT.phoneHref.replace(/\D/g, "")}`;
  const contactCards = [
    { icon: PhoneCall, label: "Call Us Now", value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: MessageCircle, label: "WhatsApp Us", value: "Quick response within 1 hour", href: waHref },
    { icon: Mail, label: "Email Us", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.1), transparent)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white leading-tight mb-6"
        >
          Ready to Open Your EV Charging Station?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Join Soumyashi Power&rsquo;s partner network today. No upfront cost. No technical expertise needed. Just a good location and a will to grow.
        </motion.p>

        <motion.div
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-3 gap-4 mb-12"
        >
          {contactCards.map((c) => {
            const Icon = c.icon;
            const external = c.href.startsWith("http");
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                variants={VARIANTS.card}
                className="bg-white/10 hover:bg-white/15 rounded-2xl p-6 text-white transition-colors duration-300"
              >
                <Icon size={22} className="mx-auto mb-3" />
                <div className="font-semibold text-sm">{c.label}</div>
                <div className="text-white/70 text-xs mt-1">{c.value}</div>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold rounded-full px-10 py-4 hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            Apply as Partner <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section export ─────────────────────────────────────── */

export default function EVPartnerSection() {
  return (
    <>
      <HeroBanner />
      <WhoCanPartner />
      <HowItWorks />
      <WhatYouGet />
      <RevenueCalculator />
      <PartnerTestimonials />
      <FinalCtaBanner />
    </>
  );
}
