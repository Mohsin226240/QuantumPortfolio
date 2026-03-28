"use client";

import React, { useState, useEffect } from "react";
import { Zap, Globe, Shield, TrendingUp, DollarSign, Route, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    category: "Execution",
    tag: "Lightning Fast",
    title: "Ultra-Fast Trade Execution",
    desc: "Our matching engine processes orders in 0.01 seconds with zero requotes. Every millisecond counts in trading — and we give you the fastest fills in the industry.",
    bullets: ["0.01s average execution speed", "Zero slippage technology", "Tight spreads from 0.0 pips"],
    icon: Zap,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80&fit=crop",
  },
  {
    category: "Markets",
    tag: "200+ Instruments",
    title: "Global Market Access",
    desc: "Access Forex, Crypto, Stocks, Indices, and Commodities from a single platform. Diversify and trade what moves.",
    bullets: ["70+ Forex pairs", "30+ Crypto assets", "1000+ Global Stocks & Indices"],
    icon: Globe,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=200&q=80&fit=crop",
  },
  {
    category: "Analytics",
    tag: "AI Powered",
    title: "Real-Time Analytics & Insights",
    desc: "Advanced AI-powered analytics deliver actionable insights. Track performance, identify opportunities, and make data-driven decisions instantly.",
    bullets: ["Live market sentiment AI", "Performance dashboard", "Smart alerts & signals"],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80&fit=crop",
  },
  {
    category: "Finance",
    tag: "15+ Currencies",
    title: "Multi-Currency Support",
    desc: "Deposit, withdraw, and trade in 15+ currencies. Seamlessly convert between fiat and crypto with competitive rates and zero hidden fees.",
    bullets: ["USD, EUR, GBP, JPY & more", "Instant crypto conversion", "Zero conversion fees"],
    icon: DollarSign,
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=900&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=200&q=80&fit=crop",
  },
  {
    category: "Routing",
    tag: "Smart Tech",
    title: "Smart Order Routing",
    desc: "Our intelligent routing system automatically finds the best prices across 20+ liquidity providers for optimal execution on every trade.",
    bullets: ["20+ liquidity pools", "AI price optimization", "Reduced slippage on large orders"],
    icon: Route,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80&fit=crop",
  },
  {
    category: "Security",
    tag: "FCA Regulated",
    title: "Bank-Grade Security",
    desc: "Your funds are held in segregated tier-1 bank accounts with 256-bit TLS encryption. FCA regulated and fully compliant with international standards.",
    bullets: ["Segregated client funds", "FCA & CySEC regulated", "2FA & biometric login"],
    icon: Shield,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&q=80&fit=crop",
  },
];

const categories = ["All", "Execution", "Markets", "Analytics", "Finance", "Routing", "Security"];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export default function WhyChooseUs({ scrollTo, handleStartTrading }) {
  const [activeTab, setActiveTab] = useState("All");
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const w = useWindowWidth();

  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  const filtered = activeTab === "All" ? items : items.filter(i => i.category === activeTab);
  const safeIdx = Math.min(featuredIdx, filtered.length - 1);
  const featured = filtered[safeIdx];
  const sideItems = filtered;
  const FIcon = featured?.icon;

  return (
    <section
      id="why-us"
      style={{
        padding: isMobile ? "60px 16px 70px" : isTablet ? "80px 20px 90px" : "100px 24px 120px",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', 'Sora', system-ui, sans-serif",
      }}
    >
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.13) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.5,
      }} />

      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: -120, left: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)", filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-60px" }}
          style={{ marginBottom: isMobile ? 32 : 52 }}
        >
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: isMobile ? 16 : 24,
            marginBottom: isMobile ? 20 : 28,
            flexDirection: isMobile ? "column" : "row",
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? "clamp(24px, 7vw, 32px)" : "clamp(28px, 4vw, 48px)",
                fontWeight: 900,
                color: "#0f172a", lineHeight: 1.08, margin: 0,
                letterSpacing: "-0.03em",
              }}>
                Why thousands choose<br />
                <span style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #0d9488 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Elite Fusion Trading
                </span>
              </h2>
            </div>
            <div style={{ maxWidth: isMobile ? "100%" : 340 }}>
              <p style={{ fontSize: isMobile ? 14 : 15, color: "#64748b", lineHeight: 1.75, margin: "0 0 18px" }}>
                Discover the ultimate trading experience with features designed to elevate your performance at every level.
              </p>
              <button
                onClick={() => scrollTo && scrollTo("features")}
                style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 22px", borderRadius: 100, border: "none",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 6px 24px rgba(16,185,129,0.3)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(16,185,129,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(16,185,129,0.3)"; }}
              >
                Explore All Features <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{
            display: "flex", gap: isMobile ? 6 : 8, flexWrap: "wrap", paddingBottom: 4,
          }}>
            {categories.map(cat => {
              const active = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveTab(cat); setFeaturedIdx(0); }}
                  style={{
                    padding: isMobile ? "6px 14px" : "8px 20px",
                    borderRadius: 100,
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 600,
                    border: active ? "none" : "1.5px solid #e8edf2",
                    background: active
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "#fafafa",
                    color: active ? "#fff" : "#64748b",
                    cursor: "pointer",
                    boxShadow: active ? "0 4px 16px rgba(16,185,129,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* MAGAZINE GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1.5fr 1fr",
              gap: isMobile ? 16 : 22,
              alignItems: "start",
            }}
          >
            {/* BIG FEATURED CARD */}
            {featured && (
              <AnimatePresence mode="sync">
                <motion.div
                  key={featured.title}
                  initial={false}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0 }}
                  style={{
                    borderRadius: isMobile ? 18 : 24, overflow: "hidden",
                    background: "#fff",
                    border: "1.5px solid #d1fae5",
                    boxShadow: "0 24px 80px rgba(16,185,129,0.1), 0 6px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Image area */}
                  <div style={{
                    position: "relative",
                    height: isMobile ? 200 : isTablet ? 250 : 310,
                    overflow: "hidden", background: "#e6f7f1",
                  }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                    {/* Bottom fade */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, rgba(255,255,255,0.95), transparent)" }} />

                    {/* Tag */}
                    <div style={{
                      position: "absolute", top: isMobile ? 12 : 18, left: isMobile ? 12 : 18,
                      display: "flex", alignItems: "center", gap: 6,
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      borderRadius: 100, padding: isMobile ? "4px 10px" : "6px 14px",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    }}>
                      <FIcon size={isMobile ? 11 : 13} style={{ color: "#10b981" }} />
                      <span style={{ fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#059669" }}>{featured.tag}</span>
                    </div>

                    {/* Featured badge */}
                    <div style={{
                      position: "absolute", top: isMobile ? 12 : 18, right: isMobile ? 12 : 18,
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      borderRadius: 100, padding: isMobile ? "4px 10px" : "5px 14px",
                      fontSize: isMobile ? 9 : 10, fontWeight: 800, color: "#fff",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      boxShadow: "0 4px 12px rgba(16,185,129,0.35)",
                    }}>&#10022; Featured</div>

                    {/* Category chip on image bottom */}
                    <div style={{ position: "absolute", bottom: isMobile ? 12 : 18, left: isMobile ? 12 : 18, display: "flex", gap: 6 }}>
                      <span style={{
                        padding: "4px 12px", borderRadius: 100,
                        background: "rgba(16,185,129,0.15)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        fontSize: 11, fontWeight: 700, color: "#059669",
                      }}>{featured.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: isMobile ? "20px 18px 24px" : "26px 32px 32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{
                        width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: 12,
                        background: "rgba(16,185,129,0.09)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <FIcon size={isMobile ? 15 : 18} style={{ color: "#10b981" }} />
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: isMobile ? "clamp(18px, 5vw, 22px)" : "clamp(20px, 2.4vw, 27px)",
                      fontWeight: 900,
                      color: "#0f172a", margin: "0 0 10px", lineHeight: 1.15,
                      letterSpacing: "-0.022em",
                    }}>
                      {featured.title}
                    </h3>
                    <p style={{ fontSize: isMobile ? 13 : 14.5, color: "#64748b", lineHeight: 1.72, margin: "0 0 22px" }}>
                      {featured.desc}
                    </p>

                    {/* Bullets */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
                      {featured.bullets.map((b, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                            background: "rgba(16,185,129,0.1)",
                            border: "1px solid rgba(16,185,129,0.25)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <CheckCircle2 size={12} style={{ color: "#10b981" }} />
                          </div>
                          <span style={{ fontSize: isMobile ? 12.5 : 13.5, fontWeight: 600, color: "#1e293b" }}>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      display: "flex", alignItems: "center", gap: 14,
                      flexWrap: "wrap",
                    }}>
                      <button
                        onClick={handleStartTrading}
                        style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        padding: isMobile ? "10px 18px" : "11px 22px",
                        borderRadius: 100, border: "none",
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#fff", fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(16,185,129,0.3)",
                        transition: "all 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(16,185,129,0.38)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(16,185,129,0.3)"; }}
                      >
                        Learn More <ArrowRight size={15} />
                      </button>
                      <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Click any card to feature it</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* RIGHT SIDE CARDS */}
            <div style={{
              display: isMobile ? "grid" : "flex",
              gridTemplateColumns: isMobile ? "1fr" : undefined,
              flexDirection: isMobile ? undefined : "column",
              gap: isMobile ? 12 : 14,
            }}>
              {sideItems.slice(0, isMobile ? sideItems.length : 5).map((item, i) => {
                const SIcon = item.icon;
                const globalIdx = filtered.indexOf(item);
                const isActive = globalIdx === safeIdx;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 1 }}
                    onClick={() => setFeaturedIdx(globalIdx)}
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex", alignItems: "center", gap: 0,
                      borderRadius: isMobile ? 14 : 18, overflow: "hidden",
                      background: "#fff",
                      border: isActive ? "1.5px solid #10b981" : "1.5px solid #e8edf2",
                      boxShadow: isActive ? "0 4px 16px rgba(16,185,129,0.12)" : "0 2px 10px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "#10b981";
                      e.currentTarget.style.boxShadow = "0 24px 56px rgba(16,185,129,0.18), 0 10px 24px rgba(16,185,129,0.12)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "#e8edf2";
                      e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)";
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{
                      width: isMobile ? 70 : 90,
                      height: isMobile ? 70 : 90,
                      flexShrink: 0, overflow: "hidden", background: "#f0fdf4",
                    }}>
                      <img
                        src={item.thumb}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"}
                      />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, padding: isMobile ? "10px 12px" : "14px 16px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                        <SIcon size={11} style={{ color: "#10b981", flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.09em" }}>{item.tag}</span>
                      </div>
                      <h4 style={{
                        fontSize: isMobile ? 13 : 14, fontWeight: 800, color: "#0f172a",
                        margin: "0 0 5px", lineHeight: 1.3,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{item.title}</h4>
                      <p style={{
                        fontSize: isMobile ? 11 : 12, color: "#94a3b8", margin: 0, lineHeight: 1.55,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>{item.desc}</p>
                    </div>

                    {/* Arrow */}
                    <div style={{
                      width: isMobile ? 28 : 32, height: isMobile ? 28 : 32,
                      borderRadius: "50%", flexShrink: 0,
                      marginRight: isMobile ? 10 : 14,
                      background: "rgba(16,185,129,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <ChevronRight size={15} style={{ color: "#10b981" }} />
                    </div>
                  </motion.div>
                );
              })}

              {/* Bottom CTA strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{
                  padding: isMobile ? "16px 16px" : "20px 22px",
                  borderRadius: isMobile ? 14 : 18,
                  background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)",
                  border: "1.5px solid rgba(16,185,129,0.22)",
                  boxShadow: "0 4px 20px rgba(16,185,129,0.07)",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  gap: isMobile ? 12 : 16,
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", margin: "0 0 3px" }}>
                    &#10022; Explore all features
                  </p>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                    See everything Elite Fusion offers
                  </p>
                </div>
                <button
                  onClick={() => scrollTo && scrollTo("features")}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "10px 18px", borderRadius: 100, border: "none",
                    background: "linear-gradient(135deg, #059669, #0d9488)",
                    color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(5,150,105,0.28)",
                    transition: "all 0.2s",
                    width: isMobile ? "100%" : "auto",
                    justifyContent: "center",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(5,150,105,0.38)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(5,150,105,0.28)"; }}
                >
                  Learn more <ArrowRight size={13} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
