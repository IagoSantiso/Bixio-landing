import { AiSection } from "@/components/AiSection";
import { AudienceSplit } from "@/components/AudienceSplit";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { PartnersBanner } from "@/components/PartnersBanner";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductPreview } from "@/components/ProductPreview";
import { Pricing } from "@/components/Pricing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustBlock } from "@/components/TrustBlock";
import { UseCases } from "@/components/UseCases";
import { FAQ_PRODUCTO } from "@/lib/faq";
import { graph, howToSchema, productSchema, softwareApplicationSchema } from "@/lib/schema";

/** La home resume; el FAQPage completo vive solo en /preguntas-frecuentes. */
const faqHome = FAQ_PRODUCTO.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <AudienceSplit />
        <ProductPreview />
        <ProblemSection />
        <HowItWorks />
        <AiSection />
        <UseCases />
        <TrustBlock />
        <Pricing />
        <Faq
          items={faqHome}
          variant="compact"
          title="Lo que todo el mundo pregunta antes de empezar"
          intro="Las respuestas completas, y otras veinte preguntas, están en preguntas frecuentes."
        />
        <PartnersBanner />
        <FinalCta />
      </main>
      <SiteFooter />
      <JsonLd data={graph(softwareApplicationSchema(), productSchema(), howToSchema())} />
    </>
  );
}
