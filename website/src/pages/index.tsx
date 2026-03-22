import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
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
  Button,
} from "@almadar/ui/marketing";

import { OrbitalHeroBackground } from "../components/OrbitalHeroBackground";

const HOW_IT_WORKS = [
  {
    icon: "pen-line",
    title: translate({ id: "home.idea.describe", message: "Describe" }),
    description: translate({ id: "home.idea.describe.text", message: "Write what your system does in Orb, a formal language for application behavior." }),
  },
  {
    icon: "check",
    title: translate({ id: "home.idea.prove", message: "Prove" }),
    description: translate({ id: "home.idea.prove.text", message: "The compiler checks every possible screen your app can reach, so users never hit a broken or missing page." }),
  },
  {
    icon: "rocket",
    title: translate({ id: "home.idea.deploy", message: "Deploy" }),
    description: translate({ id: "home.idea.deploy.text", message: "One model compiles to web, mobile, or any future platform. The model is the product." }),
  },
];

const PRODUCTS = [
  {
    icon: "palette",
    title: translate({ id: "home.pillars.studio.title", message: "Almadar Studio" }),
    description: translate({ id: "home.pillars.studio.desc", message: "The builder where humans and AI agents collaborate to create software. Describe, generate, deploy." }),
    href: "https://studio.almadar.io",
    linkLabel: translate({ id: "home.pillars.studio.link", message: "Try Studio" }),
    variant: "interactive" as const,
  },
  {
    icon: "code-2",
    title: translate({ id: "home.pillars.language.title", message: "Orb" }),
    description: translate({ id: "home.pillars.language.desc", message: "A formal language for describing how software behaves. Open source. AI-native. Compiler-verified." }),
    href: "https://orb.almadar.io",
    linkLabel: translate({ id: "home.pillars.language.link", message: "Explore the Language" }),
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
    description: translate({ id: "home.pillars.masar.desc", message: "System 2 for AI agents. Planning, verification, and memory that makes any LLM smarter." }),
    href: "https://masar.almadar.io",
    linkLabel: translate({ id: "home.pillars.masar.link", message: "Explore Masar" }),
    variant: "interactive" as const,
  },
];

const STATS = [
  { value: translate({ id: "home.stats.behaviors.value", message: "93" }), label: translate({ id: "home.stats.behaviors.label", message: "Reusable behaviors across forms, e-commerce, gaming, CMS, and 14 more domains" }) },
  { value: translate({ id: "home.stats.projects.value", message: "7" }), label: translate({ id: "home.stats.projects.label", message: "Production projects deployed across SaaS, gaming, and enterprise" }) },
  { value: translate({ id: "home.stats.cost.value", message: "$0.05-$0.35" }), label: translate({ id: "home.stats.cost.label", message: "AI compute cost per generation session" }) },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({ id: "home.meta.title", message: "Almadar -- AI that builds software you can trust." })}
      description={translate({ id: "home.meta.desc", message: "From natural language to deployed, verified applications. Studio, Orb, and Masar work together so you describe once and ship everywhere." })}
    >
      <HeroSection
        tag={translate({ id: "home.hero.tag", message: "AI-Native Platform" })}
        title={translate({ id: "home.hero.title", message: "AI that builds software you can trust." })}
        subtitle={translate({ id: "home.hero.subtitle", message: "From natural language to deployed, verified applications. Studio, Orb, and Masar work together so you describe once and ship everywhere." })}
        primaryAction={{ label: translate({ id: "home.hero.cta1", message: "Try Studio" }), href: "https://studio.almadar.io" }}
        secondaryAction={{ label: translate({ id: "home.hero.cta2", message: "Read the Docs" }), href: "https://orb.almadar.io/docs" }}
        backgroundElement={<OrbitalHeroBackground intensity="full" />}
      />

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <Typography variant="h2">
            <Translate id="home.idea.title">How It Works</Translate>
          </Typography>
          <FeatureGrid items={HOW_IT_WORKS} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection background="alt">
        <VStack gap="lg" align="center" className="container">
          <Typography variant="h2">
            <Translate id="home.pillars.title">Our Products</Translate>
          </Typography>
          <FeatureGrid items={PRODUCTS} columns={2} />
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
        <ArticleSection title={translate({ id: "home.ai.title", message: "Built on Our Own Neural Models" })} maxWidth="md">
          <Typography variant="body" className="text-[var(--color-background)]/80">
            <Translate id="home.ai.text">
              Our neural pipeline understands software structure the way a chess engine understands board positions. Small, specialized models that predict errors, evaluate fixes, and generate valid software from scratch. LLMs handle natural language; our models handle correctness.
            </Translate>
          </Typography>
          <Link to="https://masar.almadar.io">
            <Button variant="primary" size="lg">
              <Translate id="home.ai.cta">Explore Masar</Translate>
            </Button>
          </Link>
        </ArticleSection>
      </ContentSection>

      <CTABanner
        title={translate({ id: "home.cta.title", message: "Ready to build?" })}
        subtitle={translate({ id: "home.cta.text", message: "Start with Orb. Build with Studio. Deploy on Almadar Services." })}
        primaryAction={{ label: translate({ id: "home.cta.start", message: "Try Studio" }), href: "https://studio.almadar.io" }}
        secondaryAction={{ label: translate({ id: "home.cta.vision", message: "Read the Vision" }), href: "/vision" }}
      />
    </Layout>
  );
}
