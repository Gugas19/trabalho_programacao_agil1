import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getRoute: (page: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const routes = {
  en: {
    product: "product",
    solutions: "solutions",
    resources: "resources",
    pricing: "pricing",
    faq: "faq"
  },
  pt: {
    product: "produtos",
    solutions: "solucoes",
    resources: "recursos",
    pricing: "precos",
    faq: "faq"
  }
};

const translations = {
  en: {
    "nav.features": "Features",
    "nav.stories": "Stories",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.schedule": "Schedule Meeting",
    "nav.login": "Log in",
    "nav.getNotion": "Get Notion free",
    "hero.title": "Your AI everything app.",
    "hero.subtitle": "One space for every team. More productivity. Fewer tools.",
    "hero.cta": "Get Notion free",
    "hero.demo": "Request a demo",
    "hero.preview": "Notion Interface Preview",
    "features.title": "One tool for your whole team",
    "features.subtitle": "Write, plan, and get organized with AI-powered tools that connect across everything you do.",
    "features.wiki.title": "Wiki",
    "features.wiki.description": "Centralize your knowledge and make it searchable for everyone.",
    "features.projects.title": "Projects",
    "features.projects.description": "Manage any type of project with custom properties and views.",
    "features.docs.title": "Docs",
    "features.docs.description": "Simple, powerful, beautiful. Next-gen notes & docs.",
    "features.ai.title": "AI assistant",
    "features.ai.description": "Ask AI to edit, draft, translate, and summarize for you.",
    "features.calendar.title": "Calendar",
    "features.calendar.description": "See all your tasks and meetings in one organized view.",
    "features.sites.title": "Sites",
    "features.sites.description": "Publish beautiful pages that anyone can access.",
    "trusted.title": "Trusted by top teams",
    "stories.spotify": "Notion has transformed how our team collaborates. Everything we need is in one place.",
    "stories.spotify.team": "Design Team",
    "stories.openai": "The AI features have made our documentation process 10x faster and more organized.",
    "stories.openai.team": "Research Team",
    "stories.figma": "From project management to knowledge sharing, Notion handles it all seamlessly.",
    "stories.figma.team": "Product Team",
    "stories.readMore": "Read full story →",
    "footer.tagline": "Your AI everything app for work and life.",
    "footer.product": "Product",
    "footer.download": "Download",
    "footer.whatsnew": "What's new",
    "footer.pricing": "Pricing",
    "footer.templates": "Templates",
    "footer.solutions": "Solutions",
    "footer.forteams": "For teams",
    "footer.forpersonal": "For personal",
    "footer.foreducation": "For education",
    "footer.fornonprofits": "For nonprofits",
    "footer.resources": "Resources",
    "footer.helpcenter": "Help center",
    "footer.blog": "Blog",
    "footer.guides": "Guides",
    "footer.webinars": "Webinars",
    "footer.company": "Company",
    "footer.about": "About us",
    "footer.careers": "Careers",
    "footer.security": "Security",
    "footer.privacy": "Privacy",
    "footer.privacypolicy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.copyright": "© 2024 Notion Labs, Inc.",
    "templates.title": "Start with a template",
    "templates.subtitle": "From tasks and wikis, to databases and documents, customize any template to fit your workflow",
    "pricing.title": "One tool for your whole team",
    "pricing.subtitle": "Choose the plan that's right for you",
    // Pricing Page
    "pricing.hero.title": "Choose your Notion",
    "pricing.hero.subtitle": "Find the perfect plan for your team's needs. Start free and upgrade as you grow.",
    "pricing.free.title": "Free",
    "pricing.free.subtitle": "Perfect for personal use",
    "pricing.free.cta": "Get started",
    "pricing.free.feature1": "Sync across devices",
    "pricing.free.feature2": "Share with up to 10 guests",
    "pricing.free.feature3": "7 day page history",
    "pricing.plus.title": "Plus",
    "pricing.plus.subtitle": "A place for small groups to plan & get organized",
    "pricing.plus.cta": "Try for free",
    "pricing.plus.feature1": "Unlimited blocks for teams",
    "pricing.plus.feature2": "Unlimited file uploads",
    "pricing.plus.feature3": "30 day page history",
    "pricing.plus.feature4": "Invite 100 guests",
    "pricing.business.title": "Business",
    "pricing.business.subtitle": "For companies using Notion to connect teams",
    "pricing.business.badge": "Most Popular",
    "pricing.business.cta": "Try for free",
    "pricing.business.feature1": "Advanced permissions",
    "pricing.business.feature2": "90 day page history",
    "pricing.business.feature3": "Invite 250 guests",
    "pricing.business.feature4": "Priority support",
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.subtitle": "Advanced controls for large organizations",
    "pricing.enterprise.price": "Contact us",
    "pricing.enterprise.cta": "Contact sales",
    "pricing.enterprise.feature1": "Advanced security",
    "pricing.enterprise.feature2": "Audit logs",
    "pricing.enterprise.feature3": "SAML SSO",
    "pricing.enterprise.feature4": "Advanced admin",
    "pricing.faq.title": "Frequently asked questions",
    "pricing.faq.cta": "View all FAQ",
    // FAQ Page
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about Notion. Can't find what you're looking for? Contact our support team.",
    "faq.q1": "What is Notion?",
    "faq.a1": "Notion is an all-in-one workspace where you can write, plan, collaborate and get organized. It allows you to take notes, add tasks, manage projects & more.",
    "faq.q2": "How much does Notion cost?",
    "faq.a2": "Notion offers a free plan for personal use, Plus plan at $8/month, Business plan at $15/month, and Enterprise pricing available on request. All paid plans include a free trial.",
    "faq.q3": "Can I use Notion for free?",
    "faq.a3": "Yes! Notion offers a generous free plan that includes unlimited pages and blocks for personal use, sync across devices, and the ability to share with up to 10 guests.",
    "faq.q4": "Is Notion available on mobile?",
    "faq.a4": "Yes, Notion has mobile apps for both iOS and Android. Your content syncs seamlessly across all devices, so you can access your workspace anywhere.",
    "faq.q5": "Can I import data from other tools?",
    "faq.a5": "Yes, Notion supports importing from many popular tools including Trello, Asana, Evernote, Google Docs, Word documents, and more.",
    "faq.q6": "Is Notion secure?",
    "faq.a6": "Yes, Notion takes security seriously. We use industry-standard encryption, offer enterprise security features like SAML SSO, and undergo regular security audits.",
    "faq.q7": "Can I collaborate with my team?",
    "faq.a7": "Absolutely! Notion is built for collaboration. You can share pages, comment, mention teammates, assign tasks, and work together in real-time.",
    "faq.q8": "What is Notion AI?",
    "faq.a8": "Notion AI is an artificial intelligence feature that helps you write, brainstorm, edit, summarize and more, right inside your Notion pages. It's available as an add-on to any paid plan.",
    "faq.q9": "Can I customize Notion to fit my workflow?",
    "faq.a9": "Yes! Notion is highly customizable. You can create custom templates, properties, views, and databases to match your specific workflow and needs.",
    "faq.q10": "How do I get started with Notion?",
    "faq.a10": "Simply sign up for a free account at notion.so. You can start with a blank page or choose from hundreds of templates to get up and running quickly.",
    "faq.q11": "Does Notion work offline?",
    "faq.a11": "Notion has limited offline functionality. You can view and edit recently accessed pages when offline, and changes will sync when you reconnect to the internet.",
    "faq.q12": "Can I export my data from Notion?",
    "faq.a12": "Yes, you can export your Notion content in various formats including HTML, Markdown, PDF, and CSV. This ensures you always have access to your data.",
    "faq.contact.title": "Still have questions?",
    "faq.contact.subtitle": "Our support team is here to help you get the most out of Notion.",
    "faq.contact.support": "Contact Support",
    "faq.contact.help": "Visit Help Center",
    // Product Page
    "product.hero.title1": "One workspace.",
    "product.hero.title2": "Every team.",
    "product.hero.subtitle": "We're more than a doc. Or a table. Customize Notion to work the way you do.",
    "product.hero.cta": "Try Notion free",
    "product.wikis.title": "Wikis",
    "product.wikis.description": "Centralize your knowledge. No more hunting for answers.",
    "product.projects.title": "Projects",
    "product.projects.description": "Manage any type of project. Built for teams that work together.",
    "product.docs.title": "Docs",
    "product.docs.description": "Simple, powerful, beautiful. Next-gen notes & docs.",
    "product.ai.title": "Notion AI",
    "product.ai.description": "Leverage the limitless power of AI in any Notion page.",
    "product.calendar.title": "Calendar",
    "product.calendar.description": "Time-block your calendar. Work and life, all in one place.",
    "product.sites.title": "Sites",
    "product.sites.description": "Publish beautiful web pages and share your work with others.",
    "product.cta.title": "Ready to get started?",
    "product.cta.subtitle": "Join millions of people using Notion to organize their work and life.",
    "product.cta.button": "Try Notion free",
    // Solutions Page
    "solutions.hero.title": "Solutions for every team",
    "solutions.hero.subtitle": "Whether you're a startup or a Fortune 500 company, Notion adapts to your workflow.",
    "solutions.engineering.title": "Engineering",
    "solutions.engineering.description": "Build better products with engineering wikis, sprint planning, and technical documentation all in one place.",
    "solutions.engineering.cta": "Learn more",
    "solutions.design.title": "Design",
    "solutions.design.description": "Organize design systems, track projects, and collaborate with stakeholders seamlessly.",
    "solutions.design.cta": "Learn more",
    "solutions.product.title": "Product",
    "solutions.product.description": "Plan roadmaps, write PRDs, and coordinate launches with your entire product team.",
    "solutions.product.cta": "Learn more",
    "solutions.marketing.title": "Marketing",
    "solutions.marketing.description": "Plan campaigns, create content calendars, and track performance metrics across channels.",
    "solutions.marketing.cta": "Learn more",
    "solutions.hr.title": "HR",
    "solutions.hr.description": "Streamline recruiting, onboarding, and employee management with customizable workflows.",
    "solutions.hr.cta": "Learn more",
    "solutions.sales.title": "Sales",
    "solutions.sales.description": "Track leads, manage pipelines, and collaborate on deals with your entire sales team.",
    "solutions.sales.cta": "Learn more",
    "solutions.enterprise.title": "Enterprise ready",
    "solutions.enterprise.subtitle": "Advanced security, compliance, and deployment options for large organizations.",
    "solutions.enterprise.cta1": "Contact sales",
    "solutions.enterprise.cta2": "Learn about Enterprise",
    // Resources Page
    "resources.hero.title": "Resources",
    "resources.hero.subtitle": "Everything you need to get the most out of Notion.",
    "resources.help.title": "Help center",
    "resources.help.description": "Find answers to common questions and learn how to use Notion.",
    "resources.help.cta": "Visit help center",
    "resources.templates.title": "Templates",
    "resources.templates.description": "Get started faster with pre-built templates for any use case.",
    "resources.templates.cta": "Browse templates",
    "resources.guides.title": "Guides",
    "resources.guides.description": "Step-by-step tutorials to master Notion's features.",
    "resources.guides.cta": "Read guides",
    "resources.api.title": "API docs",
    "resources.api.description": "Build custom integrations with the Notion API.",
    "resources.api.cta": "View API docs",
    "resources.community.title": "Community",
    "resources.community.description": "Connect with other Notion users and share best practices.",
    "resources.community.cta": "Join community",
    "resources.blog.title": "Blog",
    "resources.blog.description": "Stay updated with the latest Notion news and features.",
    "resources.blog.cta": "Read blog",
    "resources.learn.title": "Learn Notion",
    "resources.learn.subtitle": "Master Notion with our comprehensive learning resources.",
    "resources.academy.title": "Notion Academy",
    "resources.academy.description": "Interactive courses for beginners and advanced users.",
    "resources.webinars.title": "Webinars",
    "resources.webinars.description": "Live sessions with Notion experts and power users.",
    "resources.certification.title": "Certification",
    "resources.certification.description": "Become a certified Notion consultant.",
    // NotFound Page
    "notfound.title": "404",
    "notfound.message": "Oops! Page not found",
    "notfound.link": "Return to Home",
    // Cal.ai Section
    "calai.title": "Schedule a meeting with our team",
    "calai.subtitle": "Book a personalized demo or consultation with our Notion experts. We'll show you how to maximize your productivity and answer all your questions.",
    "calai.feature1.title": "Personalized Demo",
    "calai.feature1.description": "See Notion in action with examples tailored to your use case and workflow.",
    "calai.feature2.title": "Expert Consultation",
    "calai.feature2.description": "Get advice from our team on best practices and advanced features.",
    "calai.feature3.title": "Implementation Support",
    "calai.feature3.description": "Receive guidance on setting up Notion for your team and organization.",
    "calai.cta.primary": "Book Meeting",
    "calai.cta.secondary": "Learn More",
    "calai.booking.title": "30 min meeting",
    "calai.booking.duration": "with Notion team",
    "calai.booking.note": "All times shown in your local timezone",
    // Proposal Form
    "proposal.section.title": "Request a Custom Proposal",
    "proposal.section.subtitle": "Tell us about your needs and we'll create a tailored proposal with pricing for your team.",
    "proposal.form.title": "Get Your Custom Proposal",
    "proposal.form.subtitle": "Fill out the form below and we'll send you a detailed proposal via email within 24 hours.",
    "proposal.form.fields.name": "Full Name",
    "proposal.form.fields.email": "Email Address",
    "proposal.form.fields.company": "Company Name",
    "proposal.form.fields.phone": "Phone Number",
    "proposal.form.fields.products": "Products of Interest",
    "proposal.form.fields.description": "Description",
    "proposal.form.placeholders.name": "John Doe",
    "proposal.form.placeholders.email": "john@company.com",
    "proposal.form.placeholders.company": "Your Company Ltd.",
    "proposal.form.placeholders.phone": "+351 912 345 678",
    "proposal.form.placeholders.description": "Tell us about your needs and requirements...",
    "proposal.form.products.notionPlus": "Notion Plus - Small teams",
    "proposal.form.products.notionBusiness": "Notion Business - Growing companies",
    "proposal.form.products.notionEnterprise": "Notion Enterprise - Large organizations",
    "proposal.form.products.consulting": "Notion Consulting & Setup",
    "proposal.form.products.training": "Team Training & Onboarding",
    "proposal.form.button.submit": "Request Proposal",
    "proposal.form.button.submitting": "Sending...",
    "proposal.form.validation.name": "Name must be at least 2 characters",
    "proposal.form.validation.email": "Please enter a valid email address",
    "proposal.form.validation.company": "Company name must be at least 2 characters",
    "proposal.form.validation.phone": "Please enter a valid phone number",
    "proposal.form.validation.products": "Please select at least one product",
    "proposal.form.validation.description": "Description must be at least 10 characters",
    "proposal.form.success.title": "Proposal request sent!",
    "proposal.form.success.description": "We'll send your custom proposal to your email within 24 hours.",
    "proposal.form.error.title": "Error sending request",
    "proposal.form.error.description": "Please try again or contact our support team.",
  },
  pt: {
    "nav.features": "Funcionalidades",
    "nav.stories": "Histórias",
    "nav.pricing": "Preços",
    "nav.faq": "FAQ",
    "nav.schedule": "Agendar Reunião",
    "nav.login": "Iniciar sessão",
    "nav.getNotion": "Obter Notion grátis",
    "hero.title": "A sua aplicação de IA para tudo.",
    "hero.subtitle": "Um espaço para todas as equipas. Mais produtividade. Menos ferramentas.",
    "hero.cta": "Obter Notion grátis",
    "hero.demo": "Solicitar uma demonstração",
    "hero.preview": "Pré-visualização da Interface Notion",
    "features.title": "Uma ferramenta para toda a sua equipa",
    "features.subtitle": "Escreva, planeie e organize-se com ferramentas baseadas em IA que se conectam a tudo o que faz.",
    "features.wiki.title": "Wiki",
    "features.wiki.description": "Centralize o seu conhecimento e torne-o pesquisável para todos.",
    "features.projects.title": "Projetos",
    "features.projects.description": "Gira qualquer tipo de projeto com propriedades e visualizações personalizadas.",
    "features.docs.title": "Documentos",
    "features.docs.description": "Simples, poderoso, bonito. Notas e documentos de nova geração.",
    "features.ai.title": "Assistente de IA",
    "features.ai.description": "Peça à IA para editar, redigir, traduzir e resumir por si.",
    "features.calendar.title": "Calendário",
    "features.calendar.description": "Veja todas as suas tarefas e reuniões numa vista organizada.",
    "features.sites.title": "Sites",
    "features.sites.description": "Publique páginas bonitas que qualquer pessoa pode aceder.",
    "trusted.title": "Confiado pelas melhores equipas",
    "stories.spotify": "O Notion transformou a forma como a nossa equipa colabora. Tudo o que precisamos está num só lugar.",
    "stories.spotify.team": "Equipa de Design",
    "stories.openai": "As funcionalidades de IA tornaram o nosso processo de documentação 10x mais rápido e organizado.",
    "stories.openai.team": "Equipa de Investigação",
    "stories.figma": "Da gestão de projetos à partilha de conhecimento, o Notion gere tudo de forma integrada.",
    "stories.figma.team": "Equipa de Produto",
    "stories.readMore": "Ler história completa →",
    "footer.tagline": "A sua aplicação de IA para tudo no trabalho e na vida.",
    "footer.product": "Produto",
    "footer.download": "Transferir",
    "footer.whatsnew": "Novidades",
    "footer.pricing": "Preços",
    "footer.templates": "Modelos",
    "footer.solutions": "Soluções",
    "footer.forteams": "Para equipas",
    "footer.forpersonal": "Para uso pessoal",
    "footer.foreducation": "Para educação",
    "footer.fornonprofits": "Para organizações sem fins lucrativos",
    "footer.resources": "Recursos",
    "footer.helpcenter": "Centro de ajuda",
    "footer.blog": "Blogue",
    "footer.guides": "Guias",
    "footer.webinars": "Webinars",
    "footer.company": "Empresa",
    "footer.about": "Sobre nós",
    "footer.careers": "Carreiras",
    "footer.security": "Segurança",
    "footer.privacy": "Privacidade",
    "footer.privacypolicy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.copyright": "© 2024 Notion Labs, Inc.",
    "templates.title": "Comece com um modelo",
    "templates.subtitle": "De tarefas e wikis a bases de dados e documentos, personalize qualquer modelo para se adaptar ao seu fluxo de trabalho",
    "pricing.title": "Uma ferramenta para toda a sua equipa",
    "pricing.subtitle": "Escolha o plano certo para si",
    // Pricing Page
    "pricing.hero.title": "Escolha o seu Notion",
    "pricing.hero.subtitle": "Encontre o plano perfeito para as necessidades da sua equipa. Comece grátis e faça upgrade à medida que cresce.",
    "pricing.free.title": "Grátis",
    "pricing.free.subtitle": "Perfeito para uso pessoal",
    "pricing.free.cta": "Começar",
    "pricing.free.feature1": "Sincronização entre dispositivos",
    "pricing.free.feature2": "Partilhe com até 10 convidados",
    "pricing.free.feature3": "Histórico de páginas de 7 dias",
    "pricing.plus.title": "Plus",
    "pricing.plus.subtitle": "Um espaço para pequenos grupos planear e organizar-se",
    "pricing.plus.cta": "Experimentar grátis",
    "pricing.plus.feature1": "Blocos ilimitados para equipas",
    "pricing.plus.feature2": "Carregamentos de ficheiros ilimitados",
    "pricing.plus.feature3": "Histórico de páginas de 30 dias",
    "pricing.plus.feature4": "Convide 100 convidados",
    "pricing.business.title": "Business",
    "pricing.business.subtitle": "Para empresas que usam o Notion para conectar equipas",
    "pricing.business.badge": "Mais Popular",
    "pricing.business.cta": "Experimentar grátis",
    "pricing.business.feature1": "Permissões avançadas",
    "pricing.business.feature2": "Histórico de páginas de 90 dias",
    "pricing.business.feature3": "Convide 250 convidados",
    "pricing.business.feature4": "Suporte prioritário",
    "pricing.enterprise.title": "Enterprise",
    "pricing.enterprise.subtitle": "Controlos avançados para grandes organizações",
    "pricing.enterprise.price": "Contacte-nos",
    "pricing.enterprise.cta": "Contactar vendas",
    "pricing.enterprise.feature1": "Segurança avançada",
    "pricing.enterprise.feature2": "Registos de auditoria",
    "pricing.enterprise.feature3": "SAML SSO",
    "pricing.enterprise.feature4": "Administração avançada",
    "pricing.faq.title": "Perguntas frequentes",
    "pricing.faq.cta": "Ver todas as FAQ",
    // FAQ Page
    "faq.title": "Perguntas Frequentes",
    "faq.subtitle": "Encontre respostas para perguntas comuns sobre o Notion. Não encontra o que procura? Contacte a nossa equipa de suporte.",
    "faq.q1": "O que é o Notion?",
    "faq.a1": "O Notion é um espaço de trabalho tudo-em-um onde pode escrever, planear, colaborar e organizar-se. Permite-lhe tirar notas, adicionar tarefas, gerir projetos e muito mais.",
    "faq.q2": "Quanto custa o Notion?",
    "faq.a2": "O Notion oferece um plano gratuito para uso pessoal, plano Plus a 8€/mês, plano Business a 15€/mês e preços Enterprise disponíveis sob consulta. Todos os planos pagos incluem um período de teste gratuito.",
    "faq.q3": "Posso usar o Notion gratuitamente?",
    "faq.a3": "Sim! O Notion oferece um plano gratuito generoso que inclui páginas e blocos ilimitados para uso pessoal, sincronização entre dispositivos e a capacidade de partilhar com até 10 convidados.",
    "faq.q4": "O Notion está disponível em dispositivos móveis?",
    "faq.a4": "Sim, o Notion tem aplicações móveis para iOS e Android. O seu conteúdo sincroniza-se perfeitamente em todos os dispositivos, para que possa aceder ao seu espaço de trabalho em qualquer lugar.",
    "faq.q5": "Posso importar dados de outras ferramentas?",
    "faq.a5": "Sim, o Notion suporta importação de muitas ferramentas populares, incluindo Trello, Asana, Evernote, Google Docs, documentos Word e muito mais.",
    "faq.q6": "O Notion é seguro?",
    "faq.a6": "Sim, o Notion leva a segurança a sério. Usamos encriptação padrão da indústria, oferecemos funcionalidades de segurança empresarial como SAML SSO e realizamos auditorias de segurança regulares.",
    "faq.q7": "Posso colaborar com a minha equipa?",
    "faq.a7": "Absolutamente! O Notion foi criado para colaboração. Pode partilhar páginas, comentar, mencionar colegas de equipa, atribuir tarefas e trabalhar em conjunto em tempo real.",
    "faq.q8": "O que é o Notion AI?",
    "faq.a8": "O Notion AI é uma funcionalidade de inteligência artificial que o ajuda a escrever, fazer brainstorming, editar, resumir e muito mais, diretamente nas suas páginas do Notion. Está disponível como um complemento para qualquer plano pago.",
    "faq.q9": "Posso personalizar o Notion para se adaptar ao meu fluxo de trabalho?",
    "faq.a9": "Sim! O Notion é altamente personalizável. Pode criar modelos, propriedades, vistas e bases de dados personalizadas para corresponder ao seu fluxo de trabalho e necessidades específicas.",
    "faq.q10": "Como começo a usar o Notion?",
    "faq.a10": "Basta criar uma conta gratuita em notion.so. Pode começar com uma página em branco ou escolher entre centenas de modelos para começar rapidamente.",
    "faq.q11": "O Notion funciona offline?",
    "faq.a11": "O Notion tem funcionalidade offline limitada. Pode visualizar e editar páginas acedidas recentemente quando estiver offline, e as alterações serão sincronizadas quando voltar a estar online.",
    "faq.q12": "Posso exportar os meus dados do Notion?",
    "faq.a12": "Sim, pode exportar o seu conteúdo do Notion em vários formatos, incluindo HTML, Markdown, PDF e CSV. Isto garante que tem sempre acesso aos seus dados.",
    "faq.contact.title": "Ainda tem dúvidas?",
    "faq.contact.subtitle": "A nossa equipa de suporte está aqui para o ajudar a tirar o máximo partido do Notion.",
    "faq.contact.support": "Contactar Suporte",
    "faq.contact.help": "Visitar Centro de Ajuda",
    // Product Page
    "product.hero.title1": "Um espaço de trabalho.",
    "product.hero.title2": "Todas as equipas.",
    "product.hero.subtitle": "Somos mais do que um documento. Ou uma tabela. Personalize o Notion para trabalhar da sua maneira.",
    "product.hero.cta": "Experimentar Notion grátis",
    "product.wikis.title": "Wikis",
    "product.wikis.description": "Centralize o seu conhecimento. Nunca mais procure respostas.",
    "product.projects.title": "Projetos",
    "product.projects.description": "Gira qualquer tipo de projeto. Criado para equipas que trabalham em conjunto.",
    "product.docs.title": "Documentos",
    "product.docs.description": "Simples, poderoso, bonito. Notas e documentos de nova geração.",
    "product.ai.title": "Notion AI",
    "product.ai.description": "Aproveite o poder ilimitado da IA em qualquer página do Notion.",
    "product.calendar.title": "Calendário",
    "product.calendar.description": "Bloqueie o seu calendário por tempo. Trabalho e vida, tudo num único lugar.",
    "product.sites.title": "Sites",
    "product.sites.description": "Publique páginas web bonitas e partilhe o seu trabalho com outros.",
    "product.cta.title": "Pronto para começar?",
    "product.cta.subtitle": "Junte-se a milhões de pessoas que usam o Notion para organizar o seu trabalho e vida.",
    "product.cta.button": "Experimentar Notion grátis",
    // Solutions Page
    "solutions.hero.title": "Soluções para todas as equipas",
    "solutions.hero.subtitle": "Quer seja uma startup ou uma empresa Fortune 500, o Notion adapta-se ao seu fluxo de trabalho.",
    "solutions.engineering.title": "Engenharia",
    "solutions.engineering.description": "Crie melhores produtos com wikis de engenharia, planeamento de sprints e documentação técnica, tudo num único lugar.",
    "solutions.engineering.cta": "Saber mais",
    "solutions.design.title": "Design",
    "solutions.design.description": "Organize sistemas de design, acompanhe projetos e colabore com stakeholders sem esforço.",
    "solutions.design.cta": "Saber mais",
    "solutions.product.title": "Produto",
    "solutions.product.description": "Planeie roadmaps, escreva PRDs e coordene lançamentos com toda a sua equipa de produto.",
    "solutions.product.cta": "Saber mais",
    "solutions.marketing.title": "Marketing",
    "solutions.marketing.description": "Planeie campanhas, crie calendários de conteúdo e acompanhe métricas de desempenho em todos os canais.",
    "solutions.marketing.cta": "Saber mais",
    "solutions.hr.title": "RH",
    "solutions.hr.description": "Simplifique o recrutamento, integração e gestão de colaboradores com fluxos de trabalho personalizáveis.",
    "solutions.hr.cta": "Saber mais",
    "solutions.sales.title": "Vendas",
    "solutions.sales.description": "Acompanhe leads, gira pipelines e colabore em negócios com toda a sua equipa de vendas.",
    "solutions.sales.cta": "Saber mais",
    "solutions.enterprise.title": "Preparado para empresas",
    "solutions.enterprise.subtitle": "Segurança avançada, conformidade e opções de implementação para grandes organizações.",
    "solutions.enterprise.cta1": "Contactar vendas",
    "solutions.enterprise.cta2": "Saber mais sobre Enterprise",
    // Resources Page
    "resources.hero.title": "Recursos",
    "resources.hero.subtitle": "Tudo o que precisa para tirar o máximo partido do Notion.",
    "resources.help.title": "Centro de ajuda",
    "resources.help.description": "Encontre respostas para perguntas comuns e aprenda a usar o Notion.",
    "resources.help.cta": "Visitar centro de ajuda",
    "resources.templates.title": "Modelos",
    "resources.templates.description": "Comece mais rapidamente com modelos pré-construídos para qualquer caso de uso.",
    "resources.templates.cta": "Explorar modelos",
    "resources.guides.title": "Guias",
    "resources.guides.description": "Tutoriais passo a passo para dominar as funcionalidades do Notion.",
    "resources.guides.cta": "Ler guias",
    "resources.api.title": "Documentação da API",
    "resources.api.description": "Crie integrações personalizadas com a API do Notion.",
    "resources.api.cta": "Ver documentação da API",
    "resources.community.title": "Comunidade",
    "resources.community.description": "Conecte-se com outros utilizadores do Notion e partilhe as melhores práticas.",
    "resources.community.cta": "Juntar-se à comunidade",
    "resources.blog.title": "Blogue",
    "resources.blog.description": "Mantenha-se atualizado com as últimas notícias e funcionalidades do Notion.",
    "resources.blog.cta": "Ler blogue",
    "resources.learn.title": "Aprender Notion",
    "resources.learn.subtitle": "Domine o Notion com os nossos recursos de aprendizagem abrangentes.",
    "resources.academy.title": "Notion Academy",
    "resources.academy.description": "Cursos interativos para iniciantes e utilizadores avançados.",
    "resources.webinars.title": "Webinars",
    "resources.webinars.description": "Sessões ao vivo com especialistas do Notion e utilizadores avançados.",
    "resources.certification.title": "Certificação",
    "resources.certification.description": "Torne-se um consultor certificado do Notion.",
    // NotFound Page
    "notfound.title": "404",
    "notfound.message": "Ups! Página não encontrada",
    "notfound.link": "Voltar à Página Inicial",
    // Cal.ai Section
    "calai.title": "Agende uma reunião com a nossa equipa",
    "calai.subtitle": "Marque uma demonstração personalizada ou consultoria com os nossos especialistas em Notion. Mostramos-lhe como maximizar a sua produtividade e respondemos a todas as suas dúvidas.",
    "calai.feature1.title": "Demonstração Personalizada",
    "calai.feature1.description": "Veja o Notion em ação com exemplos adaptados ao seu caso de uso e fluxo de trabalho.",
    "calai.feature2.title": "Consultoria Especializada",
    "calai.feature2.description": "Receba conselhos da nossa equipa sobre melhores práticas e funcionalidades avançadas.",
    "calai.feature3.title": "Suporte de Implementação",
    "calai.feature3.description": "Obtenha orientação na configuração do Notion para a sua equipa e organização.",
    "calai.cta.primary": "Agendar Reunião",
    "calai.cta.secondary": "Saber Mais",
    "calai.booking.title": "Reunião de 30 min",
    "calai.booking.duration": "com equipa Notion",
    "calai.booking.note": "Todos os horários mostrados no seu fuso horário local",
    // Proposal Form
    "proposal.section.title": "Solicite uma Proposta Personalizada",
    "proposal.section.subtitle": "Diga-nos as suas necessidades e criaremos uma proposta à medida com preços para a sua equipa.",
    "proposal.form.title": "Obtenha a Sua Proposta Personalizada",
    "proposal.form.subtitle": "Preencha o formulário abaixo e enviaremos uma proposta detalhada por email em até 24 horas.",
    "proposal.form.fields.name": "Nome Completo",
    "proposal.form.fields.email": "Endereço de Email",
    "proposal.form.fields.company": "Nome da Empresa",
    "proposal.form.fields.phone": "Número de Telefone",
    "proposal.form.fields.products": "Produtos de Interesse",
    "proposal.form.fields.description": "Descrição",
    "proposal.form.placeholders.name": "João Silva",
    "proposal.form.placeholders.email": "joao@empresa.pt",
    "proposal.form.placeholders.company": "A Sua Empresa Lda.",
    "proposal.form.placeholders.phone": "+351 912 345 678",
    "proposal.form.placeholders.description": "Fale-nos sobre as suas necessidades e requisitos...",
    "proposal.form.products.notionPlus": "Notion Plus - Pequenas equipas",
    "proposal.form.products.notionBusiness": "Notion Business - Empresas em crescimento",
    "proposal.form.products.notionEnterprise": "Notion Enterprise - Grandes organizações",
    "proposal.form.products.consulting": "Consultoria e Configuração Notion",
    "proposal.form.products.training": "Formação e Onboarding de Equipas",
    "proposal.form.button.submit": "Solicitar Proposta",
    "proposal.form.button.submitting": "A enviar...",
    "proposal.form.validation.name": "O nome deve ter pelo menos 2 caracteres",
    "proposal.form.validation.email": "Por favor insira um endereço de email válido",
    "proposal.form.validation.company": "O nome da empresa deve ter pelo menos 2 caracteres",
    "proposal.form.validation.phone": "Por favor insira um número de telefone válido",
    "proposal.form.validation.products": "Por favor selecione pelo menos um produto",
    "proposal.form.validation.description": "A descrição deve ter pelo menos 10 caracteres",
    "proposal.form.success.title": "Pedido de proposta enviado!",
    "proposal.form.success.description": "Enviaremos a sua proposta personalizada para o seu email em até 24 horas.",
    "proposal.form.error.title": "Erro ao enviar pedido",
    "proposal.form.error.description": "Por favor tente novamente ou contacte a nossa equipa de suporte.",
  },
};

function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [language, setLanguageState] = useState<Language>(() => {
    const pathLang = location.pathname.split("/")[1];
    if (pathLang === "en" || pathLang === "pt") {
      return pathLang;
    }
    const saved = localStorage.getItem("language") as Language;
    return saved || "pt";
  });

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];

    if (pathLang === "en" || pathLang === "pt") {
      setLanguageState(pathLang);
      localStorage.setItem("language", pathLang);
    } else if (location.pathname === "/" || !pathLang) {
      const saved = (localStorage.getItem("language") as Language) || "pt";
      navigate(`/${saved}`, { replace: true });
    }
  }, [location.pathname, navigate]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);

    const currentPath = location.pathname;
    const pathParts = currentPath.split("/").filter(Boolean);

    // Get current language and page
    const currentLang = pathParts[0] === "en" || pathParts[0] === "pt" ? pathParts[0] as Language : language;
    const currentPage = pathParts[1];

    // Find the page key by looking up the current route in the old language
    let pageKey = currentPage;
    if (currentPage) {
      for (const [key, value] of Object.entries(routes[currentLang])) {
        if (value === currentPage) {
          pageKey = key;
          break;
        }
      }
    }

    // Build new path with translated route
    const newPage = pageKey ? routes[lang][pageKey as keyof typeof routes.en] : "";

    if (newPage) {
      navigate(`/${lang}/${newPage}`);
    } else {
      navigate(`/${lang}`);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const getRoute = (page: string): string => {
    return routes[language][page as keyof typeof routes.en] || page;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getRoute }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export { LanguageProvider, useLanguage };