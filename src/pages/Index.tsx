import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import FeaturesGrid from "@/components/FeaturesGrid";
import CustomerStories from "@/components/CustomerStories";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ProposalForm from "@/components/ProposalForm";
import CalAiSection from "@/components/CalAiSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

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

        {/* Proposal Form Section */}
        <section id="proposal" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("proposal.section.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("proposal.section.subtitle")}
              </p>
            </div>
            <ProposalForm />
          </div>
        </section>

        <CalAiSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
