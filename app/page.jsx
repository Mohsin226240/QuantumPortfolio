"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import HomepageStyles from "./Homepage/HomepageStyles";
import Navbar from "./Homepage/Navbar";
import { HeroSection } from "./Homepage/HeroSection";
import ModernPlatformSection from "./Homepage/ModernPlatformSection";
import ExploreSection from "./Homepage/ExploreSection";
import ConfidentTradingSection from "./Homepage/ConfidentTradingSection";
import FeaturesSection from "./Homepage/FeaturesSection";
import MarketsSection, { fallbackMarkets } from "./Homepage/MarketsSection";
import WhyUsSection from "./Homepage/WhyUsSection";
import HowItWorksSection from "./Homepage/HowItWorksSection";
import TestimonialsSection from "./Homepage/TestimonialsSection";
import FAQSection from "./Homepage/FAQSection";
import ContactSection from "./Homepage/ContactSection";
import CTASection from "./Homepage/CTASection";
import Footer from "./Homepage/Footer";

function CinematicSection({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.96, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, willChange: "transform, opacity" }}>
      {children}
    </motion.div>
  );
}

function WelcomeToast({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 1400);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: 24,
          padding: "28px 32px",
          boxShadow: "0 16px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
          textAlign: "center",
        }}>
        {/* Logo */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "linear-gradient(135deg, #10b981, #059669)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 6l-9.5 9.5-5-5L1 18" />
            <path d="M17 6h6v6" />
          </svg>
        </div>

        {/* Welcome text */}
        <p style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Welcome to Elite<span style={{ color: "#10b981" }}>Fusion</span>
        </p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(true), 3500);
    return () => clearTimeout(t);
  }, []);
  const hideWelcome = useCallback(() => setShowWelcome(false), []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Message sent! We'll get back to you shortly.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
    setContactLoading(false);
  };

  const handleStartTrading = (e) => {
    if (e) e.preventDefault();
    scrollTo("features");
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden transition-colors duration-500">
      <AnimatePresence>
        {showWelcome && <WelcomeToast onClose={hideWelcome} />}
      </AnimatePresence>
      <HomepageStyles />

      <Navbar
        scrollTo={scrollTo}
        handleStartTrading={handleStartTrading}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection />

      <ModernPlatformSection />

      <CinematicSection>
        <ExploreSection />
      </CinematicSection>

      <CinematicSection>
        <ConfidentTradingSection />
      </CinematicSection>

      <CinematicSection>
        <FeaturesSection />
      </CinematicSection>

      <CinematicSection>
        <MarketsSection
          markets={fallbackMarkets}
          handleStartTrading={handleStartTrading}
        />
      </CinematicSection>

      <CinematicSection>
        <WhyUsSection scrollTo={scrollTo} handleStartTrading={handleStartTrading} />
      </CinematicSection>

      <CinematicSection>
        <HowItWorksSection handleStartTrading={handleStartTrading} />
      </CinematicSection>

      <CinematicSection>
        <TestimonialsSection />
      </CinematicSection>

      <CinematicSection>
        <FAQSection scrollTo={scrollTo} />
      </CinematicSection>

      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <ContactSection
          contactForm={contactForm}
          setContactForm={setContactForm}
          contactLoading={contactLoading}
          handleContactSubmit={handleContactSubmit}
        />
      </motion.div>

      <CinematicSection>
        <CTASection
          handleStartTrading={handleStartTrading}
          scrollTo={scrollTo}
        />
      </CinematicSection>

      <Footer
        scrollTo={scrollTo}
        handleStartTrading={handleStartTrading}
      />
    </div>
  );
}
