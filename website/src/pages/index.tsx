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
    logo: "/img/studio-icon.svg",
    title: translate({ id: "home.pillars.studio.title", message: "Almadar Studio" }),
    description: translate({ id: "home.pillars.studio.desc", message: "The builder where humans and AI agents collaborate to create software. Describe, generate, deploy." }),
    href: "https://studio.almadar.io",
    linkLabel: translate({ id: "home.pillars.studio.link", message: "Try Studio" }),
  },
  {
    logo: "/img/orb-icon-transparent.svg",
    title: translate({ id: "home.pillars.language.title", message: "Orb" }),
    description: translate({ id: "home.pillars.language.desc", message: "A formal language for describing how software behaves. Open source. AI-native. Compiler-verified." }),
    href: "https://orb.almadar.io",
    linkLabel: translate({ id: "home.pillars.language.link", message: "Explore the Language" }),
  },
  {
    logo: "/img/services-icon-transparent.svg",
    title: translate({ id: "home.pillars.services.title", message: "Almadar Services" }),
    description: translate({ id: "home.pillars.services.desc", message: "AI-native infrastructure. Compute, storage, authentication, event routing. Designed for agents." }),
    href: "https://services.almadar.io",
    linkLabel: translate({ id: "home.pillars.services.link", message: "View Services" }),
  },
  {
    logo: "/img/masar-icon.svg",
    title: translate({ id: "home.pillars.masar.title", message: "Masar" }),
    description: translate({ id: "home.pillars.masar.desc", message: "System 2 for AI agents. Planning, verification, and memory that makes any LLM smarter." }),
    href: "https://masar.almadar.io",
    linkLabel: translate({ id: "home.pillars.masar.link", message: "Explore Masar" }),
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
      title={translate({ id: "home.meta.title", message: "Software you control. Results you can verify." })}
      description={translate({ id: "home.meta.desc", message: "Almadar is a software development platform that replaces traditional and AI-assisted coding with a single, formal product definition called an Orb. Teams own their generated source code, choose their own AI models, and avoid vendor lock-in. Less code. More Orb." })}
    >
      <Box as="header" className="w-full min-h-[60vh] flex items-center relative overflow-hidden">
        <OrbitalHeroBackground intensity="full" />
        <Box className="site-container py-20 relative z-10">
          <VStack gap="lg" align="center">
            <Badge variant="primary">{translate({ id: "home.hero.tag", message: "Formal. Verified. Yours." })}</Badge>
            <Typography variant="h1" align="center">
              {translate({ id: "home.hero.title", message: "Software you control. Results you can verify." })}
            </Typography>
            <Typography variant="body1" color="muted" align="center" className="max-w-2xl">
              {translate({ id: "home.hero.subtitle", message: "Define your product once in an Orb. Get testable, auditable, production-ready applications. Own the code. Choose your models. Keep full control." })}
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
                {translate({ id: "home.cta.title", message: "Less code. More Orb." })}
              </Typography>
              <Typography variant="body" color="muted" align="center" className="max-w-2xl">
                {translate({ id: "home.cta.text", message: "Your entire team works from one living definition that evolves with your business. You own the code, choose your AI models, and keep full control. Launch in weeks, not months." })}
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
