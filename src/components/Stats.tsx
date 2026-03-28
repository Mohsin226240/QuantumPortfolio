import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const stats = [
{
  value: 150,
  label: 'Projects Delivered',
  suffix: '+'
},
{
  value: 98,
  label: 'Client Satisfaction',
  suffix: '%'
},
{
  value: 12,
  label: 'Design Awards',
  suffix: ''
},
{
  value: 5,
  label: 'Years Experience',
  suffix: '+'
}];

function Counter({ value, suffix }: {value: number;suffix: string;}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  return (
    <div ref={ref} className="flex items-baseline justify-center">
      <motion.span
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={
        isInView ?
        {
          opacity: 1,
          y: 0
        } :
        {}
        }
        transition={{
          duration: 0.5
        }}
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-text-light dark:from-white to-gray-500">

        {isInView ? value : 0}
      </motion.span>
      <span className="text-3xl text-cyan-400 ml-1">{suffix}</span>
    </div>);

}
export function Stats() {
  return (
    <section className="py-20 border-y border-border-light dark:border-white/10 bg-gray-100 dark:bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) =>
          <div key={index} className="text-center">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-600 dark:text-gray-500 mt-2 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}