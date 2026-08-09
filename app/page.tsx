import { AiSection } from "@/components/AiSection";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Partners } from "@/components/Partners";
import { Pricing } from "@/components/Pricing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
      <Partners />
      <FinalCta />
      <SiteFooter />
    </>
  );
}
