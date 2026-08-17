"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import FormFallback, { FORM_ERROR_MESSAGE } from "./FormFallback";
import { CONTACT } from "@/lib/config/site.config";

const SERVICES = [
  "Solar Power Installation",
  "EV Charging Station",
  "Industrial Electrification",
  "Maintenance & AMC",
  "Power Distribution",
  "Energy Consulting",
  "Other",
];

const FIELDS = [
  { name: "name",    label: "Full Name",    type: "text",  placeholder: "Rajesh Mohanty" },
  { name: "email",   label: "Email Address", type: "email", placeholder: "rajesh@example.com" },
  { name: "phone",   label: "Phone Number",  type: "tel",   placeholder: CONTACT.phone },
];

const fieldVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" } }),
};

export default function ContactForm() {
  const [form,    setForm]    = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState("idle"); // idle | loading | success | error
  const [shake,   setShake]   = useState(false);

  const isValid = (key, val) => {
    if (!val.trim()) return false;
    if (key === "email") return /\S+@\S+\.\S+/.test(val);
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    const invalid = Object.entries(form).some(([k, v]) => k !== "phone" && !v.trim());
    if (invalid) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setStatus("loading");
    try {
      // TODO: replace xpwzgkqr with your real Formspree form ID
      const res = await fetch("https://formspree.io/f/xpwzgkqr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("formspree error");
      if (typeof window !== "undefined") {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#d97706", "#f59e0b", "#fbbf24", "#059669"] });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle size={36} className="text-brand-emerald" />
        </div>
        <h3 className="text-2xl font-bold font-display text-brand-ink">Message Sent!</h3>
        <p className="text-brand-brown max-w-xs">
          Thank you! Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", service: "", message: "" }); setTouched({}); }}
          className="mt-2 text-sm text-brand-gold hover:text-amber-700 font-semibold transition-colors"
        >
          Send another message →
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
      transition={{ duration: 0.5 }}
      className="space-y-5"
      noValidate
    >
      {FIELDS.map(({ name, label, type, placeholder }, i) => {
        const err = touched[name] && !isValid(name, form[name]);
        const ok  = touched[name] && isValid(name, form[name]);
        return (
          <motion.div key={name} custom={i} variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium text-brand-ink mb-1.5">{label}</label>
            <div className="relative">
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl border text-brand-ink text-sm outline-none transition-all duration-200 bg-white
                  ${err ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : ""}
                  ${ok  ? "border-emerald-400 shadow-[0_0_0_3px_rgba(5,150,105,0.1)]" : ""}
                  ${!err && !ok ? "border-brand-border focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]" : ""}
                `}
              />
              <AnimatePresence>
                {ok && (
                  <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle size={16} className="text-emerald-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {err && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {name === "email" ? "Please enter a valid email" : `${label} is required`}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Service dropdown */}
      <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-brand-ink mb-1.5">Service Required</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 rounded-xl border text-brand-ink text-sm outline-none transition-all duration-200 bg-white appearance-none cursor-pointer
            ${touched.service && !form.service ? "border-red-400" : "border-brand-border focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]"}
          `}
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </motion.div>

      {/* Message */}
      <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium text-brand-ink mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          placeholder="Tell us about your project..."
          className={`w-full px-4 py-3 rounded-xl border text-brand-ink text-sm outline-none transition-all duration-200 bg-white resize-none
            ${touched.message && !form.message.trim() ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-brand-border focus:border-amber-400 focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]"}
          `}
        />
      </motion.div>

      {/* Error message */}
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {status === "error" && (
            <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-sm text-red-500 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="flex-shrink-0" /> {FORM_ERROR_MESSAGE}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-shimmer w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-gold-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
        >
          {status === "loading"
            ? <><Loader2 size={16} className="animate-spin" /> Sending...</>
            : "Send Message →"}
        </button>
      </motion.div>

      <FormFallback className="justify-center pt-1" />
    </motion.form>
  );
}
