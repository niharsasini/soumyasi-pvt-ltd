"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

import { TESTIMONIAL_DATA } from "@/lib/constants/testimonial.constants";

export default function Testimonial() {
  const { testimonials } = TESTIMONIAL_DATA;

  return (
    <section className="w-full py-24 relative overflow-hidden" style={{ background: "#080e1a" }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(29,78,216,0.07), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white">
            Trusted Across{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #22d3ee, #3b82f6)" }}
            >
              Odisha
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base">
            Real results from real clients — from Bhubaneswar to Rourkela.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div
                  className="flex flex-col p-7 rounded-2xl h-full transition-all duration-300 hover:border-cyan-400/30"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array(t.stars)
                      .fill(0)
                      .map((_, j) => (
                        <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                      ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-cyan-400/70 text-xs mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
