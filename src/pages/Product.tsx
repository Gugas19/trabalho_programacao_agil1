import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, FolderKanban, FileText, Sparkles, Calendar, Globe } from "lucide-react";

const Product = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              {t("product.hero.title1")}
              <br />
              {t("product.hero.title2")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t("product.hero.subtitle")}
            </p>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              {t("product.hero.cta")}
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("product.wikis.title")}</h3>
              <p className="text-muted-foreground">{t("product.wikis.description")}</p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("product.projects.title")}</h3>
              <p className="text-muted-foreground">{t("product.projects.description")}</p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                <FileText className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("product.docs.title")}</h3>
              <p className="text-muted-foreground">{t("product.docs.description")}</p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("product.ai.title")}</h3>
              <p className="text-muted-foreground">{t("product.ai.description")}</p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("product.calendar.title")}</h3>
              <p className="text-muted-foreground">{t("product.calendar.description")}</p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                <Globe className="w-6 h-6 text-foreground/70" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("product.sites.title")}</h3>
              <p className="text-muted-foreground">{t("product.sites.description")}</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-muted rounded-xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("product.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("product.cta.subtitle")}
            </p>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              {t("product.cta.button")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;