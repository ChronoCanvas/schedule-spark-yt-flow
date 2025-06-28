
import React from 'react';
import HeroSection from '@/components/landingpage/HeroSection';
import FeaturesSection from '@/components/landingpage/FeaturesSection';
import DemoPreviewSection from '@/components/landingpage/DemoPreviewSection';
import ComparisonSection from '@/components/landingpage/ComparisonSection';
import Footer from '@/components/shared/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <DemoPreviewSection />
      <ComparisonSection />
      <Footer theme="dark" />
    </div>
  );
};

export default LandingPage;
