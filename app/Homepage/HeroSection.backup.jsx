"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, MonitorIcon, Settings2Icon, RocketIcon, GraduationCapIcon, WalletIcon, ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';

// ─── Bottom Feature Pills ───
const featurePills = [
  { icon: MonitorIcon, text: 'Modern platform' },
  { icon: Settings2Icon, text: 'Useful features' },
  { icon: RocketIcon, text: 'Easy start' },
  { icon: GraduationCapIcon, text: 'Learning center' },
  { icon: WalletIcon, text: 'Quick withdrawals' },
  { icon: ShieldCheckIcon, text: 'Trusted broker' },
];

// ─── Hero Section ───
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
          <img src="/cells.svg" alt="" className="w-full h-auto opacity-[0.08]" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        </div>
      </motion.div>

      {/* ── Boy Image (center, same as original) ── */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 top-[70px] flex items-center justify-center z-[5] pointer-events-none -translate-y-[3%]"
      >
        <div className="relative w-[360px] sm:w-[450px] md:w-[540px] lg:w-[620px] xl:w-[690px] mt-[6%]">
          <Image
            src="/boy.webp"
            alt="Trader"
            width={1000}
            height={1200}
            quality={100}
            unoptimized
            className="w-full h-auto object-contain select-none"
            priority
            draggable={false}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      </motion.div>

      {/* ── Content Layer ── */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8">

        {/* ─── Top: Title left ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md lg:max-w-lg lg:ml-12 xl:ml-20"
        >
          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3.5 py-1.5 mb-4">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] sm:text-[11px] font-medium text-gray-500">Zero Commission Platform</span>
          </div>
          <h1 className="font-extrabold leading-[1.06] tracking-tight text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl mb-3 sm:mb-4">
            <span className="text-gray-900">Build confidence</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">with every single trade</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Practice trading with real market data, AI-powered strategies, and zero-commission brokerage.
          </p>
        </motion.div>

        {/* ─── Spacer ─── */}
        <div className="flex-1" />

        {/* ─── Bottom: Buttons right + Stats ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-4">
          <div />

          {/* Right: Buttons + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start lg:items-start lg:text-left gap-5 mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-8 sm:px-10 py-2.5 sm:py-3 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 cursor-pointer"
              >
                Start now for $0
              </button>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-1 text-gray-500 hover:text-emerald-600 text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                Learn more
                <ChevronRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Stats with dividers */}
            <div className="flex items-center gap-5 lg:ml-auto lg:mr-auto">
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-gray-900">250+</span>
                <span className="block text-[9px] sm:text-[10px] text-gray-400 font-medium">Assets</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-gray-900">50K+</span>
                <span className="block text-[9px] sm:text-[10px] text-gray-400 font-medium">Traders</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-gray-900">99.9%</span>
                <span className="block text-[9px] sm:text-[10px] text-gray-400 font-medium">Uptime</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Spacer ─── */}
        <div className="flex-1" />

        {/* ─── Bottom Feature Pills ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="flex flex-nowrap justify-center gap-2 sm:gap-3 overflow-x-auto max-w-full px-2"
        >
          {featurePills.map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 + i * 0.1, duration: 0.5 }}
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
