import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { creditPackages as fallbackCreditPackages } from '@/data/packages';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { serverApi } from '@/api/serverApi';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

function useDark() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.dataset.theme === 'dark'));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function CreditPackageModal({ isOpen, onClose, selectedPackage, onNavigateToCheckout, onConfirmSelection }) {
  const { addCreditPackage } = useCart();
  const { formatPrice, selectedCurrency, currentCurrency, convertPrice, exchangeRates } = useCurrency();
  const [selectedCreditPackage, setSelectedCreditPackage] = useState(null);
  const [creditPackages, setCreditPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customCredits, setCustomCredits] = useState(100.00);
  const MIN_CREDITS = 1, MAX_CREDITS = 1500;
  const dark = useDark();

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        setLoading(true);
        const data = await serverApi.packages.listPublic();
        if (data.creditPackages?.length > 0) {
          setCreditPackages(data.creditPackages.map(pkg => ({
            ...pkg,
            price: Number(pkg.price),
            credits: pkg.credits === 'unlimited' || pkg.credits === null ? 'unlimited' : Number(pkg.credits),
            unlimited: pkg.credits === 'unlimited' || pkg.credits === null,
          })));
        } else {
          setCreditPackages(fallbackCreditPackages);
        }
      } catch (e) {
        console.error('Failed to fetch credit packages, using fallback:', e);
        setCreditPackages(fallbackCreditPackages);
      } finally { setLoading(false); }
    })();
  }, [isOpen]);

  const handleAddToCart = (pkg) => {
    const p = pkg || selectedCreditPackage;
    if (!p) return;
    addCreditPackage(p);
    onClose?.('proceed');
    onConfirmSelection?.(p);
  };

  const getCustomPriceInCurrentCurrency = () => {
    const rate = exchangeRates[selectedCurrency] || 1;
    return Math.round(customCredits * rate * 100) / 100;
  };

  const handleCustomPlanSubmit = () => {
    handleAddToCart({
      id: `custom-credits-${Date.now()}`,
      name: 'Custom Plan',
      price: customCredits,
      credits: customCredits,
      description: 'Custom credit package',
      features: ['Custom amount of credits', 'Flexible pricing'],
      custom: true,
    });
  };

  /* ── Theme tokens ── */
  const bg      = dark ? 'bg-[#0D0C09]'              : 'bg-[#FEFCF3]';
  const text    = dark ? 'text-[#F9F5E8]'             : 'text-gray-900';
  const muted   = dark ? 'text-gray-400'              : 'text-gray-500';
  const cardBg  = dark ? 'bg-[rgba(22,20,12,.9)]'     : 'bg-[rgba(255,253,245,.88)]';
  const border  = 'border border-[rgba(245,166,35,.22)]';
  const gold    = dark ? 'text-amber-300'              : 'text-amber-500';

  const GoldBtn = ({ onClick, children, full }) => (
    <button onClick={onClick}
      className={`${full ? 'w-full' : ''} py-2.5 px-5 rounded-xl text-sm font-bold text-gray-900
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(245,166,35,.55)] active:translate-y-0`}
      style={{ background: 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)', boxShadow: '0 4px 18px rgba(245,166,35,.4),inset 0 1px 0 rgba(255,255,255,.3)' }}>
      {children}
    </button>
  );

  const CreditCard = ({ pkg, isSelected, onClick, onSelect }) => (
    <div
      onClick={onClick}
      className={`card-top relative ${cardBg} ${border} ${text} rounded-2xl p-5 flex flex-col
        cursor-pointer transition-all duration-300 hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(245,166,35,.14)] hover:border-[rgba(245,166,35,.45)]
        ${isSelected ? 'border-[rgba(245,166,35,.6)] shadow-[0_0_0_1px_rgba(245,166,35,.25)]' : ''}
        ${pkg.popular ? 'border-[rgba(245,166,35,.5)]' : ''}`}
    >
      <style>{`.card-top::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent)}`}</style>
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] font-bold text-gray-900 px-3 py-0.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)' }}>MOST POPULAR</span>
        </div>
      )}
      <div className={`text-2xl font-extrabold mb-1 ${pkg.unlimited ? 'text-purple-400' : gold}`}>
        {formatPrice(Number(pkg.price))}
      </div>
      <h3 className="text-base font-bold mb-1">{pkg.name}</h3>
      <p className={`text-xs mb-3 leading-relaxed ${muted}`}>{pkg.description}</p>
      <div className="h-px mb-3" style={{ background: 'rgba(245,166,35,.12)' }} />
      <div className={`text-sm font-semibold mb-3 ${gold}`}>
        {pkg.unlimited ? 'Unlimited Credits' : `${pkg.credits} Credits`}
      </div>
      <ul className="flex flex-col gap-1.5 flex-1 mb-4">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)' }}>
              <Check className="w-2.5 h-2.5 text-gray-900" />
            </div>
            <span className={`text-xs ${muted}`}>{f}</span>
          </li>
        ))}
      </ul>
      <GoldBtn onClick={(e) => { e.stopPropagation(); onSelect(pkg); }} full>Select Package</GoldBtn>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose?.('accidental'); }}>
      <DialogContent
        hideClose
        className={`w-[95vw] sm:max-w-2xl lg:max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden pb-20 sm:pb-6 p-0 rounded-2xl ${bg} ${text} border border-[rgba(245,166,35,.22)]`}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { font-family:'Inter',system-ui,sans-serif; }
          @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
          .badge-dot{animation:pulse-dot 2s infinite}
          /* Slider overrides */
          [data-radix-slider-track]{background:rgba(245,166,35,.15)!important;height:5px!important;border-radius:3px!important}
          [data-radix-slider-range]{background:linear-gradient(90deg,#F5A623,#FFCF6B)!important}
          [data-radix-slider-thumb]{width:18px!important;height:18px!important;background:white!important;
            border:2.5px solid #F5A623!important;border-radius:50%!important;box-shadow:0 2px 8px rgba(245,166,35,.4)!important}
          [data-radix-slider-thumb]:hover{border-color:#E8940A!important;box-shadow:0 4px 12px rgba(245,166,35,.6)!important}
        `}</style>

        {/* Mesh bg */}
        <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl" style={{
          background: dark
            ? 'radial-gradient(ellipse 500px 300px at -5% 80%,rgba(245,166,35,.12) 0%,transparent 65%),radial-gradient(ellipse 350px 250px at 105% 5%,rgba(245,166,35,.09) 0%,transparent 65%)'
            : 'radial-gradient(ellipse 500px 300px at -5% 80%,rgba(245,166,35,.07) 0%,transparent 65%),radial-gradient(ellipse 350px 250px at 105% 5%,rgba(245,166,35,.05) 0%,transparent 65%)',
        }} />

        <div className="relative z-10 p-5 sm:p-7">
          {/* Close button */}
          <button
            onClick={() => onClose?.('close')}
            className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
              ${dark ? 'bg-[rgba(255,255,255,.08)] hover:bg-[rgba(255,255,255,.15)] text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[rgba(245,166,35,.1)] border border-[rgba(245,166,35,.28)] text-amber-400 rounded-full px-4 py-1 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 badge-dot" /> Credit Packages
            </div>
            <DialogTitle className={`text-xl sm:text-2xl font-extrabold tracking-tight ${text}`}>
              Choose Your <span className={gold}>Credit Package</span>
            </DialogTitle>
            {selectedPackage && (
              <p className={`text-sm mt-2 ${muted}`}>
                You've selected <strong className={gold}>{selectedPackage.name}</strong> ({formatPrice(Number(selectedPackage.price))}). Now choose credits to power your analyses.
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <p className={`text-sm ${muted}`}>Loading credit packages…</p>
            </div>
          ) : creditPackages.length === 0 ? (
            <p className={`text-center py-12 text-sm ${muted}`}>No credit packages available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Custom Plan Card */}
              <div className={`card-top relative ${cardBg} ${border} ${text} rounded-2xl p-5 flex flex-col`}>
                <div className={`text-2xl font-extrabold mb-1 ${gold}`}>
                  {selectedCurrency === 'USD'
                    ? `$${customCredits.toFixed(2)}`
                    : `${getCustomPriceInCurrentCurrency().toFixed(2)}${currentCurrency?.symbol || ''}`}
                </div>
                <h3 className="text-base font-bold mb-1">Custom Plan</h3>
                <p className={`text-xs mb-3 leading-relaxed ${muted}`}>Personalized for every need</p>
                <div className="h-px mb-3" style={{ background: 'rgba(245,166,35,.12)' }} />
                <div className={`text-xs font-semibold mb-1 ${muted}`}>Credits</div>
                <div className={`text-xl font-bold mb-3 ${gold}`}>
                  {customCredits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
                <Slider
                  value={[customCredits]}
                  onValueChange={(v) => setCustomCredits(Math.max(MIN_CREDITS, Math.min(MAX_CREDITS, Math.round(v[0] * 100) / 100)))}
                  min={MIN_CREDITS} max={MAX_CREDITS} step={0.01}
                  className="mb-4"
                />
                {/* Price input */}
                <div className="relative mb-4">
                  <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold pointer-events-none ${muted}`}>
                    {currentCurrency?.symbol || '$'}
                  </span>
                  <input
                    type="number"
                    value={selectedCurrency === 'USD' ? customCredits.toFixed(2) : getCustomPriceInCurrentCurrency().toFixed(2)}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value) || 0;
                      const rate = exchangeRates[selectedCurrency] || 1;
                      setCustomCredits(Math.max(MIN_CREDITS, Math.min(MAX_CREDITS, Math.round((v / rate) * 100) / 100)));
                    }}
                    min={(MIN_CREDITS * (exchangeRates[selectedCurrency] || 1)).toFixed(2)}
                    max={(MAX_CREDITS * (exchangeRates[selectedCurrency] || 1)).toFixed(2)}
                    step={0.01}
                    className={`w-full h-10 pl-8 pr-3 rounded-lg text-sm font-semibold border
                      focus:outline-none focus:ring-1 focus:ring-amber-400
                      ${dark ? 'bg-[rgba(245,166,35,.07)] border-[rgba(245,166,35,.25)]' : 'bg-amber-50 border-[rgba(245,166,35,.3)] text-gray-900'}`}
                    style={dark ? { color: '#F9F5E8' } : undefined}
                    placeholder="Enter price"
                  />
                </div>
                <div className="flex-1" />
                <GoldBtn onClick={handleCustomPlanSubmit} full>Select Package</GoldBtn>
              </div>

              {/* Regular packages */}
              {creditPackages.map((pkg) => (
                <CreditCard
                  key={pkg.id}
                  pkg={pkg}
                  isSelected={selectedCreditPackage?.id === pkg.id}
                  onClick={() => setSelectedCreditPackage(pkg)}
                  onSelect={handleAddToCart}
                />
              ))}
            </div>
          )}

          <div className={`mt-5 text-xs space-y-1 ${muted}`}>
            <p>• Credits are required to use analysis features</p>
            <p>• Each analysis consumes credits based on complexity</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}