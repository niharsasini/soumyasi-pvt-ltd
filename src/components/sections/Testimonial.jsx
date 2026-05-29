"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import TestimonialCard from "@/components/cards/TestimonialCard";
import { TESTIMONIAL_DATA } from "@/lib/constants/testimonial.constants";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Testimonial() {
  const { badge, heading, description, testimonials } = TESTIMONIAL_DATA;

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 120; // slightly slower for readability

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

  return (
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">
          {/* LEFT ACCENT */}
          <div className="relative pl-6 sm:pl-8">
            <span className="absolute left-0 top-1 h-14 w-[3px] bg-yellow-500" />

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-sm sm:text-base font-semibold tracking-widest text-yellow-600 uppercase mb-4"
            >
              {badge}
            </motion.span>

            {/* Heading with fixed height to prevent shifting */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight min-h-[4.5rem] sm:min-h-[5rem] md:min-h-[6rem] relative"
            >
              {/* Invisible full heading to reserve space */}
              <span className="absolute invisible">{heading}</span>

              {/* Visible typing text */}
              <span>{displayText}</span>
              <span className="animate-pulse">|</span>
            </motion.h2>
          </div>

          {/* RIGHT DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            {description}
          </motion.p>
        </div>

        {/* TESTIMONIAL CAROUSEL */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div variants={itemVariants}>
                  <TestimonialCard {...item} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
