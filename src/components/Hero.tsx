import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const gltf = useGLTF('/models/ring_ship.glb');
  return (
    <primitive
      object={gltf.scene}
      scale={3.5}
      position={[0, 1, 0]}
      rotation={[0, -Math.PI / 4, 0]} // side view on load
    />
  );
}

export function Hero() {
  const { x, y } = useMousePosition();
  const offsetX = x * 0.03;
  const offsetY = y * 0.03;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* 3D Model Background */}
      <div className="absolute inset-0 pointer-events-none opacity-90">
        <Canvas camera={{ position: [3, 1, 7], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          {/* Enable rotation with mouse, disable zoom and pan */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1.0}   // speed of automatic rotation
          />
        </Canvas>
      </div>

      {/* Floating Shapes Background */}
      <div className="absolute inset-0 pointer-events-none perspective-1000 hidden sm:block">
        {/* Cube-ish Shape */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 md:w-32 h-20 md:h-32 border-2 border-cyan-500/40 dark:border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-500/5 backdrop-blur-sm rounded-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            transform: `translate3d(${offsetX * -50}px, ${offsetY * -50}px, 0)`,
            boxShadow: '0 0 50px rgba(0, 255, 255, 0.2)'
          }}
        />

        {/* Sphere-ish Shape */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-28 md:w-48 h-28 md:h-48 rounded-full border border-magenta-500/40 dark:border-magenta-500/30 bg-gradient-to-br from-magenta-500/20 dark:from-magenta-500/10 to-transparent backdrop-blur-sm"
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transform: `translate3d(${offsetX * 40}px, ${offsetY * 40}px, 0)`,
            boxShadow: '0 0 60px rgba(255,0,255,0.2)'
          }}
        />

        {/* Torus / Ring Shape */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-40 md:w-64 h-40 md:h-64 rounded-full border-4 border-gray-400/50 dark:border-white/10"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            transform: `rotateX(60deg) translate3d(${offsetX * -20}px, ${offsetY * -20}px, 0)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100/80 dark:bg-white/5 border border-border-light dark:border-white/10 text-cyan-400 text-xs sm:text-sm font-medium mb-6 md:mb-8 backdrop-blur-md">
            Next Generation Digital Agency
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-text-light dark:text-white mb-6 md:mb-8 leading-tight">
            We Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-text-light dark:via-white to-magenta-500 animate-gradient-x">
              Digital Realities
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-2">
            Transcending boundaries with immersive web experiences. We craft the future of digital interaction with precision and passion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-shadow"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 border border-border-light dark:border-white/10 rounded-full text-text-light dark:text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-md transition-colors"
            >
              <Play className="w-5 h-5 fill-current" /> Showreel
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-6 h-10 rounded-full border-2 border-border-light dark:border-white/20 flex justify-center p-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
