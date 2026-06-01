"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Leaf, TrendingUp, MapPin, Clock, X } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
        className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(120,80,20,0.2)] max-w-lg w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-muted hover:text-brand-ink p-1">
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
                { name: "phone", label: "Phone",         type: "tel",   ph: "+91 98765 43210" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-brand-ink mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.ph} required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-ink outline-none focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)] transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-brand-ink mb-1.5">Cover Note (optional)</label>
                <textarea rows={3} placeholder="Why you'd be a great fit..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-sm text-brand-ink outline-none resize-none focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)] transition-all" />
              </div>
              <button type="submit"
                className="btn-shimmer w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-gold-lg transition-all duration-300">
                Submit Application →
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function CareersPage() {
  const [applyRole, setApplyRole] = useState(null);

  return (
    <div className="bg-brand-bg text-brand-ink min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.05), transparent)" }} />
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4">
          We're Hiring
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-brand-ink leading-tight">
          Build Odisha's{" "}
          <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Energy Future</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-5 max-w-xl mx-auto text-brand-brown text-lg">
          Join a passionate team turning Odisha into a clean energy powerhouse — one rooftop at a time.
        </motion.p>
      </section>

      {/* Culture cards */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {CULTURE.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-brand-border rounded-2xl shadow-warm p-7 text-center hover:border-amber-400 hover:shadow-card-hover transition-all duration-300">
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
      <section className="pb-20 px-4 bg-brand-section">
        <div className="section-divider mb-14" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-3">Join the Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-brand-ink">Open Positions</h2>
          </div>
          <div className="space-y-4">
            {ROLES.map((role, i) => (
              <motion.div key={role.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-brand-border rounded-2xl shadow-warm p-6 hover:border-amber-400 hover:shadow-card-hover transition-all duration-300">
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
                    className="btn-shimmer self-start sm:self-center px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply modal */}
      <AnimatePresence>
        {applyRole && <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} />}
      </AnimatePresence>
    </div>
  );
}
