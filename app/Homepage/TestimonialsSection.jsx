"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    date: "August 28, 2025",
    name: "Eshan Shahid",
    stars: 5,
    text: "Elite Fusion Trading ka 0.01s execution time real hai. Forex aur crypto dono trade karta hoon — 70+ pairs with raw ECN spreads from 0.0 pips. No slippage, no requotes.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face",
  },
  {
    date: "January 05, 2026",
    name: "Dan Cheung",
    stars: 5,
    text: "The AI-powered market sentiment tool on Elite Fusion is a game changer. It analyzes news, social media, and price action in real time. My win rate jumped 30% since I started using it.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
  },
  {
    date: "December 12, 2025",
    name: "Nicolas Bastidas",
    stars: 5,
    text: "Deposited via crypto on Elite Fusion — $50 minimum, only network fees, and it reflected in 15 minutes. Zero-commission trading with 200+ instruments across forex, stocks, and crypto.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face",
  },
  {
    date: "November 18, 2025",
    name: "Laila Haddad",
    stars: 5,
    text: "Been trading indices and gold on Elite Fusion during high-volatility sessions — not a single disconnect. The smart order routing across 20+ liquidity providers gives institutional-level fills.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face",
  },
  {
    date: "October 03, 2025",
    name: "Marcus Webb",
    stars: 5,
    text: "Elite Fusion's analytics dashboard tracks my P&L, win rate, and risk metrics in real time. 50+ chart indicators, smart alerts — it genuinely feels like a Bloomberg terminal but for retail traders.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
  },
  {
    date: "September 14, 2025",
    name: "Amir Khalil",
    stars: 5,
    text: "Trading BTC and ETH with up to 100x leverage on Elite Fusion. The risk management tools are built for crypto volatility — perfect for scalping. FCA regulated so I actually trust them with my capital.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face",
  },
  {
    date: "February 22, 2026",
    name: "Sophie Turner",
    stars: 5,
    text: "Signed up on Elite Fusion in under 2 minutes, funded via PayPal instantly. Now trading 1000+ global stocks alongside crypto — all from one platform. 24/7 support actually responds within hours.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop&crop=face",
  },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function StarRow({ count }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#22c55e", fontSize: 13 }}>&#9733;</span>
      ))}
    </div>
  );
}

function Card({ date, name, stars, text, image, index, isMobile, isTablet }) {
  if (isMobile) {
    // Mobile: compact card with circular avatar
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        style={{
          flexShrink: 0,
          width: "100%",
          borderRadius: 16,
          overflow: "hidden",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          padding: "20px 18px",
          cursor: "default",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Top: Avatar + Name + Date */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: "2px solid #d1fae5",
          }}>
            <img
              src={image}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>{name}</p>
            <p style={{ fontSize: 10.5, color: "#9ca3af", margin: 0 }}>{date}</p>
          </div>
        </div>

        <StarRow count={stars} />
        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginTop: 10, marginBottom: 14 }}>{text}</p>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "#16a34a",
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: 99, padding: "3px 10px", width: "fit-content",
        }}>
          &#10003; Verified Trader
        </div>
      </motion.div>
    );
  }

  // Tablet & Desktop: horizontal card with side image
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.22 } }}
      style={{
        flexShrink: 0,
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "row",
        cursor: "default",
      }}
    >
      {/* Left: Text */}
      <div style={{
        flex: 1, padding: isTablet ? "18px 16px" : "22px 20px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>{date}</p>
          <p style={{ fontSize: isTablet ? 14 : 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{name}</p>
          <StarRow count={stars} />
          <p style={{ fontSize: isTablet ? 12.5 : 13, color: "#6b7280", lineHeight: 1.7, marginTop: 12 }}>{text}</p>
        </div>
        <div style={{
          marginTop: 16,
          display: "inline-flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "#16a34a",
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: 99, padding: "3px 10px", width: "fit-content",
        }}>
          &#10003; Verified Trader
        </div>
      </div>

      {/* Right: Image */}
      <div style={{
        width: isTablet ? 120 : 150,
        flexShrink: 0, overflow: "hidden",
      }}>
        <motion.img
          src={image}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const w = useWindowWidth();
  const total = testimonials.length;

  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  // Responsive card width
  const cardWidth = isMobile
    ? Math.min(w - 48, 380)
    : isTablet
    ? Math.min(w - 80, 400)
    : 436;
  const gap = isMobile ? 12 : 16;

  // How many cards visible at once
  const visibleCards = isMobile ? 1 : isTablet ? 1.5 : 2.3;
  const containerWidth = cardWidth * visibleCards + gap * (Math.ceil(visibleCards) - 1) + (isMobile ? 0 : cardWidth * 0.2);

  const goTo = (idx) => setCurrent(Math.max(0, Math.min(idx, total - 1)));
  const prev = () => goTo(current > 0 ? current - 1 : total - 1);
  const next = () => goTo(current < total - 1 ? current + 1 : 0);

  const offset = -(current * (cardWidth + gap));

  const btnStyle = () => ({
    width: isMobile ? 34 : 38, height: isMobile ? 34 : 38, borderRadius: "50%",
    background: "#ffffff", border: "1px solid #e5e7eb",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "#374151",
    transition: "background 0.18s, transform 0.12s",
    flexShrink: 0,
  });

  return (
    <section id="testimonials" style={{
      background: "#f9fafb",
      padding: isMobile ? "48px 16px" : isTablet ? "60px 24px" : "72px 40px",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "flex-start",
            marginBottom: isMobile ? 28 : 40,
            flexWrap: "wrap",
            gap: isMobile ? 16 : 20,
          }}
        >
          <div style={{ maxWidth: isMobile ? "100%" : 500, flex: 1 }}>
            <h2 style={{
              fontSize: isMobile ? 24 : isTablet ? 28 : 32,
              fontWeight: 800, color: "#111827",
              lineHeight: 1.25, marginBottom: 10,
            }}>
              Why Traders Choose Our<br />
              <span style={{ color: "#16a34a" }}>Crypto Prop Firm</span>
            </h2>
            <p style={{
              fontSize: isMobile ? 12.5 : 13.5,
              color: "#6b7280", lineHeight: 1.7, marginBottom: 18,
            }}>
              Verified reviews from funded traders trading through our exchange-connected evaluation model.
            </p>

            {/* Badges */}
            <div style={{
              display: "flex", gap: isMobile ? 10 : 16,
              flexWrap: "wrap",
            }}>
              {[
                { icon: <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.1-10 6.1-17z"/><path fill="#FBBC05" d="M10.6 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7.9-6.1A24 24 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.1-6z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-8.1 6C6.6 42.6 14.6 48 24 48z"/></svg>, score: "4.7/5", count: "210 reviews" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#00b67a"><path d="M12 0L14.9 8.9H24L17 14.1l2.9 8.9L12 17.8 4.1 23l2.9-8.9L0 8.9h9.1z"/></svg>, score: "4.3/5", count: "191 reviews" },
              ].map((b, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#fff", border: "1px solid #e5e7eb",
                  borderRadius: 10, padding: isMobile ? "6px 10px" : "8px 14px",
                }}>
                  {b.icon}
                  <div>
                    <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: "#111827" }}>{b.score}</div>
                    <div style={{ fontSize: isMobile ? 10 : 11, color: "#9ca3af" }}>{b.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={btnStyle()} onClick={prev}><ChevronLeft size={16} /></button>
            <button style={btnStyle()} onClick={next}><ChevronRight size={16} /></button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div style={{
          overflow: "hidden",
          maxWidth: isMobile ? "100%" : containerWidth,
        }}>
          <motion.div
            style={{
              display: "flex",
              gap: gap,
            }}
            animate={{ x: offset }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {testimonials.map((t, i) => (
              <div key={i} style={{ flexShrink: 0, width: cardWidth }}>
                <Card {...t} index={i} isMobile={isMobile} isTablet={isTablet} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: isMobile ? 20 : 28 }}>
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{ width: i === current ? 20 : 6, background: i === current ? "#16a34a" : "#d1d5db" }}
              transition={{ duration: 0.25 }}
              style={{ height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
