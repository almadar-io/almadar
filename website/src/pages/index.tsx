import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Badge,
  Button,
  Icon,
  Card,
  SimpleGrid,
  AnimatedReveal,
} from "@almadar/ui/marketing";

import { OrbitalHeroBackground } from "../components/OrbitalHeroBackground";

const HOW_IT_WORKS = [
  {
    icon: "pen-line",
    title: translate({ id: "home.idea.describe", message: "Describe" }),
    description: translate({ id: "home.idea.describe.text", message: "Tell Studio what your product does. The AI agent builds the formal definition, or switch to manual mode for full control." }),
  },
  {
    icon: "check",
    title: translate({ id: "home.idea.prove", message: "Prove" }),
    description: translate({ id: "home.idea.prove.text", message: "The compiler checks every possible screen your app can reach, so users never hit a broken or missing page." }),
  },
  {
    icon: "rocket",
    title: translate({ id: "home.idea.deploy", message: "Deploy" }),
    description: translate({ id: "home.idea.deploy.text", message: "One definition compiles to web, mobile, or any future platform. You own the generated code. You keep full control." }),
  },
];

const BELIEFS = [
  {
    icon: "share-2",
    title: translate({ id: "home.beliefs.shared.title", message: "Shared, not siloed" }),
    description: translate({ id: "home.beliefs.shared.desc", message: "Software should coexist and coordinate across teams and organizations. One formal definition that everyone contributes to." }),
  },
  {
    icon: "bot",
    title: translate({ id: "home.beliefs.ai.title", message: "AI builds software, not just assists" }),
    description: translate({ id: "home.beliefs.ai.desc", message: "AI agents that build, deploy, and operate systems autonomously. Software designed from the ground up for machines to understand." }),
  },
  {
    icon: "shield-check",
    title: translate({ id: "home.beliefs.correct.title", message: "Correctness guaranteed" }),
    description: translate({ id: "home.beliefs.correct.desc", message: "If it compiles, it works. The compiler proves every possible state is valid before a single line of code runs." }),
  },
  {
    icon: "users",
    title: translate({ id: "home.beliefs.team.title", message: "One product, whole team" }),
    description: translate({ id: "home.beliefs.team.desc", message: "Engineers, designers, PMs, and QA work from one living definition. Everyone contributes. Everyone understands. No translation layers." }),
  },
];

const PRODUCTS = [
  {
    logo: "/img/studio-icon.svg",
    title: translate({ id: "home.pillars.studio.title", message: "Almadar Studio" }),
    description: translate({ id: "home.pillars.studio.desc", message: "Where humans and AI agents collaborate to create software. Every project is a Git repository. Every change is a commit. The AI is the developer. Git is the history." }),
    href: "https://studio.almadar.io",
    linkLabel: translate({ id: "home.pillars.studio.link", message: "Try Studio" }),
  },
  {
    logo: "/img/orb-icon-transparent.svg",
    title: translate({ id: "home.pillars.language.title", message: "Verified Compilation" }),
    description: translate({ id: "home.pillars.language.desc", message: "Your product definition compiles to web, mobile, or any future platform. The compiler proves every state is valid before a single line of code runs." }),
    href: "https://orb.almadar.io",
    linkLabel: translate({ id: "home.pillars.language.link", message: "Learn More" }),
  },
  {
    logo: "/img/services-icon-transparent.svg",
    title: translate({ id: "home.pillars.services.title", message: "Almadar Services" }),
    description: translate({ id: "home.pillars.services.desc", message: "AI-native infrastructure. Agents discover, understand, and provision services programmatically. Compute, storage, authentication, event routing. Humans get dashboards too." }),
    href: "https://services.almadar.io",
    linkLabel: translate({ id: "home.pillars.services.link", message: "View Services" }),
  },
  {
    logo: "/img/masar-icon.svg",
    title: translate({ id: "home.pillars.masar.title", message: "Masar" }),
    description: translate({ id: "home.pillars.masar.desc", message: "Our own trained neural models. 2M parameters that predict errors, evaluate repairs, and generate valid software structures. Not LLM wrappers." }),
    href: "https://masar.almadar.io",
    linkLabel: translate({ id: "home.pillars.masar.link", message: "Explore Masar" }),
  },
];

const STATS = [
  { value: translate({ id: "home.stats.behaviors.value", message: "116" }), label: translate({ id: "home.stats.behaviors.label", message: "Verified behaviors across 18 domains, from e-commerce to robotics" }) },
  { value: translate({ id: "home.stats.coverage.value", message: "100%" }), label: translate({ id: "home.stats.coverage.label", message: "State machine transition coverage verified before deployment" }) },
  { value: translate({ id: "home.stats.shells.value", message: "6" }), label: translate({ id: "home.stats.shells.label", message: "Target platforms from one definition: Web today, Mobile and Python underway, Rust, Kotlin, and Swift in the pipeline" }) },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({ id: "home.meta.title", message: "Blueprints for your AI" })}
      description={translate({ id: "home.meta.desc", message: "Almadar is a software development platform where engineers, designers, product managers, and QA teams collaborate on a single formal product definition to generate testable, auditable, production-ready applications. Unlike prompt-based AI code generators, Almadar verifies correctness before deployment. Teams own their generated source code, choose their own AI models, and have no vendor lock-in. The platform enhances existing roles rather than replacing them. Almadar reduces software launch timelines from months to weeks while guaranteeing testability, auditability, and formal verification at every stage." })}
    >
      <Box as="header" className="w-full min-h-[60vh] flex items-center relative overflow-hidden">
        <OrbitalHeroBackground intensity="full" />
        <Box className="site-container py-20 relative z-10">
          <VStack gap="lg" align="center">
            <Badge variant="primary">{translate({ id: "home.hero.tag", message: "Formal. Verified. Yours." })}</Badge>
            <Typography variant="h1" align="center">
              {translate({ id: "home.hero.title", message: "Blueprints for your AI" })}
            </Typography>
            <Typography variant="body1" color="muted" align="center" className="max-w-2xl">
              {translate({ id: "home.hero.subtitle", message: "Your product, defined and verified. Take back control." })}
            </Typography>
            <HStack gap="md">
              <a href="https://studio.almadar.io"><Button variant="primary" size="lg">{translate({ id: "home.hero.cta1", message: "Try Studio" })}</Button></a>
              <a href="https://orb.almadar.io/docs"><Button variant="secondary" size="lg">{translate({ id: "home.hero.cta2", message: "Read the Docs" })}</Button></a>
            </HStack>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <AnimatedReveal animation="fade-in">
              <Typography variant="h2">
                <Translate id="home.idea.title">How It Works</Translate>
              </Typography>
            </AnimatedReveal>
            <SimpleGrid cols={3} gap="lg">
              {HOW_IT_WORKS.map((item, i) => (
                <AnimatedReveal key={item.title} animation="fade-up" delay={i * 100} className="h-full">
                  <Card className="p-6 h-full">
                    <VStack gap="md">
                      <Icon name={item.icon} size={24} />
                      <Typography variant="h4">{item.title}</Typography>
                      <Typography variant="body" color="muted">{item.description}</Typography>
                    </VStack>
                  </Card>
                </AnimatedReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <AnimatedReveal animation="fade-in">
              <Typography variant="h2">
                <Translate id="home.beliefs.title">What We Believe</Translate>
              </Typography>
            </AnimatedReveal>
            <SimpleGrid cols={2} gap="lg">
              {BELIEFS.map((item, i) => (
                <AnimatedReveal key={item.title} animation="fade-up" delay={i * 100} className="h-full">
                  <Card className="p-6 h-full">
                    <VStack gap="md">
                      <Icon name={item.icon} size={24} />
                      <Typography variant="h4">{item.title}</Typography>
                      <Typography variant="body" color="muted">{item.description}</Typography>
                    </VStack>
                  </Card>
                </AnimatedReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <AnimatedReveal animation="fade-in">
              <Typography variant="h2">
                <Translate id="home.pillars.title">Our Products</Translate>
              </Typography>
            </AnimatedReveal>
            <SimpleGrid cols={2} gap="lg">
              {PRODUCTS.map((item, i) => (
                <AnimatedReveal key={item.title} animation="fade-up" delay={i * 100} className="h-full">
                  <Card className="p-6 h-full">
                    <VStack gap="md">
                      <img src={item.logo} alt={item.title} className="w-8 h-8" />
                      <Typography variant="h4">{item.title}</Typography>
                      <Typography variant="body" color="muted">{item.description}</Typography>
                      <a href={item.href}>
                        <Button variant="secondary" size="sm">{item.linkLabel}</Button>
                      </a>
                    </VStack>
                  </Card>
                </AnimatedReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <AnimatedReveal animation="fade-in">
              <Typography variant="h2">
                <Translate id="home.proof.title">Proven in Production</Translate>
              </Typography>
            </AnimatedReveal>
            <SimpleGrid cols={3} gap="lg">
              {STATS.map((stat, i) => (
                <AnimatedReveal key={stat.label} animation="scale-up" delay={i * 100}>
                  <VStack gap="sm" align="center">
                    <Typography variant="h2" color="primary">{stat.value}</Typography>
                    <Typography variant="body" color="muted" align="center">{stat.label}</Typography>
                  </VStack>
                </AnimatedReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <AnimatedReveal animation="fade-in">
        <Box className="w-full bg-[var(--color-surface)] py-16">
          <Box className="site-container">
            <VStack gap="lg" align="center">
              <Typography variant="h2" align="center">
                {translate({ id: "home.cta.title", message: "You own the code. You choose the models. You keep full control." })}
              </Typography>
              <Typography variant="body" color="muted" align="center" className="max-w-2xl">
                {translate({ id: "home.cta.text", message: "Your entire team works from one living definition that evolves with your business. Engineers architect instead of debug. Designers ship what they design. Launch in weeks, not months." })}
              </Typography>
              <HStack gap="md">
                <a href="https://studio.almadar.io"><Button variant="primary" size="lg">{translate({ id: "home.cta.start", message: "Try Studio" })}</Button></a>
                <a href="/vision"><Button variant="secondary" size="lg">{translate({ id: "home.cta.vision", message: "Read the Vision" })}</Button></a>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </AnimatedReveal>
    </Layout>
  );
}
