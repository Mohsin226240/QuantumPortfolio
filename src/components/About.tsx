import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Globe } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function LaptopModel() {
  const { scene } = useGLTF('/models/laptop.glb');

  return (
    <primitive
      object={scene}
      scale={0.7}                 // adjust size if needed
      position={[0.7, -1, 0]}
      rotation={[0, -Math.PI / 6, 0]}
    />
  );
}

export function About() {
  const features = [
    {
      icon: Layers,
      title: 'Deep Tech Stack',
      desc: 'Crafting interactive web experiences with WebGL and React. We specialize in web & mobile apps, API integration, WordPress development, UI/UX design, and seamless deployment.'
    },
    {
      icon: Zap,
      title: 'Performance First',
      desc: 'Fast, efficient, and visually striking — web experiences designed for performance without compromise.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      desc: 'Connecting with clients worldwide, delivering digital solutions across the web’s ever-expanding multiverse.'
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">
              Crafting the <span className="text-magenta-500">Impossible</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              We are a collective of digital artisans, creative technologists, and strategic thinkers. At QuantumByte, where art meets code, we redefine what’s possible on the web.
            </p>

            <div className="space-y-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-cyan-400">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-text-light dark:text-white font-bold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Laptop Model — NO BOX, NO CONTAINER */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden"
          >
            <Canvas
              camera={{ position: [0, 1.5, 5], fov: 50 }}
              gl={{ alpha: true }}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={4.2} />

              <Suspense fallback={null}>
                <LaptopModel />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
              />
            </Canvas>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
