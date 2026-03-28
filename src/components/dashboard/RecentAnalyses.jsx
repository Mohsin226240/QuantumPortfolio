import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { TrendingUp, TrendingDown, Eye, BarChart3, ChevronRight } from "lucide-react";
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

export default function RecentAnalyses({ analyses, isLoading }) {
  const { t } = useTranslation('dashboard');
  const dark = useDark();

  const card  = { position:'relative', borderRadius:16, border:'1px solid rgba(245,166,35,.18)', background: dark ? '#141209' : '#FFFDF5', overflow:'hidden', boxShadow: dark ? 'none' : '0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)' };
  const tx    = dark ? '#F9F5E8' : '#111';
  const mu    = dark ? '#9ca3af' : '#6b7280';
  const rowHv = dark ? 'rgba(245,166,35,.06)' : 'rgba(245,166,35,.05)';

  if (isLoading) {
    return (
      <div style={card}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent)' }} />
        <div style={{ padding:'20px 20px 8px', borderBottom:'1px solid rgba(245,166,35,.1)' }}>
          <div style={{ height:16, width:140, borderRadius:8, background:'rgba(245,166,35,.1)', animation:'pulse 1.5s infinite' }} />
        </div>
        <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10 }}>
          {Array(3).fill(0).map((_, i) => (
            <div key={i} style={{ display:'flex', gap:12, padding:12, borderRadius:12, background:'rgba(245,166,35,.04)', animation:'pulse 1.5s infinite' }}>
              <div style={{ width:48, height:40, borderRadius:10, background:'rgba(245,166,35,.1)', flexShrink:0 }} />
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6, justifyContent:'center' }}>
                <div style={{ height:11, width:'35%', borderRadius:6, background:'rgba(245,166,35,.1)' }} />
                <div style={{ height:9, width:'60%', borderRadius:6, background:'rgba(245,166,35,.07)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={card}>
      {/* top shimmer */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(245,166,35,.5),transparent)' }} />

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 14px 12px', borderBottom:'1px solid rgba(245,166,35,.08)', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
          <div style={{ width:30, height:30, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,166,35,.1)', flexShrink:0 }}>
            <BarChart3 size={14} style={{ color:'#F5A623' }} />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:13, color:tx }}>{t('recentAnalyses.title')}</div>
            <div style={{ fontSize:11, color:mu }}>{analyses.length} records</div>
          </div>
        </div>
        <Link to={createPageUrl("History")} style={{ flexShrink:0 }}>
          <motion.button whileHover={{ y:-1 }} whileTap={{ y:0 }}
            style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600, padding:'5px 10px', borderRadius:20, background:'transparent', border:'1px solid rgba(245,166,35,.28)', cursor:'pointer', color: dark ? '#FFCF6B' : '#c27a00', transition:'background .15s', whiteSpace:'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {t('recentAnalyses.viewAll')} <ChevronRight size={11} />
          </motion.button>
        </Link>
      </div>

      {/* Body */}
      <div style={{ padding:'10px 10px', maxHeight:320, overflowY:'auto' }}>
        {analyses.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            <div style={{ width:52, height:52, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,166,35,.08)', border:'1px solid rgba(245,166,35,.14)' }}>
              <BarChart3 size={22} style={{ color:'#F5A623', opacity:.5 }} />
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:4, color:tx }}>{t('recentAnalyses.noAnalyses')}</div>
              <div style={{ fontSize:12, color:mu, marginBottom:12 }}>{t('recentAnalyses.noAnalysesDescription')}</div>
            </div>
            <Link to={createPageUrl("ChartAnalysis")}>
              <motion.button whileHover={{ y:-2, boxShadow:'0 8px 22px rgba(245,166,35,.45)' }} whileTap={{ y:0 }}
                style={{ fontSize:12, fontWeight:700, padding:'8px 20px', borderRadius:20, border:'none', cursor:'pointer', background:G, boxShadow:'0 4px 14px rgba(245,166,35,.35)', color:'#1a1500' }}>
                {t('recentAnalyses.startAnalyzing')}
              </motion.button>
            </Link>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
            {analyses.slice(0, 5).map((analysis, index) => {
              const symbol = (() => {
                const fromServer = analysis.symbol;
                const fromModel = analysis.analysis_result && (analysis.analysis_result.coin_symbol || analysis.analysis_result.coin_name);
                const best = (fromServer && fromServer !== 'Unknown') ? fromServer : (fromModel ? String(fromModel).trim() : '');
                return best || t('recentAnalyses.analysis');
              })();
              const dateStr = (() => {
                try {
                  const d = analysis.created_date ? new Date(analysis.created_date) : null;
                  return d && !isNaN(d) ? format(d, "MMM d, HH:mm") : '';
                } catch (_e) { return ''; }
              })();
              const conf = analysis.analysis_result?.confidence_level || 0;
              const trend = analysis.analysis_result?.trend_direction;
              const isHigh = conf > 0.7;

              return (
                <motion.div key={analysis.id}
                  initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay: index * .07 }}
                  whileHover={{ x:3, background: rowHv }}
                  style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:12, cursor:'pointer', transition:'background .15s' }}
                >
                  {/* Thumbnail */}
                  <div style={{ position:'relative', flexShrink:0 }}>
                    <div style={{ width:42, height:36, borderRadius:8, overflow:'hidden', background:'rgba(245,166,35,.07)', border:'1px solid rgba(245,166,35,.14)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {analysis.chart_image_url
                        ? <img src={analysis.chart_image_url} alt="Chart" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        : <BarChart3 size={14} style={{ color:'#F5A623' }} />}
                    </div>
                    {trend === 'bullish' && <TrendingUp size={13} style={{ position:'absolute', top:-4, right:-4, color:'#34d399', background: dark ? '#141209':'#fff', borderRadius:'50%', padding:1 }} />}
                    {trend === 'bearish' && <TrendingDown size={13} style={{ position:'absolute', top:-4, right:-4, color:'#f87171', background: dark ? '#141209':'#fff', borderRadius:'50%', padding:1 }} />}
                  </div>

                  {/* Info */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2, flexWrap:'wrap' }}>
                      <span style={{ fontWeight:600, fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:tx, maxWidth:'120px' }}>{symbol}</span>
                      <span style={{ fontSize:11, fontWeight:600, padding:'2px 6px', borderRadius:8, flexShrink:0, background: isHigh ? 'rgba(52,211,153,.1)' : 'rgba(251,191,36,.1)', color: isHigh ? '#34d399' : '#fbbf24' }}>
                        {t(`recentAnalyses.status.${analysis.status}`, { defaultValue: analysis.status })}
                      </span>
                    </div>
                    <div style={{ fontSize:11, color:mu }}>{dateStr}</div>
                  </div>

                  {/* Confidence + eye */}
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                    {conf > 0 && <span style={{ fontSize:13, fontWeight:700, color: dark ? '#FFCF6B' : '#c27a00' }}>{(conf * 100).toFixed(0)}%</span>}
                    {analysis.status === 'completed' && analysis.chart_image_url && (
                      <motion.button whileHover={{ scale:1.15 }} whileTap={{ scale:.95 }}
                        onClick={() => window.open(analysis.chart_image_url, '_blank')}
                        style={{ width:28, height:28, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,166,35,.08)', border:'1px solid rgba(245,166,35,.15)', cursor:'pointer' }}
                        title={t('recentAnalyses.viewChart')}
                      >
                        <Eye size={13} style={{ color:'#F5A623' }} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}