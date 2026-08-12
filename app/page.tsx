import { AiSection } from "@/components/AiSection";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StartModal } from "@/components/StartModal";
import { UseCases } from "@/components/UseCases";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <AiSection />
      <UseCases />
      <Pricing />
      <FinalCta />
      <SiteFooter />
      {/*
        Uno por página: escucha los clics de cualquier CTA con
        `data-lead-modal`, así que los componentes de arriba siguen siendo de
        servidor y no hay que pasarle nada.
      */}
      <StartModal />
    </>
  );
}
