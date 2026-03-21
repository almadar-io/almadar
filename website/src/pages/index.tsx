import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection,
  ContentSection,
  FeatureGrid,
  StatsGrid,
  CTABanner,
  ArticleSection,
  VStack,
  Typography,
  Box,
  Button,
} from "@almadar/ui/marketing";

const AlmadarChat = React.lazy(() => import("@shared/AlmadarChat"));
import { OrbitalHeroBackground } from "../components/OrbitalHeroBackground";

const WORLD_MODEL_FEATURES = [
  {
    icon: "pen-line",
    title: translate({ id: "home.idea.describe", message: "Describe" }),
    description: translate({ id: "home.idea.describe.text", message: "Write what your system does in Orb, a formal language for application behavior." }),
  },
  {
    icon: "check",
    title: translate({ id: "home.idea.prove", message: "Prove" }),
    description: translate({ id: "home.idea.prove.text", message: "The compiler validates every possible state before a single line of code runs." }),
  },
  {
    icon: "rocket",
    title: translate({ id: "home.idea.deploy", message: "Deploy" }),
    description: translate({ id: "home.idea.deploy.text", message: "One model compiles to web, mobile, or any future platform. The model is the product." }),
  },
];

const PILLARS = [
  {
    icon: "code-2",
    title: translate({ id: "home.pillars.language.title", message: "Orb" }),
    description: translate({ id: "home.pillars.language.desc", message: "A formal language for describing how software behaves. Open source. AI-native. Compiler-verified." }),
    href: "https://orb.almadar.io",
    linkLabel: translate({ id: "home.pillars.language.link", message: "Explore the Language" }),
    variant: "interactive" as const,
  },
  {
    icon: "palette",
    title: translate({ id: "home.pillars.studio.title", message: "Almadar Studio" }),
    description: translate({ id: "home.pillars.studio.desc", message: "The builder where humans and AI agents collaborate to create software. Describe, generate, deploy." }),
    href: "https://studio.almadar.io",
    linkLabel: translate({ id: "home.pillars.studio.link", message: "Try Studio" }),
    variant: "interactive" as const,
  },
  {
    icon: "cloud",
    title: translate({ id: "home.pillars.services.title", message: "Almadar Services" }),
    description: translate({ id: "home.pillars.services.desc", message: "AI-native infrastructure. Compute, storage, authentication, event routing. Designed for agents." }),
    href: "https://services.almadar.io",
    linkLabel: translate({ id: "home.pillars.services.link", message: "View Services" }),
    variant: "interactive" as const,
  },
  {
    icon: "brain",
    title: translate({ id: "home.pillars.masar.title", message: "Masar" }),
    description: translate({ id: "home.pillars.masar.desc", message: "AI world model for agents. Planning, verification, and memory that makes any LLM agent smarter." }),
    href: "https://masar.almadar.io",
    linkLabel: translate({ id: "home.pillars.masar.link", message: "Explore Masar" }),
    variant: "interactive" as const,
  },
  {
    icon: "graduation-cap",
    title: translate({ id: "home.pillars.academy.title", message: "KFlow Academy" }),
    description: translate({ id: "home.pillars.academy.desc", message: "Learn software engineering through interactive courses. From fundamentals to AI-powered development." }),
    href: "https://kflow.academy",
    linkLabel: translate({ id: "home.pillars.academy.link", message: "Start Learning" }),
    variant: "interactive" as const,
  },
];

const STATS = [
  { value: translate({ id: "home.stats.behaviors.value", message: "93" }), label: translate({ id: "home.stats.behaviors.label", message: "Standard behaviors across 18 domains" }) },
  { value: translate({ id: "home.stats.projects.value", message: "7" }), label: translate({ id: "home.stats.projects.label", message: "Production projects deployed" }) },
  { value: translate({ id: "home.stats.cost.value", message: "$0.05-$0.35" }), label: translate({ id: "home.stats.cost.label", message: "AI compute cost per application" }) },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({ id: "home.meta.title", message: "Almadar -- The Physics of Software" })}
      description={translate({ id: "home.meta.desc", message: "Almadar builds the language, intelligence, and infrastructure for software that understands itself." })}
    >
      <HeroSection
        tag={translate({ id: "home.hero.tag", message: "AI-Native Platform" })}
        title={translate({ id: "home.hero.title", message: "The Physics of Software" })}
        subtitle={translate({ id: "home.hero.subtitle", message: "World models for the agentic era. We build the language, intelligence, and infrastructure for software that understands itself." })}
        primaryAction={{ label: translate({ id: "home.hero.cta1", message: "Explore Studio" }), href: "https://studio.almadar.io" }}
        secondaryAction={{ label: translate({ id: "home.hero.cta2", message: "Read the Vision" }), href: "/vision" }}
        backgroundElement={<OrbitalHeroBackground intensity="full" />}
      >
        <BrowserOnly fallback={null}>
          {() => (
            <React.Suspense fallback={null}>
              <AlmadarChat mode="inline" />
            </React.Suspense>
          )}
        </BrowserOnly>
      </HeroSection>

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="home.idea.title">What is a World Model of Software?</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="home.idea.subtitle">Traditional programming tells computers what to do, step by step. A world model describes how things work: the data, the rules, the behaviors. The compiler turns it into any platform. The model stays the same.</Translate>
            </Typography>
          </VStack>
          <FeatureGrid items={WORLD_MODEL_FEATURES} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection background="alt">
        <VStack gap="lg" align="center" className="container">
          <Typography variant="h2">
            <Translate id="home.pillars.title">Our Products</Translate>
          </Typography>
          <FeatureGrid items={PILLARS} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <Typography variant="h2">
            <Translate id="home.proof.title">Proven in Production</Translate>
          </Typography>
          <StatsGrid stats={STATS} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection background="dark">
        <ArticleSection title={translate({ id: "home.ai.title", message: "We Train Our Own Models" })} maxWidth="md">
          <Typography variant="body" className="text-[var(--color-background)]/80">
            <Translate id="home.ai.text">
              We are not a company that wraps LLM APIs and calls it AI. Our neural pipeline understands software structure the way a chess engine understands board positions. It predicts errors, evaluates fixes, and generates valid software from scratch.
            </Translate>
          </Typography>
          <Typography variant="body" className="text-[var(--color-background)]/80">
            <Translate id="home.ai.text2">
              We still use LLMs for natural language understanding. But the core structural intelligence is ours: small, specialized models that cost almost nothing to run.
            </Translate>
          </Typography>
          <Link to="/ai">
            <Button variant="primary" size="lg">
              <Translate id="home.ai.cta">Learn About Our AI</Translate>
            </Button>
          </Link>
        </ArticleSection>
      </ContentSection>

      <CTABanner
        title={translate({ id: "home.cta.title", message: "Ready to build?" })}
        subtitle={translate({ id: "home.cta.text", message: "Start with Orb. Build with Studio. Deploy on Almadar Services." })}
        primaryAction={{ label: translate({ id: "home.cta.start", message: "Start Building" }), href: "https://studio.almadar.io" }}
        secondaryAction={{ label: translate({ id: "home.cta.vision", message: "Read the Vision" }), href: "/vision" }}
      />
    </Layout>
  );
}
