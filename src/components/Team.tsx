import React from "react";
import { Linkedin, Twitter, Sparkles } from "lucide-react";

// CSS animations
const styleSheet = `
@keyframes team-orbit {
  from { transform: rotate(var(--start-angle)); }
  to { transform: rotate(calc(var(--start-angle) + 360deg)); }
}
@keyframes team-counter-rotate {
  from { transform: rotate(calc(var(--start-angle) * -1)); }
  to { transform: rotate(calc((var(--start-angle) + 360deg) * -1)); }
}
.orbit-item {
  animation: team-orbit var(--speed) linear infinite;
  will-change: transform;
}
.counter-rotate-item {
  animation: team-counter-rotate var(--speed) linear infinite;
  will-change: transform;
}
`;

const teamMembers = [
  { name: "Naveed Sarwar", role: "CEO Techloset", image: "https://i.pravatar.cc/150?img=11", radius: 420, startAngle: "0deg", speed: "40s", socials: { linkedin: "#", twitter: "#" } },
  { name: "Aroona Tariq", role: "COO Techloset", image: "https://i.pravatar.cc/150?img=47", radius: 420, startAngle: "120deg", speed: "45s", socials: { linkedin: "#", twitter: "#" } },
  { name: "Umair Arshad", role: "CTO Techloset", image: "https://i.pravatar.cc/150?img=33", radius: 420, startAngle: "240deg", speed: "50s", socials: { linkedin: "#", twitter: "#" } },
  { name: "Senior Engineer", role: "Core Team", image: "https://i.pravatar.cc/150?img=14", radius: 300, startAngle: "90deg", speed: "35s", socials: { linkedin: "#", twitter: "#" } },
  { name: "Product Designer", role: "UI / UX", image: "https://i.pravatar.cc/150?img=25", radius: 300, startAngle: "270deg", speed: "38s", socials: { linkedin: "#", twitter: "#" } },
  { name: "Backend Lead", role: "APIs & Systems", image: "https://i.pravatar.cc/150?img=9", radius: 180, startAngle: "0deg", speed: "30s", socials: { linkedin: "#", twitter: "#" } },
];

export function Team() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent transition-colors duration-0">
      <style>{styleSheet}</style>

      {/* ORBIT RINGS */}
      <svg className="absolute w-[1200px] h-[1200px] pointer-events-none" viewBox="0 0 1200 1200" fill="none">
        <circle cx="600" cy="600" r="420" stroke="currentColor" className="text-cyan-700/30 dark:text-cyan-500/20" strokeWidth="2" />
        <circle cx="600" cy="600" r="300" stroke="currentColor" className="text-cyan-700/30 dark:text-cyan-500/20" strokeWidth="2" />
        <circle cx="600" cy="600" r="180" stroke="currentColor" className="text-cyan-700/20 dark:text-cyan-500/10" strokeWidth="2" />
      </svg>

      {/* CENTER CORE */}
      <div className="relative z-50 flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-cyan-400 rounded-full opacity-60 animate-[spin_20s_linear_infinite]" />
          <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-slate-800 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center border border-cyan-100 dark:border-cyan-400 transition-colors duration-0">
            <Sparkles className="text-cyan-500 w-6 h-6 mb-1 animate-bounce" />
            <span className="text-[10px] font-black text-gray-800 dark:text-white tracking-widest text-center leading-none">
              Quantum<br />Byte
            </span>
          </div>
        </div>
      </div>

      {/* ORBITING MEMBERS */}
      <div className="absolute inset-0 flex items-center justify-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="absolute orbit-item flex flex-col items-center"
            style={{
              width: 0,
              height: 0,
              transformOrigin: "center center",
              "--start-angle": member.startAngle,
              "--speed": member.speed,
            } as any}
          >
            <div
              style={{ transform: `translate(-50%, -50%) translateY(-${member.radius}px)` }}
              className="relative group"
            >
              <div className="counter-rotate-item flex flex-col items-center" style={{ "--start-angle": member.startAngle, "--speed": member.speed } as any}>
                
                {/* Social Icons */}
                <div className="absolute -top-12 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                  <a href={member.socials.linkedin} className="p-1.5 bg-blue-600 rounded-full text-white hover:scale-110 shadow-lg"><Linkedin size={14} /></a>
                  <a href={member.socials.twitter} className="p-1.5 bg-black rounded-full text-white hover:scale-110 shadow-lg"><Twitter size={14} /></a>
                </div>

                {/* Profile Image */}
                <div className="relative p-1 rounded-full border-2 border-cyan-700/70 dark:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-white/10 dark:bg-white/5 transition-colors duration-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer object-cover border-2 border-cyan-700/70 dark:border-cyan-400 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Name & Role */}
                <div className="mt-3 text-center transition-colors duration-0">
                  <h4 className="text-[10px] md:text-xs font-black text-gray-800 dark:text-white whitespace-nowrap uppercase tracking-tight">
                    {member.name}
                  </h4>
                  <p className="text-[8px] md:text-[9px] text-cyan-600 dark:text-cyan-400 font-bold whitespace-nowrap uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
