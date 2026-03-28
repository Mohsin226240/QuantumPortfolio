"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Menu, X, ArrowRight } from "lucide-react";
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
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
        transition={{ delay: 2.0, duration: 1.0, type: "spring", stiffness: 80, damping: 14 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "py-3 px-4" : "py-0 px-0"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`max-w-[1100px] mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "h-[48px] px-4 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-full shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
              : "h-[62px] px-5 bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_2px_10px_rgba(16,185,129,0.35)] group-hover:shadow-[0_4px_16px_rgba(16,185,129,0.5)] transition-shadow duration-300"
            >
              <TrendingUp size={15} color="white" strokeWidth={2.5} />
            </motion.div>
            <span className="font-bold text-[16px] tracking-tight text-gray-900" style={{ fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif" }}>
              Elite<span className="text-emerald-500">Fusion</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div
            className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-gray-50/80 backdrop-blur-sm rounded-full px-1.5 py-1 border border-gray-100/60"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {NAV_LINKS.map(([id, label], i) => (
              <motion.button
                key={id}
                onClick={() => handleNav(id)}
                onMouseEnter={() => setHoveredIdx(i)}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.4 + i * 0.07, duration: 0.5, type: "spring", stiffness: 120, damping: 14 }}
                className="relative px-3.5 py-1.5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-200 z-10"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: active === id ? "#059669" : hoveredIdx === i ? "#10b981" : "#6b7280",
                  transition: "color 0.2s ease",
                }}
              >
                {/* Hover pill background */}
                {hoveredIdx === i && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {label}
                {/* Active dot */}
                {active === id && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5, type: "spring", stiffness: 120, damping: 14 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <button
              onClick={handleStartTrading}
              className="hidden lg:flex items-center gap-1.5 relative px-5 py-2 text-[13px] font-bold text-white rounded-full bg-emerald-500 shadow-[0_2px_12px_rgba(16,185,129,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-[0_6px_24px_rgba(16,185,129,0.4)] active:translate-y-0 active:scale-[0.97] cursor-pointer group"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              className="lg:hidden p-[7px] bg-gray-900/5 border border-gray-900/8 rounded-xl text-gray-500 transition-all duration-200 hover:bg-emerald-500/8 hover:border-emerald-500/25 hover:text-emerald-500"
              onClick={() => setMobileMenuOpen((m) => !m)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-[60px] sm:top-[72px] left-3 right-3 z-50 bg-white/95 backdrop-blur-2xl border border-gray-200/50 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.1)] p-2 overflow-hidden max-h-[calc(100vh-80px)] overflow-y-auto"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map(([id, label], i) => (
              <motion.button
                key={id}
                className="block w-full text-left px-4 py-3 text-[14px] font-medium text-gray-600 bg-transparent border-none rounded-xl transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 hover:pl-5"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                onClick={() => handleNav(id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.24 }}
              >
                {label}
              </motion.button>
            ))}
            <div className="h-px bg-gray-100 mx-2 my-1.5" />
            <motion.button
              className="block w-full py-3 text-[14px] font-bold text-white bg-emerald-500 border-none rounded-xl shadow-[0_4px_16px_rgba(16,185,129,0.25)] transition-all duration-250 hover:bg-emerald-600 hover:shadow-[0_6px_22px_rgba(16,185,129,0.35)] hover:-translate-y-px"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              onClick={() => { handleStartTrading(); setMobileMenuOpen(false); }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.24 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
