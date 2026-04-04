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
  SimpleGrid,
  AnimatedReveal,
  FeatureCard,
} from "@almadar/ui/marketing";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface PhaseItem {
  title: string;
  description: string;
  icon: string;
}

interface Phase {
  id: string;
  number: string;
  title: string;
  timeline: string;
  status: "active" | "upcoming" | "future";
  tagline: string;
  items: PhaseItem[];
}

const PHASES: Phase[] = [
  {
    id: "p1",
    number: "1",
    title: translate({ id: "roadmap.p1.title", message: "Studio V2 Ecosystem" }),
    timeline: translate({ id: "roadmap.p1.timeline", message: "April 2026" }),
    status: "active",
    tagline: translate({ id: "roadmap.p1.tagline", message: "Ship the builder and its full ecosystem." }),
    items: [
      { title: translate({ id: "roadmap.p1.masar", message: "Masar in Studio" }), description: translate({ id: "roadmap.p1.masar.desc", message: "Live JEPA gap diagnosis during building. Beam repair visualization when validation fails." }), icon: "brain" },
      { title: translate({ id: "roadmap.p1.extension", message: "Chrome Extension" }), description: translate({ id: "roadmap.p1.extension.desc", message: "UI capture, console debugging, deployment verification, interaction recording." }), icon: "chrome" },
      { title: translate({ id: "roadmap.p1.converter", message: "Converter Pipeline" }), description: translate({ id: "roadmap.p1.converter.desc", message: "Reverse-engineer existing apps into .orb programs. Tree-sitter AST extraction, Playwright crawling." }), icon: "refresh-cw" },
      { title: translate({ id: "roadmap.p1.cli", message: "Orb CLI V2" }), description: translate({ id: "roadmap.p1.cli.desc", message: "Production-ready serve and dev commands. Local LLM fallback. Template library." }), icon: "terminal" },
      { title: translate({ id: "roadmap.p1.verify", message: "Verification V2" }), description: translate({ id: "roadmap.p1.verify.desc", message: "Visual regression testing. Performance baselines. AI-assisted test generation." }), icon: "shield-check" },
    ],
  },
  {
    id: "p2",
    number: "2",
    title: translate({ id: "roadmap.p2.title", message: "Platform Gaps" }),
    timeline: translate({ id: "roadmap.p2.timeline", message: "June - August 2026" }),
    status: "upcoming",
    tagline: translate({ id: "roadmap.p2.tagline", message: "Close gaps, harden the platform, go mobile." }),
    items: [
      { title: translate({ id: "roadmap.p2.entity", message: "Entity Binding V2" }), description: translate({ id: "roadmap.p2.entity.desc", message: "Explicit bindings, lambda render props, backward compatibility." }), icon: "database" },
      { title: translate({ id: "roadmap.p2.mobile", message: "Mobile (React Native)" }), description: translate({ id: "roadmap.p2.mobile.desc", message: "Native mobile component library. Same definition, native output." }), icon: "smartphone" },
      { title: translate({ id: "roadmap.p2.games", message: "Game Components" }), description: translate({ id: "roadmap.p2.games.desc", message: "16 game atoms, 19 game molecules. Canvas and DOM hybrid rendering." }), icon: "gamepad-2" },
      { title: translate({ id: "roadmap.p2.parity", message: "Cross-Shell Parity" }), description: translate({ id: "roadmap.p2.parity.desc", message: "TypeScript, Python, Rust, Android, Swift shells produce identical behavior." }), icon: "git-compare" },
    ],
  },
  {
    id: "p3",
    number: "3",
    title: translate({ id: "roadmap.p3.title", message: "Agent Trace" }),
    timeline: translate({ id: "roadmap.p3.timeline", message: "August - October 2026" }),
    status: "upcoming",
    tagline: translate({ id: "roadmap.p3.tagline", message: "Enterprise-grade agent monitoring as a standalone product." }),
    items: [
      { title: translate({ id: "roadmap.p3.standalone", message: "Standalone Package" }), description: translate({ id: "roadmap.p3.standalone.desc", message: "Extract agent-trace into its own product. Multi-tenant, team workspaces." }), icon: "package" },
      { title: translate({ id: "roadmap.p3.monitoring", message: "Enterprise Monitoring" }), description: translate({ id: "roadmap.p3.monitoring.desc", message: "Real-time chain-of-thought, tool call timeline, cost tracking, gate progress." }), icon: "activity" },
      { title: translate({ id: "roadmap.p3.replay", message: "Replay + Analytics" }), description: translate({ id: "roadmap.p3.replay.desc", message: "Re-run agent sessions. Cost trends, success rates, failure patterns." }), icon: "history" },
      { title: translate({ id: "roadmap.p3.pricing", message: "Tiered Pricing" }), description: translate({ id: "roadmap.p3.pricing.desc", message: "Free, Team, and Enterprise tiers. SSO, audit logs, custom retention." }), icon: "credit-card" },
    ],
  },
  {
    id: "p4",
    number: "4",
    title: translate({ id: "roadmap.p4.title", message: "ML/AI Ecosystem" }),
    timeline: translate({ id: "roadmap.p4.timeline", message: "August - October 2026" }),
    status: "upcoming",
    tagline: translate({ id: "roadmap.p4.tagline", message: "Train and deploy custom ML models from Studio." }),
    items: [
      { title: translate({ id: "roadmap.p4.python", message: "Python Shell Production" }), description: translate({ id: "roadmap.p4.python.desc", message: "Production deployment pipeline for Python-compiled orbitals with PyTorch." }), icon: "code" },
      { title: translate({ id: "roadmap.p4.mlops", message: "ML Operators" }), description: translate({ id: "roadmap.p4.mlops.desc", message: "nn/*, tensor/*, train/*, data/* operators as first-class citizens." }), icon: "cpu" },
      { title: translate({ id: "roadmap.p4.composer", message: "Studio ML Composer" }), description: translate({ id: "roadmap.p4.composer.desc", message: "Visual ML behavior composition. Training dashboards. Dataset management." }), icon: "layers" },
      { title: translate({ id: "roadmap.p4.registry", message: "Model Registry" }), description: translate({ id: "roadmap.p4.registry.desc", message: "Trained models versioned alongside their definitions. One-click deploy." }), icon: "archive" },
    ],
  },
];

const FUTURE_PHASES = [
  { number: "5", title: translate({ id: "roadmap.p5.title", message: "Embedded + OS" }), description: translate({ id: "roadmap.p5.desc", message: "Rust embedded shell, no_std runtime for microcontrollers, hardware trait machines, IPC effects." }), icon: "cpu" },
  { number: "6", title: translate({ id: "roadmap.p6.title", message: "OrbOS" }), description: translate({ id: "roadmap.p6.desc", message: "Linux-based OS where Orb is the native programming model. System services as orbitals." }), icon: "monitor" },
  { number: "7", title: translate({ id: "roadmap.p7.title", message: "Robotics" }), description: translate({ id: "roadmap.p7.desc", message: "Real-time trait machines for physical control. Sensor fusion, safety verification, multi-robot coordination." }), icon: "bot" },
];

// ---------------------------------------------------------------------------
// Timeline node component (SSR-safe, mirrors Timeline organism visuals)
// ---------------------------------------------------------------------------

function TimelinePhase({ phase, isLast }: { phase: Phase; isLast: boolean }) {
  const isActive = phase.status === "active";
  const dotColor = isActive ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]";
  const lineColor = isActive ? "bg-[var(--color-primary)] opacity-30" : "bg-[var(--color-border)] opacity-40";

  return (
    <AnimatedReveal animation="fade-up">
      <Box className="flex flex-row gap-6">
        {/* Track: dot + vertical line */}
        <Box className="flex flex-col items-center flex-shrink-0" style={{ width: 24 }}>
          <Box className={`w-3 h-3 rounded-full ${dotColor} flex-shrink-0 mt-2`} />
          {!isLast && <Box className={`w-0.5 flex-1 ${lineColor}`} style={{ minHeight: 40 }} />}
        </Box>

        {/* Content */}
        <VStack gap="md" className="flex-1 pb-12">
          <VStack gap="xs">
            <HStack gap="sm">
              <Typography variant="small" color="muted">{phase.timeline}</Typography>
              <Badge variant={isActive ? "primary" : "neutral"} size="sm">
                {isActive
                  ? translate({ id: "roadmap.status.active", message: "In Progress" })
                  : translate({ id: "roadmap.status.upcoming", message: "Upcoming" })}
              </Badge>
            </HStack>
            <Typography variant="h3">{phase.title}</Typography>
            <Typography variant="body" color="muted">{phase.tagline}</Typography>
          </VStack>

          <SimpleGrid cols={2} gap="md">
            {phase.items.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                variant="bordered"
                size="sm"
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </AnimatedReveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Roadmap(): ReactNode {
  return (
    <Layout
      title={translate({ id: "roadmap.meta.title", message: "Roadmap" })}
      description={translate({ id: "roadmap.meta.desc", message: "One definition. Every platform. Proven correct. See what's next for Almadar." })}
    >
      {/* Hero */}
      <Box as="header" className="w-full flex items-center">
        <Box className="site-container py-20">
          <VStack gap="lg" align="start">
            <Badge variant="primary">{translate({ id: "roadmap.hero.tag", message: "Roadmap" })}</Badge>
            <Typography variant="h1">
              {translate({ id: "roadmap.hero.title", message: "What We're Building" })}
            </Typography>
            <Typography variant="body1" color="muted" className="max-w-2xl">
              {translate({ id: "roadmap.hero.subtitle", message: "One definition. Every platform. Proven correct." })}
            </Typography>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      {/* Timeline */}
      <Box className="w-full py-16">
        <Box className="site-container">
          {PHASES.map((phase, i) => (
            <TimelinePhase key={phase.id} phase={phase} isLast={i === PHASES.length - 1} />
          ))}
        </Box>
      </Box>

      <Box className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      {/* Future */}
      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <AnimatedReveal animation="fade-in">
              <VStack gap="sm" align="center">
                <Typography variant="h2">
                  <Translate id="roadmap.future.title">Beyond 2026</Translate>
                </Typography>
                <Typography variant="body" color="muted" className="max-w-xl text-center">
                  <Translate id="roadmap.future.subtitle">
                    The language stays the same. The compiler adds shells. The verification expands scope.
                  </Translate>
                </Typography>
              </VStack>
            </AnimatedReveal>

            <SimpleGrid cols={3} gap="lg">
              {FUTURE_PHASES.map((phase, i) => (
                <AnimatedReveal key={phase.title} animation="fade-up" delay={i * 100} className="h-full">
                  <FeatureCard
                    icon={phase.icon}
                    title={phase.title}
                    description={phase.description}
                    variant="bordered"
                    className="h-full"
                  />
                </AnimatedReveal>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      {/* CTA */}
      <AnimatedReveal animation="fade-in">
        <Box className="w-full py-16">
          <Box className="site-container">
            <VStack gap="lg" align="center">
              <Typography variant="h2" align="center">
                {translate({ id: "roadmap.cta.title", message: "Start building today." })}
              </Typography>
              <Typography variant="body" color="muted" align="center" className="max-w-xl">
                {translate({ id: "roadmap.cta.text", message: "Everything on this roadmap builds on the same foundation: one definition that compiles to every platform. The best way to understand it is to try it." })}
              </Typography>
              <HStack gap="md">
                <a href="https://studio.almadar.io"><Button variant="primary" size="lg">{translate({ id: "roadmap.cta.studio", message: "Try Studio" })}</Button></a>
                <a href="https://orb.almadar.io/docs"><Button variant="secondary" size="lg">{translate({ id: "roadmap.cta.docs", message: "Read the Docs" })}</Button></a>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </AnimatedReveal>
    </Layout>
  );
}
