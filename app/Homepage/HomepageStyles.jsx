"use client";

import React from "react";

export default function HomepageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      html, body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      .scrollbar-none::-webkit-scrollbar { display: none; }
      .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      .text-gradient { background: linear-gradient(135deg,#4F8EF7 0%,#6366f1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

      /* BUTTONS */
      .btn-primary { background: linear-gradient(135deg,#4F8EF7 0%,#3b6fd4 100%); position: relative; overflow: hidden; transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1); display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
      .btn-primary::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); transition: left 0.5s ease; }
      .btn-primary:hover::before { left: 100%; }
      .btn-primary:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 14px 40px rgba(79,142,247,0.5) !important; }
      .btn-primary:active { transform: translateY(0) scale(0.99); }
      .btn-outline { border: 1px solid rgba(79,142,247,0.3); transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1); display: inline-flex; align-items: center; gap: 6px; }
      .btn-outline:hover { border-color: rgba(79,142,247,0.65); background: rgba(79,142,247,0.07); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,142,247,0.14); }

      /* TICKER */
      .ticker-track { display: flex; gap: 2.5rem; animation: ticker 35s linear infinite; width: max-content; }
      @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

      /* TESTIMONIALS */
      @keyframes ef_scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
      @keyframes ef_scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); } }

      /* ORBS / PLANET */
      @keyframes orbPulse { 0%,100% { opacity: 0.85; } 50% { opacity: 1; } }
      @keyframes coronaBreath { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
      @keyframes rimGlowAnim { 0%,100% { opacity: 0.8; } 50% { opacity: 1; } }
      @keyframes centerGlowPulse { 0%,100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); } 50% { opacity: 1; transform: translateX(-50%) scaleX(1.08); } }
      .orb-core { animation: orbPulse 6s ease-in-out infinite; }
      .corona { animation: coronaBreath 4s ease-in-out infinite; }
      .rim-glow { animation: rimGlowAnim 3.5s ease-in-out infinite; }
      .center-glow { animation: centerGlowPulse 3s ease-in-out infinite; }

      /* NAV HOVER */
      .nav-btn { position: relative; font-size: 13px; font-weight: 500; padding: 5px 12px; border-radius: 8px; color: rgba(30,41,59,0.75); background: transparent; cursor: pointer; font-family: 'Inter', sans-serif; letter-spacing: -0.01em; transition: color 0.2s ease, background 0.2s ease; border: none; outline: none; }
      .nav-btn::after { content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 0%; height: 1.5px; border-radius: 2px; background: linear-gradient(90deg, #4F8EF7, #6366f1); transition: width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none; }
      .nav-btn:hover { color: #0f172a; background: rgba(79,142,247,0.06); }
      .nav-btn:hover::after { width: 70%; }

      /* CARDS */
      .glow-card { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
      .glow-card::before { content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; border-radius: 1px; z-index: 2; background: linear-gradient(90deg, transparent, rgba(79,142,247,0.95), transparent); opacity: 0; transition: opacity 0.4s ease; box-shadow: 0 0 10px rgba(79,142,247,0.6), 0 0 22px rgba(79,142,247,0.22); }
      .glow-card::after { content: ''; position: absolute; inset: 0; z-index: 1; background: radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.08) 0%, transparent 55%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }
      .glow-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(79,142,247,0.14), 0 0 0 1px rgba(79,142,247,0.22) !important; border-color: rgba(79,142,247,0.28) !important; }
      .glow-card:hover::before { opacity: 1; }
      .glow-card:hover::after { opacity: 1; }

      .card-lift { position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease; }
      .card-lift::before { content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; border-radius: 1px; z-index: 2; background: linear-gradient(90deg, transparent, rgba(79,142,247,0.9), transparent); opacity: 0; transition: opacity 0.4s ease; box-shadow: 0 0 8px rgba(79,142,247,0.55), 0 0 18px rgba(79,142,247,0.2); }
      .card-lift:hover { transform: translateY(-7px); box-shadow: 0 24px 50px rgba(79,142,247,0.14); border-color: rgba(79,142,247,0.25) !important; }
      .card-lift:hover::before { opacity: 1; }

      .gl-card { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
      .gl-card::before { content: ''; position: absolute; top: 0; left: 12%; right: 12%; height: 1px; border-radius: 1px; background: linear-gradient(90deg, transparent, rgba(79,142,247,0.95), transparent); opacity: 0; transition: opacity 0.4s ease; box-shadow: 0 0 10px rgba(79,142,247,0.7), 0 0 25px rgba(79,142,247,0.25); pointer-events: none; z-index: 2; }
      .gl-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse at 50% 0%, rgba(79,142,247,0.09) 0%, transparent 55%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; z-index: 1; }
      .gl-card:hover { transform: translateY(-8px); box-shadow: 0 22px 55px rgba(79,142,247,0.15), 0 0 0 1px rgba(79,142,247,0.22) !important; border-color: rgba(79,142,247,0.28) !important; }
      .gl-card:hover::before { opacity: 1; }
      .gl-card:hover::after { opacity: 1; }

      /* STEP CARD */
      .step-card { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
      .step-card::before { content: ''; position: absolute; top: 0; left: 15%; right: 15%; height: 1px; border-radius: 1px; z-index: 3; background: linear-gradient(90deg, transparent, rgba(79,142,247,0.95), transparent); opacity: 0; transition: opacity 0.42s ease; box-shadow: 0 0 12px rgba(79,142,247,0.65), 0 0 28px rgba(79,142,247,0.28); }
      .step-card:hover { transform: translateY(-11px); border-color: rgba(79,142,247,0.3) !important; box-shadow: 0 30px 65px rgba(79,142,247,0.16), 0 0 0 1px rgba(79,142,247,0.16); }
      .step-card:hover::before { opacity: 1; }
      .step-card:hover .step-card-glow { opacity: 1 !important; transform: translateX(-50%) scale(1.25) !important; }
      .step-card:hover .step-icon { transform: scale(1.15) rotate(-5deg) !important; box-shadow: 0 14px 35px rgba(79,142,247,0.48) !important; }
      .step-card:hover h3 { color: #4F8EF7 !important; }

      /* CONTACT */
      .contact-info-card { transition: all 0.3s ease; border: 1px solid transparent; }
      .contact-info-card:hover { border-color: rgba(79,142,247,0.4); box-shadow: 0 0 30px rgba(79,142,247,0.12), 0 0 0 1px rgba(79,142,247,0.1); transform: translateY(-3px); }
      .contact-input { transition: all 0.25s ease; }
      .contact-input:focus { border-color: rgba(79,142,247,0.5) !important; box-shadow: 0 0 0 3px rgba(79,142,247,0.08), 0 0 20px rgba(79,142,247,0.06); outline: none; }
      .contact-input:hover:not(:focus) { border-color: rgba(79,142,247,0.25) !important; }

      /* WHY CARDS */
      .why-card { position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
      .why-card::before { content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px; border-radius: 1px; z-index: 3; background: linear-gradient(90deg, transparent, rgba(79,142,247,0.95), transparent); opacity: 0; transition: opacity 0.4s ease; box-shadow: 0 0 12px rgba(79,142,247,0.7), 0 0 28px rgba(79,142,247,0.3); }
      .why-card:hover { transform: translateY(-9px); border-color: rgba(79,142,247,0.32) !important; box-shadow: 0 24px 58px rgba(79,142,247,0.18), 0 0 0 1px rgba(79,142,247,0.18); }
      .why-card:hover::before { opacity: 1; }
      .wc-icon { transition: all 0.38s cubic-bezier(0.34,1.56,0.64,1); }

      /* PANEL GLOW */
      @keyframes panelGlowSweep { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      @keyframes panelGlowPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
    `}</style>
  );
}
