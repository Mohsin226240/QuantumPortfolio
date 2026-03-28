import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Cpu, Globe, Palette, Rocket, Smartphone } from 'lucide-react';

const services = [
  { icon: Globe, title: 'Web App Development', desc: 'Dynamic, scalable web applications tailored to your business.' },
  { icon: Cpu, title: 'API Integration', desc: 'Connecting apps and services with powerful API solutions.' },
  { icon: Smartphone, title: 'Mobile Apps (Android & iOS)', desc: 'Seamless, intuitive apps for both Android and iOS devices.' },
  { icon: Code, title: 'Wordpress Website', desc: 'Custom WordPress solutions tailored for your brand.' },
  { icon: Rocket, title: 'Website Deployment', desc: 'Crafting high-performance websites that engage & convert.' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Intuitive, user-friendly interfaces & experiences.' },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring for mouse tilt
  const mouseX = useSpring(x, { stiffness: 350, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 350, damping: 30 });

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border border-border-light dark:border-white/10 backdrop-blur-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group cursor-pointer"
      >
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="mb-6 inline-block p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:text-white group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300"
        >
          <service.icon className="w-8 h-8" />
        </div>

        <h3 style={{ transform: 'translateZ(25px)' }} className="text-2xl font-bold text-text-light dark:text-white mb-4">
          {service.title}
        </h3>
        <p style={{ transform: 'translateZ(15px)' }} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
          {service.desc}
        </p>

        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-lg" />
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold text-text-light dark:text-white mb-6"
          >
            Our <span className="text-cyan-400">Services</span>
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions engineered for the modern web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}