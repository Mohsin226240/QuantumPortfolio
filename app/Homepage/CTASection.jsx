"use client";

import React from "react";
import { ArrowRight, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection({ handleStartTrading, scrollTo }) {
  const tp = "text-slate-900";
  const ts = "text-slate-500";

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white transition-colors duration-500">
      <div className="max-w-[1320px] mx-auto">
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 lg:p-20 text-center"
          style={{ background: "linear-gradient(135deg,#ecfdf5,#f0fdf4,#ecfdf5)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.09) 0%, transparent 65%)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.6),transparent)" }} />
          <div className="relative z-10">
            <h2 className={`text-2xl lg:text-4xl font-bold ${tp} mb-3 leading-tight`}>Open Your <span style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Free Account</span></h2>
            <p className={`text-sm ${ts} mb-6 max-w-lg mx-auto`}>Get started in under 2 minutes. No minimum deposit required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={handleStartTrading} className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-xl shadow-emerald-500/25"
                style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}>
                Open Live Account <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-outline flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-slate-700">
                Talk to an Expert <HeadphonesIcon className="h-3.5 w-3.5" style={{ color: "#059669" }} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
