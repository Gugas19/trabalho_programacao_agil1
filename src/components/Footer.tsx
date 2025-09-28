import { useLanguage } from "@/contexts/LanguageContext";
import { Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      titleKey: "footer.product",
      linksKeys: ["footer.download", "footer.whatsnew", "footer.pricing", "footer.templates"]
    },
    {
      titleKey: "footer.solutions",
      linksKeys: ["footer.forteams", "footer.forpersonal", "footer.foreducation", "footer.fornonprofits"]
    },
    {
      titleKey: "footer.resources",
      linksKeys: ["footer.helpcenter", "footer.blog", "footer.guides", "footer.webinars"]
    },
    {
      titleKey: "footer.company",
      linksKeys: ["footer.about", "footer.careers", "footer.security", "footer.privacy"]
    }
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="mb-4">
              <span className="text-xl font-semibold text-foreground">Notion</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{t(section.titleKey)}</h3>
              <ul className="space-y-3">
                {section.linksKeys.map((linkKey, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(linkKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacypolicy")}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;