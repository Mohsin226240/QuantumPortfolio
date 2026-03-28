import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Zap, Box, Globe, Cpu, Sparkles, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ---------------- COMPLETE 8 PROJECTS DATA ---------------- */
export const projects = [
  {
    title: "Platinum Edge",
    desc: "Real-time business intelligence and data tracking dashboard.",
    image: "/projects/1.png",
    bgColor: "bg-[#FF7D29]",
    textColor: "text-white",
    icon: <Activity size={20} />,
    live: "https://platinum-edge.ca",
    customPosition: "center 5%" 
  },
  {
    title: "Prop Capitals",
    desc: "Premium prop firm management and trader evaluation platform.",
    image: "/projects/2.jfif",
    bgColor: "bg-white",
    textColor: "text-black",
    icon: <Zap size={20} />,
    live: "https://prop-capitals.com"
  },
  {
    title: "NovixPay",
    desc: "Secure payment ecosystem for global digital transactions.",
    image: "/projects/3.png",
    bgColor: "bg-[#00A63E]",
    textColor: "text-white",
    icon: <Box size={20} />,
    live: "https://novixpay.com"
  },
  {
    title: "Elite Fusion",
    desc: "Social trading platform with live signals and education.",
    image: "/projects/4.jfif",
    bgColor: "bg-[#FF5F5F]",
    textColor: "text-white",
    icon: <Globe size={20} />,
    live: "https://elitefusiontrading.com"
  },
  {
    title: "Propel Capital",
    desc: "Strategic asset management and capital growth tracking.",
    image: "/projects/5.jfif",
    bgColor: "bg-[#B4E4D4]",
    textColor: "text-slate-800",
    icon: <Cpu size={20} />,
    live: "https://propel-capital.com"
  },
  {
    title: "VisionScope AI",
    desc: "Deep-fake detection and content authenticity analysis.",
    image: "/projects/6.jfif",
    bgColor: "bg-[#6366f1]",
    textColor: "text-white",
    icon: <Sparkles size={20} />,
    live: "https://visionscopeai.com",
    customPosition: "center 10%" 
  },
  {
    title: "Resumas",
    desc: "Automated ATS-friendly resume generation and optimization.",
    image: "/projects/7.jfif",
    bgColor: "bg-[#0ea5e9]",
    textColor: "text-white",
    icon: <Layers size={20} />,
    live: "https://resumas.com"
  },
  {
    title: "Trittiko Block",
    desc: "Decentralized messaging and secure team collaboration.",
    image: "/projects/8.png",
    bgColor: "bg-[#10b981]",
    textColor: "text-white",
    icon: <Activity size={20} />,
    live: "https://trittikoblock.com"
  }
];

const scrollingProjects = [...projects, ...projects];

/* ---------------- CARD COMPONENT ---------------- */
function ProjectCard({ project }) {
  return (
    <motion.div
      className="relative py-8 sm:py-12 md:py-20 px-3 sm:px-5 flex-shrink-0"
      whileHover={{ y: -15, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      {/* 1. Removed <a> tag, added <div> with cursor-text */}
      <div
        className={`relative h-[380px] sm:h-[420px] md:h-[480px] w-[240px] sm:w-[270px] md:w-[300px] ${project.bgColor} rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-7 flex flex-col overflow-hidden cursor-text shadow-xl transition-shadow hover:shadow-2xl group`}
      >
        {/* Header Info */}
        <div className={`relative z-10 ${project.textColor}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/10 backdrop-blur-sm flex items-center justify-center">
              {project.icon}
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter leading-none">
              {project.title}
            </h3>
          </div>
          <p className="text-[13px] font-bold leading-snug opacity-80 line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Image Container */}
        <div className="mt-6 relative h-full w-full overflow-hidden rounded-2xl shadow-inner border border-black/5 bg-black/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ 
              objectPosition: project.customPosition ? project.customPosition : '15% top' 
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
        </div>

        {/* 2. Action Button (Optional: Isse bhi clickable nahi rakha, bss design k liye hai) */}
        <div className={`absolute top-6 right-6 p-2 rounded-full border transition-all duration-300 
          ${project.textColor === 'text-white' 
            ? 'border-white/20 group-hover:bg-white group-hover:text-black' 
            : 'border-black/10 group-hover:bg-black group-hover:text-white'}`}
        >
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- MAIN PORTFOLIO SECTION ---------------- */
export function Portfolio() {
  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 overflow-hidden min-h-[50vh] md:min-h-screen flex flex-col justify-center items-center">

      <div className="text-center mb-6 sm:mb-10 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-12 h-[1px] bg-cyan-400/50" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.5em]">Work Showcase</span>
          </div>
          <span className="w-12 h-[1px] bg-cyan-400/50" />
        </div>

        <h2 className="text-text-light dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight uppercase">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Projects</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            x: { 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 50, 
              ease: "linear" 
            } 
          }}
        >
          {scrollingProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-background-light dark:from-[#05060A] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-background-light dark:from-[#05060A] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Ye button abhi bhi clickable hai taake log sare projects dekh saken */}
      <div className="mt-8 sm:mt-10 md:mt-14 relative z-20 px-4">
        <Link
          to="/projects"
          className="relative px-10 py-4 bg-transparent border border-text-light/20 dark:border-white/20 rounded-full text-text-light dark:text-white font-bold text-sm uppercase tracking-widest transition-all duration-500 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] group overflow-hidden inline-block"
        >
          <span className="relative flex items-center gap-2">
            Explore Full Portfolio
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}