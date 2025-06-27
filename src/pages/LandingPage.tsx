
import HeroSection from "@/components/landingpage/HeroSection";
import HighlightsSection from "@/components/landingpage/HighlightsSection";
import AnalyticsSection from "@/components/landingpage/AnalyticsSection";
import DemoPreviewSection from "@/components/landingpage/DemoPreviewSection";
import Footer from "@/components/shared/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HighlightsSection />
      <AnalyticsSection />
      <DemoPreviewSection />
      <Footer theme="light" />
    </div>
  );
};

export default LandingPage;
