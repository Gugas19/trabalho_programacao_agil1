import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              {t("pricing.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t("pricing.hero.subtitle")}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Free Plan */}
            <div className="p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold mb-2">{t("pricing.free.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("pricing.free.subtitle")}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <Button className="w-full mb-6" variant="outline">
                {t("pricing.free.cta")}
              </Button>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.free.feature1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.free.feature2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.free.feature3")}</span>
                </li>
              </ul>
            </div>

            {/* Plus Plan */}
            <div className="p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold mb-2">{t("pricing.plus.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("pricing.plus.subtitle")}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$8</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full mb-6">
                {t("pricing.plus.cta")}
              </Button>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.plus.feature1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.plus.feature2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.plus.feature3")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.plus.feature4")}</span>
                </li>
              </ul>
            </div>

            {/* Business Plan */}
            <div className="p-8 rounded-xl border-2 border-foreground relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium">
                {t("pricing.business.badge")}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("pricing.business.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("pricing.business.subtitle")}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$15</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full mb-6 bg-foreground text-background hover:bg-foreground/90">
                {t("pricing.business.cta")}
              </Button>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.business.feature1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.business.feature2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.business.feature3")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.business.feature4")}</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold mb-2">{t("pricing.enterprise.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("pricing.enterprise.subtitle")}</p>
              <div className="mb-6">
                <span className="text-2xl font-bold">{t("pricing.enterprise.price")}</span>
              </div>
              <Button className="w-full mb-6" variant="outline">
                {t("pricing.enterprise.cta")}
              </Button>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.enterprise.feature1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.enterprise.feature2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.enterprise.feature3")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{t("pricing.enterprise.feature4")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {t("pricing.faq.title")}
            </h2>
            <Button variant="outline" size="lg">
              {t("pricing.faq.cta")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;