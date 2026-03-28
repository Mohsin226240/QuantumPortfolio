import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Upload, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const G = 'linear-gradient(135deg,#F5A623 0%,#FFCF6B 50%,#E8940A 100%)';

function useDark() {
  const [d, setD] = React.useState(() => document.documentElement.dataset.theme === 'dark');
  React.useEffect(() => {
    const o = new MutationObserver(() => setD(document.documentElement.dataset.theme === 'dark'));
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => o.disconnect();
  }, []);
  return d;
}

export default function QuickActions() {
  const { t } = useTranslation('dashboard');
  const dark = useDark();
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
      <Link to={createPageUrl("ChartAnalysis")}>
        <motion.button
          whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(245,166,35,.5)' }}
          whileTap={{ y: 0 }}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:40, border:'none', cursor:'pointer', background: G, boxShadow:'0 5px 18px rgba(245,166,35,.38)', fontSize:13, fontWeight:700, color:'#1a1500' }}
        >
          <Upload size={14} />{t('quickActions.analyzeChart')}
        </motion.button>
      </Link>
      <Link to={createPageUrl("AITutor")}>
        <motion.button
          whileHover={{ y: -2, boxShadow: dark ? '0 6px 18px rgba(245,166,35,.2)' : '0 6px 18px rgba(245,166,35,.18)' }}
          whileTap={{ y: 0 }}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:40, cursor:'pointer', background:'transparent', border:'1px solid rgba(245,166,35,.3)', fontSize:13, fontWeight:600, color: dark ? '#FFCF6B' : '#c27a00', transition:'background .15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Sparkles size={14} />{t('quickActions.askAssistant')}
        </motion.button>
      </Link>
    </motion.div>
  );
}