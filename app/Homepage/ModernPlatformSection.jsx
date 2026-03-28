"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRightIcon, TrendingUpIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";

/* Reusable phone with screen content */
function PhoneWithContent({ phoneWidth }) {
  return (
    <div className="relative" style={{ width: phoneWidth }}>
      {/* Phone frame */}
      <img
        src="/mobile.png"
        alt="Phone"
        className="w-full h-auto relative z-10"
        draggable={false}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none" />
      {/* Screen area mask - exact fit inside phone display */}
      <div
        className="absolute z-[15] overflow-hidden"
        style={{
          top: '10%',
          left: '15%',
          width: '45%',
          height: '56%',
          borderRadius: '7% / 4%',
          background: '#111318',
        }}
      >
        <img
          src="/content.png"
          alt="Trading App"
          className="w-full h-full object-fill relative z-10"
          draggable={false}
        />
        {/* Trading chart SVG overlay */}
        <svg
          className="absolute z-[5]"
          style={{ top: '22%', left: '8%', width: '84%', height: '48%' }}
          viewBox="0 0 300 180"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`h${i}`} x1="0" y1={i * 45} x2="300" y2={i * 45} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          {[
            { x: 20, o: 120, c: 80, h: 60, l: 135, bull: true },
            { x: 45, o: 80, c: 95, h: 65, l: 110, bull: false },
            { x: 70, o: 95, c: 60, h: 40, l: 105, bull: true },
            { x: 95, o: 60, c: 75, h: 45, l: 90, bull: false },
            { x: 120, o: 75, c: 50, h: 30, l: 85, bull: true },
            { x: 145, o: 50, c: 70, h: 35, l: 80, bull: false },
            { x: 170, o: 70, c: 40, h: 25, l: 80, bull: true },
            { x: 195, o: 45, c: 65, h: 30, l: 75, bull: false },
            { x: 220, o: 65, c: 35, h: 20, l: 75, bull: true },
            { x: 245, o: 40, c: 55, h: 25, l: 65, bull: false },
            { x: 270, o: 55, c: 30, h: 15, l: 60, bull: true },
          ].map((c, i) => (
            <g key={i}>
              <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={c.bull ? "#10b981" : "#ef4444"} strokeWidth="1" />
              <rect x={c.x - 6} y={Math.min(c.o, c.c)} width="12" height={Math.abs(c.c - c.o)} rx="1" fill={c.bull ? "#10b981" : "#ef4444"} opacity="0.9" />
            </g>
          ))}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" x2="300" stroke="#10b981" strokeWidth="1" strokeDasharray="4 3" opacity="0.6">
            <animate attributeName="y1" dur="8s" repeatCount="indefinite"
              values="90;90;65;65;65;75;75;55;55;55;80;80;90"
              keyTimes="0;0.08;0.18;0.3;0.35;0.45;0.55;0.65;0.75;0.8;0.88;0.95;1" />
            <animate attributeName="y2" dur="8s" repeatCount="indefinite"
              values="90;90;65;65;65;75;75;55;55;55;80;80;90"
              keyTimes="0;0.08;0.18;0.3;0.35;0.45;0.55;0.65;0.75;0.8;0.88;0.95;1" />
          </line>
          <line x1="0" x2="300" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.5">
            <animate attributeName="y1" dur="10s" repeatCount="indefinite"
              values="110;110;125;125;125;115;115;130;130;130;118;118;110"
              keyTimes="0;0.06;0.16;0.28;0.34;0.44;0.54;0.64;0.74;0.8;0.9;0.96;1" />
            <animate attributeName="y2" dur="10s" repeatCount="indefinite"
              values="110;110;125;125;125;115;115;130;130;130;118;118;110"
              keyTimes="0;0.06;0.16;0.28;0.34;0.44;0.54;0.64;0.74;0.8;0.9;0.96;1" />
          </line>
          <line x1="0" x2="300" stroke="#10b981" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.35">
            <animate attributeName="y1" dur="12s" repeatCount="indefinite"
              values="45;45;38;38;38;50;50;42;42;42;48;48;45"
              keyTimes="0;0.07;0.17;0.3;0.36;0.46;0.56;0.66;0.76;0.82;0.9;0.95;1" />
            <animate attributeName="y2" dur="12s" repeatCount="indefinite"
              values="45;45;38;38;38;50;50;42;42;42;48;48;45"
              keyTimes="0;0.07;0.17;0.3;0.36;0.46;0.56;0.66;0.76;0.82;0.9;0.95;1" />
          </line>
          <rect rx="3" width="40" height="14" fill="#10b981" opacity="0.9" x="258">
            <animate attributeName="y" dur="8s" repeatCount="indefinite"
              values="83;83;58;58;58;68;68;48;48;48;73;73;83"
              keyTimes="0;0.08;0.18;0.3;0.35;0.45;0.55;0.65;0.75;0.8;0.88;0.95;1" />
          </rect>
          <text fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold" x="262">
            <animate attributeName="y" dur="8s" repeatCount="indefinite"
              values="93;93;68;68;68;78;78;58;58;58;83;83;93"
              keyTimes="0;0.08;0.18;0.3;0.35;0.45;0.55;0.65;0.75;0.8;0.88;0.95;1" />
            64,250
          </text>
        </svg>
      </div>
    </div>
  );
}

/* Reusable features list */
function FeaturesList() {
  return (
    <>
      {[
        { Icon: TrendingUpIcon, title: "Real-Time Analytics", desc: "Live charts, market depth & instant execution on every trade." },
        { Icon: ShieldCheckIcon, title: "Bank-Grade Security", desc: "Your funds & data are protected with enterprise-level encryption." },
        { Icon: ZapIcon, title: "Lightning-Fast Trades", desc: "Execute orders in milliseconds directly from your browser." },
      ].map(({ Icon, title, desc }, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-xs sm:text-sm leading-snug">{title}</p>
            <p className="text-gray-500 text-[10px] sm:text-xs leading-snug mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
      <a
        href="#"
        className="group inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-500 text-xs sm:text-sm font-semibold mt-1 transition-colors duration-300"
      >
        Start Trading Now
        <ChevronRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </a>
    </>
  );
}

export default function ModernPlatformSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 sm:py-28 md:py-32">
      {/* ── Heading ── */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center font-bold text-gray-900 leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] mb-16 sm:mb-20 md:mb-24 px-4"
      >
        Modern <span className="text-emerald-500">trading</span> platform
      </motion.h2>

      {/* ── Mobile/Tablet Layout: stacked vertically ── */}
      <div className="lg:hidden max-w-md mx-auto px-4 sm:px-6">
        {/* Phone - centered */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-10"
        >
          <PhoneWithContent phoneWidth={280} />
        </motion.div>

        {/* Features - below phone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          <FeaturesList />
        </motion.div>
      </div>

      {/* ── Desktop Layout: original absolute positioning ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 min-h-[500px] sm:min-h-[550px] md:min-h-[600px] hidden lg:block">

        {/* Left: Features */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[5%] lg:left-[8%] top-[10%] flex flex-col gap-5 z-30 max-w-[260px]"
        >
          <FeaturesList />
        </motion.div>

        {/* Right: Phone with content inside */}
        <motion.div
          initial={{ opacity: 0, y: 180 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-[90%] top-0"
        >
          <PhoneWithContent phoneWidth={340} />
        </motion.div>
      </div>
    </section>
  );
}
