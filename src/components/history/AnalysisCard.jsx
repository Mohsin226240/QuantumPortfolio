import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, BarChart3, ExternalLink, Target, DollarSign, Calendar, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { formatAssetPrice } from "@/lib/utils";

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

const responsiveCSS = `
  .ac-stat-grid { display:grid; grid-template-columns:repeat(2,1fr); }
  @media(min-width:640px){ .ac-stat-grid { grid-template-columns:repeat(4,1fr); } }
  .ac-top { padding:14px 14px 12px; }
  @media(min-width:640px){ .ac-top { padding:18px 20px 16px; } }
  .ac-summary { padding:10px 14px 14px; }
  @media(min-width:640px){ .ac-summary { padding:11px 20px 16px; } }
  .ac-divider { margin:0 14px; }
  @media(min-width:640px){ .ac-divider { margin:0 20px; } }
  .ac-thumb { width:80px; height:56px; }
  @media(min-width:640px){ .ac-thumb { width:108px; height:74px; } }
`;

const TREND_CFG = {
  bullish: { label: 'BULLISH', c: '#34d399', bg: 'rgba(52,211,153,.12)', glow: 'rgba(52,211,153,.25)', Icon: TrendingUp },
  bearish: { label: 'BEARISH', c: '#f87171', bg: 'rgba(248,113,113,.12)', glow: 'rgba(248,113,113,.25)', Icon: TrendingDown },
  sideways: { label: 'SIDEWAYS', c: '#d97706', bg: 'rgba(251,191,36,.18)', glow: 'rgba(251,191,36,.25)', Icon: BarChart3 },
};

const STAT_CFG = [
  { key: 'entry_price', labelKey: 'history.entry', Icon: DollarSign, c: '#34d399' },
  { key: 'stop_loss', labelKey: 'history.stopLoss', Icon: Target, c: '#f87171' },
  { key: 'take_profit_1', labelKey: 'history.tp1', Icon: Target, c: '#60a5fa' },
  { key: 'take_profit_2', labelKey: 'history.tp2', Icon: Target, c: '#a78bfa' },
];

/* Tilt card — all hooks always called, no conditional hook calls */
function TiltCard({ children, dark }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'relative',
        borderRadius: 20,
        border: hovered ? '1px solid rgba(245,166,35,.45)' : '1px solid rgba(245,166,35,.18)',
        background: dark ? '#141209' : '#FFFDF5',
        overflow: 'hidden',
        boxShadow: hovered
          ? (dark ? '0 22px 55px rgba(0,0,0,.55), 0 0 0 1px rgba(245,166,35,.28)' : '0 22px 55px rgba(245,166,35,.16), 0 0 0 1px rgba(245,166,35,.22)')
          : (dark ? '0 4px 20px rgba(0,0,0,.35)' : '0 4px 16px rgba(0,0,0,.06)'),
        cursor: 'default',
        transition: 'border-color .2s, box-shadow .2s',
      }}
    >
      {/* Top shimmer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,166,35,.6),transparent)', opacity: hovered ? 1 : .45, transition: 'opacity .2s', zIndex: 2 }} />

      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  );
}

export default function AnalysisCard({ analysis, index }) {
  const { t } = useTranslation(['dashboard']);
  const dark = useDark();
  const result = analysis.analysis_result;

  const displaySymbol = (() => {
    const fromServer = analysis.symbol;
    const fromModel = result && (result.coin_symbol || result.coin_name);
    const best = (fromServer && fromServer !== 'Unknown') ? fromServer : (fromModel ? String(fromModel).trim() : '');
    return best || 'Analysis';
  })();

  const trendKey = result?.trend_direction || 'sideways';
  const trend = TREND_CFG[trendKey] || TREND_CFG.sideways;
  const TrendIcon = trend.Icon;
  const conf = result?.confidence_level ? Math.round(result.confidence_level * 100) : null;
  const dateStr = (() => { try { return format(new Date(analysis.created_date), "MMM d, yyyy · HH:mm"); } catch (_) { return ''; } })();

  const tx = dark ? '#F9F5E8' : '#111';
  const mu = dark ? '#9ca3af' : '#6b7280';
  const sep = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * .06, duration: .4 }}
      style={{ perspective: 1200 }}
    >
      <TiltCard dark={dark}>
        <style>{responsiveCSS}</style>
        {/* ── TOP SECTION ── */}
        <div className="ac-top" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Chart thumbnail */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div className="ac-thumb" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${trend.c}44`, boxShadow: `0 0 0 3px ${trend.c}14` }}>
              {analysis.chart_image_url
                ? <img src={analysis.chart_image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,166,35,.06)' }}><BarChart3 size={22} style={{ color: '#F5A623', opacity: .4 }} /></div>
              }
            </div>
            {/* Float trend badge */}
            <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: dark ? trend.bg : `linear-gradient(135deg, ${trend.bg}, rgba(255,255,255,.85))`, backdropFilter: 'blur(6px)', border: `1px solid ${trend.c}55`, color: trend.c, whiteSpace: 'nowrap', boxShadow: `0 3px 10px ${trend.glow}` }}>
              <TrendIcon size={10} />{trend.label}
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 120, paddingTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: tx, letterSpacing: '-.01em' }}>{displaySymbol}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'rgba(245,166,35,.12)', border: '1px solid rgba(245,166,35,.25)', color: '#F5A623' }}>
                {t(`history.status.${analysis.status}`, { ns: 'dashboard', defaultValue: analysis.status })}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: mu, marginBottom: 12 }}>
              <Calendar size={10} style={{ color: '#F5A623' }} />{dateStr}
            </div>

            {/* Confidence */}
            {conf !== null && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: mu, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Percent size={9} />{t('history.confidence', { ns: 'dashboard' })}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: conf > 70 ? '#34d399' : '#fbbf24' }}>{conf}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 4, background: 'rgba(245,166,35,.1)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${conf}%` }}
                    transition={{ delay: index * .06 + .35, duration: 1, ease: [.34, 1.2, .64, 1] }}
                    style={{ height: '100%', borderRadius: 4, background: conf > 70 ? 'linear-gradient(90deg,#34d399,#6ee7b7)' : 'linear-gradient(90deg,#fbbf24,#fde68a)', boxShadow: conf > 70 ? '0 0 8px rgba(52,211,153,.45)' : '0 0 8px rgba(251,191,36,.45)' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 10px 26px rgba(245,166,35,.5)' }}
            whileTap={{ y: 0, scale: .97 }}
            onClick={() => window.open(analysis.chart_image_url, '_blank')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 10, border: 'none', background: G, color: '#1a1500', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,166,35,.32)', flexShrink: 0, alignSelf: 'flex-start' }}
          >
            <ExternalLink size={12} />{t('history.viewChart', { ns: 'dashboard' })}
          </motion.button>
        </div>

        {/* ── DIVIDER ── */}
        <div className="ac-divider" style={{ height: 1, background: `linear-gradient(90deg,transparent,${sep},transparent)` }} />

        {/* ── STAT ROW ── */}
        {result && (
          <div className="ac-stat-grid">
            {STAT_CFG.map((s, i) => {
              const val = result[s.key];
              const hasVal = typeof val === 'number';
              return (
                <motion.div
                  key={s.key}
                  whileHover={{
                    background: `${s.c}14`,
                    scale: 1.02,
                    zIndex: 10
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    padding: '10px 8px',
                    textAlign: 'center',
                    borderRight: i % 2 === 0 ? `1px solid ${sep}` : 'none',
                    borderBottom: i < 2 ? `1px solid ${sep}` : 'none',
                    cursor: 'default',
                    position: 'relative'
                  }}>
                  <s.Icon size={14} style={{ color: s.c, margin: '0 auto 6px', display: 'block', filter: 'drop-shadow(0 0 4px currentColor)' }} />
                  <div style={{ fontSize: 10, fontWeight: 600, color: mu, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{t(s.labelKey, { ns: 'dashboard' })}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: hasVal ? s.c : mu, opacity: hasVal ? 1 : .35 }}>
                    {hasVal ? `$${formatAssetPrice(val)}` : '—'}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── SUMMARY ── */}
        {result?.analysis_summary && (
          <>
            <div className="ac-divider" style={{ height: 1, background: `linear-gradient(90deg,transparent,${sep},transparent)` }} />
            <div className="ac-summary">
              <p style={{ fontSize: 12, color: mu, lineHeight: 1.65, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {result.analysis_summary}
              </p>
            </div>
          </>
        )}
      </TiltCard>
    </motion.div>
  );
}