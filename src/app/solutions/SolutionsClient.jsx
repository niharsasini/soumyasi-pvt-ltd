"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, PenLine, Wrench, Activity,
  CheckCircle, ArrowRight, Star, PlugZap, Monitor,
  CreditCard, ShieldCheck, Award, Zap,
} from "lucide-react";
import { SOLUTIONS } from "@/lib/data/solutions";
import { VARIANTS } from "@/lib/animations/variants";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT } from "@/lib/config/site.config";

/* ── lazy-load 3-D viewer ─────────────────────────── */
const SolarPanelViewer = dynamic(
  () => import("@/components/three/SolarPanelViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] rounded-2xl animate-pulse bg-gradient-to-br from-amber-100 to-amber-200" />
    ),
  }
);

/* ── static data ──────────────────────────────────── */
const SOLAR_SPECS = [
  "Monocrystalline Silicon Cells",
  "Anti-Reflective Coating",
  "IP67 Weather Rating",
  "25-Year Performance Warranty",
  "Up to 22% Efficiency Rating",
  "Certified by MNRE India",
];

const EV_SPECS = [
  { icon: Zap,         name: "60kW Output",      value: "60 kW" },
  { icon: PlugZap,     name: "Dual Connector",   value: "CCS2 + CHAdeMO" },
  { icon: Monitor,     name: "Touchscreen",      value: "7\" Display" },
  { icon: CreditCard,  name: "RFID Access",      value: "Smart Card" },
  { icon: ShieldCheck, name: "IP65 Rated",       value: "Weatherproof" },
  { icon: Award,       name: "CMVR Certified",   value: "India Approved" },
];

const STEPS = [
  { num: "01", icon: MapPin,   title: "Site Assessment",      desc: "We visit your site, analyse energy needs, roof/land suitability, and existing electrical setup." },
  { num: "02", icon: PenLine,  title: "Custom Design",        desc: "Our engineers design a system tailored to your consumption, budget, and future growth plans." },
  { num: "03", icon: Wrench,   title: "Installation",         desc: "Certified technicians install your system with zero disruption. Most residential installs complete in 1–2 days." },
  { num: "04", icon: Activity, title: "Monitoring & Support", desc: "24/7 performance monitoring, annual maintenance, and a dedicated support line for the life of your system." },
];

const TESTIMONIALS = [
  { name: "Amit Sahu",    location: "Bhubaneswar", type: "Solar",      rating: 5, quote: "Soumyasi Power cut my factory's electricity bill by 72%. The installation was seamless — they handled everything from permits to commissioning." },
  { name: "Deepak Rath",  location: "Cuttack",     type: "EV Charging", rating: 5, quote: "The charging station at our mall has been running flawlessly for 18 months. Reliable hardware, smart access, zero downtime." },
  { name: "Sunita Mishra", location: "Puri",        type: "Industrial",  rating: 5, quote: "Their team upgraded our entire substation infrastructure. Professional execution, on-time delivery, and excellent post-install support." },
];

const FLOAT = {
  animate:    { y: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const vp = { once: true, margin: "-80px" };

/* ═══════════════════════════════════════════════════ */
/*  HERO                                               */
/* ═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="min-h-screen bg-[#FFFBF0] relative overflow-hidden flex items-center pt-28 pb-16 px-4">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ x:[0,25,0], y:[0,-18,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
          className="absolute top-[8%] left-[4%] h-80 w-80 rounded-full bg-amber-400/30 blur-3xl" />
        <motion.div animate={{ x:[0,-20,0], y:[0,15,0] }} transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:3 }}
          className="absolute top-[10%] right-[6%] h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />
        <motion.div animate={{ x:[0,15,0], y:[0,-12,0] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:6 }}
          className="absolute bottom-[8%] left-[50%] h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left */}
        <div>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-5">
            COMPLETE ENERGY SOLUTIONS
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight mb-6"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Everything", "You", "Need", "to", "Power", "Your", "World"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {["Power", "World"].includes(w)
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.7 }}
            className="text-brand-brown text-lg leading-relaxed mb-8 max-w-lg">
            From rooftop solar panels to city-wide EV charging networks — we design, install, and maintain complete energy infrastructure across Odisha.
          </motion.p>

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7, duration:0.6 }}
            className="flex flex-wrap gap-4 mb-8">
            <Link href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] hover:scale-105 transition-all duration-300">
              Get Free Assessment <ArrowRight size={15} />
            </Link>
            <Link href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300">
              View Our Projects
            </Link>
          </motion.div>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85, duration:0.6 }}
            className="flex flex-wrap gap-3">
            {[["🌞","Solar"],["⚡","EV Charging"],["🏭","Industrial"]].map(([emoji, label]) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-1.5 font-medium">
                {emoji} {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — solar field image */}
        <motion.div
          initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}
          {...FLOAT}
          className="hidden lg:block rounded-3xl overflow-hidden border border-amber-200/60 shadow-[0_30px_80px_rgba(217,119,6,0.18)]"
        >
          <Image
            src="/soumyasi/solar-field-odisha.png"
            alt="Soumyasi Power solar installation in Odisha"
            width={680}
            height={500}
            className="w-full h-auto object-cover object-center"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  SOLUTIONS GRID                                     */
/* ═══════════════════════════════════════════════════ */
function SolutionsGridSection() {
  return (
    <section className="bg-[#FFF8E7] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="What We Offer"
          words={["Core", "Energy", "Solutions"]}
          goldWords={["Energy"]}
          subtitle="Comprehensive power solutions engineered for homes, businesses, and industries across Odisha."
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={VARIANTS.cardGrid}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {SOLUTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title}
                variants={VARIANTS.card}
                whileHover={{ y:-10, borderColor:"#fcd34d", boxShadow:"0 16px 50px rgba(217,119,6,0.18)" }}
                transition={{ type:"spring", stiffness:300, damping:20 }}
                className="group bg-white rounded-2xl border border-[#e8d5b0] p-8 cursor-default"
                style={{ boxShadow:"0 4px 24px rgba(120,80,20,0.08)" }}
              >
                <div className="w-[60px] h-[60px] rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-300">
                  <Icon size={28} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#1a1208] mt-5 mb-2">{item.title}</h3>
                <p className="text-[#78614a] text-sm leading-relaxed mt-2">{item.description}</p>
                <Link href="/contact"
                  className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm mt-5 transition-colors">
                  Learn More →
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  3D SOLAR VIEWER                                    */
/* ═══════════════════════════════════════════════════ */
function SolarViewerSection() {
  return (
    <section className="bg-[#FFFBF0] py-24 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* Left */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideLeft}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-5">
            INTERACTIVE 3D EXPLORER
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink leading-tight mb-4">
            See Your Solar Panel{" "}
            <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
              Up Close
            </span>
          </h2>
          <p className="text-brand-brown leading-relaxed mb-7">
            Every panel we install uses monocrystalline technology for maximum efficiency. Drag to rotate, scroll to zoom — explore the same technology powering homes across Odisha.
          </p>

          <motion.ul
            className="space-y-3 mb-8"
            variants={VARIANTS.cardGrid}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {SOLAR_SPECS.map((spec) => (
              <motion.li key={spec} variants={VARIANTS.fadeUp}
                className="flex items-center gap-3 text-sm text-brand-ink">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <CheckCircle size={11} className="text-white" strokeWidth={2.5} />
                </span>
                {spec}
              </motion.li>
            ))}
          </motion.ul>

          <Link href="/contact"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:scale-105 transition-all duration-300">
            Get Solar Quote <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Right — 3D viewer */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideRight}>
          <div className="rounded-3xl border border-amber-200/60 bg-amber-50/30 p-4"
            style={{ boxShadow:"0 20px 60px rgba(217,119,6,0.12)" }}>
            <SolarPanelViewer />
            <p className="text-[#a8917a] text-xs text-center mt-3">
              🖱 Drag to rotate · Scroll to zoom
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  EV CHARGER                                         */
/* ═══════════════════════════════════════════════════ */
function EVChargerSection() {
  return (
    <section className="bg-[#FFF8E7] py-24 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* Left — image */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideLeft}
          {...FLOAT}
          className="rounded-3xl overflow-hidden border border-amber-200/60 shadow-[0_30px_80px_rgba(217,119,6,0.18)]"
        >
          <Image
            src="/soumyasi/ev-charger-ultra60.png"
            alt="Soumyasi Power Ultra 60 EV fast charger"
            width={620}
            height={520}
            className="w-full h-auto object-cover object-center"
          />
        </motion.div>

        {/* Right */}
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={VARIANTS.slideRight}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            ULTRA 60 THUNDER CHARGE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink leading-tight mb-5">
            60kW DC Fast Charger
          </h2>
          <p className="text-brand-brown leading-relaxed mb-8">
            Our flagship charging unit delivers 60kW of DC fast charging power — enough to charge most EVs in under 30 minutes. Built for Indian road conditions, weather-sealed, and RFID-enabled for smart access management.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {EV_SPECS.map(({ icon: Icon, name, value }) => (
              <div key={name}
                className="rounded-xl bg-white border border-[#e8d5b0] p-4 text-center"
                style={{ boxShadow:"0 4px 24px rgba(120,80,20,0.08)" }}>
                <Icon size={20} className="text-brand-gold mx-auto mb-2" />
                <p className="text-[10px] font-semibold text-brand-ink leading-tight">{name}</p>
                <p className="text-[10px] text-brand-gold font-bold mt-0.5 leading-tight">{value}</p>
              </div>
            ))}
          </div>

          <Link href="/solutions/ev-charging"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:scale-105 transition-all duration-300">
            Learn More <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  PROCESS                                            */
/* ═══════════════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section className="bg-[#FFFBF0] py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="How We Work"
          words={["A", "Seamless", "Process"]}
          goldWords={["Seamless"]}
          subtitle="From first call to final installation — engineered for your peace of mind."
        />

        <div className="grid md:grid-cols-4 gap-5 relative">
          {/* Dashed connector */}
          <div className="hidden md:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-amber-200 pointer-events-none" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={vp}
                transition={{ duration:0.55, delay:i * 0.15 }}
                className="bg-white rounded-2xl border border-[#e8d5b0] p-8 hover:border-amber-300 hover:shadow-card-hover transition-all duration-300 relative"
                style={{ boxShadow:"0 4px 24px rgba(120,80,20,0.08)" }}
              >
                <p className="font-display text-5xl font-bold text-amber-200 leading-none mb-2 select-none">
                  {step.num}
                </p>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-gold" />
                </div>
                <h3 className="font-bold font-display text-brand-ink mb-2">{step.title}</h3>
                <p className="text-[#78614a] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  TESTIMONIALS                                       */
/* ═══════════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section className="bg-[#FFF8E7] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Customer Stories"
          words={["Trusted", "Across", "Odisha"]}
          goldWords={["Trusted"]}
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={VARIANTS.cardGrid}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={VARIANTS.fadeUp}
              className="bg-white rounded-2xl border border-[#e8d5b0] p-7"
              style={{ boxShadow:"0 4px 24px rgba(120,80,20,0.08)" }}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-brand-brown text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold font-display text-brand-ink text-sm">{t.name}</p>
                  <p className="text-brand-muted text-xs mt-0.5">{t.location}</p>
                </div>
                <span className="text-[10px] font-bold tracking-wide uppercase text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                  {t.type}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  FINAL CTA                                          */
/* ═══════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
      <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
        className="absolute top-1/2 left-[6%] -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <motion.div animate={{ scale:[1.3,1,1.3], opacity:[0.15,0.3,0.15] }} transition={{ duration:7, repeat:Infinity, delay:2 }}
        className="absolute top-1/2 right-[6%] -translate-y-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Start Today</p>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold font-display text-white leading-tight mb-5"
          variants={VARIANTS.container} initial="hidden" whileInView="visible" viewport={vp}
        >
          {["Ready", "to", "Make", "the", "Switch?"].map((w, i) => (
            <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">{w}</motion.span>
          ))}
        </motion.h2>
        <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={vp} transition={{ delay:0.4 }}
          className="text-amber-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Get a free site assessment — no obligation, no pressure. Our team will design the perfect energy solution for your needs.
        </motion.p>
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={vp} transition={{ delay:0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"
            className="btn-shimmer inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
            Book Free Assessment
          </Link>
          <a href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 hover:border-white transition-all duration-300">
            Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════ */
/*  PAGE SHELL                                         */
/* ═══════════════════════════════════════════════════ */
export default function SolutionsClient() {
  return (
    <div className="bg-[#FFFBF0] text-brand-ink overflow-hidden">
      <HeroSection />
      <SolutionsGridSection />
      <SolarViewerSection />
      <EVChargerSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
