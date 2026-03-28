"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Crypto Payment Gateway",
    desc: "Accept 100+ cryptocurrencies globally with instant confirmation.",
    image: "/crypto.png",
    contain: true,
  },
  {
    title: "Crypto Wallet",
    desc: "Non-custodial multi-chain wallet for businesses and users.",
    image: "/Wallet.png",
    contain: true,
    scale: 1.25,
  },
  {
    title: "Payout Solutions",
    desc: "Instant crypto disbursements to any wallet worldwide.",
    image: "/Payout.png",
    contain: true,
    scale: 1.20,
  },
  {
    title: "Mass Payouts",
    desc: "Send thousands of crypto payments in one click.",
    image: "/MassPayouts.png",
    contain: true,
  },
  {
    title: "24/7 Support",
    desc: "Dedicated support team available around the clock.",
    image: "/CustomerSupport.png",
    contain: true,
  },
];

function FeatureCard({ f, index, span }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ gridColumn: span ? "span 1" : undefined }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 20,
          background: "#fff",
          border: `1px solid ${hov ? "rgba(16,185,129,0.2)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: hov
            ? "0 20px 50px rgba(16,185,129,0.15), 0 8px 20px rgba(16,185,129,0.1)"
            : "0 1px 8px rgba(0,0,0,0.04)",
          transform: hov ? "translateY(-14px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "all 0.6s cubic-bezier(0.25,0.1,0.25,1)",
          cursor: "default",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image Area */}
        <div style={{
          background: "#fff",
          overflow: "hidden",
          borderRadius: "20px 20px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200,
        }}>
          <img
            src={f.image}
            alt={f.title}
            style={{
              width: f.contain ? "auto" : "100%",
              height: f.contain ? "95%" : "100%",
              maxWidth: f.contain ? "95%" : "100%",
              objectFit: f.contain ? "contain" : "cover",
              display: "block",
              transform: hov ? `scale(${f.scale ? f.scale + 0.05 : (f.contain ? 1.2 : 1.55)})` : `scale(${f.scale || (f.contain ? 1.15 : 1.45)})`,
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 24px", flex: 1 }}>
          <h3 className="font-heading" style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}>
            {f.title}
          </h3>
          <p className="font-body" style={{
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "#7a8194",
            margin: 0,
          }}>
            {f.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" style={{
      position: "relative",
      padding: "clamp(48px, 8vw, 80px) clamp(12px, 4vw, 20px) clamp(60px, 8vw, 100px)",
      background: "#fff",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @media(max-width:900px){
          .feat-top-grid { grid-template-columns: 1fr !important; }
          .feat-bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media(min-width:901px) and (max-width:1100px){
          .feat-bottom-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>

        {/* Section Heading - centered at top */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2 className="font-heading" style={{
            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.035em",
            margin: "0 auto 16px",
            color: "#111827",
            maxWidth: 540,
          }}>
            Everything You Need to{" "}
            <span style={{ background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Accept Payments
            </span>
          </h2>
          <p className="font-body" style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "#7a8194",
            margin: "0 auto",
            maxWidth: 500,
          }}>
            Powerful tools for crypto payments, wallets, payouts, and 24/7 dedicated support — all in one platform.
          </p>
        </motion.div>

        {/* Top Row: 3 cards */}
        <div className="feat-top-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}>
          <FeatureCard f={FEATURES[0]} index={0} />
          <FeatureCard f={FEATURES[1]} index={1} />
          <FeatureCard f={FEATURES[2]} index={2} />
        </div>

        {/* Bottom Row: 2 cards centered */}
        <div className="feat-bottom-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 733,
          margin: "0 auto",
        }}>
          <FeatureCard f={FEATURES[3]} index={3} />
          <FeatureCard f={FEATURES[4]} index={4} />
        </div>

      </div>
    </section>
  );
}
