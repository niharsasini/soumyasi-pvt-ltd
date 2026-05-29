"use client";

import { motion } from "framer-motion";

export default function TestimonialCard({ icon: Icon, message, name, role }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
    >
      <Icon size={28} className="text-blue-700 mb-4" />

      <p className="text-gray-700 text-sm leading-relaxed mb-6">“{message}”</p>

      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
        <span className="text-xs text-gray-500">{role}</span>
      </div>
    </motion.div>
  );
}
