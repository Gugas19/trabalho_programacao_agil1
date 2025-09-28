import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Solutions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              {t("solutions.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t("solutions.hero.subtitle")}
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <div className="p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-bold mb-4">{t("solutions.engineering.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("solutions.engineering.description")}
                </p>
                <Button variant="outline">{t("solutions.engineering.cta")}</Button>
              </div>
              <div className="p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-bold mb-4">{t("solutions.design.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("solutions.design.description")}
                </p>
                <Button variant="outline">{t("solutions.design.cta")}</Button>
              </div>
              <div className="p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-bold mb-4">{t("solutions.product.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("solutions.product.description")}
                </p>
                <Button variant="outline">{t("solutions.product.cta")}</Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-bold mb-4">{t("solutions.marketing.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("solutions.marketing.description")}
                </p>
                <Button variant="outline">{t("solutions.marketing.cta")}</Button>
              </div>
              <div className="p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-bold mb-4">{t("solutions.hr.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("solutions.hr.description")}
                </p>
                <Button variant="outline">{t("solutions.hr.cta")}</Button>
              </div>
              <div className="p-8 rounded-xl border border-border">
                <h3 className="text-2xl font-bold mb-4">{t("solutions.sales.title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("solutions.sales.description")}
                </p>
                <Button variant="outline">{t("solutions.sales.cta")}</Button>
              </div>
            </div>
          </div>

          {/* Enterprise Section */}
          <div className="text-center bg-muted rounded-xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("solutions.enterprise.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("solutions.enterprise.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                {t("solutions.enterprise.cta1")}
              </Button>
              <Button variant="outline" size="lg">
                {t("solutions.enterprise.cta2")}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;