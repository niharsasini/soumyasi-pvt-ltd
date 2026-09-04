"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Leaf, TrendingUp, MapPin, Clock, X } from "lucide-react";
import SectionHeading from '@/components/ui/SectionHeading';
import { VARIANTS } from "@/lib/animations/variants";
import FormFallback, { FORM_ERROR_MESSAGE } from "@/components/forms/FormFallback";
import { CONTACT } from "@/lib/config/site.config";

const CULTURE = [
  { icon: Lightbulb, title: "Innovation", desc: "We build with the latest technology — from smart solar systems to IoT-enabled EV infrastructure. Push boundaries every day." },
  { icon: Leaf,      title: "Impact",      desc: "Your work directly reduces carbon emissions and powers communities across Odisha. Every installation counts." },
  { icon: TrendingUp, title: "Growth",     desc: "Fast-growing company with clear career paths, mentorship, and regular skill development programs." },
];

const ROLES = [
  {
    title: "Solar Design Engineer",
    type: "Full-time",
    location: "Bhubaneswar",
    dept: "Engineering",
    desc: "Design residential and commercial solar systems. Proficiency in AutoCAD and PVSyst required. 2+ years experience.",
  },
  {
    title: "EV Infrastructure Technician",
    type: "Full-time",
    location: "Cuttack / Bhubaneswar",
    dept: "Operations",
    desc: "Install, commission, and maintain EV charging stations. Electrical ITI/diploma required. Travel within Odisha.",
  },
  {
    title: "Business Development Executive",
    type: "Full-time",
    location: "Bhubaneswar",
    dept: "Sales",
    desc: "Drive B2B solar and EV sales across industries. 3+ years in energy/infra sales preferred. Fluent Odia + English.",
  },
  {
    title: "Project Manager — Power Infrastructure",
    type: "Full-time",
    location: "Bhubaneswar",
    dept: "Projects",
    desc: "Manage end-to-end delivery of industrial electrification projects. PMP certification a plus. 5+ years experience.",
  },
];

function ApplyModal({ role, onClose }) {
  const [submitted,    setSubmitted]    = useState(false);
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const data = new FormData(e.target);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      position: role.title,
      coverLetter: data.get("cover"),
    };
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("careers api error");
      setSubmitted(true);
    } catch {
      setSubmitError(FORM_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(120,80,20,0.2)] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-brand-muted hover:text-brand-ink p-2">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Leaf size={28} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-display text-brand-ink mb-2">Application Sent!</h3>
            <p className="text-brand-brown text-sm">We'll review your profile and get back to you within 5 business days.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold font-display text-brand-ink mb-1">Apply — {role.title}</h3>
            <p className="text-brand-muted text-sm mb-6">{role.dept} · {role.location}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name",  label: "Full Name",    type: "text",  ph: "Your name" },
                { name: "email", label: "Email",         type: "email", ph: "you@example.com" },
                { name: "phone", label: "Phone",         type: "tel",   ph: CONTACT.phone },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-brand-ink mb-1.5">{f.label}</label>
                  <input type={f.type} name={f.name} placeholder={f.ph} required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-ink outline-none focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)] transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-brand-ink mb-1.5">Cover Note (optional)</label>
                <textarea rows={3} name="cover" placeholder="Why you'd be a great fit..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-ink outline-none resize-none focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)] transition-all" />
              </div>
              {submitError && (
                <p aria-live="polite" className="text-red-500 text-xs">{submitError}</p>
              )}
              <button type="submit" disabled={submitting}
                className="btn-shimmer w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-gold-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {submitting ? "Submitting..." : "Submit Application →"}
              </button>
              <FormFallback className="justify-center" />
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function CareersClient() {
  const [applyRole, setApplyRole] = useState(null);

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,25,0], y:[0,-18,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[8%] left-[4%] h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x:[0,-20,0], y:[0,15,0] }} transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute top-[10%] right-[6%] h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64 rounded-full bg-amber-300/20 blur-3xl" />
          <motion.div animate={{ x:[0,15,0], y:[0,-12,0] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:6 }}
            className="absolute bottom-[8%] left-[50%] h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-full bg-amber-400/15 blur-3xl" />
        </div>
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
            We&apos;re Hiring
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-brand-ink leading-tight"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Build", "Odisha's", "Energy", "Future"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {["Energy", "Future"].includes(w)
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-brand-brown text-sm sm:text-base lg:text-lg">
            Join a passionate team turning Odisha into a clean energy powerhouse — one rooftop at a time.
          </motion.p>
        </div>
      </section>

      {/* Culture cards */}
      <section className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {CULTURE.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="active:scale-[0.98] bg-white border border-brand-border rounded-2xl shadow-warm p-5 sm:p-7 text-center hover:border-amber-400 hover:shadow-card-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-brand-gold" />
              </div>
              <h3 className="font-bold font-display text-brand-ink text-base mb-2">{title}</h3>
              <p className="text-brand-brown text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-brand-section">
        <div className="section-divider mb-10 sm:mb-14" />
        <div className="max-w-4xl mx-auto">
          <SectionHeading badge="Join the Team" words={["Open", "Positions"]} goldWords={["Open"]} />
          <div className="space-y-4">
            {ROLES.map((role, i) => (
              <motion.div key={role.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="active:scale-[0.98] bg-white border border-brand-border rounded-2xl shadow-warm p-5 sm:p-6 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">{role.dept}</span>
                    </div>
                    <h3 className="font-bold font-display text-brand-ink text-base">{role.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-brand-muted">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {role.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {role.type}</span>
                    </div>
                    <p className="mt-3 text-sm text-brand-brown leading-relaxed">{role.desc}</p>
                  </div>
                  <button onClick={() => setApplyRole(role)}
                    className="btn-shimmer w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-gold hover:shadow-gold-lg hover:scale-105 active:scale-[0.98] transition-all duration-300 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(255,255,255,0.08), transparent)" }} />
        <motion.div animate={{ scale:[1,1.3,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-1/2 left-[6%] -translate-y-1/2 h-40 w-40 sm:h-56 sm:w-56 lg:h-64 lg:w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-200 mb-4">Stay Connected</p>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight mb-5"
          >
            Don&apos;t See the Right Role?
          </motion.h2>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
            className="text-amber-100 text-sm sm:text-base lg:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            We&apos;re always looking for passionate people. Send us your profile and we&apos;ll reach out when the right opportunity opens.
          </motion.p>
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact"
              className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all duration-300">
              Send Your CV
            </Link>
            <Link href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full border-2 border-white/70 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white active:scale-[0.98] transition-all duration-300">
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Apply modal */}
      <AnimatePresence>
        {applyRole && <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} />}
      </AnimatePresence>
    </div>
  );
}
