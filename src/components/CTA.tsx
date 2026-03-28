import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          className="relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-gray-100/80 dark:from-white/10 to-transparent border border-border-light dark:border-white/10 backdrop-blur-xl overflow-hidden">

          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/10 blur-[100px] -z-10" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-text-light dark:text-white mb-4 sm:mb-6">
            Ready to Enter the <span className="text-cyan-400">QuantumByte?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
            Let's build something extraordinary together. Schedule a
            consultation and discover what's possible.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full text-white font-bold text-base sm:text-lg md:text-xl shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,0,255,0.6)] transition-shadow flex items-center gap-2 sm:gap-3 mx-auto">

            Start Project <ArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </section>);

}