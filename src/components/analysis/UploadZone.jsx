import React, { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Upload, Camera, Image as ImageIcon, Smartphone } from "lucide-react";
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

function DropZone({ active, hovered, onEnter, onLeave, onDrag, onDrop, onClick, dark, accentColor, gradBg, icon: Icon, title, subtitle, btnLabel, btnIcon: BtnIcon, hint, onBtnClick }) {
  const border = (active || hovered) ? `2px dashed ${accentColor}` : '2px dashed rgba(245,166,35,.2)';
  const bg     = (active || hovered) ? `${accentColor}0d` : (dark ? 'rgba(255,255,255,.02)' : 'rgba(255,255,255,.5)');
  const shadow = (active || hovered) ? `0 14px 36px ${accentColor}22` : 'none';
  const tx = dark ? '#F9F5E8' : '#111';
  const mu = dark ? '#9ca3af' : '#6b7280';

  return (
    <motion.div
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag} onDrop={onDrop}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type:'spring', stiffness:280, damping:22 }}
      style={{ position:'relative', borderRadius:18, padding:'36px 24px 28px', textAlign:'center', cursor:'pointer', border, background:bg, boxShadow:shadow, transition:'border-color .2s, background .2s, box-shadow .2s' }}
    >
      {/* Icon */}
      <div style={{ width:72, height:72, borderRadius:20, background:gradBg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:`0 8px 24px ${accentColor}44` }}>
        <Icon size={30} style={{ color: accentColor === '#F5A623' ? '#1a1500' : '#fff' }} />
      </div>

      <h3 style={{ fontSize:17, fontWeight:800, color:tx, marginBottom:8 }}>{title}</h3>
      <p style={{ fontSize:12, color:mu, lineHeight:1.65, marginBottom:22 }}>{subtitle}</p>

      <motion.button
        whileHover={{ y:-2, boxShadow:`0 10px 26px ${accentColor}55` }}
        whileTap={{ y:0, scale:.97 }}
        onClick={(e) => { e.stopPropagation(); onBtnClick(); }}
        style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:13, fontWeight:700, padding:'9px 20px', borderRadius:10, border:'none', background:gradBg, color: accentColor === '#F5A623' ? '#1a1500' : '#fff', cursor:'pointer', boxShadow:`0 4px 16px ${accentColor}38` }}
      >
        <BtnIcon size={14} />{btnLabel}
      </motion.button>

      <p style={{ fontSize:11, color:mu, marginTop:14, opacity:.65 }}>{hint}</p>
    </motion.div>
  );
}

export default function UploadZone({ onFileUpload }) {
  const { t } = useTranslation(['dashboard']);
  const dark = useDark();
  const [dragActive, setDragActive] = useState(false);
  const [hovUpload, setHovUpload] = useState(false);
  const [hovCamera, setHovCamera] = useState(false);
  const fileInputRef   = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    const files = [...e.dataTransfer.files];
    if (files.length > 0) onFileUpload(files[0]);
  };

  const handleFileSelect = (e) => {
    const files = [...e.target.files];
    if (files.length > 0) onFileUpload(files[0]);
  };

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4 }}>
      <div style={{ position:'relative', borderRadius:20, overflow:'hidden', border:'1px solid rgba(245,166,35,.18)', background: dark ? '#141209' : '#FFFDF5', padding:12 }}>
        {/* top shimmer */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(245,166,35,.55),transparent)' }} />

        <input ref={fileInputRef}   type="file" accept="image/*"                    onChange={handleFileSelect} style={{ display:'none' }} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileSelect} style={{ display:'none' }} />

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12 }}>
          <DropZone
            active={dragActive} hovered={hovUpload}
            onEnter={() => setHovUpload(true)} onLeave={() => setHovUpload(false)}
            onDrag={handleDrag} onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onBtnClick={() => fileInputRef.current?.click()}
            dark={dark}
            accentColor="#F5A623"
            gradBg="linear-gradient(135deg,#F5A623,#FFCF6B)"
            icon={Upload}
            title={t('uploadZone.dragDropChart',   { ns:'dashboard' })}
            subtitle={t('uploadZone.dropChartHere', { ns:'dashboard' })}
            btnLabel={t('uploadZone.browseFiles',   { ns:'dashboard' })}
            btnIcon={ImageIcon}
            hint={t('uploadZone.supportedFormats',  { ns:'dashboard' })}
          />

          <DropZone
            active={false} hovered={hovCamera}
            onEnter={() => setHovCamera(true)} onLeave={() => setHovCamera(false)}
            onDrag={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()}
            onClick={() => cameraInputRef.current?.click()}
            onBtnClick={() => cameraInputRef.current?.click()}
            dark={dark}
            accentColor="#a78bfa"
            gradBg="linear-gradient(135deg,#a78bfa,#c4b5fd)"
            icon={Camera}
            title={t('uploadZone.useCamera',       { ns:'dashboard' })}
            subtitle={t('uploadZone.takePhoto',     { ns:'dashboard' })}
            btnLabel={t('uploadZone.openCamera',    { ns:'dashboard' })}
            btnIcon={Smartphone}
            hint={t('uploadZone.perfectForMobile', { ns:'dashboard' })}
          />
        </div>
      </div>
    </motion.div>
  );
}