"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTelegram, FaYoutube, FaChevronRight } from "react-icons/fa6";

export default function BigFooter({ scrollTo, handleStartTrading }) {
  return (
    <footer style={{ background: "#fafafa", borderTop: "1px solid #e5e7eb" }}>
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top: Logo + Description + Links ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 py-10 sm:py-14 border-b border-gray-200">

          {/* Logo + About */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-base text-gray-900">Elite<span className="text-emerald-500">Fusion</span></span>
            </div>
            <h3 className="font-bold text-sm text-gray-900 leading-snug mb-2">
              Become a pro trader with EliteFusion
            </h3>
            <p className="text-[13px] leading-relaxed text-gray-500 mb-3 max-w-sm">
              Join EliteFusion, the premier online trading platform, and unlock your potential as a pro trader. With access to Forex, stocks, and crypto, you can easily diversify your trading portfolio.
            </p>
            <p className="text-[12px] leading-relaxed text-gray-400 mb-5 max-w-sm">
              A reliable trading platform is essential for success. We provide a safe and comfortable experience with institutional-grade tools and 24/7 support.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: FaFacebookF, href: "#", color: "#1877F2" },
                { Icon: FaInstagram, href: "#", color: "#E4405F" },
                { Icon: FaTelegram, href: "#", color: "#26A5E4" },
                { Icon: FaYoutube, href: "#", color: "#FF0000" },
              ].map(({ Icon, href, color }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-300" style={{ color }}>
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Trading */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-[13px] text-gray-900 mb-4">Trading</h4>
            <ul className="flex flex-col gap-2.5">
              {["How to trade", "Stocks", "Forex", "Crypto", "Account", "Free demo account", "Promotions", "Withdrawals", "Assets & Conditions"].map((item) => (
                <li key={item}>
                  <button onClick={handleStartTrading} className="group flex items-center gap-1 text-[13px] text-gray-500 hover:text-emerald-600 bg-transparent border-none cursor-pointer transition-all duration-300 p-0 hover:scale-[1.05] hover:translate-x-1 origin-left">
                    {item}
                    <FaChevronRight className="h-[8px] w-[8px] text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-[13px] text-gray-900 mb-4">About</h4>
            <ul className="flex flex-col gap-2.5">
              {["Social media", "Contacts", "News", "Awards", "Affiliate Program", "Reviews"].map((item) => (
                <li key={item}>
                  <button onClick={handleStartTrading} className="group flex items-center gap-1 text-[13px] text-gray-500 hover:text-emerald-600 bg-transparent border-none cursor-pointer transition-all duration-300 p-0 hover:scale-[1.05] hover:translate-x-1 origin-left">
                    {item}
                    <FaChevronRight className="h-[8px] w-[8px] text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-[13px] text-gray-900 mb-4">Help</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "FAQ", action: () => scrollTo("faq") },
                { label: "Support", action: handleStartTrading },
                { label: "Learning Center", action: handleStartTrading },
                { label: "Contact Us", action: () => scrollTo("contact") },
              ].map(({ label, action }) => (
                <li key={label}>
                  <button onClick={action} className="group flex items-center gap-1 text-[13px] text-gray-500 hover:text-emerald-600 bg-transparent border-none cursor-pointer transition-all duration-300 p-0 hover:scale-[1.05] hover:translate-x-1 origin-left">
                    {label}
                    <FaChevronRight className="h-[8px] w-[8px] text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-[13px] text-gray-900 mb-4">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              {["Privacy Policy", "Terms of Service", "Risk Disclosure", "AML Policy"].map((item) => (
                <li key={item}>
                  <button onClick={handleStartTrading} className="group flex items-center gap-1 text-[13px] text-gray-500 hover:text-emerald-600 bg-transparent border-none cursor-pointer transition-all duration-300 p-0 hover:scale-[1.05] hover:translate-x-1 origin-left">
                    {item}
                    <FaChevronRight className="h-[8px] w-[8px] text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom: Copyright ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            &copy; 2024-2026 EliteFusion. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-400">
            Trading involves risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
