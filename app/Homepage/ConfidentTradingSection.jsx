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

function TiltCard({ children, className, animDelay }) {
  const { ref, style, handleMove, handleLeave } = useTilt();
  return (
    <motion.div {...cardAnim(animDelay)}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`confident-tilt-card ${className}`}
        style={{ ...style, height: "100%" }}
      >
        <div className="confident-shine" />
        {children}
      </div>
    </motion.div>
  );
}

export default function ConfidentTradingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-20 md:py-24 px-4 sm:px-6">

      <style>{`
        .confident-tilt-card {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .confident-tilt-card .confident-shine {
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.12) 55%, transparent 80%);
          z-index: 10;
          pointer-events: none;
        }
        .confident-tilt-card:hover .confident-shine {
          animation: confidentShineSweep 0.7s ease-out forwards;
        }
        @keyframes confidentShineSweep {
          0% { left: -100%; }
          100% { left: 120%; }
        }
        .confident-tilt-card:hover .confident-card-img {
          transform: scale(1.03);
        }
        .confident-card-img {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
      `}</style>

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
      >
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.12] tracking-tight text-gray-900">
          On your way
          <br />
          to confident trading
        </h2>
      </motion.div>

      {/* ── Bento Grid ── */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 [&>*]:min-h-[240px] sm:[&>*]:min-h-[280px] md:[&>*]:h-[300px]">

        {/* Card 1: 24/7 Support */}
        <TiltCard
          animDelay={0.1}
          className="bg-white border border-gray-100 rounded-2xl flex flex-col shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div className="p-3 pb-1">
            <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug text-center">
              24/7 support
            </h4>
            <p className="text-gray-500 text-xs text-center">in your language</p>
          </div>
          <div className="flex-1 flex items-center justify-center px-3 pb-2 overflow-hidden">
            <img
              src="/support.png"
              alt="24/7 Support"
              className="confident-card-img w-full max-h-[280px] object-contain rounded-xl -mt-2"
              draggable={false}
            />
          </div>
        </TiltCard>

        {/* Card 2: Trading Signals */}
        <TiltCard
          animDelay={0.15}
          className="bg-white border border-gray-100 rounded-2xl flex flex-col shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div className="p-3 pb-1">
            <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug text-center">
              Trading signals{' '}
              <span className="text-emerald-500">help you notice profitable trends</span>
            </h4>
          </div>
          <div className="flex-1 flex items-center justify-center px-3 pb-2 overflow-hidden">
            <img
              src="/tradingchart.png"
              alt="Trading Signals"
              className="confident-card-img w-[160%] max-h-none object-contain rounded-xl -mt-8"
              draggable={false}
            />
          </div>
        </TiltCard>

        {/* Card 3: Ready-to-use trading strategies */}
        <TiltCard
          animDelay={0.2}
          className="bg-white border border-gray-100 rounded-2xl flex flex-col shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div className="px-3 pt-2 pb-0">
            <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight text-center">
              Fast <span className="text-emerald-500">deposits & withdrawals</span>
            </h4>
            <p className="text-gray-400 text-[10px] text-center">Multiple payment methods</p>
          </div>
          <div className="flex-1 flex items-center justify-center px-3 pb-2 overflow-hidden">
            <img
              src="/payment.png"
              alt="Payment Methods"
              className="confident-card-img w-full max-h-[280px] object-contain rounded-xl scale-[1.15] -mt-14"
              draggable={false}
            />
          </div>
        </TiltCard>

        {/* Card 4: Trade 250+ Global Assets */}
        <TiltCard
          animDelay={0.25}
          className="bg-white border border-gray-100 rounded-2xl flex flex-col shadow-sm hover:shadow-[0_20px_50px_rgba(16,185,129,0.15),0_8px_20px_rgba(16,185,129,0.1)] cursor-default"
        >
          <div className="px-3 pt-2 pb-0">
            <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight text-center">
              Trade <span className="text-emerald-500">250+ global assets</span>
            </h4>
            <p className="text-gray-400 text-[10px] text-center">Stocks, Forex, Crypto & more</p>
          </div>
          <div className="flex-1 flex items-center justify-center px-3 pb-2 overflow-hidden">
            <img
              src="/assets1.png"
              alt="Trade Assets"
              className="confident-card-img w-[130%] max-h-none object-contain rounded-xl -mt-4"
              draggable={false}
            />
          </div>
        </TiltCard>

      </div>
    </section>
  );
}
