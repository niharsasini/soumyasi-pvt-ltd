"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { CONTACT } from "@/lib/config/site.config";
import { VARIANTS } from "@/lib/animations/variants";

const INFO_CARDS = [
  {
    icon: Phone,
    title: "Call Us",
    info: CONTACT.phone,
    href: CONTACT.phoneHref,
    color: "text-brand-gold bg-amber-50",
  },
  {
    icon: Mail,
    title: "Email Us",
    info: CONTACT.email,
    href: CONTACT.emailHref,
    color: "text-brand-gold bg-amber-50",
  },
  {
    icon: MapPin,
    title: "Office Address",
    info: CONTACT.address,
    href: CONTACT.mapLink,
    color: "text-brand-gold bg-amber-50",
  },
  {
    icon: Clock,
    title: "Working Hours",
    info: CONTACT.hours,
    href: null,
    color: "text-brand-gold bg-amber-50",
  },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    info: "Quick response during business hours",
    href: CONTACT.whatsapp,
    color: "text-emerald-600 bg-emerald-50",
    external: true,
  },
];

export default function ContactClient() {
  return (
    <div className="bg-brand-bg text-brand-ink overflow-hidden">
      {/* ── HERO ── */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 text-center bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x:[0,25,0], y:[0,-18,0] }} transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
            className="absolute top-[8%] left-[4%] w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-amber-400/25 blur-3xl" />
          <motion.div animate={{ x:[0,-20,0], y:[0,15,0] }} transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:3 }}
            className="absolute top-[10%] right-[6%] w-32 h-32 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full bg-amber-300/20 blur-3xl" />
          <motion.div animate={{ x:[0,15,0], y:[0,-12,0] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:6 }}
            className="absolute bottom-[8%] left-[50%] w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-amber-400/15 blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="mb-5 flex justify-center">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          </div>
          <div className="w-8 h-1 bg-amber-500 rounded-full mb-3 mx-auto sm:hidden" />
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-display text-brand-ink leading-tight"
            variants={VARIANTS.container} initial="hidden" animate="visible"
          >
            {["Let’s", "Talk", "Energy"].map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Energy"
                  ? <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-5 max-w-xl mx-auto text-brand-brown text-sm sm:text-base lg:text-lg"
          >
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="py-10 sm:py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {INFO_CARDS.map(({ icon: Icon, title, info, href, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-brand-border rounded-2xl shadow-warm p-5 sm:p-6 flex flex-row sm:flex-col items-center text-left sm:text-center gap-4 sm:gap-0 hover:border-amber-400 hover:shadow-card-hover active:scale-[0.98] transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:mx-auto rounded-xl flex items-center justify-center mb-0 sm:mb-4 flex-shrink-0 ${color}`}>
                <Icon size={22} />
              </div>
              <div className="min-w-0 flex-1 sm:flex-none">
                <h3 className="text-sm font-bold text-brand-ink mb-1 sm:mb-2">{title}</h3>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-brand-brown text-sm hover:text-brand-gold transition-colors break-all">
                    {info}
                  </a>
                ) : (
                  <p className="text-brand-brown text-sm">{info}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FORM + DETAILS ── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-brand-section">
        <div className="section-divider mb-10 sm:mb-16" />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold mb-3">Why Choose Us</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-brand-ink leading-tight">
                We’re here to power <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">your future</span>
              </h2>
              <p className="mt-4 text-brand-brown leading-relaxed">
                Odisha’s most trusted solar, EV, and industrial power company. Over 500 installations, 50+ EV stations, and a team that answers every call.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "24/7 Support Line", val: CONTACT.phone, href: CONTACT.phoneHref },
                { icon: Mail,  label: "Email Response < 2h", val: CONTACT.email, href: CONTACT.emailHref },
                { icon: MapPin, label: "Visit Our Office", val: CONTACT.address, href: CONTACT.mapLink },
                { icon: Clock, label: "Business Hours", val: CONTACT.hours, href: null },
              ].map(({ icon: Icon, label, val, href }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-brand-ink hover:text-brand-gold transition-colors">{val}</a>
                    ) : (
                      <p className="text-sm text-brand-ink">{val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl border border-brand-border shadow-warm p-5 sm:p-8 border-t-4 border-t-amber-500"
          >
            <h3 className="text-xl font-bold font-display text-brand-ink mb-6">Send Us a Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-brand-border shadow-warm">
            <iframe
              title="Soumyashi Power Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.8!2d85.8!3d20.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhimatangi%20Housing%20Colony%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1"
              loading="lazy"
              className="w-full h-56 sm:h-64 lg:h-80 border-0 block"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
