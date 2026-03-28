"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, MonitorIcon, Settings2Icon, RocketIcon, GraduationCapIcon, WalletIcon, ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';

const featurePills = [
  { icon: MonitorIcon, text: 'Modern platform' },
  { icon: Settings2Icon, text: 'Useful features' },
  { icon: RocketIcon, text: 'Easy start' },
  { icon: GraduationCapIcon, text: 'Learning center' },
  { icon: WalletIcon, text: 'Quick withdrawals' },
  { icon: ShieldCheckIcon, text: 'Trusted broker' },
];

/* ── Floating ticker badges ── */
const floatingTickers = [
  { text: "BTC +1.42%", x: "62%", y: "8%", delay: 1.2 },
  { text: "ETH +0.87%", x: "80%", y: "42%", delay: 1.5 },
  { text: "USDT +0.03%", x: "45%", y: "75%", delay: 1.8 },
  { text: "SOL +2.15%", x: "3%", y: "22%", delay: 1.4 },
  { text: "BNB +0.62%", x: "88%", y: "65%", delay: 2.0 },
  { text: "XRP +0.23%", x: "20%", y: "78%", delay: 1.6 },
];

/* ── Floating feature pills around person ── */
const floatingPills = [
  {
    text: "Instant Payouts", x: "34%", y: "43%", delay: 2.4,
    svg: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
];

/* ── Mini bar chart component ── */
function MiniChart({ x, y, delay, size = 1 }) {
  const bars = [40, 65, 45, 80, 55, 70, 90];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden lg:flex items-end gap-[2px] pointer-events-none"
      style={{ left: x, top: y }}
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: h * 0.3 * size }}
          transition={{ delay: delay + 0.1 + i * 0.06, duration: 0.5, ease: "easeOut" }}
          style={{
            width: 4 * size,
            borderRadius: 2,
            background: i === bars.length - 1 ? "#10b981" : `rgba(16,185,129,${0.15 + i * 0.08})`,
          }}
        />
      ))}
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#f8faf9] via-white to-white">

      {/* ── Cells SVG Background ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 top-[70px] flex items-center justify-center z-[1] pointer-events-none"
      >
        <div className="absolute w-[826px] sm:w-[1027px] md:w-[1251px] lg:w-[1487px] xl:w-[1711px]">
          <img src="/cells.svg" alt="" className="w-full h-auto opacity-[0.06]" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-white/90" />
        </div>
      </motion.div>


      <style>{`
        @keyframes heroFloat1 { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-7px) translateZ(0)} }
        @keyframes heroFloat2 { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-5px) translateZ(0)} }
        @keyframes heroFloat3 { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-9px) translateZ(0)} }
        @keyframes heroFloat4 { 0%,100%{transform:translateY(0) translateZ(0)} 50%{transform:translateY(-6px) translateZ(0)} }
      `}</style>

      {/* ── Instant Payouts pill ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute hidden lg:flex z-[8] pointer-events-none"
        style={{ left: "34%", top: "43%" }}
      >
        <div
          style={{ animation: "heroFloat1 5s ease-in-out infinite" }}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-xl px-3 py-2 shadow-lg shadow-emerald-500/[0.06]"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-gray-800">Instant Payouts</span>
            <span className="block text-[8px] text-gray-500 font-medium">24/7 Available</span>
          </div>
        </div>
      </motion.div>

      {/* ── Mini charts ── */}

      {/* ── Floating trade box ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute hidden lg:flex z-[8] pointer-events-none"
        style={{ right: "15%", top: "18%" }}
      >
        <div
          style={{ animation: "heroFloat2 6s ease-in-out infinite", animationDelay: "-2s" }}
          className="bg-white border border-gray-200/70 rounded-xl p-3 shadow-lg shadow-black/[0.04]"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V8M5 12l7-7 7 7" />
              </svg>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-800">Withdrawal Processed</span>
              <span className="block text-[9px] text-gray-400 font-medium">Just now</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-extrabold text-gray-700">$2,500.00</span>
            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">Completed</span>
          </div>
        </div>
      </motion.div>

      {/* ── Transaction success badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        className="absolute hidden lg:flex z-[8] pointer-events-none"
        style={{ left: "58%", top: "50%" }}
      >
        <div
          style={{ animation: "heroFloat3 4.5s ease-in-out infinite", animationDelay: "-4s" }}
          className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-emerald-100 rounded-xl px-4 py-2.5 shadow-lg shadow-emerald-500/[0.06]"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div>
            <span className="block text-[11px] font-bold text-gray-800">Payout Sent</span>
            <span className="block text-[9px] text-gray-500 font-medium">2,500 USDT</span>
          </div>
        </div>
      </motion.div>

      {/* ── Boy Image ── */}
      <motion.div
        initial={{ opacity: 0, y: 300, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 2.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 top-[70px] flex items-center justify-center z-[5] pointer-events-none -translate-y-[18%] sm:-translate-y-[3%]"
      >
        <div className="relative w-[260px] sm:w-[380px] md:w-[540px] lg:w-[620px] xl:w-[690px] mt-0 sm:mt-[6%]">
          <Image
            src="/boy.webp"
            alt="Trader"
            width={1000}
            height={1200}
            quality={100}
            unoptimized
            className="w-full h-auto object-contain select-none brightness-[1.14] contrast-[0.97] saturate-[1.06]"
            priority
            draggable={false}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[55%] sm:h-[40%] bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>
      </motion.div>

      {/* ── Content Layer ── */}
      <div className="relative z-20 min-h-screen flex flex-col px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8">

        {/* ─── Top: Title left ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md lg:max-w-lg lg:ml-12 xl:ml-20"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 tracking-wide uppercase">Zero Commission Platform</span>
          </div>
          <h1 className="font-extrabold leading-[1.1] tracking-[-0.03em] text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl mb-4 sm:mb-5" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Trade Smarter,</span>
            <br />
            <span className="text-gray-900">Redefine Your </span>
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Alpha</span><span className="text-gray-900">.</span>
          </h1>
          <p className="text-gray-400 text-[13px] sm:text-[15px] leading-[1.7] max-w-sm" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Practice with virtual money, pick from 50+ strategies, and track everything in real time. No risk, no fees.
          </p>
        </motion.div>

        {/* ─── Large spacer - pushes buttons to bottom on mobile ─── */}
        <div className="flex-[2] lg:flex-1" />

        {/* ─── Bottom: Buttons right + Stats ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-3 lg:mb-4">
          <div className="hidden lg:block" />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start lg:items-start lg:text-left gap-3 sm:gap-5 mb-0 sm:mb-6 lg:p-0"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[12px] sm:text-sm px-4 sm:px-9 py-2.5 sm:py-3.5 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Start now for $0
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-semibold text-[12px] sm:text-sm px-4 sm:px-9 py-2.5 sm:py-3.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Explore Strategies
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
              </button>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:ml-auto lg:mr-auto" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <div>
                <span className="block text-sm sm:text-xl font-extrabold text-gray-700">250+</span>
                <span className="block text-[9px] sm:text-[11px] text-gray-400 font-medium tracking-wide">Assets</span>
              </div>
              <div className="w-px h-7 sm:h-9 bg-gray-200" />
              <div>
                <span className="block text-sm sm:text-xl font-extrabold text-gray-700">50K+</span>
                <span className="block text-[9px] sm:text-[11px] text-gray-400 font-medium tracking-wide">Traders</span>
              </div>
              <div className="w-px h-7 sm:h-9 bg-gray-200" />
              <div>
                <span className="block text-sm sm:text-xl font-extrabold text-gray-700">99.9%</span>
                <span className="block text-[9px] sm:text-[11px] text-gray-400 font-medium tracking-wide">Uptime</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Small spacer before pills ─── */}
        <div className="flex-[0.3] lg:flex-1" />

        {/* ─── Bottom Feature Pills ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full px-2"
        >
          {featurePills.map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 + i * 0.08, duration: 0.5 }}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-full px-4 py-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <pill.icon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium text-gray-700 whitespace-nowrap">{pill.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
