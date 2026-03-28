"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const float = (delay = 0, dur = 3) => ({
  animate: { y: [0, -9, 0] },
  transition: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
});

const floatCentered = (delay = 0, dur = 3) => ({
  animate: { y: [0, -9, 0] },
  transition: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
  style: { position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)" },
});

function VisualAccount() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg,#ecfdf5 0%,#d1fae5 55%,#ccfbf1 100%)" }}>
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 200, height: 200, background: "#0d9488", opacity: .18, top: -50, left: "50%", transform: "translateX(-50%)", filter: "blur(52px)" }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 130, height: 130, background: "#10b981", opacity: .13, bottom: -30, right: -10, filter: "blur(44px)" }} />

      <motion.div {...floatCentered(0, 3)}
        className="bg-[#1e293b] rounded-2xl shadow-2xl"
        style={{ ...floatCentered(0, 3).style, width: 160, padding: 14 }}>
        <p className="text-[11.5px] font-semibold text-slate-200 mb-1">Quick Sign Up</p>
        <p className="text-[9.5px] text-slate-400 mb-2.5">All steps completed</p>
        {["Email verified", "KYB submitted"].map(t => (
          <div key={t} className="flex items-center gap-1.5 mb-1.5">
            <div className="w-[15px] h-[15px] rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <polyline points="2,5 4,7 8,3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[10px] text-slate-400">{t}</span>
          </div>
        ))}
        <div className="h-[3px] rounded-full bg-white/10 my-2.5 overflow-hidden">
          <div className="h-full w-full rounded-full" style={{ background: "linear-gradient(90deg,#10b981,#0d9488)" }} />
        </div>
        <div className="rounded-lg py-1.5 text-center text-[10px] font-semibold text-white"
          style={{ background: "linear-gradient(90deg,#10b981,#0d9488)" }}>Submit</div>
      </motion.div>

      <motion.div {...float(0.4, 2.7)}
        className="absolute bottom-4 right-3.5 bg-white rounded-xl shadow-lg border border-slate-100"
        style={{ padding: "8px 12px" }}>
        <p className="text-[9px] font-semibold text-emerald-600 mb-0.5">Account ID</p>
        <p className="text-[10.5px] font-semibold text-slate-800">#TRD-2847</p>
      </motion.div>
    </div>
  );
}

function VisualFund() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg,#ecfdf5 0%,#d1fae5 50%,#ccfbf1 100%)" }}>
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 210, height: 210, background: "#10b981", opacity: .16, top: -55, left: "50%", transform: "translateX(-50%)", filter: "blur(54px)" }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 120, height: 120, background: "#0d9488", opacity: .14, bottom: -20, left: -5, filter: "blur(44px)" }} />

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute bg-[#1e293b] rounded-2xl shadow-2xl"
        style={{ top: 12, left: "50%", transform: "translateX(-50%)", width: 166, padding: "12px 14px" }}>
        <p className="text-[9.5px] font-semibold tracking-wider text-emerald-400 mb-2.5">DEPOSIT METHOD</p>
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[["Bank", "text-blue-400"], ["Crypto", "text-violet-400"], ["VISA", "text-emerald-400"], ["Apple Pay", "text-pink-400"]].map(([l, c]) => (
            <div key={l} className={`bg-[#0f2040] rounded-lg py-1.5 text-center text-[9.5px] font-medium ${c}`}>{l}</div>
          ))}
        </div>
        <motion.div
          animate={{ opacity: [1, 0.65, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-lg py-1.5 text-center text-[10px] font-semibold text-white"
          style={{ background: "linear-gradient(90deg,#10b981,#0d9488)" }}>
          Instant Deposit
        </motion.div>
      </motion.div>

      <motion.div {...float(0.6, 2.5)}
        className="absolute bottom-4 right-3.5 bg-white rounded-xl shadow-lg border border-slate-100"
        style={{ padding: "8px 12px" }}>
        <p className="text-[9px] font-semibold text-emerald-500 mb-0.5">Balance</p>
        <p className="text-[11px] font-bold text-slate-900">$5,000.00</p>
      </motion.div>
    </div>
  );
}

function VisualTrade() {
  const bars = [
    [45, 0], [65, .1], [50, .2], [82, .3],
    [60, .4], [95, .5], [72, .6], [100, .7],
  ];
  const barColors = ["#10b981", "#0d9488", "#10b981", "#059669", "#10b981", "#0d9488", "#059669", "#10b981"];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg,#ecfdf5 0%,#d1fae5 50%,#ccfbf1 100%)" }}>
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 205, height: 205, background: "#10b981", opacity: .16, top: -50, left: "50%", transform: "translateX(-50%)", filter: "blur(52px)" }} />
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 125, height: 125, background: "#0d9488", opacity: .13, bottom: -20, right: -5, filter: "blur(44px)" }} />

      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        className="absolute bg-[#1e293b] rounded-2xl shadow-2xl"
        style={{ top: 11, left: "50%", transform: "translateX(-50%)", width: 168, padding: "11px 13px" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-slate-200">Live Markets</span>
          <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-[#052e16] text-green-400 font-semibold">● Live</span>
        </div>
        {[["BTC/USD", "+2.4%", "text-green-400"], ["ETH/EUR", "−0.8%", "text-red-400"], ["XRP/GBP", "+5.1%", "text-green-400"]].map(([p, c, cl]) => (
          <div key={p} className="flex items-center justify-between py-1 border-b border-white/[0.07] last:border-0">
            <span className="text-[9.5px] text-slate-300">{p}</span>
            <span className={`text-[9.5px] font-medium ${cl}`}>{c}</span>
          </div>
        ))}
        <div className="flex items-end gap-[3px] mt-2.5" style={{ height: 34 }}>
          {bars.map(([h, d], i) => (
            <motion.div key={i}
              className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, background: barColors[i], transformOrigin: "bottom" }}
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: d }} />
          ))}
        </div>
      </motion.div>

      <motion.div {...float(0.5, 3)}
        className="absolute bottom-4 right-3.5 bg-white rounded-xl shadow-lg border border-slate-100"
        style={{ padding: "8px 12px" }}>
        <p className="text-[9px] font-semibold text-emerald-500 mb-0.5">P&L Today</p>
        <p className="text-[11px] font-bold text-green-700">+$342.50</p>
      </motion.div>
    </div>
  );
}

function HowItWorksCard({ num, title, desc, image, index }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 20,
          background: "#fff",
          border: `1px solid ${hov ? "rgba(16,185,129,0.2)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: hov
            ? "0 20px 50px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.15)"
            : "0 1px 8px rgba(0,0,0,0.04)",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.6s cubic-bezier(0.25,0.1,0.25,1)",
          cursor: "default",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{
          overflow: "hidden",
          borderRadius: "20px 20px 0 0",
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hov ? "scale(1.15)" : "scale(1.08)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

        <div style={{ padding: "16px 20px 20px", flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8, color: "#059669" }}>{num}</p>
          <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, color: "#111827" }}>{title}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#7a8194", margin: 0 }}>{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

const steps = [
  {
    num: "01",
    title: "Create Account",
    desc: "Register in minutes with a simple sign-up process and get verified quickly.",
    image: "/createaccount.png",
  },
  {
    num: "02",
    title: "Fund Your Account",
    desc: "Deposit via bank, card, or crypto. Funds credited instantly.",
    image: "/fund.png",
  },
  {
    num: "03",
    title: "Start Trading",
    desc: "Access 200+ instruments with professional tools. Trade anywhere.",
    image: "/trading.png",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.035em",
            color: "#111827",
            fontFamily: "system-ui, sans-serif",
          }}>
            Start Trading in{" "}
            <span style={{ background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              3 Easy Steps
            </span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#7a8194", margin: "12px auto 0", maxWidth: 460 }}>
            Create your account, fund it instantly, and start trading across 200+ global markets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map(({ num, title, desc, image }, i) => (
            <HowItWorksCard key={i} num={num} title={title} desc={desc} image={image} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
