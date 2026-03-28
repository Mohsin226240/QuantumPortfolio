"use client";

import React, { useRef } from "react";
import { TrendingUp, TrendingDown, ArrowRight, Activity, BarChart3, Users, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";

function MiniChart({ positive }) {
  const pts = React.useMemo(() => {
    let v = 50;
    return Array.from({ length: 16 }, () => {
      v += (Math.random() - (positive ? 0.43 : 0.57)) * 7;
      return Math.max(15, Math.min(85, v));
    });
  }, [positive]);
  const w = 70, h = 28;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(p => h - (p / 100) * h);
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const color = positive ? "#059669" : "#ef4444";
  
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path 
        d={d} 
        fill="none" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
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
          opacity: 0;
          transform: translateX(-8px);
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

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
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
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-200 overflow-hidden"
        >
          
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-white px-5 py-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Market Overview</h3>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 py-2.5 text-left">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Asset</span>
                  </th>
                  <th className="px-4 py-2.5 text-left">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Price</span>
                  </th>
                  <th className="px-4 py-2.5 text-left">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">24h</span>
                  </th>
                  <th className="px-4 py-2.5 text-left">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Chart</span>
                  </th>
                  <th className="px-4 py-2.5 text-left">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Volume</span>
                  </th>
                  <th className="px-4 py-2.5 text-left">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Market Cap</span>
                  </th>
                  <th className="px-4 py-2.5 text-right">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Trade</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {markets.map((m, i) => (
                  <motion.tr
                    key={i}
                    className="market-row cursor-pointer"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.35, 
                      delay: 0.25 + i * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {/* Asset */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="coin-icon w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/25">
                          <span className="text-white font-black text-xs">
                            {m.name.replace("USDT", "").substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-tight">
                            {m.name.replace("USDT", "")}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">{m.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">
                      <p className="font-mono font-bold text-slate-900 text-sm">${m.price}</p>
                    </td>

                    {/* 24h Change */}
                    <td className="px-4 py-3">
                      <div className={`price-badge inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs ${
                        m.positive 
                          ? 'bg-green-50 text-green-600 border border-green-200' 
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {m.positive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{m.change}</span>
                      </div>
                    </td>

                    {/* Chart */}
                    <td className="px-4 py-3">
                      <MiniChart positive={m.positive} />
                    </td>

                    {/* Volume */}
                    <td className="px-4 py-3">
                      <p className="font-mono text-slate-700 font-semibold text-sm">{m.volume}</p>
                    </td>

                    {/* Market Cap */}
                    <td className="px-4 py-3">
                      <p className="font-mono text-slate-700 font-semibold text-sm">{m.marketCap}</p>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={handleStartTrading}
                        className="trade-btn inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-500/25"
                      >
                        Trade
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {/* Card 1 */}
            <div className="stat-card bg-white rounded-2xl p-5 border border-slate-200/80" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="stat-icon w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(5,150,105,0.1)" }}>
                  <BarChart3 className="w-[18px] h-[18px] text-emerald-600" />
                </div>
                <p className="text-[13px] font-medium text-slate-500">Total Markets</p>
              </div>
              <p className="stat-value text-[28px] font-bold text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>{markets.length}</p>
            </div>

            {/* Card 2 */}
            <div className="stat-card bg-white rounded-2xl p-5 border border-slate-200/80" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="stat-icon w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(34,197,94,0.1)" }}>
                  <TrendingUp className="w-[18px] h-[18px] text-green-600" />
                </div>
                <p className="text-[13px] font-medium text-slate-500">24h Volume</p>
              </div>
              <p className="stat-value text-[28px] font-bold text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>$3.2B</p>
            </div>

            {/* Card 3 */}
            <div className="stat-card bg-white rounded-2xl p-5 border border-slate-200/80" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="stat-icon w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.1)" }}>
                  <Users className="w-[18px] h-[18px] text-purple-600" />
                </div>
                <p className="text-[13px] font-medium text-slate-500">Active Traders</p>
              </div>
              <p className="stat-value text-[28px] font-bold text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>12K+</p>
            </div>

            {/* Card 4 */}
            <div className="stat-card bg-white rounded-2xl p-5 border border-slate-200/80" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="stat-icon w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
                  <Zap className="w-[18px] h-[18px] text-amber-500" />
                </div>
                <p className="text-[13px] font-medium text-slate-500">Response Time</p>
              </div>
              <p className="stat-value text-[28px] font-bold text-slate-900 leading-none" style={{ letterSpacing: "-0.03em" }}>&lt;50ms</p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}