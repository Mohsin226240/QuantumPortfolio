"use client";

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  PlayCircleIcon,
  ChevronDownIcon,
  TrendingUpIcon,
  BarChart3Icon,
  ZapIcon,
} from 'lucide-react';

// ─── Candle Types & Logic ───
function createCandles(w, h) {
  const cx = w * 0.5;
  const cy = h * 0.44;
  const uw = w < 500 ? w * 0.85 : w * 0.45;
  const sx = cx - uw / 2;
  const scale = w < 500 ? Math.max(w / 500, 0.45) : 1;
  const specs = [
    { bodyH: 0.42, wickT: 0.06, wickB: 0.08, w: 48, bullish: true, yOff: -0.02 },
    { bodyH: 0.28, wickT: 0.1, wickB: 0.05, w: 44, bullish: false, yOff: 0.06 },
    { bodyH: 0.5, wickT: 0.04, wickB: 0.07, w: 52, bullish: true, yOff: -0.08 },
    { bodyH: 0.22, wickT: 0.08, wickB: 0.12, w: 40, bullish: false, yOff: 0.1 },
    { bodyH: 0.46, wickT: 0.05, wickB: 0.06, w: 50, bullish: true, yOff: -0.04 },
    { bodyH: 0.3, wickT: 0.09, wickB: 0.04, w: 42, bullish: false, yOff: 0.08 },
    { bodyH: 0.55, wickT: 0.03, wickB: 0.08, w: 54, bullish: true, yOff: -0.06 },
    { bodyH: 0.25, wickT: 0.07, wickB: 0.1, w: 38, bullish: false, yOff: 0.12 },
    { bodyH: 0.48, wickT: 0.05, wickB: 0.06, w: 50, bullish: true, yOff: -0.03 },
  ];
  const sp = uw / (specs.length - 1);
  return specs.map((s, i) => ({
    x: sx + i * sp,
    centerY: cy + s.yOff * h,
    bodyHeight: s.bodyH * h * (w < 500 ? 0.65 : 1),
    wickTopLen: s.wickT * h * (w < 500 ? 0.6 : 1),
    wickBottomLen: s.wickB * h * (w < 500 ? 0.6 : 1),
    bodyWidth: Math.round(s.w * scale),
    isBullish: s.bullish,
    phase: i % 2 === 0 ? 0 : Math.PI,
    speed: 1.3 + (i % 3) * 0.15,
    amplitude: (14 + (i % 2) * 6) * (w < 500 ? 0.6 : 1),
  }));
}

function drawCandle(ctx, c, yOff) {
  const { x, centerY: cY, bodyHeight: bH, wickTopLen: wTL, wickBottomLen: wBL, bodyWidth: bW, isBullish: bull } = c;
  const cy = cY + yOff, hW = bW / 2, hH = bH / 2, d = bW * 0.2;
  const bT = cy - hH, bB = cy + hH, wT = bT - wTL, wB = bB + wBL;

  // Drop shadow
  const sY = bB + wBL + 18;
  const sG = ctx.createRadialGradient(x, sY, bW * 0.15, x, sY, bW * 1.2);
  sG.addColorStop(0, 'rgba(0,0,0,0.10)');
  sG.addColorStop(0.3, 'rgba(0,0,0,0.05)');
  sG.addColorStop(0.6, 'rgba(0,0,0,0.015)');
  sG.addColorStop(1, 'transparent');
  ctx.fillStyle = sG;
  ctx.beginPath();
  ctx.ellipse(x, sY, bW * 1.1, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wicks
  const wW = 2.8;
  const drawWick = (y1, y2) => {
    const mn = Math.min(y1, y2), h = Math.abs(y2 - y1);
    const g = ctx.createLinearGradient(x - 1, mn, x + 1, mn + h);
    g.addColorStop(0, '#B0B8C4');
    g.addColorStop(0.5, '#E8ECF0');
    g.addColorStop(1, '#A0A8B4');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(x - wW / 2, mn, wW, h, 1.5);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(x - wW / 2, mn, 1, h);
    ctx.beginPath();
    ctx.arc(x, y1 < y2 ? y1 : y2, wW * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = '#C8CED6';
    ctx.fill();
  };
  drawWick(wT, bT);
  drawWick(wB, bB);

  // Right face (3D depth)
  const rG = ctx.createLinearGradient(x + hW - d, bT, x + hW, bT);
  if (bull) { rG.addColorStop(0, 'rgba(5,150,105,0.6)'); rG.addColorStop(1, 'rgba(4,120,87,0.8)'); }
  else { rG.addColorStop(0, 'rgba(225,29,72,0.6)'); rG.addColorStop(1, 'rgba(190,18,60,0.8)'); }
  ctx.fillStyle = rG;
  ctx.beginPath();
  ctx.moveTo(x + hW - d, bT + d); ctx.lineTo(x + hW, bT); ctx.lineTo(x + hW, bB); ctx.lineTo(x + hW - d, bB + d);
  ctx.closePath(); ctx.fill();

  // Top face
  const tG = ctx.createLinearGradient(x - hW, bT, x + hW, bT + d);
  if (bull) { tG.addColorStop(0, 'rgba(134,239,172,0.95)'); tG.addColorStop(0.5, 'rgba(74,222,128,0.8)'); tG.addColorStop(1, 'rgba(16,185,129,0.6)'); }
  else { tG.addColorStop(0, 'rgba(253,164,175,0.95)'); tG.addColorStop(0.5, 'rgba(251,113,133,0.8)'); tG.addColorStop(1, 'rgba(244,63,94,0.6)'); }
  ctx.fillStyle = tG;
  ctx.beginPath();
  ctx.moveTo(x - hW, bT + d); ctx.lineTo(x - hW + d, bT); ctx.lineTo(x + hW, bT); ctx.lineTo(x + hW - d, bT + d);
  ctx.closePath(); ctx.fill();

  // Front face with glow
  ctx.save();
  ctx.shadowColor = bull ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)';
  ctx.shadowBlur = 18; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 6;
  const fG = ctx.createLinearGradient(x - hW, bT + d, x + hW * 0.5, bB + d);
  if (bull) { fG.addColorStop(0, 'rgba(110,231,183,0.95)'); fG.addColorStop(0.3, 'rgba(52,211,153,0.88)'); fG.addColorStop(0.7, 'rgba(16,185,129,0.82)'); fG.addColorStop(1, 'rgba(5,150,105,0.9)'); }
  else { fG.addColorStop(0, 'rgba(253,164,175,0.95)'); fG.addColorStop(0.3, 'rgba(251,113,133,0.88)'); fG.addColorStop(0.7, 'rgba(244,63,94,0.82)'); fG.addColorStop(1, 'rgba(225,29,72,0.9)'); }
  ctx.fillStyle = fG;
  ctx.beginPath();
  ctx.roundRect(x - hW, bT + d, bW - d, bH, 4);
  ctx.fill();
  ctx.restore();

  // Glass shine
  const shG = ctx.createLinearGradient(x - hW, bT + d, x - hW, bT + d + bH * 0.3);
  shG.addColorStop(0, 'rgba(255,255,255,0.6)'); shG.addColorStop(0.4, 'rgba(255,255,255,0.25)'); shG.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = shG;
  ctx.beginPath();
  ctx.roundRect(x - hW + 3, bT + d + 2, bW - d - 6, bH * 0.28, 3);
  ctx.fill();

  // Left edge highlight
  const eG = ctx.createLinearGradient(x - hW, bT + d, x - hW + 10, bT + d);
  eG.addColorStop(0, 'rgba(255,255,255,0.45)'); eG.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = eG;
  ctx.fillRect(x - hW, bT + d, 10, bH);

  // Bottom edge darkening
  const btG = ctx.createLinearGradient(x, bB + d - 12, x, bB + d);
  btG.addColorStop(0, 'rgba(0,0,0,0)'); btG.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = btG;
  ctx.fillRect(x - hW, bB + d - 12, bW - d, 12);

  // Outer glow border
  ctx.strokeStyle = bull ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - hW, bT + d, bW - d, bH, 4);
  ctx.stroke();
}

// ─── Canvas Component ───
function TradingCandlesCanvas() {
  const canvasRef = useRef(null);
  const candlesRef = useRef([]);
  const animRef = useRef(0);
  const startRef = useRef(0);

  const animate = useCallback((ts) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (!startRef.current) startRef.current = ts;
    const t = (ts - startRef.current) / 1000;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const introT = Math.min(t / 2.5, 1);
    const eased = introT < 0.5
      ? 4 * introT * introT * introT
      : 1 - Math.pow(-2 * introT + 2, 3) / 2;
    const s = 0.15 + 0.85 * eased;
    const alpha = Math.min(t / 1.2, 1);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cw * 0.5, ch * 0.44);
    ctx.scale(s, s);
    ctx.translate(-cw * 0.5, -ch * 0.44);
    for (const c of candlesRef.current) {
      drawCandle(ctx, c, Math.sin(t * c.speed + c.phase) * c.amplitude);
    }
    ctx.restore();
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const dpr = window.devicePixelRatio || 1;
      const r = p.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      candlesRef.current = createCandles(r.width, r.height);
    };
    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="candle-canvas pointer-events-none"
      style={{ willChange: 'contents' }}
      aria-hidden="true"
    />
  );
}

// ─── Floating Particles ───
function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10,
    opacity: 0.08 + Math.random() * 0.12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-500"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
}

// ─── Floating Dashboard Card ───
function FloatingDashboard() {
  const [price, setPrice] = useState(67842.5);
  const [change, setChange] = useState(2.34);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((p) => p + (Math.random() - 0.48) * 50);
      setChange((c) => {
        const nc = c + (Math.random() - 0.48) * 0.1;
        return Math.max(-5, Math.min(5, nc));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.7, filter: 'blur(12px)', rotate: 5 }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', rotate: 0 }}
      transition={{ delay: 2.3, duration: 1.0, type: 'spring', stiffness: 70, damping: 14 }}
      className="absolute top-[30%] right-[6%] hidden lg:hidden xl:block z-30"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-xl w-[210px]"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-50 border border-orange-200/50 rounded-lg flex items-center justify-center">
              <span className="text-[11px] font-bold text-orange-500">&#8383;</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold text-gray-800 leading-none">BTC/USD</span>
              <span className="block text-[8px] text-gray-400 mt-0.5">Bitcoin</span>
            </div>
          </div>
          <span className={`text-[10px] font-semibold ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {change >= 0 ? '↑' : '↓'} {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
        <div className="text-[22px] font-bold text-gray-900 tracking-tight leading-none mb-1">
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-[9px] text-gray-400 mb-3">Last updated just now</div>
        <svg className="w-full h-9" viewBox="0 0 180 36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mcg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,28 C12,26 24,24 36,25 C48,26 56,20 68,16 C80,12 92,18 104,20 C116,22 128,10 140,7 C152,4 164,5 180,3" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M0,28 C12,26 24,24 36,25 C48,26 56,20 68,16 C80,12 92,18 104,20 C116,22 128,10 140,7 C152,4 164,5 180,3 L180,36 L0,36 Z" fill="url(#mcg)" />
        </svg>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div>
            <span className="block text-[8px] text-gray-400">24h Vol</span>
            <span className="block text-[10px] font-semibold text-gray-700">$42.8B</span>
          </div>
          <div className="text-right">
            <span className="block text-[8px] text-gray-400">Mkt Cap</span>
            <span className="block text-[10px] font-semibold text-gray-700">$1.33T</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Live Activity Pill ───
function LivePill() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80, scale: 0.7, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay: 2.5, duration: 0.9, type: 'spring', stiffness: 80, damping: 15 }}
      className="absolute top-[22%] left-[6%] hidden xl:flex z-30"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xl border border-gray-200/60 rounded-full px-3.5 py-2 shadow-lg shadow-gray-200/40"
      >
        <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center">
          <ZapIcon className="w-3 h-3 text-emerald-600" />
        </div>
        <span className="text-[10px] font-medium text-gray-900">2,847 trades/min</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Welcome Ticker ───
const welcomeTickerCSS = `
@keyframes welcomeSlide {
  0%   { transform: translateX(-110vw); opacity: 0; animation-timing-function: ease-in; }
  2%   { opacity: 1; animation-timing-function: ease-in; }
  4%   { transform: translateX(calc(50vw - 55%)); animation-timing-function: ease-in-out; }
  26%  { transform: translateX(calc(50vw - 42%)); animation-timing-function: ease-out; }
  30%  { transform: translateX(110vw); opacity: 1; }
  100% { transform: translateX(110vw); opacity: 0; }
}
`;

function WelcomeTicker() {
  const [show, setShow] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 3600);
    const t2 = setTimeout(() => setAnimDone(true), 7200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!show || animDone) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden flex items-center">
      <style>{welcomeTickerCSS}</style>
      <div style={{ animation: 'welcomeSlide 4s linear forwards' }} className="whitespace-nowrap">
        <div className="inline-flex items-center gap-5 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl px-10 py-5 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Welcome to Elite<span className="text-emerald-600">Fusion</span>
            </span>
            <span className="text-xs sm:text-sm text-gray-400 tracking-wide">
              Your Smart Trading Journey Starts Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ───
export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30"
      />
      <FloatingParticles />

      <div className="absolute inset-0 top-20 z-10">
        <TradingCandlesCanvas />
      </div>

      <FloatingDashboard />
      <LivePill />

      <div className="relative z-20 min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-8 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="self-end"
        >
          <div className="bg-white/60 backdrop-blur-lg border border-gray-200/50 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3.5 max-w-[260px] sm:max-w-xs md:max-w-sm shadow-sm">
            <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 leading-relaxed text-right tracking-wide">
              Experience the future of equity & F&O trading with AI-powered strategies, real-time market simulation, and zero-commission brokerage.
            </p>
          </div>
        </motion.div>

        <div className="flex-1 min-h-[60px] sm:min-h-[80px] md:min-h-[100px]" />

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 lg:gap-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-3 mt-2 px-4 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-gray-200/60 shadow-lg shadow-gray-200/40"
            >
              <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center">
                <TrendingUpIcon className="w-3 h-3 text-emerald-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-500">
                Practice Trading with Real Market Data
              </span>
            </motion.div>

            <motion.h1 className="font-bold text-gray-900 leading-[1.06] tracking-tight">
              <motion.span
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.9, type: 'spring', stiffness: 80, damping: 18 }}
                className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              >
                Trade Smarter,
              </motion.span>
              <motion.span
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.9, type: 'spring', stiffness: 80, damping: 18 }}
                className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
              >
                Not Harder.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-5 mt-4 sm:mt-6"
            >
              <span className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-medium text-gray-500 tracking-wide">
                <span className="w-4 h-4 rounded bg-white flex items-center justify-center"><BarChart3Icon className="w-2.5 h-2.5 text-emerald-600" /></span>
                1M+ Virtual Tokens
              </span>
              <span className="hidden sm:block w-px h-3 bg-gray-200" />
              <span className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-medium text-gray-500 tracking-wide">
                <span className="w-4 h-4 rounded bg-white flex items-center justify-center"><TrendingUpIcon className="w-2.5 h-2.5 text-emerald-600" /></span>
                50K+ Active Traders
              </span>
              <span className="hidden sm:block w-px h-3 bg-gray-200" />
              <span className="flex items-center gap-1.5 text-[9px] sm:text-[11px] font-medium text-gray-500 tracking-wide">
                <span className="w-4 h-4 rounded bg-white flex items-center justify-center"><ZapIcon className="w-2.5 h-2.5 text-emerald-600" /></span>
                99.9% Uptime
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.9, type: 'spring', stiffness: 100, damping: 16 }}
            className="flex flex-row sm:flex-col gap-3 sm:gap-3 lg:items-end flex-shrink-0"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('features');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-emerald-600 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide shadow-xl shadow-emerald-600/20 hover:shadow-2xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
            >
              Start Trading Free
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-white/70 backdrop-blur-sm text-gray-900 border border-gray-200/80 px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide hover:bg-white hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <PlayCircleIcon className="w-4 h-4 text-emerald-600" />
              Contact Us
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-medium text-gray-500/50 tracking-[0.2em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDownIcon className="w-4 h-4 text-gray-500/40" />
          </motion.div>
        </motion.div>
      </div>

      <WelcomeTicker />
    </section>
  );
}
