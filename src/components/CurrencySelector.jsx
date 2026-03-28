import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import { ChevronDown, Check, Search } from "lucide-react";

/* ── Custom scrollbar styles injected once ── */
const SCROLL_STYLE = `
  .cs-scroll::-webkit-scrollbar { width: 5px; }
  .cs-scroll::-webkit-scrollbar-track { background: transparent; }
  .cs-scroll::-webkit-scrollbar-thumb {
    border-radius: 99px;
    background: rgba(245,166,35,0.35);
  }
  .cs-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(245,166,35,0.65);
  }
  .cs-scroll { scrollbar-width: thin; scrollbar-color: rgba(245,166,35,0.35) transparent; }

  @keyframes cs-fade-in {
    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .cs-dropdown { animation: cs-fade-in 0.18s cubic-bezier(.34,1.4,.64,1) both; }
`;

const DROPDOWN_WIDTH = 240; // px

export default function CurrencySelector({ className = "" }) {
  const { selectedCurrency, currencies, changeCurrency, currentCurrency } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [pos, setPos] = useState(null); // null = not yet calculated

  /* ── Calculate dropdown position ── */
  const calcPos = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const top = rect.bottom + 6;

    // Prefer left-aligned with the button; shift left if it would overflow viewport
    let left = rect.left;
    if (left + DROPDOWN_WIDTH > window.innerWidth - 8) {
      left = rect.right - DROPDOWN_WIDTH;
    }
    if (left < 8) left = 8;

    setPos({ top, left });
  }, []);

  /* Recalculate every time dropdown opens */
  useEffect(() => {
    if (!isOpen) return;
    calcPos();

    const handleResize = () => calcPos();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleResize, { passive: true, capture: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, { capture: true });
    };
  }, [isOpen, calcPos]);

  /* Close on outside click */
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") { setIsOpen(false); setSearchTerm(""); } };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const filteredCurrencies = currencies.filter(c =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (code) => {
    changeCurrency(code);
    setIsOpen(false);
    setSearchTerm("");
  };

  if (!currentCurrency) return null;

  /* ── Portal dropdown ── */
  const dropdownContent = isOpen && pos && (
    <div
      ref={dropdownRef}
      className="cs-dropdown fixed z-[9999] flex flex-col rounded-xl border overflow-hidden"
      style={{
        top: pos.top,
        left: pos.left,
        width: DROPDOWN_WIDTH,
        maxHeight: 320,
        background: "var(--sb-bg2, #111009)",
        borderColor: "var(--sb-border, rgba(245,166,35,.2))",
        boxShadow: "0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,166,35,0.08)",
      }}
    >
      {/* Search */}
      <div
        className="p-2.5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--sb-divider, rgba(245,166,35,.1))" }}
      >
        <div className="relative flex items-center">
          <Search
            size={13}
            className="absolute left-2.5 pointer-events-none"
            style={{ color: "var(--sb-muted)" }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search currency..."
            autoFocus
            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
            style={{
              background: "var(--sb-bg, #0C0B07)",
              borderColor: "var(--sb-border, rgba(245,166,35,.2))",
              color: "var(--sb-ink)",
            }}
          />
        </div>
      </div>

      {/* List — only vertical scroll, no horizontal */}
      <div
        className="cs-scroll flex-1 overflow-y-auto overflow-x-hidden"
        style={{ overscrollBehavior: "contain" }}
      >
        {filteredCurrencies.length === 0 ? (
          <div className="py-8 text-center text-xs" style={{ color: "var(--sb-muted)" }}>
            No currencies found
          </div>
        ) : (
          filteredCurrencies.map((currency) => {
            const active = currency.code === selectedCurrency;
            return (
              <button
                key={currency.code}
                onClick={() => handleSelect(currency.code)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-all duration-150"
                style={{
                  background: active ? "var(--sb-card-h, rgba(245,166,35,.13))" : "transparent",
                  borderLeft: active ? "3px solid #F5A623" : "3px solid transparent",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "var(--sb-card, rgba(255,255,255,.04))";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Icon + Text */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold"
                    style={{ background: "rgba(245,166,35,0.12)", color: "#F5A623" }}
                  >
                    {currency.symbol}
                  </div>
                  <div className="flex flex-col leading-tight min-w-0">
                    <span
                      className="text-xs font-bold truncate"
                      style={{ color: active ? "#F5A623" : "var(--sb-ink)" }}
                    >
                      {currency.code}
                    </span>
                    <span className="text-[10px] truncate" style={{ color: "var(--sb-muted)" }}>
                      {currency.name}
                    </span>
                  </div>
                </div>

                {/* Check icon */}
                {active && (
                  <Check size={14} className="flex-shrink-0 ml-2" style={{ color: "#F5A623" }} />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Inject scrollbar styles once */}
      <style>{SCROLL_STYLE}</style>

      <div className={`relative ${className}`}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((o) => !o)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-200 hover:border-orange-400/60 active:scale-95"
          style={{
            background: "var(--sb-card)",
            borderColor: isOpen ? "rgba(245,166,35,.5)" : "var(--sb-border)",
            color: "var(--sb-ink)",
            boxShadow: isOpen ? "0 0 0 3px rgba(245,166,35,.12)" : "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          <span className="text-sm font-bold" style={{ color: "#F5A623" }}>
            {currentCurrency.symbol}
          </span>
          <span className="text-xs font-bold uppercase tracking-wide">
            {currentCurrency.code}
          </span>
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            style={{ color: "#F5A623" }}
          />
        </button>

        {typeof document !== "undefined" && createPortal(dropdownContent, document.body)}
      </div>
    </>
  );
}