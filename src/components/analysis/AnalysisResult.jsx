import React, { useState } from "react";
import { formatAssetPrice } from "@/lib/utils";
import {
  TrendingUp, TrendingDown, BarChart3,
  Target, AlertTriangle, DollarSign,
  RefreshCw, CheckCircle, BarChart2,
  Clock, Layers,
} from "lucide-react";
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

const TREND_CFG = {
  bullish:  { label:'BULLISH',  c:'#34d399', bg:'rgba(52,211,153,.12)',  glow:'rgba(52,211,153,.3)',  Icon: TrendingUp  },
  bearish:  { label:'BEARISH',  c:'#f87171', bg:'rgba(248,113,113,.12)', glow:'rgba(248,113,113,.3)', Icon: TrendingDown },
  sideways: { label:'SIDEWAYS', c:'#fbbf24', bg:'rgba(251,191,36,.12)',  glow:'rgba(251,191,36,.3)',  Icon: BarChart3    },
};

const POSITION_CFG = {
  bullish: { label:'Long',    c:'#34d399' },
  bearish: { label:'Short',   c:'#f87171' },
  default: { label:'Neutral', c:'#9ca3af' },
};

const LEVEL_STRENGTH = {
  strong: { c:'#f87171', bg:'rgba(248,113,113,.1)'  },
  medium: { c:'#fbbf24', bg:'rgba(251,191,36,.1)'  },
  weak:   { c:'#94a3b8', bg:'rgba(148,163,184,.1)'  },
};

/* ── small reusable section card ── */
function SCard({ title, icon: Icon, iconColor = '#F5A623', dark, children, style }) {
  const tx = dark ? '#F9F5E8' : '#111';
  const sep = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';
  return (
    <div style={{ borderRadius:18, border:'1px solid rgba(245,166,35,.16)', background: dark?'#141209':'#FFFDF5', overflow:'hidden', ...style }}>
      <div style={{ padding:'14px 18px 12px', borderBottom:`1px solid ${sep}`, display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:30, height:30, borderRadius:9, background:`${iconColor}18`, border:`1px solid ${iconColor}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon size={14} style={{ color:iconColor }} />
        </div>
        <span style={{ fontSize:14, fontWeight:700, color:tx }}>{title}</span>
      </div>
      <div style={{ padding:18 }}>{children}</div>
    </div>
  );
}

/* ── price level box ── */
function PriceBox({ icon: Icon, label, value, c, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      animate={{ boxShadow: hov ? `0 8px 24px ${c}30` : '0 2px 8px rgba(0,0,0,.06)' }}
      style={{ borderRadius:14, border:`1px solid ${c}33`, background:`${c}0d`, padding:'16px 14px', textAlign:'center', transition:'border-color .2s' }}
    >
      <div style={{ width:32, height:32, borderRadius:10, background:`${c}18`, border:`1px solid ${c}30`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px' }}>
        <Icon size={14} style={{ color:c }} />
      </div>
      <div style={{ fontSize:11, fontWeight:600, color:c, marginBottom:5 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:800, color:c }}>
        {typeof value === 'number' ? `$${formatAssetPrice(value)}` : <span style={{ opacity:.35 }}>N/A</span>}
      </div>
    </motion.div>
  );
}

export default function AnalysisResult({ analysis, onReset }) {
  const dark = useDark();
  const result = analysis.analysis_result;
  if (!result) return null;

  /* ── original logic, untouched ── */
  const confidencePercentage = Math.round(result.confidence_level * 100);
  const detectedSymbol = (result?.coin_symbol || result?.coin_name || "").trim();
  const displaySymbol  = (analysis?.symbol && analysis.symbol !== 'Unknown')
    ? analysis.symbol
    : (detectedSymbol || analysis?.symbol || 'Unknown');
  const positionEntry = (() => {
    switch (result.trend_direction) {
      case 'bullish': return POSITION_CFG.bullish;
      case 'bearish': return POSITION_CFG.bearish;
      default:        return POSITION_CFG.default;
    }
  })();

  const trend    = TREND_CFG[result.trend_direction] || TREND_CFG.sideways;
  const TrendIcon = trend.Icon;
  const tx  = dark ? '#F9F5E8' : '#111';
  const mu  = dark ? '#9ca3af' : '#6b7280';
  const sep = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', flexDirection:'column', gap:20 }}>

      {/* ── HEADER CARD ── */}
      <div style={{ position:'relative', borderRadius:20, overflow:'hidden', border:'1px solid rgba(245,166,35,.22)', background: dark?'#141209':'#FFFDF5', padding:'14px 16px' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(245,166,35,.6),transparent)' }} />
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,166,35,.07) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12, position:'relative', zIndex:1 }}>
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10, flexWrap:'wrap' }}>
              <div style={{ width:32, height:32, borderRadius:10, background:G, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(245,166,35,.4)', flexShrink:0 }}>
                <CheckCircle size={16} style={{ color:'#1a1500' }} />
              </div>
              <span style={{ fontSize:16, fontWeight:800, color:tx }}>Analysis Complete</span>
              {displaySymbol && (
                <span style={{ fontSize:13, fontWeight:600, padding:'3px 10px', borderRadius:20, background:'rgba(245,166,35,.12)', border:'1px solid rgba(245,166,35,.25)', color:'#F5A623' }}>
                  {displaySymbol}
                </span>
              )}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
              {/* Trend badge */}
              <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:20, background:trend.bg, border:`1px solid ${trend.c}44`, color:trend.c, boxShadow:`0 2px 8px ${trend.glow}` }}>
                <TrendIcon size={12} />{trend.label}
              </span>
              {/* Confidence badge */}
              <span style={{ fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:20, background:'rgba(245,166,35,.1)', border:'1px solid rgba(245,166,35,.25)', color:'#F5A623' }}>
                {confidencePercentage}% Confidence
              </span>
              {/* Position badge */}
              <span style={{ fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:20, background:`${positionEntry.c}12`, border:`1px solid ${positionEntry.c}33`, color:positionEntry.c }}>
                {positionEntry.label}
              </span>
            </div>
          </div>

          {/* Reset button */}
          <motion.button
            whileHover={{ y:-2, boxShadow:'0 10px 26px rgba(245,166,35,.45)' }}
            whileTap={{ y:0, scale:.97 }}
            onClick={onReset}
            style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, fontWeight:700, padding:'9px 16px', borderRadius:10, border:'none', background:G, color:'#1a1500', cursor:'pointer', boxShadow:'0 4px 14px rgba(245,166,35,.35)', flexShrink:0 }}
          >
            <RefreshCw size={14} />New Analysis
          </motion.button>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16, alignItems:'start' }}>

        {/* LEFT — Chart Preview */}
        <SCard title="Chart Preview" icon={BarChart2} dark={dark}>
          <img src={analysis.chart_image_url} alt="Analyzed chart" style={{ width:'100%', borderRadius:12, display:'block', marginBottom:14, border:'1px solid rgba(245,166,35,.15)' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:12, color:mu, fontWeight:500 }}>Symbol</span>
              <span style={{ fontSize:13, fontWeight:700, color:tx }}>{displaySymbol}</span>
            </div>
            <div style={{ height:1, background:sep }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:12, color:mu, fontWeight:500, display:'flex', alignItems:'center', gap:5 }}><Clock size={11} />Time Frame</span>
              <span style={{ fontSize:13, fontWeight:700, color: result.time_frame ? tx : mu, opacity: result.time_frame ? 1 : .5 }}>
                {result.time_frame || 'Not specified'}
              </span>
            </div>
          </div>
        </SCard>

        {/* RIGHT — signals column */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

          {/* Trading Levels */}
          <SCard title="Trading Levels" icon={Target} dark={dark}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, marginBottom: result.risk_reward_ratio ? 16 : 0 }}>
              <PriceBox icon={DollarSign}    label="Entry Price"   value={result.entry_price}   c="#34d399" dark={dark} />
              <PriceBox icon={AlertTriangle} label="Stop Loss"     value={result.stop_loss}     c="#f87171" dark={dark} />
              <PriceBox icon={Target}        label="Take Profit 1" value={result.take_profit_1} c="#60a5fa" dark={dark} />
              <PriceBox icon={Target}        label="Take Profit 2" value={result.take_profit_2} c="#a78bfa" dark={dark} />
            </div>

            {/* Risk/Reward */}
            {result.risk_reward_ratio && (
              <div style={{ padding:'12px 16px', borderRadius:12, background:'rgba(245,166,35,.07)', border:'1px solid rgba(245,166,35,.2)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:600, color: dark?'#F9F5E8':'#111' }}>Risk / Reward Ratio</span>
                <span style={{ fontSize:18, fontWeight:800, color:'#F5A623' }}>1:{result.risk_reward_ratio.toFixed(2)}</span>
              </div>
            )}
          </SCard>

          {/* Key Levels */}
          {result.key_levels && result.key_levels.length > 0 && (
            <SCard title="Key Support & Resistance" icon={Layers} dark={dark}>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {result.key_levels.map((level, i) => {
                  const sc = LEVEL_STRENGTH[level.strength?.toLowerCase()] || LEVEL_STRENGTH.weak;
                  return (
                    <motion.div key={i} whileHover={{ x:3 }}
                      style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderRadius:10, background:sc.bg, border:`1px solid ${sc.c}30` }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:7, height:7, borderRadius:'50%', background:sc.c, boxShadow:`0 0 6px ${sc.c}` }} />
                        <span style={{ fontSize:13, fontWeight:600, color:tx }}>{level.type}</span>
                        <span style={{ fontSize:11, color:mu }}>({level.strength})</span>
                      </div>
                      <span style={{ fontSize:13, fontWeight:800, color:sc.c }}>
                        {typeof level.price === 'number' ? `$${formatAssetPrice(level.price)}` : ''}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </SCard>
          )}

          {/* Analysis Summary */}
          <SCard title="Analysis Summary" icon={BarChart3} dark={dark}>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ padding:'14px 16px', borderRadius:12, background:'rgba(245,166,35,.06)', border:'1px solid rgba(245,166,35,.16)' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#F5A623', marginBottom:7 }}>Market Analysis</div>
                <p style={{ fontSize:13, color: dark?'#d1d5db':'#374151', lineHeight:1.68, margin:0 }}>{result.analysis_summary}</p>
              </div>

              {result.trading_strategy && (
                <div style={{ padding:'14px 16px', borderRadius:12, background:'rgba(52,211,153,.07)', border:'1px solid rgba(52,211,153,.2)' }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#34d399', marginBottom:7 }}>Trading Strategy</div>
                  <p style={{ fontSize:13, color: dark?'#d1d5db':'#374151', lineHeight:1.68, margin:0 }}>{result.trading_strategy}</p>
                </div>
              )}
            </div>
          </SCard>

        </div>
      </div>
    </motion.div>
  );
}