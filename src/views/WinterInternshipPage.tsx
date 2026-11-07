import React from 'react';
import HeroSection from '../components/HeroSection';
import TracksSection from '../components/TracksSection';
import ProgramDetailsSection from '../components/ProgramDetailsSection';
import CyberLabTerminal from '../components/CyberLabTerminal';
import WhyJoinSection from '../components/WhyJoinSection';
import CertificateShowcase from '../components/CertificateShowcase';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import ScrollReveal from '../components/ScrollReveal';

export default function WinterInternshipPage({ onOpenRegister }) {
  return (
    <main className="flex-1">
      <ScrollReveal><HeroSection onOpenRegister={onOpenRegister} /></ScrollReveal>
      <ScrollReveal><TracksSection onOpenRegister={onOpenRegister} /></ScrollReveal>
      <ScrollReveal><ProgramDetailsSection onOpenRegister={onOpenRegister} /></ScrollReveal>
      <ScrollReveal><CyberLabTerminal /></ScrollReveal>
      <ScrollReveal><WhyJoinSection onOpenRegister={onOpenRegister} /></ScrollReveal>
      <ScrollReveal><CertificateShowcase onOpenRegister={onOpenRegister} /></ScrollReveal>
      <ScrollReveal><PricingSection onOpenRegister={onOpenRegister} /></ScrollReveal>
      <ScrollReveal><FAQSection onOpenRegister={onOpenRegister} /></ScrollReveal>
    </main>
  );
}
