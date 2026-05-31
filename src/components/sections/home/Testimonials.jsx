"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";

const HEADING = ["Trusted", "Across", "Odisha"];

const TESTIMONIALS = [
  {
    name:    "Rajesh Mohanty",
    role:    "Business Owner, Bhubaneswar",
    message: "Soumyashree installed solar panels for our factory. Electricity bills dropped 70% in the first month. Outstanding quality and professionalism.",
    stars:   5,
  },
  {
    name:    "Priya Nanda",
    role:    "IT Park Manager, Cuttack",
    message: "They set up our EV charging stations flawlessly. The team was efficient and the after-sales support has been excellent.",
    stars:   5,
  },
  {
    name:    "Suresh Pattnaik",
    role:    "Hospital Administrator, Puri",
    message: "Our solar and power backup has run without issues for 2 years. Truly reliable with exceptional support whenever needed.",
    stars:   5,
  },
  {
    name:    "Anita Behera",
    role:    "Homeowner, Rourkela",
    message: "The rooftop solar installation was seamless. The team explained everything clearly and the system already pays for itself.",
    stars:   5,
  },
  {
    name:    "Debashis Rath",
    role:    "Factory Director, Sambalpur",
    message: "Industrial power solutions from Soumyashree have been top-notch. They understood our requirements and delivered beyond expectations.",
    stars:   5,
  },
];

export default function Testimonials() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full py-24 bg-brand-bg relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.05), transparent)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
            Testimonials
          </p>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold font-display text-white"
            variants={VARIANTS.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {HEADING.map((w, i) => (
              <motion.span key={i} variants={VARIANTS.word} className="inline-block mr-[0.25em]">
                {w === "Odisha"
                  ? <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{w}</span>
                  : w}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-gray-400 max-w-xl mx-auto text-base"
          >
            Real results from real clients — from Bhubaneswar to Sambalpur.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-12"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="flex flex-col h-full p-7 rounded-2xl glass hover:border-amber-500/30 transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array(t.stars).fill(0).map((_, j) => (
                      <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-black flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-amber-400/70 text-xs mt-0.5">{t.role}</div>
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
