import React from "react";
import { ShieldCheck, Trophy, Star, Globe, CheckCircle2 } from "lucide-react";

// CSS for Hardware Accelerated Floating (Pure CSS for performance)
const floatingAnimation = `
@keyframes smoothFloat {
  0%, 100% { transform: translateY(0px) translateZ(0); }
  50% { transform: translateY(-25px) translateZ(0); }
}
.animate-card-float {
  animation: smoothFloat 5s ease-in-out infinite;
  will-change: transform;
}
`;

const awards = [
  {
    id: 1,
    title: "Best Tech Solution 2025",
    org: "Global Innovation Summit",
    desc: "Recognized for excellence in AI-driven architecture and scalable cloud solutions.",
    date: "Dec 2025",
    icon: <Trophy className="text-amber-400" size={32} />,
    accent: "bg-amber-500",
    delay: "0s",
    tag: "Winner"
  },
  {
    id: 2,
    title: "Top Rated Agency",
    org: "Clutch & Upwork",
    desc: "Maintained a 99% job success score with over 500+ successful project deliveries.",
    date: "2024-2026",
    icon: <Star className="text-cyan-400" size={30} />,
    accent: "bg-cyan-500",
    delay: "1.2s",
    tag: "Elite"
  },
  {
    id: 3,
    title: "ISO 27001 Certified",
    org: "Data Security Standard",
    desc: "Global standard for managing information security and data privacy protocols.",
    date: "Jan 2026",
    icon: <ShieldCheck className="text-emerald-400" size={30} />,
    accent: "bg-emerald-500",
    delay: "0.6s",
    tag: "Verified"
  },
  {
    id: 4,
    title: "AWS Experts",
    org: "Amazon Web Services",
    desc: "Advanced tier partnership status for cloud infrastructure and serverless computing.",
    date: "Oct 2025",
    icon: <Globe className="text-indigo-400" size={32} />,
    accent: "bg-indigo-500",
    delay: "2s",
    tag: "Certified"
  }
];

export function AwardsSection() {
  return (
    <section className="relative w-full py-24 px-6 bg-transparent overflow-hidden">
      <style>{floatingAnimation}</style>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header - No Transitions for Instant Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <span className="text-cyan-500 font-bold tracking-[0.4em] uppercase text-sm mb-4 block italic">Our Milestones</span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] md:leading-[0.85]">
             AWARDS & <br />
             <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
             RECOGNITIONS
            </span>
            </h2>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-slate-400 border-l border-slate-200 dark:border-white/10 pl-8 h-fit">
            <span className="text-4xl font-black text-cyan-500">4+</span>
            <p className="text-xs uppercase tracking-widest font-bold leading-relaxed">Verified<br/>Milestones</p>
          </div>
        </div>

        {/* Optimized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((item) => (
            <div 
              key={item.id} 
              className="animate-card-float group relative" 
              style={{ animationDelay: item.delay }}
            >
              {/* Neon Glow (Only on Hover) */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-transparent group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] border-2 border-transparent group-hover:border-cyan-400/60 transition-all duration-150 pointer-events-none" />
              
              {/* Main Card - Transitions removed for instant theme switching */}
              <div className="relative h-[460px] w-full rounded-[2.4rem] bg-white dark:bg-[#0f0f0ff5] border border-slate-200 dark:border-white/5 p-8 flex flex-col justify-between overflow-hidden shadow-xl group-hover:border-cyan-400/50 transition-shadow duration-150">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative z-10 flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/10 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-200">
                    {item.icon}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[9px] font-bold uppercase tracking-wider border border-cyan-500/20">
                    {item.tag}
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                      <div className={`w-8 h-[2px] ${item.accent} rounded-full`} />
                      <span className="text-[10px] font-bold text-slate-400 tracking-widest">{item.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-cyan-500 transition-colors duration-150">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    {item.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {item.org}
                  </p>
                </div>

                {/* Simplified Watermark */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.04] dark:opacity-[0.08] group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                   {React.cloneElement(item.icon, { size: 120 })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}