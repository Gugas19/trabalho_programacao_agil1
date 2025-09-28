import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              {t("faq.title")}
            </h1>
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
                  className="border border-border rounded-lg px-6"
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
          <div className="text-center bg-muted rounded-xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("faq.contact.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("faq.contact.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-foreground/90 h-11 px-8"
              >
                {t("faq.contact.support")}
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                {t("faq.contact.help")}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;