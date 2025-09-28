import { useLanguage } from "@/contexts/LanguageContext";
import { Quote } from "lucide-react";

const CustomerStories = () => {
  const { t } = useLanguage();

  const stories = [
    {
      quoteKey: "stories.spotify",
      company: "Spotify",
      authorKey: "stories.spotify.team",
      link: "#"
    },
    {
      quoteKey: "stories.openai",
      company: "OpenAI",
      authorKey: "stories.openai.team",
      link: "#"
    },
    {
      quoteKey: "stories.figma",
      company: "Figma",
      authorKey: "stories.figma.team",
      link: "#"
    }
  ];

  return (
    <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
              <Quote className="w-8 h-8 text-foreground/20 mb-4" />
              <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                "{t(story.quoteKey)}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">{story.company}</div>
                  <div className="text-sm text-muted-foreground">{t(story.authorKey)}</div>
                </div>
                <a
                  href={story.link}
                  className="text-sm text-foreground hover:text-foreground/80 transition-colors font-medium"
                >
                  {t("stories.readMore")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;