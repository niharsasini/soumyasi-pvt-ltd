import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  BRAND,
  CONTACT,
  SOCIAL,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES,
} from "@/lib/config/site.config";

const SocialIcons = {
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M2 3h6.5l13 18H15.5z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-400 relative overflow-hidden">
      {/* Top gradient border */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background: "linear-gradient(to right, transparent, rgba(34,211,238,0.4), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(29,78,216,0.12), transparent)",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-white font-display leading-snug">
              {BRAND.name}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{BRAND.description}</p>
            <div className="flex gap-3 pt-1">
              {[
                { href: SOCIAL.facebook, Icon: SocialIcons.Facebook, label: "Facebook" },
                { href: SOCIAL.linkedin, Icon: SocialIcons.Linkedin, label: "LinkedIn" },
                { href: SOCIAL.twitter, Icon: SocialIcons.Twitter, label: "X / Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-base">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-base">Our Services</h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_SERVICES.map((service) => (
                <li
                  key={service}
                  className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-base">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-gray-500">
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-cyan-400 shrink-0" />
                <a href={CONTACT.phoneHref} className="hover:text-cyan-400 transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-base">Subscribe to our Newsletter</h4>
              <p className="text-sm text-gray-500 mt-1">
                Get the latest updates on solar, EV, and power projects.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 w-full sm:w-64 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-400/50 text-sm text-white placeholder-gray-600 transition-colors"
              />
              <button className="px-6 py-2.5 rounded-xl bg-cyan-400 text-[#0f172a] font-semibold text-sm hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ── */}
      <div className="relative z-10 border-t border-white/5 text-center py-5 text-xs text-gray-600 px-4">
        © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved. · Bhubaneswar, Odisha.
      </div>
    </footer>
  );
}
