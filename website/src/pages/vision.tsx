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
} from "@almadar/ui/marketing";
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Vision(): ReactNode {
  return (
    <Layout
      title={translate({ id: "vision.meta.title", message: "Vision — A Shared Digital Reality" })}
      description={translate({ id: "vision.meta.desc", message: "Software that coexists, coordinates, and evolves together. Communities keeping ownership. Composable world models." })}
    >
      <Box as="header" className="w-full flex items-center">
        <Box className="site-container py-20">
          <VStack gap="lg" align="start">
            <Typography variant="h1">
              {translate({ id: "vision.hero.title", message: "A Shared Digital Reality" })}
            </Typography>
            <Typography variant="body1" color="muted" className="max-w-2xl">
              {translate({ id: "vision.hero.subtitle", message: "Software that coexists, coordinates, and evolves together." })}
            </Typography>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <HStack gap="xl" align="center" responsive>
            <VStack gap="lg" className="flex-1">
              <Typography variant="h2">
                {translate({ id: "vision.coexist.title", message: "Software That Coexists" })}
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.coexist.p1">
                  Today, every application is an island. It has its own data model, its own rules, its own language. Moving information between systems means building bridges that break every time either side changes.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.coexist.p2">
                  We believe software should share a common grammar. The idea flows seamlessly: a nurse identifies a need on the floor, and that domain knowledge translates directly into a formal product definition. Data flows without translation layers. Rules compose without glue code.
                </Translate>
              </Typography>
              <Box className="border-l-[4px] border-[var(--color-primary)] bg-[var(--color-accent)]/5 p-4 rounded-r-[var(--radius-md)]">
                <Typography variant="body1" color="muted" className="italic">
                  {translate({ id: "vision.coexist.pullquote", message: "Domain knowledge translates directly into code. No translation layers. No glue code." })}
                </Typography>
              </Box>
            </VStack>
            <Box className="flex-1 max-w-[280px]">
              <ThemedImage
                alt="Vision Composite Orbital"
                sources={{
                  light: useBaseUrl('/img/illustrations/Composite_Orbital-light.svg'),
                  dark: useBaseUrl('/img/illustrations/Composite_Orbital-dark.svg'),
                }}
                className="w-full opacity-90"
              />
            </Box>
          </HStack>
        </Box>
      </Box>

      <Box className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <HStack gap="xl" align="center" responsive>
            <Box className="flex-1 max-w-[280px] lg:pl-8">
              <ThemedImage
                alt="Vision Application"
                sources={{
                  light: useBaseUrl('/img/illustrations/Application-light.svg'),
                  dark: useBaseUrl('/img/illustrations/Application-dark.svg'),
                }}
                className="w-full opacity-90"
              />
            </Box>
            <VStack gap="lg" className="flex-1">
              <Typography variant="h2">
                {translate({ id: "vision.ownership.title", message: "Communities Keep Ownership" })}
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.ownership.p1">
                  The current model concentrates power and wastes immense resources. A few platforms own the tools, the data, and the distribution, creating heavy, inefficient silos. Communities that build on those platforms rent their digital presence at a high cost, both financially and ecologically.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.ownership.p2">
                  Almadar changes this with an efficiency-first, "Go Green" philosophy. Orb is open source. The standard library is open source. When a community describes their domain formally, they build lightweight, efficient models that they own. They can compile to any platform, host sustainably anywhere, and evolve on their own terms.
                </Translate>
              </Typography>
              <Box className="border-l-[4px] border-[var(--color-primary)] bg-[var(--color-accent)]/5 p-4 rounded-r-[var(--radius-md)]">
                <Typography variant="body1" color="muted" className="italic">
                  {translate({ id: "vision.ownership.pullquote", message: "Communities build lightweight models they own. Compile to any platform. Evolve on their own terms." })}
                </Typography>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Box>

      <Box className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <Box className="w-full py-24">
        <Box className="site-container">
          <HStack gap="xl" align="center" responsive>
            <VStack gap="lg" className="flex-1">
              <Typography variant="h2">
                {translate({ id: "vision.models.title", message: "Composable World Models" })}
              </Typography>
              <Typography variant="body" color="muted" className="max-w-prose">
                <Translate id="vision.models.p1">A world model is a formal description of how a domain works: what exists, how it changes, what the rules are. A healthcare scheduling system and an inventory tracker are both world models. They can be validated independently and composed together.</Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.models.p2">
                  This is the long game. When enough domains have formal models, software stops being a collection of isolated programs and becomes a shared, interoperable digital reality. Each model is a building block. Each composition creates something new.
                </Translate>
              </Typography>
            </VStack>
            <Box className="flex-1 max-w-[280px]">
              <ThemedImage
                alt="Systems Emitting and Listening"
                sources={{
                  light: useBaseUrl('/img/illustrations/Entity-light.svg'),
                  dark: useBaseUrl('/img/illustrations/Entity-dark.svg'),
                }}
                className="w-full opacity-90"
              />
            </Box>
          </HStack>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-surface)] py-16">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <Typography variant="h2" align="center">
              {translate({ id: "vision.cta.title", message: "Build With Us" })}
            </Typography>
            <Typography variant="body" color="muted" align="center">
              {translate({ id: "vision.cta.text", message: "The shared digital reality starts with the first model. Build yours." })}
            </Typography>
            <HStack gap="md">
              <a href="https://orb.almadar.io"><Button variant="primary" size="lg">{translate({ id: "vision.cta.language", message: "Explore the Language" })}</Button></a>
              <a href="/contact"><Button variant="secondary" size="lg">{translate({ id: "vision.cta.contact", message: "Get in Touch" })}</Button></a>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}
