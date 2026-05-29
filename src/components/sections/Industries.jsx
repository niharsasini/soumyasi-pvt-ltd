"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { INDUSTRIES, INDUSTRIES_META } from "@/lib/data/industries";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Industries() {
  const { badge, heading, description } = INDUSTRIES_META;
  const industries = INDUSTRIES;

  // ------------------ TYPE-DELETE REWRITE ANIMATION ------------------
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 120;

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayText.length < heading.length) {
      timeout = setTimeout(() => {
        setDisplayText(heading.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === heading.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(heading.slice(0, displayText.length - 1));
      }, typingSpeed / 1.5);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, heading]);
  // -------------------------------------------------------------------

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
      >
        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT – CONTENT */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <span className="inline-block mb-3 text-xs sm:text-sm font-semibold tracking-wider text-yellow-600 uppercase">
              {badge}
            </span>

            {/* ------------------- HEADING WITH TYPING ANIMATION ------------------- */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[6rem] relative">
              {/* Invisible full heading to reserve space */}
              <span className="absolute invisible">{heading}</span>

              {/* Visible typing text */}
              <span>{displayText}</span>
              <span className="animate-pulse">|</span>
            </h2>
            {/* --------------------------------------------------------------------- */}

            <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* RIGHT – INDUSTRIES LIST */}
          <motion.div
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={container}
          >
            {industries.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="group flex gap-4 items-start p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md transition"
                >
                  {/* ICON */}
                  <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition">
                    <Icon size={20} className="text-blue-800" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
