"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#020617] via-[#0B1220] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center w-full">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Industry tag */}
            <p className="uppercase tracking-[0.25em] sm:tracking-[0.3em] text-xs sm:text-sm text-cyan-400">
              Industrial Innovation
            </p>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Powering the <br />
              <span className="text-cyan-400">Next Generation</span> <br />
              of Industry
            </h1>

            {/* Animated value line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-xs sm:text-sm uppercase tracking-wide text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]"
            >
              Automation • Manufacturing • Smart Infrastructure
            </motion.p>

            {/* Core description */}
            <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
              We deliver advanced industrial solutions engineered for
              performance, automation, and long-term reliability — helping
              enterprises scale with confidence.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs sm:text-sm text-gray-400">
              <span>✔ Industry-grade solutions</span>
              <span>✔ Scalable & future-ready</span>
              <span>✔ Precision-engineered systems</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">
                Explore Solutions
              </button>

              <button className="w-full sm:w-auto px-6 py-3 rounded-md border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition">
                Contact Us
              </button>
            </div>
          </motion.div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] rounded-xl overflow-hidden shadow-2xl"
          >
            <video
              src="/video/3738727067-preview.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Video Text */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h3 className="text-sm sm:text-lg text-white font-semibold">
                Precision • Automation • Reliability
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Engineered for modern industrial ecosystems
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
