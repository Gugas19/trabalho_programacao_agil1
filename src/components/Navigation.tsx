import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, getRoute } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm" 
        : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href={`/${language}`} className="text-xl font-semibold text-foreground">Notion</a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-foreground/80 transition-colors">
                {t("nav.features")}
              </a>
              <a href="#stories" className="text-foreground hover:text-foreground/80 transition-colors">
                {t("nav.stories")}
              </a>
              <a href="#pricing" className="text-foreground hover:text-foreground/80 transition-colors">
                {t("nav.pricing")}
              </a>
              <a href="#faq" className="text-foreground hover:text-foreground/80 transition-colors">
                {t("nav.faq")}
              </a>
              <a href="#cal-ai" className="text-foreground hover:text-foreground/80 transition-colors">
                {t("nav.schedule")}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-foreground/80">
              {t("nav.login")}
            </Button>
            <Button variant="default" className="bg-foreground text-background hover:bg-foreground/90">
              {t("nav.getNotion")}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;