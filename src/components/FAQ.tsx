import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
const faqs = [
{
  question: 'What is your typical project timeline?',
  answer:
  'Our projects typically range from 4-12 weeks depending on complexity. We follow a sprint-based agile methodology to ensure consistent progress and transparency.'
},
{
  question: 'Do you work with startups or enterprise clients?',
  answer:
  'We work with ambitious companies of all sizes. From seed-stage startups needing a full brand identity to Fortune 500s requiring complex enterprise software.'
},
{
  question: 'What technologies do you specialize in?',
  answer:
  'We are experts in the modern React ecosystem (Next.js, Remix), WebGL/Three.js for 3D experiences, and scalable backend solutions using Node.js and Python.'
},
{
  question: 'Do you provide post-launch support?',
  answer:
  'Absolutely. We offer comprehensive maintenance packages to ensure your digital product remains secure, performant, and up-to-date with the latest technologies.'
},
{
  question: 'How do you handle project management?',
  answer:
  'We use a transparent, collaborative approach with tools like Linear and Slack. You will have direct access to the team and weekly progress updates.'
}];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-light dark:text-white mb-6">
            Common <span className="text-cyan-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) =>
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
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-cyan-500/50 bg-gray-100 dark:bg-white/5' : 'border-border-light dark:border-white/10 bg-transparent hover:border-gray-300 dark:hover:border-white/20'}`}>

              <button
              onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full p-4 sm:p-5 md:p-6 flex justify-between items-center text-left gap-3">

                <span
                className={`text-base sm:text-lg md:text-xl font-medium ${activeIndex === index ? 'text-text-light dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>

                  {faq.question}
                </span>
                <div
                className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${activeIndex === index ? 'bg-cyan-500 text-black' : 'bg-gray-200 dark:bg-white/10 text-text-light dark:text-white'}`}>

                  {activeIndex === index ?
                <Minus className="w-4 h-4" /> :

                <Plus className="w-4 h-4" />
                }
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index &&
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  height: 'auto',
                  opacity: 1
                }}
                exit={{
                  height: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 0.3
                }}>

                    <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-border-light dark:border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}