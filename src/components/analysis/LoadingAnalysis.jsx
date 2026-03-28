import React from "react";
import { Brain } from "lucide-react";
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

const STEPS = [
  { label: "Trend Analysis",      delay: 0    },
  { label: "Support/Resistance",  delay: 0.5  },
  { label: "Entry Points",        delay: 1.0  },
  { label: "Risk Management",     delay: 1.5  },
];

export default function LoadingAnalysis() {
  const dark = useDark();
  const tx = dark ? '#F9F5E8' : '#111';
  const mu = dark ? '#9ca3af' : '#6b7280';

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
      <div style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        border: '1px solid rgba(245,166,35,.22)',
        background: dark ? '#141209' : '#FFFDF5',
        padding: '48px 32px 44px', textAlign: 'center',
      }}>
        {/* Top shimmer */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(245,166,35,.6),transparent)' }} />
        {/* Ambient orb */}
        <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,166,35,.09) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Spinning rings + brain */}
          <div style={{ position:'relative', width:84, height:84, margin:'0 auto 32px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2.5px solid transparent', borderTopColor:'#F5A623', borderRightColor:'rgba(245,166,35,.3)' }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
              style={{ position:'absolute', inset:7, borderRadius:'50%', border:'2px solid transparent', borderBottomColor:'rgba(245,166,35,.45)', borderLeftColor:'rgba(245,166,35,.15)' }} />
            <div style={{ position:'absolute', inset:16, borderRadius:'50%', background:'linear-gradient(135deg,#F5A623,#FFCF6B)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 22px rgba(245,166,35,.55)' }}>
              <Brain size={22} style={{ color:'#1a1500' }} />
            </div>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 800, color: tx, marginBottom: 8 }}>Analyzing Your Chart</h3>
          <p style={{ fontSize: 13, color: mu, lineHeight: 1.65, maxWidth: 400, margin: '0 auto 36px' }}>
            Our AI is examining technical patterns, support/resistance levels, and market signals...
          </p>

          {/* Step pills — 2x2 grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, maxWidth:440, margin:'0 auto 32px' }}>
            {STEPS.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0.25 }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:12, border:'1px solid rgba(245,166,35,.22)', background:'rgba(245,166,35,.07)', fontSize:12, fontWeight:600, color:'#F5A623' }}
              >
                <motion.div animate={{ scale:[1,1.4,1] }} transition={{ duration:2, repeat:Infinity, delay:s.delay }}
                  style={{ width:7, height:7, borderRadius:'50%', background:'#F5A623', boxShadow:'0 0 7px rgba(245,166,35,.75)', flexShrink:0 }} />
                {s.label}
              </motion.div>
            ))}
          </div>

          {/* Scanning progress bar */}
          <div style={{ height:3, borderRadius:4, background:'rgba(245,166,35,.1)', overflow:'hidden', maxWidth:320, margin:'0 auto' }}>
            <motion.div
              animate={{ x:['-100%','200%'] }}
              transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
              style={{ width:'45%', height:'100%', borderRadius:4, background:'linear-gradient(90deg,transparent,#F5A623,#FFCF6B,transparent)' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}