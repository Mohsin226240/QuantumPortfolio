"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaChevronRight } from "react-icons/fa6";

export default function BigFooter({ scrollTo, handleStartTrading }) {
  const footerLinks = {
    "Company": [
      { label: "Free Demo Account", id: null },
      { label: "About Elite Fusion", id: null },
      { label: "Partners", id: null },
      { label: "Contact", id: "contact" },
    ],
    "Evaluation": [
      { label: "Elite Fusion Evaluation", id: null },
      { label: "Trading Platforms", id: "features" },
      { label: "Crypto Trading Rules", id: "markets" },
    ],
    "Documentation": [
      { label: "Blog", id: null },
      { label: "FAQ", id: "faq" },
      { label: "Privacy Policy", id: null },
      { label: "Terms and Conditions", id: null },
      { label: "Knowledge Base", id: null },
    ],
  };
  const footerColumnOrder = ["Company", "Evaluation", "Documentation"];

  return (
    <footer
      className="relative"
      style={{
        background: "#f8fdfb",
        borderTop: "1px solid rgba(16,185,129,0.12)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.6),transparent)" }} />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b" style={{ borderColor: "rgba(16,185,129,0.1)" }}>

          {/* Brand column — takes 2 cols on lg */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#059669,#0d9488)" }}>
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-[15px]" style={{ letterSpacing: "-0.02em", color: "#1e293b" }}>Elite Fusion</span>
                <span className="font-bold text-[15px] text-emerald-500" style={{ letterSpacing: "-0.02em" }}> Trading</span>
              </div>
            </div>
            <p className="text-[12px] leading-[1.7] mb-4 max-w-[240px]" style={{ color: "#64748b" }}>
              Backed by the community. Trade smarter with tools built for real traders.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mb-4">
              {[
                { Icon: FaXTwitter, color: "#000000", bg: "rgba(0,0,0,0.07)", border: "rgba(0,0,0,0.12)", hoverBg: "rgba(0,0,0,0.14)", href: "https://x.com" },
                { Icon: FaFacebookF, color: "#1877F2", bg: "rgba(24,119,242,0.1)", border: "rgba(24,119,242,0.2)", hoverBg: "rgba(24,119,242,0.18)", href: "https://facebook.com" },
                { Icon: FaInstagram, color: "#E4405F", bg: "rgba(228,64,95,0.1)", border: "rgba(228,64,95,0.2)", hoverBg: "rgba(228,64,95,0.18)", href: "https://instagram.com" },
                { Icon: FaLinkedinIn, color: "#0A66C2", bg: "rgba(10,102,194,0.1)", border: "rgba(10,102,194,0.2)", hoverBg: "rgba(10,102,194,0.18)", href: "https://linkedin.com" },
                { Icon: FaYoutube, color: "#FF0000", bg: "rgba(255,0,0,0.1)", border: "rgba(255,0,0,0.2)", hoverBg: "rgba(255,0,0,0.18)", href: "https://youtube.com" },
              ].map(({ Icon, color, bg, border, hoverBg, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                  style={{ border: `1px solid ${border}`, background: bg }}
                  onMouseOver={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 14px ${bg}`; }}
                  onMouseOut={e => { e.currentTarget.style.background = bg; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-medium" style={{ color: "#64748b" }}>All systems operational</span>
            </div>
          </div>

          {/* Link columns */}
          {footerColumnOrder.map(category => (
            <div key={category}>
              <h4 className="font-bold text-[12px] mb-3 uppercase tracking-wide" style={{ color: "#1e293b" }}>{category}</h4>
              <ul className="flex flex-col gap-2">
                {footerLinks[category].map(({ label, id }) => (
                  <li key={label}>
                    <button onClick={id ? () => scrollTo(id) : handleStartTrading}
                      className="flex items-center gap-1 text-[13px] bg-transparent border-none cursor-pointer transition-colors duration-150"
                      style={{ color: "#64748b" }}
                      onMouseOver={e => e.currentTarget.style.color = "#059669"}
                      onMouseOut={e => e.currentTarget.style.color = "#64748b"}>
                      <FaChevronRight className="h-[8px] w-[8px]" style={{ color: "#059669" }} />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer — compact */}
        <div className="pt-5 text-center">
          <p className="text-[11px] leading-[1.75] max-w-2xl mx-auto mb-2" style={{ color: "#94a3b8" }}>
            Elite Fusion Trading provides tools for crypto, forex, and global market access through regulated infrastructure. We don't offer financial advice. Your funds stay in segregated accounts, fully encrypted, with 24/7 support. Trading involves risk — only trade what you can afford to lose.
          </p>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(16,185,129,0.08)" }}>
            <p className="text-[10px]" style={{ color: "#b0b8c4" }}>
              © 2025 Elite Fusion Trading. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
