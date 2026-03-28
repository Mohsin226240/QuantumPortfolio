"use client";

import React, { useRef } from "react";
import { TrendingUp, TrendingDown, ArrowRight, Activity, BarChart3, Users, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";

function MiniChart({ positive }) {
  const pts = React.useMemo(() => {
    let v = positive ? 35 : 65;
    return Array.from({ length: 24 }, (_, i) => {
      const spike = (Math.random() - 0.5) * 18;
      const trend = positive ? 1.2 : -1.2;
      v += spike + trend;
      v = Math.max(8, Math.min(92, v));
      return v;
    });
  }, [positive]);
  const w = 80, h = 32;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(p => h - (p / 100) * h);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = line + ` L${w},${h} L0,${h} Z`;
  const color = positive ? "#10b981" : "#ef4444";

  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="bevel"
        opacity="0.7"
      />
    </svg>
  );
}

export const fallbackMarkets = [
  { name: "BTCUSDT", price: "64250.00", change: "+2.41%", positive: true, volume: "1.2B", marketCap: "1.26T" },
  { name: "ETHUSDT", price: "3420.80", change: "+0.98%", positive: true, volume: "820M", marketCap: "411B" },
  { name: "BNBUSDT", price: "410.25", change: "-0.65%", positive: false, volume: "240M", marketCap: "63B" },
  { name: "SOLUSDT", price: "145.30", change: "-1.42%", positive: false, volume: "560M", marketCap: "68B" },
  { name: "XRPUSDT", price: "0.5820", change: "+1.12%", positive: true, volume: "310M", marketCap: "33B" },
  { name: "ADAUSDT", price: "0.4510", change: "+0.33%", positive: true, volume: "190M", marketCap: "15B" },
];

export default function MarketsSection({ markets, handleStartTrading }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section 
      id="markets" 
      ref={sectionRef} 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <style>{`
        .market-row {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .market-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #059669;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .market-row:hover::before {
          transform: scaleY(1);
        }
        .market-row:hover {
          background: linear-gradient(90deg, rgba(5, 150, 105, 0.03) 0%, transparent 100%);
          box-shadow: 0 2px 12px rgba(5, 150, 105, 0.06);
        }
        .trade-btn {
          opacity: 1;
          transform: translateX(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .trade-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        .trade-btn:hover::before {
          left: 100%;
        }
        .trade-btn:hover {
          background: #047857;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
        }
        .market-row:hover .trade-btn {
          opacity: 1;
          transform: translateX(0);
        }
        .coin-icon {
          transition: transform 0.25s ease;
        }
        .market-row:hover .coin-icon {
          transform: scale(1.08);
        }
        .price-badge {
          transition: transform 0.2s ease;
        }
        .market-row:hover .price-badge {
          transform: scale(1.06);
        }
        
        .stat-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22), 0 8px 20px rgba(0,0,0,0.15) !important;
        }
        .stat-icon {
          transition: all 0.3s ease;
        }
        .stat-card:hover .stat-icon {
          transform: scale(1.15) rotate(5deg);
        }
        .stat-value {
          transition: all 0.3s ease;
        }
        .stat-card:hover .stat-value {
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.035em",
            color: "#1a1a2e",
            fontFamily: "system-ui, sans-serif",
            marginBottom: 12,
          }}>
            Live{" "}
            <span style={{ background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Market Prices
            </span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#7a8194", margin: 0 }}>
            Track real-time prices and execute trades instantly across Forex, Crypto, Stocks & more.
          </p>
        </motion.div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="rounded-xl shadow-lg shadow-slate-200/60 border border-slate-200 overflow-hidden relative overflow-x-hidden"
          style={{ background: "rgba(255,255,255,0.88)" }}
        >
          {/* Background image inside card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/market.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.4,
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-white/60" />

          {/* Table Header */}
          <div className="relative z-10 bg-gradient-to-r from-slate-50/90 to-white/90 backdrop-blur-sm px-3 sm:px-5 py-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Market Overview</h3>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="relative z-10 px-2 sm:px-5">
            {/* Header Row - Mobile */}
            <div className="grid sm:hidden border-b border-slate-100 py-2.5" style={{ gridTemplateColumns: "2fr 1fr" }}>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-2">Asset</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-2 text-right">Trade</span>
            </div>
            {/* Header Row - Tablet+ */}
            <div className="hidden sm:grid border-b border-slate-100 py-2.5" style={{ gridTemplateColumns: "2fr 1.2fr 1.2fr 1fr" }}>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3">Asset</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3">Volume</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3">Market Cap</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3 text-center block">Trade</span>
            </div>

            {/* Data Rows */}
            {markets.map((m, i) => (
              <React.Fragment key={i}>
                {/* Mobile Row */}
                <motion.div
                  className="market-row sm:hidden grid items-center border-b border-slate-50 py-3 cursor-pointer"
                  style={{ gridTemplateColumns: "2fr 1fr" }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                >
                  <div className="flex items-center gap-2 px-2">
                    <div className="coin-icon w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/25 flex-shrink-0">
                      <span className="text-white font-black text-[10px]">
                        {m.name.replace("USDT", "").substring(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-tight">{m.name.replace("USDT", "")}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-slate-500">${m.price}</span>
                        <span className={`text-[10px] font-bold ${m.positive ? 'text-green-600' : 'text-red-500'}`}>{m.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-2 flex justify-end">
                    <button
                      onClick={handleStartTrading}
                      className="trade-btn inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white font-bold text-[11px] rounded-lg shadow-md shadow-emerald-500/25"
                    >
                      Trade
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>

                {/* Desktop/Tablet Row */}
                <motion.div
                  className="market-row hidden sm:grid items-center border-b border-slate-50 py-3 cursor-pointer"
                  style={{ gridTemplateColumns: "2fr 1.2fr 1.2fr 1fr" }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                >
                  <div className="flex items-center gap-2.5 px-3">
                    <div className="coin-icon w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/25 flex-shrink-0">
                      <span className="text-white font-black text-xs">
                        {m.name.replace("USDT", "").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-tight">{m.name.replace("USDT", "")}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-slate-500">${m.price}</span>
                        <span className={`text-[10px] font-bold ${m.positive ? 'text-green-600' : 'text-red-500'}`}>{m.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3">
                    <MiniChart positive={m.positive} />
                    <p className="font-mono text-slate-700 font-semibold text-[11px] mt-1">{m.volume}</p>
                  </div>
                  <div className="px-3">
                    <p className="font-mono text-slate-700 font-semibold text-sm">{m.marketCap}</p>
                  </div>
                  <div className="px-3 text-center">
                    <button
                      onClick={handleStartTrading}
                      className="trade-btn inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-500/25"
                    >
                      Trade
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: BarChart3, label: "Total Markets", value: markets.length, sub: "Live pairs" },
              { icon: TrendingUp, label: "24h Volume", value: "$3.2B", sub: "+12.4% today" },
              { icon: Users, label: "Active Traders", value: "12K+", sub: "Worldwide" },
              { icon: Zap, label: "Response Time", value: "<50ms", sub: "Ultra fast" },
            ].map((s, i) => (
              <div key={i} className="stat-card bg-white rounded-xl p-4 border border-gray-200/60" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
                  <div className="stat-icon w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
                <p className="stat-value text-[22px] font-bold text-gray-800 leading-none mb-1" style={{ letterSpacing: "-0.02em" }}>{s.value}</p>
                <p className="text-[11px] text-gray-500 font-medium">{s.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}