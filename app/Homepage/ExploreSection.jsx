"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";

const cardAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 50, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
});

function useTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    setStyle({
      transform: "translateY(-8px) scale(1.02)",
      transition: "transform 0.3s ease-out",
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: "translateY(0) scale(1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return { ref, style, handleMove, handleLeave };
}

function LearnMore() {
  return (
    <span className="group inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 text-[11px] font-medium cursor-pointer transition-colors duration-300">
      Learn more
      <ChevronRightIcon className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-300" />
    </span>
  );
}

function TiltCard({ children, className, animDelay, gridClass }) {
  const { ref, style, handleMove, handleLeave } = useTilt();
  return (
    <motion.div {...cardAnim(animDelay)} className={gridClass}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`explore-tilt-card ${className}`}
        style={style}
      >
        <div className="shine-overlay" />
        {children}
      </div>
    </motion.div>
  );
}

export default function ExploreSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-14 md:py-18 px-4 sm:px-6">

      <style>{`
        .explore-tilt-card {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .explore-tilt-card .shine-overlay {
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,0.12) 45%,
            rgba(255,255,255,0.12) 55%,
            transparent 80%
          );
          z-index: 10;
          pointer-events: none;
          transition: none;
        }
        .explore-tilt-card:hover .shine-overlay {
          animation: shineSweep 0.7s ease-out forwards;
        }
        @keyframes shineSweep {
          0% { left: -100%; }
          100% { left: 120%; }
        }
        .explore-tilt-card:hover .explore-card-img {
          transform: scale(1.03);
        }
        .explore-card-img {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
      `}</style>

      {/* ── Main Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-4 sm:mb-6"
      >
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-gray-900">
          Discover the perfect blend of{' '}
          <span className="text-emerald-500">care, reliability</span>
          {' '}and <span className="text-emerald-500">usability</span>
        </h2>
      </motion.div>

      {/* ── Sub Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-6 sm:mb-8"
      >
        <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 leading-snug">
          Explore trading
          <br />
          with risk-free instruments
        </h3>
      </motion.div>

      {/* ── Bento Grid ── */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">

        {/* Card 1: Demo Account + Girl (full width) */}
        <TiltCard
          animDelay={0.1}
          gridClass="md:col-span-2"
          className="bg-white border border-gray-100 rounded-2xl flex flex-col sm:flex-row items-stretch shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
            <h4 className="font-extrabold text-lg sm:text-xl text-gray-900 leading-snug mb-2">
              Start with $10,000
            </h4>
            <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed mb-4">
              Open a free demo account and practice trading with virtual funds. Experience real market conditions with zero risk — master your strategy before going live.
            </p>
            <div className="flex items-center gap-5 mb-4">
              <div>
                <span className="block text-lg font-extrabold text-gray-900">250+</span>
                <span className="block text-[11px] text-gray-400 font-medium">Assets</span>
              </div>
              <div className="w-px h-7 bg-gray-200" />
              <div>
                <span className="block text-lg font-extrabold text-emerald-600">0%</span>
                <span className="block text-[11px] text-gray-400 font-medium">Commission</span>
              </div>
              <div className="w-px h-7 bg-gray-200" />
              <div>
                <span className="block text-lg font-extrabold text-gray-900">24/7</span>
                <span className="block text-[11px] text-gray-400 font-medium">Support</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer hover:-translate-y-0.5 shadow-md shadow-emerald-500/25">
                Open free account
              </button>
              <LearnMore />
            </div>
          </div>
          <div className="relative w-full sm:w-[42%] h-[220px] sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src="/girl.png"
              alt="Trader"
              className="explore-card-img h-full object-contain brightness-105 block mx-auto"
              draggable={false}
            />
          </div>
        </TiltCard>

        {/* Card 2: Risk-free trades */}
        <TiltCard
          animDelay={0.15}
          className="md:col-span-1 bg-white border border-gray-100 rounded-2xl p-2.5 flex flex-col justify-between max-h-none sm:max-h-[300px] shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug mb-0.5">
              Risk-free trades
            </h4>
            <p className="text-gray-500 text-[11px] mb-0.5">trade confidently</p>
            <LearnMore />
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <img
              src="/tradingchart.png"
              alt="Trading Chart"
              className="explore-card-img w-[90%] h-auto object-contain rounded-xl mx-auto block"
              draggable={false}
            />
          </div>
        </TiltCard>

        {/* Card 3: Insured deposits */}
        <TiltCard
          animDelay={0.2}
          className="md:col-span-1 bg-white border border-gray-100 rounded-2xl p-2.5 flex flex-col justify-between max-h-none sm:max-h-[300px] shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug mb-0.5">
              Insured deposits
            </h4>
            <LearnMore />
          </div>
          <div className="mt-1 flex justify-center overflow-hidden">
            <img
              src="/instrument1.png"
              alt="Insured"
              className="explore-card-img w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </TiltCard>

        {/* Card 4: Stop loss / Take profit */}
        <TiltCard
          animDelay={0.25}
          className="md:col-span-1 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div>
            <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug mb-0.5">
              Stop loss/Take profit
            </h4>
            <p className="text-gray-500 text-xs mb-1.5">close the trade on your terms</p>
            <LearnMore />
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-[10px] font-bold">!</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">Market went against your trade</p>
                <p className="text-[11px] text-gray-500">You saved $420</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-600 text-[10px] font-bold">✓</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">Stop loss / Take profit turned on</p>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Card 5: Negative balance protection */}
        <TiltCard
          animDelay={0.3}
          className="md:col-span-1 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div>
            <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug mb-0.5">
              Negative balance protection{' '}
              <span className="inline-block w-4 h-4 bg-emerald-500 rounded-full text-white text-[9px] text-center leading-4 align-middle">✓</span>
            </h4>
            <p className="text-gray-500 text-xs">so you only risk your trade amount</p>
          </div>
          <div className="mt-4 flex justify-center overflow-hidden">
            <img
              src="/instrument2.png"
              alt="Protection"
              className="explore-card-img w-[95%] h-auto object-contain"
              draggable={false}
            />
          </div>
        </TiltCard>

      </div>
    </section>
  );
}
