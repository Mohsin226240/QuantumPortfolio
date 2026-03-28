import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Cpu,
  Layers,
  Activity,
  Box,
  Globe,
  X,
  Code2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { ParticleBackground } from "../components/ParticleBackground";

/* ---------------- PROJECT DATA ---------------- */
const projects = [
  {
    title: "Platinum Edge",
    caption: "Analytics & BI",
    desc: "Real-time business intelligence and data tracking dashboard.",
    about: "A comprehensive solution for tracking enterprise-level metrics and financial growth with precision.",
    tech: ["React", "D3.js", "Node.js"],
    images: ["/projects/1.png"],
    live: "https://platinum-edge.ca",
    icon: Activity,
    accent: "from-[#FF7D29] to-[#FFB382]"
  },
  {
    title: "Prop Capitals",
    caption: "Trading Portal",
    desc: "Premium prop firm management and trader evaluation platform.",
    about: "Helping trading firms manage accounts, track risk, and automate payout systems effectively.",
    tech: ["Next.js", "PostgreSQL", "Tailwind"],
    images: ["/projects/2.jfif"],
    live: "https://prop-capitals.com",
    icon: Zap,
    accent: "from-blue-500 to-cyan-400"
  },
  {
    title: "NovixPay",
    caption: "Fintech Gateway",
    desc: "Secure payment ecosystem for global digital transactions.",
    about: "A robust payment gateway designed to handle high-volume transactions with end-to-end encryption.",
    tech: ["React", "Express", "MongoDB"],
    images: ["/projects/3.png"],
    live: "https://novixpay.com",
    icon: Box,
    accent: "from-[#00A63E] to-[#4ade80]"
  },
  {
    title: "Elite Fusion",
    caption: "Trading Community",
    desc: "Social trading platform with live signals and education.",
    about: "Connecting traders globally to share insights, signals, and educational resources in real-time.",
    tech: ["React", "Firebase", "Socket.IO"],
    images: ["/projects/4.jfif"],
    live: "https://elitefusiontrading.com",
    icon: Globe,
    accent: "from-red-500 to-orange-400"
  },
  {
    title: "Propel Capital",
    caption: "Investment Management",
    desc: "Strategic asset management and capital growth tracking.",
    about: "A platform focused on portfolio optimization and strategic capital allocation for investors.",
    tech: ["React", "Node.js", "PostgreSQL"],
    images: ["/projects/5.jfif"],
    live: "https://propel-capital.com",
    icon: Cpu,
    accent: "from-purple-500 to-pink-400"
  },
  {
    title: "VisionScope AI",
    caption: "AI Analysis Tool",
    desc: "Deep-fake detection and content authenticity analysis.",
    about: "Harnessing the power of AI to verify digital content and protect against synthetic media threats.",
    tech: ["Python", "React", "FastAPI"],
    images: ["/projects/6.jfif"],
    live: "https://visionscopeai.com",
    icon: Sparkles,
    accent: "from-indigo-600 to-blue-400"
  },
  {
    title: "Resumas",
    caption: "AI Career Builder",
    desc: "Automated ATS-friendly resume generation and optimization.",
    about: "Using AI to help professionals land interviews by building optimized, high-impact resumes.",
    tech: ["Next.js", "OpenAI", "Node.js"],
    images: ["/projects/7.jfif"],
    live: "https://resumas.com",
    icon: Layers,
    accent: "from-sky-500 to-indigo-400"
  },
  {
    title: "Trittiko Block",
    caption: "Web3/Chat Platform",
    desc: "Decentralized messaging and secure team collaboration.",
    about: "A cutting-edge communication platform prioritizing security and real-time developer collaboration.",
    tech: ["React", "Socket.IO", "Web3.js"],
    images: ["/projects/8.png"],
    live: "https://trittikoblock.com",
    icon: Activity,
    accent: "from-emerald-500 to-teal-400"
  }
];

/* ---------------- 3D PARALLAX CARD ---------------- */
function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -25; 
    const rotateY = (mouseX / (rect.width / 2)) * 25;

    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <div 
      className="relative h-[500px] w-full cursor-pointer"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotate({ x: 0, y: 0 }); setIsHovered(false); }}
      onClick={() => onOpen(project)}
    >
      <motion.div
        animate={{ 
          rotateX: rotate.x, 
          rotateY: rotate.y,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
        className="relative h-full w-full bg-white dark:bg-[#0d0f14] border border-black/10 dark:border-white/10 rounded-[2.5rem] shadow-xl dark:shadow-2xl overflow-hidden group transition-colors duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} 
          style={{ transform: "translateZ(1px)" }}
        />

        <div className="p-8 h-full flex flex-col relative" style={{ transformStyle: "preserve-3d" }}>
          
          <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(100px)" }}>
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.accent} shadow-xl`}>
              <Icon className="text-white" size={28} />
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-black/20 dark:text-white/30 tracking-[0.4em] uppercase">Project</span>
                <span className="text-black/60 dark:text-white/60 font-bold text-xs uppercase tracking-widest">{project.caption}</span>
            </div>
          </div>

          <div className="space-y-4" style={{ transform: "translateZ(70px)" }}>
            <h3 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter leading-none transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-[90%] transition-colors duration-500">
              {project.desc}
            </p>
          </div>

          <div 
            className="mt-auto relative h-52 w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/40 flex items-center justify-center p-4 shadow-inner"
            style={{ transform: "translateZ(40px)" }}
          >
            <img 
              src={project.images[0]} 
              alt={project.title} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-[#0d0f14] via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-black dark:text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Details <ArrowRight size={14} className="text-cyan-500" />
            </div>
          </div>
        </div>

        <div className={`absolute -inset-2 bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-3xl transition-opacity duration-500 -z-10`} />
      </motion.div>
    </div>
  );
}

/* ---------------- MODAL COMPONENT ---------------- */
function ProjectModal({ project, onClose }) {
  return (
    <motion.div 
      className="fixed inset-0 bg-white/80 dark:bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        className="max-w-6xl w-full bg-white dark:bg-[#0d0f14] border border-black/10 dark:border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-20 p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-all border border-black/5 dark:border-white/10">
          <X size={24} />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center order-2 lg:order-1">
             <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.accent} font-black tracking-[0.4em] uppercase text-xs mb-4 block`}>
               Case Study
             </span>
             <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-6 uppercase tracking-tighter leading-none">
                {project.title}
             </h2>
             <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed italic border-l-4 border-cyan-500 pl-6">
                "{project.about}"
             </p>
             <div className="flex flex-wrap gap-3 mb-12">
                {project.tech.map((t) => (
                  <span key={t} className="px-5 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-[10px] font-black text-black/70 dark:text-white/70 uppercase tracking-widest">
                    {t}
                  </span>
                ))}
             </div>
             <a 
               href={project.live} 
               target="_blank" 
               rel="noopener noreferrer"
               className={`flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-r ${project.accent} text-white rounded-2xl font-black text-sm tracking-widest transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95`}
             >
               <Globe size={20} /> EXPLORE PROJECT
             </a>
          </div>
          
          <div className="bg-gray-100 dark:bg-[#161922] p-8 flex items-center justify-center order-1 lg:order-2 relative group">
             <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-5`} />
             <img 
               src={project.images[0]} 
               className="rounded-2xl object-contain w-full h-full max-h-[500px] shadow-2xl transition-transform duration-700 group-hover:scale-105"
               alt="Showcase"
             />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
export default function ProjectPage() {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-slate-50 dark:bg-[#05060a] min-h-screen text-black dark:text-white overflow-x-hidden selection:bg-cyan-500 selection:text-white transition-colors duration-500">
      <ParticleBackground />

      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Updated Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
               <div className="w-16 h-[2px] bg-cyan-500" />
               <span className="text-cyan-600 dark:text-cyan-400 font-black tracking-[0.5em] uppercase text-[10px]">
                 Selected Repository
               </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase opacity-95">
              Digital<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600">
                Universe.
              </span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-end gap-4"
          >
             <p className="text-gray-500 dark:text-gray-500 font-mono text-right max-w-[250px] text-xs">
                // Deploying high-performance digital solutions with modern architecture.
             </p>
             <div className="p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-6">
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-black dark:text-white leading-none">08</span>
                   <span className="text-[8px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-widest">Active Builds</span>
                </div>
                <div className="w-[1px] h-8 bg-black/10 dark:bg-white/10" />
                <Code2 className="text-cyan-500" size={32} />
             </div>
          </motion.div>
        </div>

        {/* 3D Interactive Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProjectCard project={p} onOpen={setActive} />
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}