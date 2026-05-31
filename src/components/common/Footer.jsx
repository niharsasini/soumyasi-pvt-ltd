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

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-400 relative overflow-hidden">
      {/* Top gold border */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(245,158,11,0.45), transparent)",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,158,11,0.08), transparent)",
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company info */}
          <div className="space-y-5">
            <h2 className="text-base font-bold font-display text-white">{BRAND.name}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{BRAND.description}</p>
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
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_SERVICES.map((svc) => (
                <li key={svc} className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">
                  {svc}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-gray-500">
                  {CONTACT.address.line1}<br />{CONTACT.address.line2}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <a href={CONTACT.phoneHref} className="hover:text-amber-400 transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-amber-400 transition-colors break-all">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h4 className="text-white font-semibold text-sm">Subscribe to our Newsletter</h4>
            <p className="text-xs text-gray-500 mt-1">
              Get updates on solar, EV networks and power projects across Odisha.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className="px-4 py-2.5 w-full sm:w-60 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-amber-400/50 text-sm text-white placeholder-gray-600 transition-colors"
            />
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold text-sm hover:shadow-gold transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5 text-center py-5 text-xs text-gray-600 px-4">
        © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved. · Bhubaneswar, Odisha, India.
      </div>
    </footer>
  );
}
