import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function HumanModel() {
  const { scene } = useGLTF('/models/human.glb'); // Make sure your model is in public/models

  return (
    <primitive
      object={scene}
      scale={12}           // Adjust size as needed
      position={[0, -0.9, 0]} // Centered
      rotation={[0, -Math.PI / 6, 0]} // Slight side view
    />
  );
}

export function Newsletter() {
  return (
    <section className="py-20 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Text & Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white mb-4">
              Stay in the Loop
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
              Subscribe to our newsletter for the latest insights on design,
              technology, and digital innovation.
            </p>

            <form className="max-w-md relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-full bg-white dark:bg-black/50 border border-border-light dark:border-white/10 text-text-light dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors pr-16"
              />

              <button
                type="button"
                className="absolute right-2 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Right Side - 3D Human Model */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="w-full h-[500px] relative overflow-visible"
          >
            <Canvas
              camera={{ position: [0, 1.5, 4], fov: 50 }}
              gl={{ alpha: true }}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={3.2} />

              <Suspense fallback={null}>
                <HumanModel />
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
