import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, FolderKanban, FileText, Sparkles, Calendar, Globe } from "lucide-react";

const FeaturesGrid = () => {
  const { t } = useLanguage();

  const features = [
    {
      titleKey: "features.wiki.title",
      descriptionKey: "features.wiki.description",
      icon: BookOpen
    },
    {
      titleKey: "features.projects.title",
      descriptionKey: "features.projects.description",
      icon: FolderKanban
    },
    {
      titleKey: "features.docs.title",
      descriptionKey: "features.docs.description",
      icon: FileText
    },
    {
      titleKey: "features.ai.title",
      descriptionKey: "features.ai.description",
      icon: Sparkles
    },
    {
      titleKey: "features.calendar.title",
      descriptionKey: "features.calendar.description",
      icon: Calendar
    },
    {
      titleKey: "features.sites.title",
      descriptionKey: "features.sites.description",
      icon: Globe
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("features.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-foreground/70" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;