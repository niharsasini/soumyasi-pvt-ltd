import React from "react";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Soumyashree Power Limited
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed">
              Delivering innovative and sustainable power solutions with
              excellence, reliability, and cutting-edge technology across
              industries.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-md hover:bg-yellow-500 hover:text-black transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-md hover:bg-yellow-500 hover:text-black transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-md hover:bg-yellow-500 hover:text-black transition"
              >
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
              {["Home", "About Us", "Services", "Projects", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "")}`}
                      className="hover:text-yellow-500 transition"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-lg">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Solar Power Solutions",
                "Electrical Infrastructure",
                "Power Distribution",
                "Energy Consulting",
                "Maintenance & Support",
              ].map((service, index) => (
                <li
                  key={index}
                  className="hover:text-yellow-500 transition cursor-pointer"
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
                <MapPin size={18} className="text-yellow-500 mt-1 shrink-0" />
                <p className="text-gray-400">
                  Plot No. 123, Industrial Area,
                  <br />
                  Bhubaneswar, Odisha, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-yellow-500 shrink-0" />
                <p className="text-gray-400">+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-500 shrink-0" />
                <p className="text-gray-400">info@soumyashreepower.com</p>
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
                className="px-4 py-2 w-full sm:w-64 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
              <button className="mt-3 sm:mt-0 sm:ml-0 bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none font-semibold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="bg-black text-center py-4 text-xs sm:text-sm text-gray-500 px-4">
        © {new Date().getFullYear()} Soumyashree Power Limited. All Rights
        Reserved.
      </div>
    </footer>
  );
}
