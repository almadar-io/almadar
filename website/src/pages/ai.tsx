import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection,
  ContentSection,
  FeatureGrid,
  StepFlow,
  StatsGrid,
  ArticleSection,
  VStack,
  Typography,
  Button,
  Box,
} from "@almadar/ui/marketing";
import { AIGenerates } from "@almadar/ui/illustrations";

const CAPABILITIES = [
  {
    icon: "target",
    title: translate({ id: "ai.caps.plan.title", message: "Planning" }),
    description: translate({ id: "ai.caps.plan.desc", message: "Masar knows 93 behavioral patterns across 18 domains. Given a partial result and a goal, it produces dependency-ordered instructions with exact parameters. The LLM does not guess what to build. Masar tells it." }),
  },
  {
    icon: "shield-check",
    title: translate({ id: "ai.caps.verify.title", message: "Verification" }),
    description: translate({ id: "ai.caps.verify.desc", message: "Predicts validity in under 5ms without running the compiler. Catches 20 categories of structural errors. When something fails, beam search finds the optimal repair sequence entirely in latent space." }),
  },
  {
    icon: "database",
    title: translate({ id: "ai.caps.memory.title", message: "Memory" }),
    description: translate({ id: "ai.caps.memory.desc", message: "Stores agent experiences as structured episodes. Clusters similar episodes into reusable patterns over time. Your agent builds expertise from its own work, without retraining." }),
  },
];

const PIPELINE_STEPS = [
  { title: translate({ id: "ai.pipe.embed.title", message: "Embed" }), description: translate({ id: "ai.pipe.embed.desc", message: "Masar converts the current state into a compact representation that captures structural topology. Similar problems land in the same region of the representation space." }) },
  { title: translate({ id: "ai.pipe.match.title", message: "Match" }), description: translate({ id: "ai.pipe.match.desc", message: "Finds the closest known pattern from the library. 93 behaviors across e-commerce, healthcare, CRM, project management, games, and 12 more domains." }) },
  { title: translate({ id: "ai.pipe.plan.title", message: "Plan" }), description: translate({ id: "ai.pipe.plan.desc", message: "Computes the structural difference between where you are and where you need to be. Decomposes it into 7 dependency levels of parameterized instructions." }) },
  { title: translate({ id: "ai.pipe.verify.title", message: "Verify" }), description: translate({ id: "ai.pipe.verify.desc", message: "After each step, predicts validity and error categories. Catches problems before the LLM compounds them. When errors occur, beam search finds the shortest repair path." }) },
  { title: translate({ id: "ai.pipe.remember.title", message: "Remember" }), description: translate({ id: "ai.pipe.remember.desc", message: "Stores the completed result as an episode. Over time, episodes cluster into new patterns. The 93 hand-authored behaviors are just the seed. The library grows from experience." }) },
];

const STATS = [
  { value: "< 5ms", label: translate({ id: "ai.stats.latency", message: "Planning latency" }) },
  { value: "94%", label: translate({ id: "ai.stats.accuracy", message: "Validity prediction accuracy" }) },
  { value: "93", label: translate({ id: "ai.stats.patterns", message: "Built-in behavioral patterns" }) },
  { value: "18", label: translate({ id: "ai.stats.domains", message: "Domains covered" }) },
  { value: "20", label: translate({ id: "ai.stats.errors", message: "Error categories detected" }) },
  { value: "6", label: translate({ id: "ai.stats.endpoints", message: "API endpoints" }) },
];

export default function AI(): ReactNode {
  return (
    <Layout
      title={translate({ id: "ai.meta.title", message: "AI -- Masar: System 2 for AI Agents" })}
      description={translate({ id: "ai.meta.desc", message: "Masar gives AI agents structured planning, instant verification, and experience-based memory. The world model that makes any LLM agent smarter." })}
    >
      <HeroSection
        tag={translate({ id: "ai.hero.tag", message: "Masar" })}
        title={translate({ id: "ai.hero.title", message: "System 2 for AI Agents" })}
        subtitle={translate({ id: "ai.hero.subtitle", message: "Your LLM is fast and intuitive but cannot plan, verify, or remember. Masar gives it a world model: structured planning, instant verification, and experience-based memory." })}
        primaryAction={{ label: translate({ id: "ai.hero.cta1", message: "Get Started" }), href: "https://masar.almadar.io/docs/getting-started/quickstart" }}
        secondaryAction={{ label: translate({ id: "ai.hero.cta2", message: "View API" }), href: "https://masar.almadar.io/docs/api-reference/planning" }}
      />

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="ai.caps.title">Three Capabilities LLMs Lack</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="ai.caps.subtitle">LLMs generate text. Masar understands structure.</Translate>
            </Typography>
          </VStack>
          <Box className="flex justify-center py-8 opacity-80"><AIGenerates className="w-full max-w-2xl" /></Box>
          <FeatureGrid items={CAPABILITIES} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection background="alt">
        <VStack gap="lg" align="center" className="container">
          <Typography variant="h2">
            <Translate id="ai.pipe.title">How Masar Works</Translate>
          </Typography>
          <StepFlow steps={PIPELINE_STEPS} orientation="horizontal" showConnectors />
        </VStack>
      </ContentSection>

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <Typography variant="h2">
            <Translate id="ai.stats.title">By the Numbers</Translate>
          </Typography>
          <StatsGrid stats={STATS} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection background="dark">
        <ArticleSection title={translate({ id: "ai.sys2.title", message: "Thinking, Fast and Slow" })} maxWidth="md">
          <Typography variant="body" className="text-[var(--color-background)]/80">
            <Translate id="ai.sys2.p1">
              Daniel Kahneman's research showed that human cognition has two systems. System 1 is fast, intuitive, and associative. System 2 is slow, deliberate, and structural. You need both to make good decisions.
            </Translate>
          </Typography>
          <Typography variant="body" className="text-[var(--color-background)]/80">
            <Translate id="ai.sys2.p2">
              LLMs are System 1. They respond instantly, pattern-match from training data, and generate fluent text. But they cannot plan multi-step processes, verify structural correctness, or learn from their own experience. That is System 2.
            </Translate>
          </Typography>
          <Typography variant="body" className="text-[var(--color-background)]/80">
            <Translate id="ai.sys2.p3">
              Masar is System 2 for any LLM agent. It handles the deliberate, structural thinking that language models cannot do. The LLM handles language and generation. Masar handles planning, verification, and memory. Together, they form a complete agent.
            </Translate>
          </Typography>
          <Link href="https://masar.almadar.io">
            <Button variant="primary" size="lg">
              <Translate id="ai.sys2.cta">Explore Masar</Translate>
            </Button>
          </Link>
        </ArticleSection>
      </ContentSection>
    </Layout>
  );
}
