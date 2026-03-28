import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, RefreshCw, Lock } from 'lucide-react';

function useDark() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.dataset.theme === 'dark'));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function ProceedChangeModal({ isOpen, onClose, selectedCreditPackage, onProceed, onChange }) {
  const dark = useDark();

  const bg     = dark ? 'bg-[#0D0C09]'          : 'bg-[#FEFCF3]';
  const text   = dark ? 'text-[#F9F5E8]'         : 'text-gray-900';
  const muted  = dark ? 'text-gray-400'           : 'text-gray-500';
  const cardBg = dark ? 'bg-[rgba(22,20,12,.9)]' : 'bg-[rgba(255,253,245,.88)]';
  const gold   = dark ? 'text-amber-300'          : 'text-amber-500';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose?.(); }}>
      <DialogContent
        hideClose
        className={`w-[95vw] sm:max-w-md p-0 rounded-2xl border border-[rgba(245,166,35,.28)] overflow-hidden ${bg} ${text}`}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { font-family:'Inter',system-ui,sans-serif; }
          @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
          .badge-dot{animation:pulse-dot 2s infinite}
        `}</style>

        {/* Mesh bg */}
        <div className="pointer-events-none absolute inset-0 z-0" style={{
          background: dark
            ? 'radial-gradient(ellipse 400px 250px at -10% 80%,rgba(245,166,35,.13) 0%,transparent 65%)'
            : 'radial-gradient(ellipse 400px 250px at -10% 80%,rgba(245,166,35,.07) 0%,transparent 65%)',
        }} />

        <div className="relative z-10 p-6">
          {/* Badge + Title */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 bg-[rgba(245,166,35,.1)] border border-[rgba(245,166,35,.28)] text-amber-400 rounded-full px-3 py-1 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 badge-dot" /> Confirm Selection
            </div>
            <DialogTitle className={`text-xl font-extrabold tracking-tight ${text}`}>
              Confirm Your <span className={gold}>Selection</span>
            </DialogTitle>
          </div>

          {/* Selected package info card */}
          <div className={`${cardBg} rounded-xl p-4 mb-5 border border-[rgba(245,166,35,.3)]`}
            style={{ boxShadow: '0 0 0 1px rgba(245,166,35,.1)' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)' }}>
                <Check className="w-3.5 h-3.5 text-gray-900" />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wide ${muted}`}>Selected Package</span>
            </div>
            <p className={`text-lg font-extrabold ${gold}`}>{selectedCreditPackage?.name}</p>
            <p className={`text-sm font-semibold ${muted}`}>
              {selectedCreditPackage?.unlimited ? 'Unlimited Credits' : `${selectedCreditPackage?.credits} Credits`}
            </p>
          </div>

          <p className={`text-sm leading-relaxed mb-6 ${muted}`}>
            Proceed to secure checkout or go back to change your credit package.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onChange}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold
                border border-[rgba(245,166,35,.35)] transition-all duration-300
                hover:border-[rgba(245,166,35,.6)] hover:bg-[rgba(245,166,35,.07)] hover:-translate-y-0.5"
              style={{ color: dark ? '#FFCF6B' : '#b45309' }}
            >
              <RefreshCw className="w-4 h-4" /> Change Package
            </button>
            <button
              onClick={onProceed}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-gray-900
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(245,166,35,.55)] active:translate-y-0"
              style={{ background: 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)', boxShadow: '0 4px 18px rgba(245,166,35,.4),inset 0 1px 0 rgba(255,255,255,.3)' }}
            >
              <Lock className="w-4 h-4" /> Proceed to Checkout
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}