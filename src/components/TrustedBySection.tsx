import { useLanguage } from "@/contexts/LanguageContext";

const TrustedBySection = () => {
  const { t } = useLanguage();

  const companies = [
    {
      name: "OpenAI",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/openai.svg"
    },
    {
      name: "Toyota",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/toyota.svg"
    },
    {
      name: "Adobe",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/adobe.svg"
    },
    {
      name: "McDonald's",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/mcdonalds.svg"
    },
    {
      name: "Spotify",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/spotify.svg"
    },
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10/icons/figma.svg"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t("trusted.title")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <div key={index} className="flex flex-col items-center justify-center group transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center p-4 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors duration-300 mb-3">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    // Fallback em caso de erro no carregamento
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <span
                  className="text-xs font-medium text-muted-foreground hidden"
                  style={{ display: 'none' }}
                >
                  {company.name}
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;