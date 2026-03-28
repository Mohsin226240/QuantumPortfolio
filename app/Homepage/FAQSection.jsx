"use client";

import React, { useState } from "react";
import { HeadphonesIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "What is Elite Fusion Trading?", answer: "Elite Fusion Trading is a professional multi-asset trading platform offering access to 200+ instruments including Forex, Crypto, Stocks, Indices and Commodities with institutional-grade execution." },
  { question: "How does the trading platform work?", answer: "Our platform connects you directly to global liquidity pools, offering ultra-fast 0.01s order execution, real-time analytics, advanced charting with 50+ indicators, and a full-featured order book." },
  { question: "How can I deposit funds?", answer: "We support 10+ payment methods including bank transfers, credit/debit cards, and major cryptocurrencies. Deposits are credited instantly to your trading account." },
  { question: "Is my account and funds secure?", answer: "Yes. We use 256-bit TLS encryption, segregated client accounts, two-factor authentication, and comply with tier-1 regulatory standards to keep your assets protected." },
  { question: "What is the minimum deposit?", answer: "You can start trading with a minimum deposit suited to your chosen account type. Contact our team or sign up to view current minimum requirements for each account tier." },
  { question: "Does Elite Fusion offer mobile trading?", answer: "Yes! Our platform is fully available on iOS and Android with all desktop features including live charts, order management, and real-time alerts." },
  { question: "What types of instruments can I trade?", answer: "Trade Forex (70+ pairs), Cryptocurrencies (30+ assets), Global Stocks (1000+ equities), Indices (20+), and Commodities including Gold, Oil and more — all in one platform." },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className={`rounded-xl border overflow-hidden transition-colors duration-200 ${open ? "bg-emerald-50 border-emerald-200" : "bg-white border-emerald-100"}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left group">
        <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{question}</span>
        <motion.div animate={{ rotate: open ? -90 : 0 }} transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-300 ${open ? "bg-emerald-600" : "bg-slate-100"}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke={open ? "#fff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-emerald-200 pt-3">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection({ scrollTo }) {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white transition-colors duration-500">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:sticky lg:top-28">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Frequently<br /><span style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Asked Questions</span></h2>
            <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-md">Elite Fusion Trading is gaining popularity in the crypto and forex space. Effective account management and understanding market fundamentals are crucial for success.</p>
            <div className="rounded-xl border p-5 bg-white border-emerald-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <HeadphonesIcon className="h-[18px] w-[18px]" style={{ color: "#059669" }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-900 mb-0.5">Still have questions?</p>
                <p className="text-xs text-slate-500">Our team is available 24/7</p>
              </div>
              <button onClick={() => scrollTo("contact")} className="px-4 py-2 rounded-lg text-white text-xs font-semibold flex-shrink-0" style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}>Contact Us</button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} viewport={{ once: true }}>
                <FAQItem {...faq} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
