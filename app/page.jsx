"use client";

import React, { useState } from "react";
import HomepageStyles from "./Homepage/HomepageStyles";
import Navbar from "./Homepage/Navbar";
import { HeroSection } from "./Homepage/HeroSection";
import FeaturesSection from "./Homepage/FeaturesSection";
import MarketsSection, { fallbackMarkets } from "./Homepage/MarketsSection";
import WhyUsSection from "./Homepage/WhyUsSection";
import HowItWorksSection from "./Homepage/HowItWorksSection";
import TestimonialsSection from "./Homepage/TestimonialsSection";
import FAQSection from "./Homepage/FAQSection";
import ContactSection from "./Homepage/ContactSection";
import CTASection from "./Homepage/CTASection";
import Footer from "./Homepage/Footer";

export default function Home() {
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
      <HomepageStyles />

      <Navbar
        scrollTo={scrollTo}
        handleStartTrading={handleStartTrading}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection />

      <FeaturesSection />

      <MarketsSection
        markets={fallbackMarkets}
        handleStartTrading={handleStartTrading}
      />

      <WhyUsSection scrollTo={scrollTo} handleStartTrading={handleStartTrading} />

      <HowItWorksSection handleStartTrading={handleStartTrading} />

      <TestimonialsSection />

      <FAQSection scrollTo={scrollTo} />

      <ContactSection
        contactForm={contactForm}
        setContactForm={setContactForm}
        contactLoading={contactLoading}
        handleContactSubmit={handleContactSubmit}
      />

      <CTASection
        handleStartTrading={handleStartTrading}
        scrollTo={scrollTo}
      />

      <Footer
        scrollTo={scrollTo}
        handleStartTrading={handleStartTrading}
      />
    </div>
  );
}
