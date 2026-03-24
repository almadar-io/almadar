import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection,
  ContentSection,
  FeatureGrid,
  StepFlow,
  CTABanner,
  Box,
  VStack,
  Typography,
} from "@almadar/ui/marketing";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
const PILLARS = [
  {
    title: translate({ id: "platform.language.title", message: "Orb" }),
    description: translate({ id: "platform.language.desc", message: "A formal language for describing how software systems behave. Open source, compiler-verified, AI-native. Write entities, traits, and pages. The compiler guarantees correctness before generating code." }),
    href: "https://orb.almadar.io",
    linkLabel: translate({ id: "platform.language.link", message: "Language Docs" }),
    variant: "interactive" as const,
  },
  {
    title: translate({ id: "platform.studio.title", message: "Almadar Studio" }),
    description: translate({ id: "platform.studio.desc", message: "The builder where humans and AI collaborate. Describe what you want in plain language, the AI agent generates a valid program. Edit visually or in code. Preview in real time. Deploy with one click." }),
    href: "https://kflow-builder-app.web.app/",
    linkLabel: translate({ id: "platform.studio.link", message: "Open Studio" }),
    variant: "interactive" as const,
  },
  {
    title: translate({ id: "platform.services.title", message: "Almadar Services" }),
    description: translate({ id: "platform.services.desc", message: "AI-native infrastructure for the agentic era. Compute, storage, authentication, event routing, LLM orchestration, and observability. Designed for applications that agents build and operate." }),
    href: "https://services.almadar.io",
    linkLabel: translate({ id: "platform.services.link", message: "View Services" }),
    variant: "interactive" as const,
  },
];

const STEPS = [
  {
    title: translate({ id: "platform.connect.step1.title", message: "Describe" }),
    description: translate({ id: "platform.connect.step1.desc", message: "You describe what you need in Studio. The AI agent turns your description into a verified application model." }),
  },
  {
    title: translate({ id: "platform.connect.step2.title", message: "Generate" }),
    description: translate({ id: "platform.connect.step2.desc", message: "The compiler verifies the model is correct, then generates a complete application: frontend, backend, and database." }),
  },
  {
    title: translate({ id: "platform.connect.step3.title", message: "Run" }),
    description: translate({ id: "platform.connect.step3.desc", message: "Almadar Services hosts your application with authentication, storage, event routing, and AI services built in." }),
  },
];

export default function Platform(): ReactNode {
  return (
    <Layout
      title={translate({ id: "platform.meta.title", message: "Platform -- Studio, Services, Orb" })}
      description={translate({ id: "platform.meta.desc", message: "Three products that turn descriptions into running applications: Studio, Services, and Orb." })}
    >
      <HeroSection
        align="left"
        title={translate({ id: "platform.hero.title", message: "The Platform" })}
        subtitle={translate({ id: "platform.hero.subtitle", message: "Three pillars, one goal: turn formal descriptions of software into running applications." })}
        className="!overflow-visible"
        backgroundElement={
          <Box className="absolute right-8 top-[15%] w-full max-w-[400px] pointer-events-none hidden lg:flex items-start">
            <ThemedImage
              alt="Application Topology"
              sources={{
                light: useBaseUrl('/img/illustrations/Application-light.svg'),
                dark: useBaseUrl('/img/illustrations/Application-dark.svg'),
              }}
              className="w-full opacity-90 drop-shadow-2xl "
            />
          </Box>
        }
      />
      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <FeatureGrid items={PILLARS} columns={3} />
        </VStack>
      </ContentSection>
      <ContentSection background="alt">
        <StepFlow steps={STEPS} orientation="horizontal" showConnectors />
      </ContentSection>
      <CTABanner
        title={translate({ id: "platform.cta.title", message: "Start Anywhere" })}
        subtitle={translate({ id: "platform.cta.text", message: "Try the builder, explore the infrastructure, or dive into the language. Each product works on its own. Together, they form a complete platform." })}
        primaryAction={{ label: translate({ id: "platform.cta.studio", message: "Try Studio" }), href: "https://studio.almadar.io" }}
        secondaryAction={{ label: translate({ id: "platform.cta.docs", message: "Explore Orb" }), href: "https://orb.almadar.io" }}
        background="dark"
      />
    </Layout>
  );
}
