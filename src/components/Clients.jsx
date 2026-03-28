import React from "react";
import { motion } from "framer-motion";

const clients = [
  "UPWORK",
  "CLUTCH",
  "AQUA",
  "XENOS",
  "QUANTUM",
  "HELIOS",
  "SYNTH",
  "ORBIT",
];

export function Clients() {
  return (
    <section className="py-12 sm:py-16 md:py-24 border-y border-white/10 bg-black overflow-hidden relative">
      {/* Inline animation CSS (single-file only) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee 50s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Edge fade */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 relative z-20">
        <p className="text-center text-white/50 text-xs sm:text-sm tracking-widest uppercase">
          Trusted by industry leaders
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 sm:gap-8 md:gap-12 items-center whitespace-nowrap marquee">
          {[...clients, ...clients].map((client, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.1 }}
              transition={{ type: "spring", stiffness:120, damping: 18 }}
              className="relative px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/50 flex-shrink-0"
            >
              <span className="text-base sm:text-xl md:text-2xl font-bold font-mono tracking-tighter text-white hover:text-cyan-400 transition-colors duration-300">
                {client}
              </span>

              {/* Glow */}
              <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
