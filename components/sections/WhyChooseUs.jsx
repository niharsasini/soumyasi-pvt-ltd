"use client";

import React from "react";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US_DATA } from "../../lib/constants/whyChooseUs.constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseUs() {
  const { badge, description, features } = WHY_CHOOSE_US_DATA;

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* SECTION HEADER */}
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <span className="inline-block mb-3 text-xs sm:text-sm font-semibold tracking-wider text-yellow-600 uppercase">
            {badge}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Powering Industries with{" "}
            <span className="text-blue-800">Trust & Innovation</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* ICON */}
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Icon size={22} className="text-blue-800" />
                </div>

                {/* TITLE */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* ACCENT LINE */}
                <div className="mt-4 h-[2px] w-8 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
