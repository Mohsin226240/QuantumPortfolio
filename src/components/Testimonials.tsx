import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
const testimonials = [
{
  name: 'Sarah Chen',
  role: 'CTO, TechFlow',
  quote:
  "The team at QuantumByte Agency didn't just build a website, they created an experience. Our conversion rates doubled overnight.",
  image:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
},
{
  name: 'Marcus Thorne',
  role: 'Founder, Nexus',
  quote:
  'Exceptional attention to detail. The 3D implementations are smooth and performant. Truly world-class engineering.',
  image:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
},
{
  name: 'Elena Rodriguez',
  role: 'Director, ArtSpace',
  quote:
  'They perfectly captured our vision for a digital-first gallery. The aesthetic is exactly what we needed to stand out.',
  image:
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
}];

export function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) =>
          <motion.div
            key={index}
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
            transition={{
              delay: index * 0.2
            }}
            className="relative p-8 rounded-2xl bg-gray-100 dark:bg-white/5 border border-border-light dark:border-white/10 backdrop-blur-md">

              <Quote className="w-10 h-10 text-cyan-500/20 mb-6" />
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">"{t.quote}"</p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 blur-sm" />
                  <img
                  src={t.image}
                  alt={t.name}
                  className="relative w-12 h-12 rounded-full object-cover border-2 border-background-light dark:border-black" />

                </div>
                <div>
                  <h4 className="text-text-light dark:text-white font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}