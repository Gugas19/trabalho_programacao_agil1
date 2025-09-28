import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSection } from "@/utils/scrollTo";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-lg"
              onClick={() => scrollToSection("pricing")}
            >
              {t("hero.cta")}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-foreground hover:text-foreground/80 px-8 py-3 text-lg"
              onClick={() => scrollToSection("cal-ai")}
            >
              {t("hero.demo")}
            </Button>
          </div>
        </div>

        {/* Product Video - Official Notion Demo */}
        <div className="relative max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl shadow-2xl overflow-hidden bg-white border border-gray-200">
            <video
              id="hero-video"
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
              playsInline
              preload="auto"
              poster="https://images.ctfassets.net/spoqsaf9291f/6U5lzMyWTczZJr7OYiXXbo/27cc35da1d90c549bfa375ffcc01e24e/es-US_Hero.jpg"
              onError={(e) => {
                // Fallback para uma imagem se o vídeo falhar
                const target = e.currentTarget;
                const container = target.parentElement;
                if (container) {
                  container.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <div class="text-center p-8">
                        <div class="w-20 h-20 bg-gray-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                          <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                            <div class="w-5 h-5 bg-white rounded-sm"></div>
                          </div>
                        </div>
                        <p class="text-gray-800 font-semibold text-lg">${t("hero.preview")}</p>
                        <p class="text-gray-600 text-sm mt-2">Interface moderna e intuitiva</p>
                      </div>
                    </div>
                  `;
                }
              }}
            >
              <source
                src="https://videos.ctfassets.net/spoqsaf9291f/60rdYX9BPk9yOnCdEb0nJC/a04c661d50bdad019963c8f9da70fa35/Desktop_HomepageHero_compressed_v007_650.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Badge flutuante */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-background border border-border rounded-full px-4 py-2 shadow-lg">
              <span className="text-sm font-medium text-foreground">{t("hero.preview")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;