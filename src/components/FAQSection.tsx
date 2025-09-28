import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToSection } from "@/utils/scrollTo";

const FAQSection = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1")
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2")
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3")
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4")
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5")
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6")
    },
    {
      question: t("faq.q7"),
      answer: t("faq.a7")
    },
    {
      question: t("faq.q8"),
      answer: t("faq.a8")
    },
    {
      question: t("faq.q9"),
      answer: t("faq.a9")
    },
    {
      question: t("faq.q10"),
      answer: t("faq.a10")
    },
    {
      question: t("faq.q11"),
      answer: t("faq.a11")
    },
    {
      question: t("faq.q12"),
      answer: t("faq.a12")
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            {t("faq.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-background"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-background rounded-xl p-12 border border-border">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {t("faq.contact.title")}
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            {t("faq.contact.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-foreground text-background hover:bg-foreground/90" onClick={() => scrollToSection("cal-ai")}>
              {t("faq.contact.support")}
            </Button>
            <Button variant="outline" onClick={() => scrollToSection("features")}>
              {t("faq.contact.help")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;