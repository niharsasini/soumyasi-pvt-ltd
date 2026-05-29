"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-blue-100 text-lg"
        >
          Let’s discuss how we can power your next project with precision and
          reliability.
        </motion.p>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Phone size={24} />,
              title: "Call Us",
              info: "+91 98765 43210",
            },
            {
              icon: <Mail size={24} />,
              title: "Email Us",
              info: "info@soumyashreepower.com",
            },
            {
              icon: <MapPin size={24} />,
              title: "Office Address",
              info: "Bhubaneswar, Odisha, India",
            },
            {
              icon: <Clock size={24} />,
              title: "Working Hours",
              info: "Mon - Sat : 9:00 AM - 6:00 PM",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition text-center"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Send Us a Message
            </h2>
            <p className="mt-6 text-gray-600">
              Fill out the form and our team will get back to you within 24
              hours.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-md space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition shadow-md"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* ================= GOOGLE MAP ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29920.54841075549!2d85.798185!3d20.296058!"
              width="100%"
              height="400"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
