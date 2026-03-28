import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { packages as fallbackPackages } from '@/data/packages';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import CreditPackageModal from '@/components/cart/CreditPackageModal';
import ProceedChangeModal from '@/components/cart/ProceedChangeModal';
import { serverApi } from '@/api/serverApi';
import { redirectToCheckout } from '@/utils/checkoutRedirect';

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { font-family:'Inter',system-ui,sans-serif; }
    .btn-shine{position:relative;overflow:hidden}
    .btn-shine::before{content:'';position:absolute;top:0;left:-115%;width:55%;height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transition:left .5s}
    .btn-shine:hover::before{left:165%}
    @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
    .badge-dot{animation:pulse-dot 2s infinite}
    .card-top::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent)}
  `}</style>
);

function useDark() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.dataset.theme === 'dark'));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

const PricingCard = ({ pkg, index, onAddToCart, dark }) => {
  const { formatPrice } = useCurrency();
  const muted  = dark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = dark ? 'bg-[rgba(22,20,12,.9)]' : 'bg-[rgba(255,253,245,.88)]';
  const text   = dark ? 'text-[#F9F5E8]' : 'text-gray-900';
  const gold   = dark ? 'text-amber-300' : 'text-amber-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className="relative h-full"
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-1 px-4 py-1 rounded-full text-xs font-semibold text-gray-900"
            style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)', boxShadow: '0 4px 14px rgba(245,166,35,.5)' }}>
            <Star className="w-3 h-3" /> Most Popular
          </div>
        </div>
      )}
      <div className={`card-top relative ${cardBg} ${text} rounded-2xl p-6 flex flex-col h-full border
        transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(245,166,35,.14)]
        ${pkg.popular
          ? 'border-[rgba(245,166,35,.5)] shadow-[0_0_0_1px_rgba(245,166,35,.2)]'
          : 'border-[rgba(245,166,35,.2)] hover:border-[rgba(245,166,35,.38)]'}`}
      >
        <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
        <div className={`text-4xl font-extrabold mb-0.5 ${gold}`}>{formatPrice(pkg.price)}</div>
        <p className={`text-xs mb-2 ${muted}`}>per user, one-time</p>
        <p className={`text-sm leading-relaxed mb-4 ${muted}`}>{pkg.description}</p>
        <div className="h-px mb-4" style={{ background: 'rgba(245,166,35,.15)' }} />
        <ul className="flex flex-col gap-2.5 flex-1 mb-5">
          {pkg.features.slice(0, 8).map((f, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg,#F5A623,#FFCF6B)', boxShadow: '0 2px 8px rgba(245,166,35,.35)' }}>
                <Check className="w-3 h-3 text-gray-900" />
              </div>
              <span className={`text-sm ${muted}`}>{f}</span>
            </li>
          ))}
          {pkg.features.length > 8 && <li className={`text-xs pl-7 ${muted}`}>+{pkg.features.length - 8} more…</li>}
        </ul>
        <button onClick={() => onAddToCart(pkg)}
          className="btn-shine w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2
            transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(245,166,35,.55)] active:translate-y-0"
          style={{
            background: pkg.popular ? 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)' : 'rgba(245,166,35,.12)',
            border: pkg.popular ? 'none' : '1px solid rgba(245,166,35,.3)',
            color: pkg.popular ? '#111' : (dark ? '#FFCF6B' : '#b45309'),
            boxShadow: pkg.popular ? '0 5px 22px rgba(245,166,35,.42),inset 0 1px 0 rgba(255,255,255,.3)' : 'none',
          }}>
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default function Pricing() {
  const [searchParams] = useSearchParams();
  const { addPackage, items, totalAmount, totalItems } = useCart();
  const { selectedCurrency } = useCurrency();
  const [packages, setPackages] = useState(fallbackPackages);
  const [loading, setLoading] = useState(true);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCreditPackage, setSelectedCreditPackage] = useState(null);
  const dark = useDark();

  useEffect(() => {
    const ref = searchParams.get('ref') || searchParams.get('b');
    if (ref) { try { localStorage.setItem('vs_referral_slug', ref); } catch (e) {} }
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const data = await serverApi.packages.listPublic();
        if (data.packages?.length > 0) {
          setPackages(data.packages.map(pkg => {
            const fallback = fallbackPackages.find(fp => fp.id === pkg.id || fp.name?.toLowerCase() === pkg.name?.toLowerCase());
            const hasRealDescription = pkg.description && pkg.description.toLowerCase() !== 'brief description';
            return {
              ...pkg,
              price: Number(pkg.price),
              credits: pkg.credits === 'unlimited' || pkg.credits === null ? 'unlimited' : Number(pkg.credits),
              description: hasRealDescription ? pkg.description : (fallback?.description || pkg.description || ''),
              features: pkg.features?.length > 0 ? pkg.features : (fallback?.features || []),
            };
          }));
        }
      } catch (e) { console.error('Failed to fetch packages:', e); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleAddToCart = (pkg) => { setSelectedPackage(pkg); addPackage(pkg); setShowCreditModal(true); };
  const surface = dark ? 'bg-[#0E0D08] text-[#F9F5E8]' : 'bg-[#FEFCF3] text-gray-900';
  const muted   = dark ? 'text-gray-400' : 'text-gray-500';
  const gold    = dark ? 'text-amber-300' : 'text-amber-500';

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${surface}`}>
      <p className={`text-sm ${muted}`}>Loading packages…</p>
    </div>
  );

  return (
    <>
      <FontImport />
      <div className={`${surface} relative min-h-screen overflow-hidden py-10 md:py-14 px-4 md:px-6`}>
        <div className="pointer-events-none absolute inset-0 z-0" style={{
          background: dark
            ? 'radial-gradient(ellipse 600px 400px at -5% 60%,rgba(245,166,35,.17) 0%,transparent 65%),radial-gradient(ellipse 400px 300px at 105% 10%,rgba(245,166,35,.13) 0%,transparent 65%)'
            : 'radial-gradient(ellipse 600px 400px at -5% 60%,rgba(245,166,35,.1) 0%,transparent 65%),radial-gradient(ellipse 400px 300px at 105% 10%,rgba(245,166,35,.08) 0%,transparent 65%)',
        }} />
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Compact Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[rgba(245,166,35,.1)] border border-[rgba(245,166,35,.28)] text-amber-400 rounded-full px-4 py-1.5 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 badge-dot" /> Pricing Plans
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
              Find Your <span className={gold}>Perfect Plan</span>
            </h1>
            <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-4 ${muted}`}>
              Unlock powerful market insights with the right package for your needs.
            </p>
            <Link to="/login">
              <button className="btn-shine px-6 py-2.5 rounded-full text-sm font-bold text-gray-900
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(245,166,35,.5)]"
                style={{ background: 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)', boxShadow: '0 5px 22px rgba(245,166,35,.4),inset 0 1px 0 rgba(255,255,255,.3)' }}>
                Sign In
              </button>
            </Link>
          </div>

          {/* Cards — items-stretch keeps height equal */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.id} pkg={pkg} index={i} onAddToCart={handleAddToCart} dark={dark} />
            ))}
          </div>

          {/* Footer */}
          <footer className={`mt-16 pt-8 border-t ${dark ? 'border-[rgba(245,166,35,.12)]' : 'border-[rgba(245,166,35,.18)]'}`}>
            <div className="text-center space-y-5">
              {/* Contact */}
              <p className={`text-sm ${muted}`}>
                Payment processing is handled securely. For questions, email{' '}
                <a href="mailto:support@OpticScopeai.com" className={`font-medium transition-colors ${dark ? 'text-amber-300 hover:text-amber-200' : 'text-amber-600 hover:text-amber-500'}`}>support@OpticScopeai.com</a>
                {' '}or call{' '}
                <a href="tel:+447537106208" className={`font-medium transition-colors ${dark ? 'text-amber-300 hover:text-amber-200' : 'text-amber-600 hover:text-amber-500'}`}>+44-7537-106208</a>.
              </p>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-2">
                {[['Terms','/terms.html'],['Privacy','/privacy.html'],['Cookies','/cookie-policy.html'],['Refunds','/refund-policy.html'],['Acceptable Use','/acceptable-use.html'],['GDPR','/privacy.html']].map(([l,h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener"
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                      ${dark
                        ? 'border-[rgba(245,166,35,.15)] text-gray-400 hover:text-amber-300 hover:border-[rgba(245,166,35,.35)] hover:bg-[rgba(245,166,35,.06)]'
                        : 'border-[rgba(245,166,35,.2)] text-gray-500 hover:text-amber-600 hover:border-[rgba(245,166,35,.4)] hover:bg-amber-50'}`}>
                    {l}
                  </a>
                ))}
              </div>

              {/* Badge */}
              <div className="flex justify-center gap-3">
                <a href="/privacy.html" target="_blank" rel="noopener"
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors
                    ${dark
                      ? 'border-[rgba(245,166,35,.2)] text-amber-300 bg-[rgba(245,166,35,.06)]'
                      : 'border-[rgba(245,166,35,.25)] text-amber-600 bg-amber-50'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Privacy &amp; GDPR
                </a>
              </div>

              {/* Copyright */}
              <div className="space-y-1 pb-6">
                <p className={`text-sm font-bold ${dark ? 'text-[#F9F5E8]' : 'text-gray-900'}`}>OpticScopeAI © 2025</p>
                <p className={`text-[11px] max-w-md mx-auto leading-relaxed ${muted}`}>Disclaimer: OpticScopeAI is a technological research tool and does not provide financial or investment advice.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <CreditPackageModal
        isOpen={showCreditModal}
        onClose={(reason) => { if (reason === 'proceed' || reason === 'close') { setShowCreditModal(false); return; } setShowCreditModal(true); }}
        selectedPackage={selectedPackage}
        onNavigateToCheckout={() => redirectToCheckout({ items, totalAmount, totalItems }, selectedCurrency)}
        onConfirmSelection={(creditPkg) => { setShowCreditModal(false); setSelectedCreditPackage(creditPkg); setShowConfirmModal(true); }}
      />
      <ProceedChangeModal
        isOpen={showConfirmModal}
        selectedCreditPackage={selectedCreditPackage}
        onClose={() => setShowConfirmModal(false)}
        onProceed={() => { setShowConfirmModal(false); redirectToCheckout({ items, totalAmount, totalItems }, selectedCurrency); }}
        onChange={() => { setShowConfirmModal(false); setShowCreditModal(true); }}
      />
    </>
  );
}