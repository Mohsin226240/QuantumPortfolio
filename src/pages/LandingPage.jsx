import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Portfolio } from '../components/Portfolio';
import { Stats } from '../components/Stats';
import { Team } from '../components/Team';
import { Testimonials } from '../components/Testimonials';
import { Clients } from '../components/Clients';
import { FAQ } from '../components/FAQ';
import { Newsletter } from '../components/Newsletter';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { ParticleBackground } from '../components/ParticleBackground';
import {AwardsSection} from "../components/Awards";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative"
    >
      {/* Particle Background */}
      <ParticleBackground />
      <Navigation />
      <div
        className="relative z-10 will-change-transform pt-24 sm:pt-28 md:pt-32"
        style={{ transform: 'translateZ(0)' }}
      >
        <Hero />
        <Clients />
        <About />
        <Services />
        <AwardsSection />
        <Process />
        <Portfolio />
        <Stats />
        <Team />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
