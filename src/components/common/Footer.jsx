import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import {
  BRAND,
  CONTACT,
  SOCIAL,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES,
} from "@/lib/config/site.config";

const SOCIAL_ICON_CLASS =
  "p-2 bg-gray-800 rounded-md hover:bg-brand-accent hover:text-black transition";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {BRAND.name}
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed">
              {BRAND.description}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href={SOCIAL.facebook} aria-label="Facebook" className={SOCIAL_ICON_CLASS}>
                <Facebook size={18} />
              </a>
              <a href={SOCIAL.linkedin} aria-label="LinkedIn" className={SOCIAL_ICON_CLASS}>
                <Linkedin size={18} />
              </a>
              <a href={SOCIAL.twitter} aria-label="Twitter" className={SOCIAL_ICON_CLASS}>
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-accent transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_SERVICES.map((service) => (
                <li
                  key={service}
                  className="hover:text-brand-accent transition cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-accent mt-1 shrink-0" />
                <p className="text-gray-400">
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-brand-accent shrink-0" />
                <a href={CONTACT.phoneHref} className="text-gray-400 hover:text-brand-accent">
                  {CONTACT.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-brand-accent shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="text-gray-400 hover:text-brand-accent">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-base sm:text-lg">
                Subscribe to our Newsletter
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                Get the latest updates on our projects and innovations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full sm:w-64 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm"
              />
              <button className="mt-3 sm:mt-0 sm:ml-0 bg-brand-accent hover:bg-brand-accentDark text-black px-5 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none font-semibold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="bg-black text-center py-4 text-xs sm:text-sm text-gray-500 px-4">
        © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
