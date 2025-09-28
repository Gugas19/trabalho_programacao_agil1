import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import FeaturesGrid from "@/components/FeaturesGrid";
import CustomerStories from "@/components/CustomerStories";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CalAiSection from "@/components/CalAiSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesGrid />
        <CustomerStories />
        <PricingSection />
        <FAQSection />
        <CalAiSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
