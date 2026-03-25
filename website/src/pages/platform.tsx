import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  SimpleGrid,
} from "@almadar/ui/marketing";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PILLARS = [
  {
    logo: "/img/orb-icon-transparent.svg",
    title: translate({ id: "platform.language.title", message: "Orb" }),
    description: translate({ id: "platform.language.desc", message: "A formal language for describing how software systems behave. Open source, compiler-verified, AI-native. Write entities, traits, and pages. The compiler guarantees correctness before generating code." }),
    href: "https://orb.almadar.io",
    linkLabel: translate({ id: "platform.language.link", message: "Language Docs" }),
  },
  {
    logo: "/img/studio-icon.svg",
    title: translate({ id: "platform.studio.title", message: "Almadar Studio" }),
    description: translate({ id: "platform.studio.desc", message: "The builder where humans and AI collaborate. Describe what you want in plain language, the AI agent generates a valid program. Edit visually or in code. Preview in real time. Deploy with one click." }),
    href: "https://kflow-builder-app.web.app/",
    linkLabel: translate({ id: "platform.studio.link", message: "Open Studio" }),
  },
  {
    logo: "/img/services-icon-transparent.svg",
    title: translate({ id: "platform.services.title", message: "Almadar Services" }),
    description: translate({ id: "platform.services.desc", message: "AI-native infrastructure for the agentic era. Compute, storage, authentication, event routing, LLM orchestration, and observability. Designed for applications that agents build and operate." }),
    href: "https://services.almadar.io",
    linkLabel: translate({ id: "platform.services.link", message: "View Services" }),
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
      <Box as="header" className="w-full min-h-[60vh] flex items-center relative overflow-hidden">
        <Box className="absolute right-8 top-[15%] w-full max-w-[400px] pointer-events-none hidden lg:flex items-start">
          <ThemedImage
            alt="Application Topology"
            sources={{
              light: useBaseUrl('/img/illustrations/Application-light.svg'),
              dark: useBaseUrl('/img/illustrations/Application-dark.svg'),
            }}
            className="w-full opacity-90 drop-shadow-2xl"
          />
        </Box>
        <Box className="site-container py-20 relative z-10">
          <VStack gap="lg" align="start">
            <Typography variant="h1">
              {translate({ id: "platform.hero.title", message: "The Platform" })}
            </Typography>
            <Typography variant="body1" color="muted" className="max-w-2xl">
              {translate({ id: "platform.hero.subtitle", message: "Three pillars, one goal: turn formal descriptions of software into running applications." })}
            </Typography>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <SimpleGrid cols={3} gap="lg">
              {PILLARS.map((item) => (
                <Card key={item.title} className="p-6">
                  <VStack gap="md">
                    <img src={item.logo} alt={item.title} className="w-8 h-8" />
                    <Typography variant="h4">{item.title}</Typography>
                    <Typography variant="body" color="muted">{item.description}</Typography>
                    <a href={item.href}>
                      <Button variant="secondary" size="sm">{item.linkLabel}</Button>
                    </a>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <SimpleGrid cols={3} gap="lg">
            {STEPS.map((step, i) => (
              <VStack key={step.title} gap="sm" align="center">
                <Box className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm leading-none">{i + 1}</span>
                </Box>
                <Typography variant="h4" align="center">{step.title}</Typography>
                <Typography variant="body" color="muted" align="center">{step.description}</Typography>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-surface)] py-16">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <Typography variant="h2" align="center">
              {translate({ id: "platform.cta.title", message: "Start Anywhere" })}
            </Typography>
            <Typography variant="body" color="muted" align="center">
              {translate({ id: "platform.cta.text", message: "Try the builder, explore the infrastructure, or dive into the language. Each product works on its own. Together, they form a complete platform." })}
            </Typography>
            <HStack gap="md">
              <a href="https://studio.almadar.io"><Button variant="primary" size="lg">{translate({ id: "platform.cta.studio", message: "Try Studio" })}</Button></a>
              <a href="https://orb.almadar.io"><Button variant="secondary" size="lg">{translate({ id: "platform.cta.docs", message: "Explore Orb" })}</Button></a>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}
