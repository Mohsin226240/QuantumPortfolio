import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Shield, Users } from 'lucide-react';
const features = [
{
  icon: Award,
  title: 'Award Winning',
  desc: 'Recognized by industry leaders for design excellence.'
},
{
  icon: Clock,
  title: 'Fast Delivery',
  desc: 'Rapid prototyping and agile development cycles.'
},
{
  icon: Shield,
  title: 'Secure Code',
  desc: 'Enterprise-grade security built into every project.'
},
{
  icon: Users,
  title: 'User Centric',
  desc: 'Data-driven design decisions based on user behavior.'
}];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white/5 border-y border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1
            }}
            className="flex flex-col items-center text-center group">

              <div className="mb-6 p-4 rounded-full bg-black border border-white/10 group-hover:border-magenta-500/50 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]">
                <feature.icon className="w-8 h-8 text-gray-400 group-hover:text-magenta-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}