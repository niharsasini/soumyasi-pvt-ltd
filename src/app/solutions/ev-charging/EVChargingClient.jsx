"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Zap, Users, TrendingUp, BadgeDollarSign,
  MapPin, PenLine, Wrench, Activity, Milestone,
  PlugZap, Monitor, CreditCard, ShieldCheck, Award,
  ChevronDown,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { VARIANTS } from "@/lib/animations/variants";
import { CONTACT } from "@/lib/config/site.config";

/* ── shared ──────────────────────────────────────────── */
const FLOAT = {
  animate:    { y: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};
const vp = { once: true, margin: "-80px" };

/* ── Section 2 data ──────────────────────────────────── */
const BENEFITS = [
  {
    icon: BadgeDollarSign,
    title: "Revenue Stream",
    desc: "Earn per kWh charged. Turn your parking lot into a profit centre.",
  },
  {
    icon: Users,
    title: "Customer Attraction",
    desc: "EV owners specifically seek out charging-friendly locations. Keep them longer, spend more.",
  },
  {
    icon: TrendingUp,
    title: "Future Ready",
    desc: "EV adoption in India is doubling every year. Get ahead of the curve now.",
  },
  {
    icon: Award,
    title: "Government Incentives",
    desc: "FAME II subsidies and state incentives available for eligible installations.",
  },
];

/* ── Section 3 data ──────────────────────────────────── */
const EV_SPECS = [
  { emoji: "⚡", name: "60kW Output" },
  { emoji: "🔌", name: "Dual Connector" },
  { emoji: "📱", name: "Touchscreen Display" },
  { emoji: "🔑", name: "RFID Smart Access" },
  { emoji: "🌧️", name: "IP65 Weather Rated" },
  { emoji: "✅", name: "CMVR Certified" },
];

/* ── Section 4 data ──────────────────────────────────── */
const REQUIREMENTS = [
  {
    id: "location",
    title: "📍 Location & Mounting",
    content: [
      "Select a dry, well-ventilated location away from dust and heat.",
      "Allow clearance on both sides for ventilation.",
      "Front must remain unobstructed for serviceability.",
      "Install on non-combustible surface (concrete, stone, brick, or steel).",
      "Ground mounted or plinth mounting available.",
      "Covered space/canopy recommended.",
    ],
    checklist: [
      "Concrete base ready as per Soumyasi Power drawing",
      "Anchor bolts installed and extending above concrete",
      "Shed/canopy installed",
      "Clearance around concrete base confirmed",
    ],
  },
  {
    id: "electrical",
    title: "⚡ Electrical & Wiring",
    content: [
      "3-Phase supply: L1, L2, L3, Neutral, Earth.",
      "Voltage: 415V ±10%, 50Hz.",
      "Current rating: 275A continuous (up to 365A peak).",
      "Transformer: 250 KVA recommended (400 KVA for 180kW).",
      "Cable options: 3.5-core 400 sqmm Aluminium PVC armoured cable, OR 3.5-core 240 sqmm Copper PVC armoured cable.",
    ],
    checklist: [
      "Transformer supports required KVA",
      "3-phase voltages verified (415V ±10%)",
      "Input breaker capacity ≥500A",
      "Correct cable sizing installed",
    ],
  },
  {
    id: "earthing",
    title: "🌍 Earthing Requirements",
    content: [
      "Two earth pits required.",
      "30×10mm tinned copper bus bars for 180kW chargers.",
      "Neutral to Earth voltage must be less than 2V.",
      "Two M10 mounting bolts provided for earthing connection.",
    ],
    checklist: [
      "Two earth pits available",
      "Earth bus bars: 30×10mm tinned copper installed",
      "Neutral-Earth voltage < 2V verified",
    ],
  },
  {
    id: "internet",
    title: "📶 Internet Connectivity",
    content: [
      "Required for OCPP communication and remote monitoring.",
      "Options: 4G SIM (good signal, not M2M), Wi-Fi (100 Mbps recommended, line-of-sight), LAN (Cat6 cabling).",
      "Do NOT use M2M SIM cards — limited connectivity.",
    ],
    checklist: [],
  },
  {
    id: "safety",
    title: "🏗️ Safety & Infrastructure",
    content: [
      "Shelter/shed to protect charger and users from weather.",
      "Safety pipe bollards around charger to prevent vehicle collision.",
      "Adequate LED lighting for night usage.",
      "Fire suppression system as per local regulations.",
    ],
    checklist: [],
  },
];

/* ── Section 5 data ──────────────────────────────────── */
const STEPS = [
  { num: "01", icon: MapPin,     title: "Site Survey",        desc: "We visit and assess electrical capacity, location suitability, and connectivity." },
  { num: "02", icon: PenLine,    title: "Technical Design",   desc: "Custom electrical drawing provided by Soumyasi Power engineering team." },
  { num: "03", icon: Wrench,     title: "Site Preparation",   desc: "Customer prepares civil work per our drawing (concrete base, earthing, cabling)." },
  { num: "04", icon: Activity,   title: "Installation",       desc: "Our certified technicians install and commission the charger." },
  { num: "05", icon: Milestone,  title: "Go Live",            desc: "OCPP activation, payment gateway setup, and handover with staff training." },
];

/* ═══════════════════════════════════════════════════════ */
/*  SECTION 1 — HERO                                       */
/* ═══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="min-h-screen bg-[#FFFBF0] relative overflow-hidden flex items-center pt-28 pb-16 px-4">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[4%] h-80 w-80 rounded-full bg-amber-400/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[10%] right-[6%] h-64 w-64 rounded-full bg-amber-300/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-[8%] left-[50%] h-56 w-56 rounded-full bg-amber-400/20 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-5"
          >
            EV CHARGING SOLUTIONS
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight mb-6"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Install", "an", "EV", "Charging", "Station", "at", "Your", "Location"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {["EV", "Charging", "Station"].includes(w)
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="text-brand-brown text-lg leading-relaxed mb-8 max-w-lg"
          >
            We handle everything — site assessment, electrical setup, installation, and ongoing support. Your customers charge up, you earn revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] hover:scale-105 transition-all duration-300"
            >
              Request Site Assessment <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact?ref=checklist"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300"
            >
              Download Checklist
            </Link>
          </motion.div>
        </div>

        {/* Right — EV charger image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          {...FLOAT}
          className="hidden lg:block rounded-3xl overflow-hidden border border-amber-200/60 shadow-[0_30px_80px_rgba(217,119,6,0.18)]"
        >
          <Image
            src="/soumyasi/ev-charger-ultra60.png"
            alt="Soumyasi Power Ultra 60 EV fast charger"
            width={620}
            height={520}
            className="w-full h-auto object-cover object-center"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  SECTION 2 — WHY ADD EV CHARGING                        */
/* ═══════════════════════════════════════════════════════ */
function WhySection() {
  return (
    <section className="bg-[#FFF8E7] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="The Business Case"
          words={["Why", "Add", "EV", "Charging", "to", "Your", "Location?"]}
          goldWords={["EV", "Charging"]}
        />

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={VARIANTS.cardGrid}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={VARIANTS.card}
              whileHover={{ y: -8, borderColor: "#fcd34d", boxShadow: "0 16px 50px rgba(217,119,6,0.18)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-white rounded-2xl border border-[#e8d5b0] p-8 cursor-default"
              style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
            >
              <div className="w-[56px] h-[56px] rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-300 mb-5">
                <Icon size={26} className="text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-ink mb-2">{title}</h3>
              <p className="text-brand-brown text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  SECTION 3 — PRODUCT: ULTRA 60                          */
/* ═══════════════════════════════════════════════════════ */
function ProductSection() {
  return (
    <section className="bg-[#FFFBF0] py-24 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* Left — image */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideLeft}
          {...FLOAT}
          className="rounded-3xl overflow-hidden border border-amber-200/60 shadow-[0_30px_80px_rgba(217,119,6,0.18)]"
        >
          <Image
            src="/soumyasi/ev-charger-ultra60.png"
            alt="Soumyasi Power Ultra 60 Thunder Charge EV charger"
            width={620}
            height={520}
            className="w-full h-auto object-cover object-center"
          />
        </motion.div>

        {/* Right — specs */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideRight}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            FLAGSHIP PRODUCT
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink leading-tight mb-2">
            Ultra 60 Thunder Charge
          </h2>
          <p className="text-xl font-semibold text-amber-600 mb-5">60kW DC Fast Charger</p>
          <p className="text-brand-brown leading-relaxed mb-8">
            Our most deployed charging unit — built for Indian conditions, certified for commercial use, and designed for minimal maintenance.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {EV_SPECS.map(({ emoji, name }) => (
              <div
                key={name}
                className="rounded-xl bg-white border border-[#e8d5b0] p-4 text-center"
                style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
              >
                <span className="text-2xl block mb-2">{emoji}</span>
                <p className="text-xs font-semibold text-brand-ink leading-tight">{name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  SECTION 4 — SITE REQUIREMENTS ACCORDION               */
/* ═══════════════════════════════════════════════════════ */
function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#e8d5b0] overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50/50 transition-colors duration-200"
      >
        <span className="text-base font-bold font-display text-brand-ink">{item.title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className="text-amber-600 flex-shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#e8d5b0]">
              <ul className="mt-4 space-y-2 mb-4">
                {item.content.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-brown leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>

              {item.checklist.length > 0 && (
                <div className="mt-4 pt-4 border-t border-amber-100">
                  <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">Installation Checklist</p>
                  <ul className="space-y-2">
                    {item.checklist.map((check, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-brand-ink">
                        <span className="flex-shrink-0 w-5 h-5 rounded-md bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600 text-xs font-bold">
                          ☑
                        </span>
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RequirementsSection() {
  return (
    <section className="bg-[#FFF8E7] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="Before Installation"
          words={["Site", "Requirements", "&", "Readiness", "Checklist"]}
          goldWords={["Requirements"]}
          subtitle="Before installation, your site needs to meet these requirements. Our team will assess everything during the site visit."
        />

        <div className="space-y-4">
          {REQUIREMENTS.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  SECTION 5 — INSTALLATION PROCESS                      */
/* ═══════════════════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section className="bg-[#FFFBF0] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="How We Work"
          words={["Our", "Installation", "Process"]}
          goldWords={["Installation"]}
        />

        <div className="grid md:grid-cols-5 gap-5 relative">
          {/* Dashed connector */}
          <div className="hidden md:block absolute top-[3.25rem] left-[10%] right-[10%] h-px border-t-2 border-dashed border-amber-200 pointer-events-none" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="bg-white rounded-2xl border border-[#e8d5b0] p-6 hover:border-amber-300 hover:shadow-[0_12px_40px_rgba(217,119,6,0.15)] transition-all duration-300 relative"
                style={{ boxShadow: "0 4px 24px rgba(120,80,20,0.08)" }}
              >
                <p className="font-display text-4xl font-bold text-amber-200 leading-none mb-2 select-none">
                  {step.num}
                </p>
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-brand-gold" />
                </div>
                <h3 className="font-bold font-display text-brand-ink mb-2 text-sm">{step.title}</h3>
                <p className="text-brand-brown text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  SECTION 6 — CTA                                        */
/* ═══════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 left-[6%] -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 right-[6%] -translate-y-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Get Started Today</p>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5"
          variants={VARIANTS.container} initial="hidden" whileInView="visible" viewport={vp}
        >
          {["Ready", "to", "Install", "an", "EV", "Charging", "Station?"].map((w, i) => (
            <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">{w}</motion.span>
          ))}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.4 }}
          className="text-amber-100 text-lg mb-6 max-w-xl mx-auto leading-relaxed"
        >
          Contact us today for a free site assessment. We&apos;ll handle the technical design, installation, and commissioning.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 mb-8 text-amber-200 text-sm"
        >
          <a href={CONTACT.phoneHref} className="hover:text-white transition-colors">{CONTACT.phone}</a>
          <span>·</span>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">{CONTACT.email}</a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Request Free Assessment
          </Link>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  PAGE SHELL                                             */
/* ═══════════════════════════════════════════════════════ */
export default function EVChargingClient() {
  return (
    <div className="bg-[#FFFBF0] text-brand-ink overflow-hidden">
      <HeroSection />
      <WhySection />
      <ProductSection />
      <RequirementsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
