import React from "react";
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, BarChart3, CheckCircle, Clock, XCircle } from "lucide-react";
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

const STATUS_OPTS = [
  { value: "all",       labelKey: "history.filters.allStatus",  Icon: BarChart3   },
  { value: "completed", labelKey: "history.filters.completed",  Icon: CheckCircle },
  { value: "analyzing", labelKey: "history.filters.analyzing",  Icon: Clock       },
  { value: "failed",    labelKey: "history.filters.failed",     Icon: XCircle     },
];

const TREND_OPTS = [
  { value: "all",       labelKey: "history.filters.allTrends", Icon: BarChart3,    activeColor: '#F5A623' },
  { value: "bullish",   labelKey: "history.filters.bullish",   Icon: TrendingUp,   activeColor: '#34d399' },
  { value: "bearish",   labelKey: "history.filters.bearish",   Icon: TrendingDown, activeColor: '#f87171' },
  { value: "sideways",  labelKey: "history.filters.sideways",  Icon: BarChart3,    activeColor: '#fbbf24' },
];

function FilterBtn({ active, onClick, Icon, label, activeColor = '#F5A623', dark }) {
  const tx = dark ? '#F9F5E8' : '#111';
  const mu = dark ? '#9ca3af' : '#6b7280';
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        fontSize: 12, fontWeight: active ? 700 : 500,
        padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
        border: active ? `1px solid ${activeColor}55` : `1px solid rgba(245,166,35,.2)`,
        background: active ? `${activeColor}18` : 'transparent',
        color: active ? activeColor : mu,
        transition: 'background .15s, color .15s, border-color .15s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(245,166,35,.06)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <Icon size={11} />{label}
    </motion.button>
  );
}

export default function FilterTabs({ statusFilter, trendFilter, onStatusChange, onTrendChange }) {
  const { t } = useTranslation(['dashboard']);
  const dark = useDark();
  const mu = dark ? '#9ca3af' : '#6b7280';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Status row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: mu, marginRight: 2 }}>Status:</span>
        {STATUS_OPTS.map(o => (
          <FilterBtn key={o.value} active={statusFilter === o.value} onClick={() => onStatusChange(o.value)}
            Icon={o.Icon} label={t(o.labelKey, { ns: 'dashboard' })} dark={dark} />
        ))}
      </div>
      {/* Trend row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: mu, marginRight: 2 }}>Trend:</span>
        {TREND_OPTS.map(o => (
          <FilterBtn key={o.value} active={trendFilter === o.value} onClick={() => onTrendChange(o.value)}
            Icon={o.Icon} label={t(o.labelKey, { ns: 'dashboard' })} activeColor={o.activeColor} dark={dark} />
        ))}
      </div>
    </div>
  );
}