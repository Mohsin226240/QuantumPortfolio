import React from "react";
import { useTranslation } from 'react-i18next';
import { TrendingUp, Shield, BarChart3, DollarSign, BookOpen, Target } from "lucide-react";
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

const TOPICS = [
  { titleKey: "topics.technicalAnalysis",  apiTitle: "Technical Analysis",  Icon: BarChart3,   color: '#60a5fa' },
  { titleKey: "topics.riskManagement",     apiTitle: "Risk Management",     Icon: Shield,      color: '#f87171' },
  { titleKey: "topics.tradingPsychology",  apiTitle: "Trading Psychology",  Icon: TrendingUp,  color: '#34d399' },
  { titleKey: "topics.portfolioManagement",apiTitle: "Portfolio Management",Icon: DollarSign,  color: '#fbbf24' },
  { titleKey: "topics.marketFundamentals", apiTitle: "Market Fundamentals", Icon: BookOpen,    color: '#a78bfa' },
  { titleKey: "topics.strategyDevelopment",apiTitle: "Strategy Development",Icon: Target,      color: '#F5A623' },
];

export default function TopicSuggestions({ onTopicSelect }) {
  const { t } = useTranslation(['dashboard']);
  const dark = useDark();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {TOPICS.map((topic, i) => {
        const label = t(topic.titleKey, { ns: 'dashboard' });
        return (
          <motion.button
            key={topic.titleKey}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * .05 }}
            whileHover={{ x: 3, background: dark ? 'rgba(245,166,35,.08)' : 'rgba(245,166,35,.06)' }}
            whileTap={{ scale: .98 }}
            onClick={() => onTopicSelect(topic.apiTitle)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
              border: '1px solid rgba(245,166,35,.15)',
              background: 'transparent',
              textAlign: 'left', fontSize: 12, fontWeight: 500,
              color: dark ? '#F9F5E8' : '#111',
              transition: 'background .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,166,35,.35)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(245,166,35,.15)'}
          >
            {/* Icon dot */}
            <div style={{
              width: 28, height: 28, borderRadius: 8, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${topic.color}18`, border: `1px solid ${topic.color}30`,
            }}>
              <topic.Icon size={13} style={{ color: topic.color }} />
            </div>
            <span>{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}