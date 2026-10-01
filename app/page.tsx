import { AiCapabilities } from "@/components/home/ai-capabilities";
import { AutomationSection } from "@/components/home/automation-section";
import { CapabilityBand } from "@/components/home/capability-band";
import { EngineeringSection } from "@/components/home/engineering-section";
import { Hero } from "@/components/home/hero";
import { IndustriesOverview } from "@/components/home/industries-overview";
import { ProductsTeaser } from "@/components/home/products-teaser";
import { ResourcesTeaser } from "@/components/home/resources-teaser";
import { ServicesOverview } from "@/components/home/services-overview";
import { TechnologySection } from "@/components/home/technology-section";
import { VoiceAiFeature } from "@/components/home/voice-ai-feature";
import { WhySyntram } from "@/components/home/why-syntram";
import { WorkTeaser } from "@/components/home/work-teaser";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Syntram Technologies — AI, Voice AI & Software Development",
  absoluteTitle: true,
  description:
    "Syntram Technologies builds AI-powered software, voice AI agents and business automation — from LLM applications to web, mobile and cloud platforms.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityBand />
      <AiCapabilities />
      <ServicesOverview />
      <VoiceAiFeature />
      <AutomationSection />
      <EngineeringSection />
      <IndustriesOverview />
      <ProductsTeaser />
      <WorkTeaser />
      <TechnologySection />
      <WhySyntram />
      <ResourcesTeaser />
      <CtaBanner
        trackId="home_final"
        title="Let's build what's next for your business"
        description="Tell us about the workflow, product or idea you're working on. We'll give you a straight answer on what's possible and how we'd approach it."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Voice AI", href: "/services/voice-ai" }}
      />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
    </>
  );
}
