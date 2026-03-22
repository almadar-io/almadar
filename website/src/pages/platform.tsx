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
import { AvlOrbital, AvlEntity, AvlTrait, AvlPage, AvlBinding } from "@almadar/ui/illustrations";

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
          <Box className="absolute right-8 top-[15%] w-[50%] opacity-40 pointer-events-none hidden lg:flex items-start">
            <svg viewBox="0 0 700 200" fill="none" className="w-full">
              {/* Orb: black (#000000) - language orbital */}
              <AvlOrbital cx={100} cy={100} r={70} label="Orb" color="#000000" />
              <AvlTrait cx={100} cy={100} rx={40} ry={18} rotation={-30} label="Entity" opacity={0.6} color="#000000" />
              <AvlTrait cx={100} cy={100} rx={50} ry={22} rotation={30} label="Trait" opacity={0.6} color="#000000" />
              <AvlTrait cx={100} cy={100} rx={60} ry={26} rotation={90} label="Page" opacity={0.6} color="#000000" />
              <AvlEntity x={100} y={100} r={16} fieldCount={4} color="#000000" />

              <AvlBinding x1={175} y1={100} x2={225} y2={100} />

              {/* Studio: blue (#0096c7) - builder orbital */}
              <AvlOrbital cx={300} cy={100} r={70} label="Studio" color="#0096c7" />
              <AvlTrait cx={300} cy={100} rx={45} ry={20} rotation={0} label="Agent" opacity={0.6} color="#0096c7" />
              <AvlTrait cx={300} cy={100} rx={55} ry={24} rotation={45} label="Editor" opacity={0.6} color="#0096c7" />
              <AvlTrait cx={300} cy={100} rx={45} ry={20} rotation={90} label="Preview" opacity={0.6} color="#0096c7" />
              <AvlTrait cx={300} cy={100} rx={55} ry={24} rotation={135} label="Deploy" opacity={0.6} color="#0096c7" />
              <AvlEntity x={300} y={100} r={16} fieldCount={3} color="#0096c7" />

              <AvlBinding x1={375} y1={100} x2={425} y2={100} />

              {/* Services: indigo (#4f46e5) - infra orbital */}
              <AvlOrbital cx={500} cy={100} r={70} label="Services" color="#4f46e5" />
              <AvlTrait cx={500} cy={100} rx={50} ry={22} rotation={-45} label="Brains" opacity={0.6} color="#4f46e5" />
              <AvlTrait cx={500} cy={100} rx={50} ry={22} rotation={45} label="Metal" opacity={0.6} color="#4f46e5" />
              <AvlEntity x={500} y={100} r={18} fieldCount={5} color="#4f46e5" />
              <AvlPage x={560} y={55} label="/api" color="#4f46e5" />
              <AvlPage x={560} y={145} label="/events" color="#4f46e5" />
            </svg>
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
