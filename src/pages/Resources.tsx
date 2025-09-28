import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Resources = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              {t("resources.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t("resources.hero.subtitle")}
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{t("resources.help.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("resources.help.description")}</p>
              <Button variant="outline" size="sm">{t("resources.help.cta")}</Button>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{t("resources.templates.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("resources.templates.description")}</p>
              <Button variant="outline" size="sm">{t("resources.templates.cta")}</Button>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{t("resources.guides.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("resources.guides.description")}</p>
              <Button variant="outline" size="sm">{t("resources.guides.cta")}</Button>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{t("resources.api.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("resources.api.description")}</p>
              <Button variant="outline" size="sm">{t("resources.api.cta")}</Button>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{t("resources.community.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("resources.community.description")}</p>
              <Button variant="outline" size="sm">{t("resources.community.cta")}</Button>
            </div>
            <div className="p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-foreground/10 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{t("resources.blog.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("resources.blog.description")}</p>
              <Button variant="outline" size="sm">{t("resources.blog.cta")}</Button>
            </div>
          </div>

          {/* Learning Section */}
          <div className="bg-muted rounded-xl p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("resources.learn.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("resources.learn.subtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-foreground/10 rounded-lg mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">{t("resources.academy.title")}</h3>
                <p className="text-muted-foreground">{t("resources.academy.description")}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-foreground/10 rounded-lg mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">{t("resources.webinars.title")}</h3>
                <p className="text-muted-foreground">{t("resources.webinars.description")}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-foreground/10 rounded-lg mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">{t("resources.certification.title")}</h3>
                <p className="text-muted-foreground">{t("resources.certification.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;