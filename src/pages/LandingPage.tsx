
import HeroSection from "@/components/landingpage/HeroSection";
import HighlightsSection from "@/components/landingpage/HighlightsSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import ComparisonSection from "@/components/landingpage/ComparisonSection";
import DemoPreviewSection from "@/components/landingpage/DemoPreviewSection";
import Footer from "@/components/shared/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HighlightsSection />
      <FeaturesSection />
      <ComparisonSection />
      <DemoPreviewSection />
      <Footer theme="light" />
    </div>
  );
};

export default LandingPage;
