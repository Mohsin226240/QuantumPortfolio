import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

function useDark() {
  const [d, setD] = React.useState(
    () => document.documentElement.dataset.theme === 'dark' ||
      document.documentElement.classList.contains('dark')
  );
  React.useEffect(() => {
    const o = new MutationObserver(() =>
      setD(
        document.documentElement.dataset.theme === 'dark' ||
        document.documentElement.classList.contains('dark')
      )
    );
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => o.disconnect();
  }, []);
  return d;
}

const COLORS = {
  orange: { clr: '#F5A623', clr2: '#FFCF6B', glow: 'rgba(245,166,35,0.18)', bg: 'rgba(245,166,35,0.1)' },
  green: { clr: '#34d399', clr2: '#6ee7b7', glow: 'rgba(52,211,153,0.16)', bg: 'rgba(52,211,153,0.1)' },
  blue: { clr: '#60a5fa', clr2: '#93c5fd', glow: 'rgba(96,165,250,0.14)', bg: 'rgba(96,165,250,0.1)' },
  slate: { clr: '#F97316', clr2: '#FB923C', glow: 'rgba(249,115,22,0.14)', bg: 'rgba(249,115,22,0.1)' },
};

export default function StatsCard({ title, value, icon: Icon, color, trend }) {
  const dark = useDark();
  const c = COLORS[color] || COLORS.orange;
  const [hovered, setHovered] = useState(false);

  // Restore EXACT original height/width behavior and position
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{
        position: 'relative',
        borderRadius: 16, // Original border radius
        border: '1px solid rgba(245,166,35,.18)', // Original border
        background: dark ? '#141209' : '#FFFDF5', // Original background
        cursor: 'default',
        padding: '20px', // Original internal padding
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden', // Required for shimmer lines/glows
        boxShadow: hovered
          ? `0 12px 30px ${c.glow}`
          : (dark ? 'none' : '0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)'),
        transition: 'box-shadow 0.3s ease, background 0.3s ease',
      }}
    >
      {/* Shimmer top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${c.clr}, transparent)`
          : 'linear-gradient(90deg, transparent, rgba(245,166,35,0.45), transparent)',
        transition: 'background 0.3s',
      }} />

      {/* Glow corner orb */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Card Content (Same layout as before) */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          {/* icon bubble */}
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${c.clr}18`,
          }}>
            <Icon size={18} style={{ color: c.clr, filter: hovered ? `drop-shadow(0 0 5px ${c.clr}66)` : 'none' }} />
          </div>

          {/* trend badge */}
          {trend && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 3,
              fontSize: 11, fontWeight: 600,
              padding: '3px 8px', borderRadius: 20,
              background: 'rgba(52,211,153,.1)', color: '#34d399'
            }}>
              <TrendingUp size={10} /> {trend}
            </div>
          )}
        </div>

        <div style={{
          fontSize: 26, fontWeight: 800,
          marginBottom: 3,
          color: hovered ? c.clr : (dark ? '#F9F5E8' : '#111'),
          background: hovered ? `linear-gradient(135deg, ${c.clr}, ${c.clr2})` : 'none',
          WebkitBackgroundClip: hovered ? 'text' : 'none',
          WebkitTextFillColor: hovered ? 'transparent' : 'initial',
          transition: 'color 0.3s ease'
        }}>
          {value}
        </div>

        <div style={{ fontSize: 12, fontWeight: 500, color: dark ? '#9ca3af' : '#6b7280' }}>
          {title}
        </div>

        {/* bottom accent bar */}
        <div style={{ marginTop: 14, height: 3, borderRadius: 4, background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: hovered ? '100%' : '35%' }}
            transition={{ duration: 0.5 }}
            style={{
              height: '100%',
              borderRadius: 4,
              background: `linear-gradient(90deg, ${c.clr}, ${c.clr2})`,
              boxShadow: hovered ? `0 0 8px ${c.clr}44` : 'none',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}