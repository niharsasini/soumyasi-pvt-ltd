"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import {
  BRAND,
  CONTACT,
  SOCIAL,
  FOOTER_QUICK_LINKS,
} from "@/lib/config/site.config";

const SocialIcons = {
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const SERVICE_LINKS = [
  { label: "Solar Power Solutions",    href: "/solutions" },
  { label: "EV Charging Stations",     href: "/solutions/ev-charging" },
  { label: "Industrial Electrification", href: "/industries" },
  { label: "Energy Consulting",         href: "/contact" },
  { label: "Maintenance & Support",     href: "/contact" },
];

function Newsletter() {
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState("idle"); // idle | loading | success | error
  const [errMsg,  setErrMsg]  = useState("");

  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrMsg("");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
        <CheckCircle size={16} />
        Subscribed! Thank you.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrMsg(""); }}
          placeholder="Your email"
          aria-label="Email for newsletter"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/8 border border-white/10 focus:outline-none focus:border-amber-500/60 text-sm text-[#faf8f5] placeholder-[#c4b8a8]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs hover:shadow-gold transition-all duration-300 whitespace-nowrap disabled:opacity-70 flex items-center gap-1"
        >
          {status === "loading" ? <Loader2 size={12} className="animate-spin" /> : "Join"}
        </button>
      </div>
      {status === "error" && errMsg && (
        <p className="text-red-400 text-xs mt-1.5">{errMsg}</p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1a1208] text-[#c4b8a8] relative overflow-hidden">
      {/* Gold gradient divider at top */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(to right, transparent, #d97706, #f59e0b, #d97706, transparent)" }}
      />

      {/* Top CTA banner */}
      <div className="relative z-10 border-b border-white/5 py-10 px-5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-500 mb-1">Start Today</p>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#faf8f5]">
              Ready to Power Up?
            </h3>
            <p className="text-sm text-[#c4b8a8] mt-1 max-w-xs">
              Solar installations, EV charging stations, and industrial power — get a free assessment today.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-sm shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Get Free Quote →
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company info */}
          <div className="space-y-5">
            <h2 className="text-base font-bold font-display text-[#faf8f5]">{BRAND.name}</h2>
            <p className="text-sm text-[#c4b8a8] leading-relaxed">{BRAND.description}</p>
            <div className="flex gap-3">
              {[
                { href: SOCIAL.facebook, Icon: SocialIcons.Facebook, label: "Facebook" },
                { href: SOCIAL.linkedin, Icon: SocialIcons.Linkedin, label: "LinkedIn" },
                { href: SOCIAL.twitter,  Icon: SocialIcons.Twitter,  label: "X / Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/60 hover:text-amber-400 hover:shadow-[0_0_12px_rgba(217,119,6,0.3)] transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[#faf8f5] font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-amber-400 transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — now with real links */}
          <div>
            <h3 className="text-[#faf8f5] font-semibold mb-5 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-amber-400 transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[#faf8f5] font-semibold mb-5 text-sm uppercase tracking-wider">
                Contact Us
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[#c4b8a8]">
                    {CONTACT.address.line1}<br />{CONTACT.address.line2}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-amber-500 shrink-0" />
                  <a href={CONTACT.phoneHref} className="hover:text-amber-400 transition-colors">
                    {CONTACT.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-amber-500 shrink-0" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-amber-400 transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[#faf8f5] font-semibold text-sm mb-3">Newsletter</h4>
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5 text-center py-5 text-xs text-[#c4b8a8]/60 px-4">
        © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
        &nbsp;·&nbsp; Made with ☀️ in Odisha
        &nbsp;·&nbsp; <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
        &nbsp;·&nbsp; <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms</Link>
      </div>
    </footer>
  );
}
