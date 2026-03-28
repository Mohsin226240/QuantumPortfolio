import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
const steps = [
{
  id: '01',
  title: 'Discovery',
  desc: 'We dive deep into your brand, goals, and audience to build a solid foundation.',
  icon: Search,
  color: 'from-blue-500 to-cyan-500'
},
{
  id: '02',
  title: 'Design',
  desc: 'Crafting visual systems and interfaces that captivate and communicate.',
  icon: PenTool,
  color: 'from-cyan-500 to-teal-500'
},
{
  id: '03',
  title: 'Development',
  desc: 'Writing clean, scalable code to bring the vision to life with high performance.',
  icon: Code2,
  color: 'from-teal-500 to-green-500'
},
{
  id: '04',
  title: 'Launch',
  desc: 'Testing, optimizing, and deploying your digital product to the world.',
  icon: Rocket,
  color: 'from-green-500 to-emerald-500'
}];

export function Process() {
  return (
    <section className="py-40  relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-text-light dark:text-white">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Process
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-white/10 -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((step, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.2
              }}
              className="relative group">

                <div className="mb-8 relative z-10 flex justify-center">
                  <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] transform rotate-45 group-hover:rotate-0 transition-transform duration-500`}>

                    <div className="w-full h-full bg-background-light dark:bg-black rounded-2xl flex items-center justify-center backdrop-blur-xl">
                      <step.icon className="w-8 h-8 text-text-light dark:text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 text-6xl font-bold text-gray-200 dark:text-white/5 select-none">
                    {step.id}
                  </div>
                </div>

                <div className="text-center relative z-10 bg-background-light/50 dark:bg-black/50 backdrop-blur-sm p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-text-light dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

}