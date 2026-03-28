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
    <section className="py-24 border-y border-border bg-bg overflow-hidden relative">
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
      <div className="absolute inset-0 bg-gradient-to-r from-bg to-bg/0 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-20">
        <p className="text-center text-text-muted text-sm tracking-widest uppercase">
          Trusted by industry leaders
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        <div className="flex gap-12 items-center whitespace-nowrap marquee">
          {[...clients, ...clients].map((client, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.4 }}
              transition={{ type: "spring", stiffness:120, damping: 18 }}
              className="relative px-8 py-6 rounded-xl bg-card border border-border backdrop-blur-sm hover:bg-card-hover hover:border-cyan-500/50"
            >
              <span className="text-2xl font-bold font-mono tracking-tighter text-text hover:text-cyan-400 transition-colors duration-300">
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
