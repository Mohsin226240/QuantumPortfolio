import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Coins, Zap, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useCart } from "@/contexts/CartContext";
import { creditPackages as fallbackCreditPackages } from "@/data/packages";
import { serverApi } from '@/api/serverApi';
import { motion } from "framer-motion";

function useDark() {
  const [d, setD] = React.useState(() => document.documentElement.dataset.theme === 'dark');
  React.useEffect(() => {
    const o = new MutationObserver(() => setD(document.documentElement.dataset.theme === 'dark'));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => o.disconnect();
  }, []);
  return d;
}

const G = 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)';

export default function CreditsPanel({ credits_balance = 0, credits_unlimited = false, subscription_tier = null }) {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const dark = useDark();
  const display = credits_unlimited ? '∞' : String(Number(credits_balance || 0));
  const tier = subscription_tier ? subscription_tier.charAt(0).toUpperCase() + subscription_tier.slice(1) : 'None';
  const isPro = subscription_tier === 'pro' || subscription_tier === 'premium';
  const { addCreditPackage } = useCart();
  const [creditPackages, setCreditPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
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
        console.error('Failed to fetch credit packages:', e);
        setCreditPackages(fallbackCreditPackages);
      } finally {
        setPackagesLoading(false);
      }
    };
    fetch();
  }, []);

  const formatPrice = (price, currency = '$') => `${currency}${Number(price).toFixed(2)}`;
  const sorted = [...creditPackages].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  const handleQuickAdd = (pkg) => { addCreditPackage(pkg); navigate('/checkout'); };

  const tx  = dark ? '#F9F5E8' : '#111';
  const mu  = dark ? '#9ca3af' : '#6b7280';
  const card = { position:'relative', borderRadius:16, border:'1px solid rgba(245,166,35,.18)', background: dark ? '#141209' : '#FFFDF5', overflow:'hidden', boxShadow: dark ? 'none' : '0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)' };
  const pkgCard = { borderRadius:12, border:'1px solid rgba(245,166,35,.14)', background: dark ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.7)', padding:'12px', display:'flex', flexDirection:'column', height:'100%', transition:'transform .18s, box-shadow .18s' };

  return (
    <div style={card}>
      {/* top shimmer */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent)' }} />

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px 14px', borderBottom:'1px solid rgba(245,166,35,.08)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,166,35,.1)' }}>
            <Coins size={15} style={{ color:'#F5A623' }} />
          </div>
          <span style={{ fontWeight:700, fontSize:14, color:tx }}>{t('creditsPanel.title')}</span>
        </div>
        <span style={{ fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20, background: isPro ? G : 'rgba(245,166,35,.1)', color: isPro ? '#1a1500' : '#F5A623', border: isPro ? 'none' : '1px solid rgba(245,166,35,.2)' }}>{tier}</span>
      </div>

      <div style={{ padding:'16px 20px 20px' }}>
        {/* Balance row */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:12 }}>
          <div>
            <div style={{ fontSize:11, color:mu, marginBottom:2 }}>{t('creditsPanel.currentPlan')}</div>
            <div style={{ fontWeight:700, fontSize:14, color:tx }}>{tier}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:11, color:mu, marginBottom:2 }}>{t('creditsPanel.creditsRemaining')}</div>
            <div style={{ fontSize:28, fontWeight:800, color: dark ? '#FFCF6B' : '#c27a00', lineHeight:1 }}>{display}</div>
          </div>
        </div>

        {/* Progress bar */}
        {!credits_unlimited && (
          <div style={{ height:4, borderRadius:4, background:'rgba(245,166,35,.1)', marginBottom:14, overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:4, background:'linear-gradient(90deg,#F5A623,#FFCF6B)', width:`${Math.min(100,(Number(credits_balance||0)/100)*100)}%`, boxShadow:'0 0 6px rgba(245,166,35,.35)', transition:'width 1.2s cubic-bezier(.34,1.2,.64,1)' }} />
          </div>
        )}

        <div style={{ fontSize:12, color:mu, marginBottom:16 }}>{t('creditsPanel.description')}</div>

        {/* Quick Buy */}
        <div style={{ fontSize:12, fontWeight:600, color:tx, marginBottom:10 }}>{t('creditsPanel.quickBuy')}</div>
        {packagesLoading ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0', marginBottom:14 }}>
            <div style={{ width:20, height:20, borderRadius:'50%', border:'2px solid rgba(245,166,35,.2)', borderTopColor:'#F5A623', animation:'spin 0.6s linear infinite' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : (
        <div style={{ maxHeight:280, overflowY:'auto', paddingRight:2, marginBottom:14 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:10 }}>
            {sorted.map((pkg) => (
              <motion.div key={pkg.id} whileHover={{ y:-3, boxShadow:'0 10px 24px rgba(245,166,35,.14)' }} style={pkgCard}>
                {pkg.popular && (
                  <div style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:10, background:G, color:'#1a1500', alignSelf:'flex-start', marginBottom:6 }}>Popular</div>
                )}
                <div style={{ fontWeight:600, fontSize:13, color:tx, marginBottom:2 }}>{pkg.name}</div>
                <div style={{ fontSize:11, color:mu, marginBottom:10 }}>
                  {pkg.unlimited ? t('creditsPanel.unlimited') : t('creditsPanel.creditsCount', { count: pkg.credits })}
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:14, color: dark ? '#FFCF6B' : '#c27a00' }}>{formatPrice(pkg.price, pkg.currency)}</span>
                  <motion.button whileHover={{ y:-1, boxShadow:'0 6px 16px rgba(245,166,35,.45)' }} whileTap={{ y:0 }}
                    onClick={(e) => { e.preventDefault(); handleQuickAdd(pkg); }}
                    style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700, padding:'6px 12px', borderRadius:10, border:'none', cursor:'pointer', background:G, color:'#1a1500', boxShadow:'0 3px 10px rgba(245,166,35,.3)' }}>
                    <ShoppingCart size={11} />{t('creditsPanel.add')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}

        <div style={{ fontSize:11, color:mu, marginBottom:14 }}>{t('creditsPanel.seeAllOptions')}</div>

        {/* CTA */}
        <Link to={createPageUrl("Pricing")}>
          <motion.button whileHover={{ y:-2, boxShadow:'0 10px 28px rgba(245,166,35,.5)' }} whileTap={{ y:0 }}
            style={{ width:'100%', padding:'11px', borderRadius:12, border:'none', cursor:'pointer', background:G, fontWeight:700, fontSize:13, color:'#1a1500', boxShadow:'0 5px 18px rgba(245,166,35,.38)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Zap size={14} />{t('creditsPanel.buyCreditsUpgrade')}
          </motion.button>
        </Link>
      </div>
    </div>
  );
}