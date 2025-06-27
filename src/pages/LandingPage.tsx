
import HeroSection from "@/components/landingpage/HeroSection";
import HighlightsSection from "@/components/landingpage/HighlightsSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import ComparisonSection from "@/components/landingpage/ComparisonSection";
import MarqueeSection from "@/components/landingpage/MarqueeSection";
import Footer from "@/components/shared/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HighlightsSection />
      <FeaturesSection />
      <ComparisonSection />
      <MarqueeSection />
      <Footer theme="light" />
    </div>
  );
};

export default LandingPage;
