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
      title={translate({ id: "vision.meta.title", message: "Vision — Software Built for Humans" })}
      description={translate({
        id: "vision.meta.desc",
        message: "Almadar Studio is built so small teams can ship what large companies ship. Humans stay in control. AI assists. Open source. No vendor lock-in.",
      })}
    >
      {/* Hero */}
      <Box as="header" className="w-full flex items-center">
        <Box className="site-container py-20">
          <VStack gap="lg" align="start">
            <Typography variant="h1">
              {translate({ id: "vision.hero.title", message: "Software built for humans." })}
            </Typography>
            <Typography variant="body1" color="muted" className="max-w-2xl">
              {translate({
                id: "vision.hero.subtitle",
                message: "AI helps. People decide. Open by default. Yours to keep.",
              })}
            </Typography>
          </VStack>
        </Box>
      </Box>

      {/* Why we started Almadar */}
      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <HStack gap="xl" align="start" responsive>
            <VStack gap="lg" className="flex-1">
              <Typography variant="h2">
                {translate({ id: "vision.letter.title", message: "Why we started Almadar." })}
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.letter.p1">
                  We started Almadar to help startups and small teams achieve what large companies can. After more than 15 years of building digital products, we kept seeing the same thing: small teams blocked by tooling that was either too rigid or too magical to trust.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.letter.p2">
                  We believe people must be at the center of the upcoming AI revolution, not an afterthought. That is why Almadar Studio is the product builder for humans first, with AI as an assistant.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.letter.p3">
                  We are big believers in digital sovereignty. Open models and open source are the way forward. Almadar Studio is built on fully open-source code, and our clients have no vendor lock-in. Our goal is to empower people to build products limited only by their imagination, and to give them the edge they need to stand out.
                </Translate>
              </Typography>
              <Box className="border-l-[4px] border-[var(--color-primary)] bg-[var(--color-accent)]/5 p-4 rounded-r-[var(--radius-md)] mt-2">
                <Typography variant="body1" color="muted" className="italic">
                  {translate({
                    id: "vision.letter.pullquote",
                    message: "Humans first. AI as the assistant. Open source from the ground up.",
                  })}
                </Typography>
              </Box>
            </VStack>
            <Box className="flex-1 max-w-[280px]">
              <ThemedImage
                alt="Composite Orbital illustration"
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

      {/* One source of truth */}
      <Box className="w-full py-24">
        <Box className="site-container">
          <HStack gap="xl" align="center" responsive>
            <VStack gap="lg" className="flex-1">
              <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                {translate({ id: "vision.truth.kicker", message: "One source of truth" })}
              </Typography>
              <Typography variant="h2">
                {translate({
                  id: "vision.truth.title",
                  message: "Define your product once. Use it everywhere.",
                })}
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.truth.p1">
                  In Almadar, you describe your product once. What it contains, the rules that govern it, what happens when. That description is the source of truth, and it stays alive as your product grows.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.truth.p2">
                  Everything else flows from that one definition. The product runs from it as full-stack code you can read, deploy, and own. Your documentation reads from it, so what your team sees in the wiki always matches what is running in production. AI agents read from it too, so they understand your business by reading the same thing your team does.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.truth.p3">
                  Most tools generate code from a prompt and forget. Almadar keeps the definition at the center, and lets you export it wherever you need it: code, documentation, and the AI agents that operate on top of your business.
                </Translate>
              </Typography>
              <Box className="border-l-[4px] border-[var(--color-primary)] bg-[var(--color-accent)]/5 p-4 rounded-r-[var(--radius-md)]">
                <Typography variant="body1" color="muted" className="italic">
                  {translate({
                    id: "vision.truth.pullquote",
                    message: "One definition. Code, docs, and AI all read the same thing.",
                  })}
                </Typography>
              </Box>
            </VStack>
            <Box className="flex-1 max-w-[280px]">
              <ThemedImage
                alt="Entity illustration"
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

      <Box className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      {/* Open by default, yours by design */}
      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <HStack gap="xl" align="center" responsive>
            <Box className="flex-1 max-w-[280px] lg:pl-8">
              <ThemedImage
                alt="Application illustration"
                sources={{
                  light: useBaseUrl('/img/illustrations/Application-light.svg'),
                  dark: useBaseUrl('/img/illustrations/Application-dark.svg'),
                }}
                className="w-full opacity-90"
              />
            </Box>
            <VStack gap="lg" className="flex-1">
              <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                {translate({ id: "vision.open.kicker", message: "Digital sovereignty" })}
              </Typography>
              <Typography variant="h2">
                {translate({ id: "vision.open.title", message: "Open by default. Yours by design." })}
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.open.p1">
                  Almadar is open source from top to bottom. The tools you build with, the code we generate, and the platform that runs them are all open and inspectable. Nothing locks you in. Nothing holds your data hostage. No contract stops you from walking away.
                </Translate>
              </Typography>
              <Typography variant="body" className="max-w-prose">
                <Translate id="vision.open.p2">
                  You own the generated code. You choose the AI model. You decide where it runs. Almadar exists to give a small team the leverage of a large one, not to make them dependent on us.
                </Translate>
              </Typography>
              <Box className="border-l-[4px] border-[var(--color-primary)] bg-[var(--color-accent)]/5 p-4 rounded-r-[var(--radius-md)]">
                <Typography variant="body1" color="muted" className="italic">
                  {translate({
                    id: "vision.open.pullquote",
                    message: "Build limited only by your imagination, not by what your tools allow.",
                  })}
                </Typography>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Box>

      {/* CTA */}
      <Box className="w-full py-16">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <Typography variant="h2" align="center">
              {translate({ id: "vision.cta.title", message: "Build with us." })}
            </Typography>
            <Typography variant="body" color="muted" align="center" className="max-w-2xl">
              {translate({
                id: "vision.cta.text",
                message: "Bring an idea, a half-built MVP, or a product looking for its next chapter. Studio takes it from there.",
              })}
            </Typography>
            <HStack gap="md">
              <a href="https://kflow-builder-app.web.app"><Button variant="primary" size="lg">{translate({ id: "vision.cta.studio", message: "Try Studio" })}</Button></a>
              <a href="mailto:osama@almadar.io"><Button variant="secondary" size="lg">{translate({ id: "vision.cta.contact", message: "Get in touch" })}</Button></a>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}
