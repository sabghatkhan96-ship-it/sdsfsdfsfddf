import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MetricsSection from './components/MetricsSection';
import VoiceShowcase from './components/VoiceShowcase';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import ReferralsSection from './components/ReferralsSection';
import CtaSection from './components/CtaSection';
import AdSlot from './components/AdSlot';
import Footer from './components/Footer';
import LegalModals from './components/LegalModals';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'disclaimer' | 'contact' | null

  const handleOpenLegal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseLegal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative min-h-screen bg-[#020b16] text-[#f8fafc] font-sans antialiased selection:bg-amber-400/20 selection:text-amber-300">
      
      {/* 1. Fixed FameSpeak Header / Navbar */}
      <Navbar onOpenLegal={handleOpenLegal} />

      <main className="relative z-10">
        {/* 2. Exact FameSpeak Hero Section with Live Waveform Preview & TTS Studio Playground */}
        <HeroSection onOpenLegal={handleOpenLegal} />

        {/* 3. 4-Column Metric Strip (1,000+ voices, 75 languages, 110 accents, <10s) */}
        <MetricsSection />

        {/* 4. Real Voices Showcase with Interactive Play & Equalizer Animations */}
        <VoiceShowcase />

        {/* 5. Google AdSense Leaderboard Slot */}
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <AdSlot format="horizontal" label="Advertisement • Premium Partner" />
        </div>

        {/* 6. Features Section: "Everything you need to sound professional" */}
        <FeaturesSection />

        {/* 7. How It Works: "From script to sound in three steps" */}
        <HowItWorks />

        {/* 8. Pricing Section: Basic ($5), Starter ($10), Pro ($20), Custom */}
        <PricingSection onOpenLegal={handleOpenLegal} />

        {/* 9. Referral Campaign: "Invite friends, earn 10,000 premium credits each" */}
        <ReferralsSection />

        {/* 10. In-Content Native Ad Slot */}
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <AdSlot format="banner" label="Advertisement • Sponsored Audio Infrastructure" />
        </div>

        {/* 11. Final Call To Action: "Ready to give your words a famous voice?" */}
        <CtaSection />
      </main>

      {/* 12. Minimalist FameSpeak Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* 13. GDPR & Google AdSense Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => handleOpenLegal('privacy')} />

      {/* 14. Full Legal Modals (Privacy Policy, Terms of Service, AI Disclaimer, Contact Support) */}
      <LegalModals activeModal={activeModal} onClose={handleCloseLegal} />

    </div>
  );
}
