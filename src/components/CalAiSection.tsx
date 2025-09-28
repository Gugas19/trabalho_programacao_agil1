import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSection } from "@/utils/scrollTo";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CalAiSection = () => {
  const { t } = useLanguage();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <section id="cal-ai" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              {t("calai.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("calai.subtitle")}
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-foreground/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t("calai.feature1.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("calai.feature1.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-foreground/10 rounded-lg">
                  <Users className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t("calai.feature2.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("calai.feature2.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-foreground/10 rounded-lg">
                  <Zap className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t("calai.feature3.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("calai.feature3.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" onClick={() => scrollToSection("cal-ai")}>
                {t("calai.cta.primary")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("features")}>
                {t("calai.cta.secondary")}
              </Button>
            </div>
          </div>

          {/* Right Content - Cal.com embed */}
          <div className="bg-muted/30 rounded-2xl p-8 border border-border">
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("calai.booking.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("calai.booking.duration")}</p>
                </div>
              </div>

              {/* Cal.com embed */}
              <div className="h-[600px] w-full">
                <Cal
                  namespace="30min"
                  calLink="itslidating-n7xup3/30min"
                  style={{width:"100%",height:"100%",overflow:"scroll"}}
                  config={{"layout":"month_view"}}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                {t("calai.booking.note")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalAiSection;