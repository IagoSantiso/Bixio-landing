import { AiSection } from "@/components/AiSection";
import { AudienceSplit } from "@/components/AudienceSplit";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { Partners } from "@/components/Partners";
import { Pricing } from "@/components/Pricing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { UseCases } from "@/components/UseCases";
import { FAQ_HOME } from "@/lib/faq";
import { faqSchema, graph, howToSchema, softwareApplicationSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <HowItWorks />
        <AiSection />
        <UseCases />
        <AudienceSplit />
        <Pricing />
        <Partners />
        <Faq
          items={FAQ_HOME}
          title="Lo que todo el mundo pregunta antes de empezar"
          intro="Si te falta alguna, están todas en preguntas frecuentes."
        />
        <FinalCta />
      </main>
      <SiteFooter />
      <JsonLd data={graph(softwareApplicationSchema(), howToSchema(), faqSchema(FAQ_HOME))} />
    </>
  );
}
