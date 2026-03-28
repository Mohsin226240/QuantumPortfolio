"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  ["features", "Features"],
  ["markets", "Markets"],
  ["why-us", "Why Us"],
  ["testimonials", "Reviews"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
];

export default function Navbar({ scrollTo, handleStartTrading, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setActive(id);
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.9, type: 'spring', stiffness: 90, damping: 16 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ${
          scrolled ? "py-2 px-4" : "py-0 px-0"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`max-w-[1100px] mx-auto flex items-center justify-between px-5 transition-all duration-400 ${
            scrolled
              ? "h-[54px] bg-white/90 backdrop-blur-2xl border border-emerald-500/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]"
              : "h-[62px] bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0_3px_12px_rgba(16,185,129,0.38)] group-hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] transition-shadow duration-300"
            >
              <TrendingUp size={15} color="white" strokeWidth={2.5} />
            </motion.div>
            <span className="font-bold text-[16px] tracking-tight text-gray-900" style={{ fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif" }}>
              Elite<span className="text-emerald-600">Fusion</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(([id, label], i) => (
              <motion.button
                key={id}
                onClick={() => handleNav(id)}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.4 + i * 0.08, duration: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
                className={`relative px-3.5 py-1.5 text-[13.5px] font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  active === id
                    ? "text-emerald-600 font-semibold bg-emerald-500/8 shadow-[0_0_0_1px_rgba(16,185,129,0.16)]"
                    : "text-gray-500 hover:text-emerald-600 hover:bg-emerald-500/7 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.14),0_2px_14px_rgba(16,185,129,0.13)] hover:-translate-y-px"
                }`}
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {label}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.6, type: 'spring', stiffness: 100, damping: 14 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <button
              onClick={handleStartTrading}
              className="hidden lg:block relative px-5 py-2 text-[13px] font-bold text-white rounded-full overflow-hidden bg-emerald-600 shadow-[0_4px_20px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-emerald-700 hover:shadow-[0_8px_30px_rgba(16,185,129,0.4),0_0_0_3px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-0 active:scale-100"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              <span className="relative z-10">Get Started →</span>
            </button>
            <button
              className="lg:hidden p-[7px] bg-gray-900/5 border border-gray-900/8 rounded-lg text-gray-500 transition-all duration-200 hover:bg-emerald-500/8 hover:border-emerald-500/25 hover:text-emerald-500"
              onClick={() => setMobileMenuOpen((m) => !m)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-[78px] left-3 right-3 z-50 bg-white/[0.97] backdrop-blur-2xl border border-emerald-500/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-3 overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map(([id, label], i) => (
              <motion.button
                key={id}
                className="block w-full text-left px-3.5 py-[11px] text-[14px] font-medium text-gray-500 bg-transparent border-none rounded-[10px] transition-all duration-200 hover:bg-emerald-500/7 hover:text-emerald-600 hover:pl-[18px]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                onClick={() => handleNav(id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.24 }}
              >
                {label}
              </motion.button>
            ))}
            <div className="h-px bg-gray-900/7 mx-1 my-2" />
            <motion.button
              className="block w-full py-3 text-[14px] font-bold text-white bg-emerald-600 border-none rounded-[11px] shadow-[0_4px_16px_rgba(16,185,129,0.30)] transition-all duration-250 hover:bg-emerald-700 hover:shadow-[0_6px_22px_rgba(16,185,129,0.42)] hover:-translate-y-px"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              onClick={() => { handleStartTrading(); setMobileMenuOpen(false); }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.24 }}
            >
              Get Started →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
