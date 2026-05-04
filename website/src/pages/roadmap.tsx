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
  title: string;
  timeline: string;
  status: "active" | "upcoming" | "future";
  tagline: string;
  items: PhaseItem[];
}

const PHASES: Phase[] = [
  {
    id: "p1",
    title: translate({ id: "roadmap.p1.title", message: "Studio V2 Ecosystem" }),
    timeline: translate({ id: "roadmap.p1.timeline", message: "April 2026" }),
    status: "active",
    tagline: translate({ id: "roadmap.p1.tagline", message: "Ship the builder and its full ecosystem." }),
    items: [
      { title: translate({ id: "roadmap.p1.masar", message: "AI-Guided Building" }), description: translate({ id: "roadmap.p1.masar.desc", message: "The AI diagnoses what's missing in your product and suggests exactly what to add next." }), icon: "brain" },
      { title: translate({ id: "roadmap.p1.extension", message: "Browser Companion" }), description: translate({ id: "roadmap.p1.extension.desc", message: "Capture any existing UI, verify your deployed app, and record user interactions from your browser." }), icon: "globe" },
      { title: translate({ id: "roadmap.p1.converter", message: "Import Existing Apps" }), description: translate({ id: "roadmap.p1.converter.desc", message: "Point at any existing website or codebase and convert it into a verified product definition." }), icon: "refresh-cw" },
      { title: translate({ id: "roadmap.p1.cli", message: "Developer CLI" }), description: translate({ id: "roadmap.p1.cli.desc", message: "Build from your terminal. Local development server, project templates, and offline AI support." }), icon: "terminal" },
      { title: translate({ id: "roadmap.p1.verify", message: "Automated Testing" }), description: translate({ id: "roadmap.p1.verify.desc", message: "Visual regression testing, performance tracking, and AI-generated test cases for every product change." }), icon: "shield-check" },
    ],
  },
  {
    id: "p2",
    title: translate({ id: "roadmap.p2.title", message: "Every Platform" }),
    timeline: translate({ id: "roadmap.p2.timeline", message: "June - August 2026" }),
    status: "upcoming",
    tagline: translate({ id: "roadmap.p2.tagline", message: "One product definition. Web, mobile, and beyond." }),
    items: [
      { title: translate({ id: "roadmap.p2.mobile", message: "Native Mobile Apps" }), description: translate({ id: "roadmap.p2.mobile.desc", message: "Your product definition compiles to native iOS and Android. Same definition, native experience." }), icon: "smartphone" },
      { title: translate({ id: "roadmap.p2.games", message: "Interactive Experiences" }), description: translate({ id: "roadmap.p2.games.desc", message: "Games, simulations, and rich interactive content from the same builder." }), icon: "gamepad-2" },
      { title: translate({ id: "roadmap.p2.parity", message: "Multi-Platform Parity" }), description: translate({ id: "roadmap.p2.parity.desc", message: "Web, mobile, Python, Rust, and Swift targets all produce identical verified behavior." }), icon: "git-compare" },
    ],
  },
  {
    id: "p3",
    title: translate({ id: "roadmap.p3.title", message: "Agent Monitoring" }),
    timeline: translate({ id: "roadmap.p3.timeline", message: "August - October 2026" }),
    status: "upcoming",
    tagline: translate({ id: "roadmap.p3.tagline", message: "See exactly what your AI agents are doing and why." }),
    items: [
      { title: translate({ id: "roadmap.p3.monitoring", message: "Live Agent Dashboard" }), description: translate({ id: "roadmap.p3.monitoring.desc", message: "Watch your AI agents think and act in real time. Full visibility into every decision and tool call." }), icon: "activity" },
      { title: translate({ id: "roadmap.p3.replay", message: "Session Replay" }), description: translate({ id: "roadmap.p3.replay.desc", message: "Replay any agent session. Understand what worked, what failed, and how much it cost." }), icon: "history" },
      { title: translate({ id: "roadmap.p3.teams", message: "Team Workspaces" }), description: translate({ id: "roadmap.p3.teams.desc", message: "Multi-user access, role-based permissions, and shared agent monitoring across your organization." }), icon: "users" },
    ],
  },
  {
    id: "p4",
    title: translate({ id: "roadmap.p4.title", message: "AI/ML Studio" }),
    timeline: translate({ id: "roadmap.p4.timeline", message: "August - October 2026" }),
    status: "upcoming",
    tagline: translate({ id: "roadmap.p4.tagline", message: "Train and deploy custom AI models from Studio." }),
    items: [
      { title: translate({ id: "roadmap.p4.composer", message: "Visual ML Builder" }), description: translate({ id: "roadmap.p4.composer.desc", message: "Compose AI behaviors visually. Connect data sources, training pipelines, and deployment targets." }), icon: "layers" },
      { title: translate({ id: "roadmap.p4.training", message: "Training Dashboard" }), description: translate({ id: "roadmap.p4.training.desc", message: "Monitor training progress, compare model versions, and deploy the best model with one click." }), icon: "bar-chart" },
      { title: translate({ id: "roadmap.p4.registry", message: "Model Marketplace" }), description: translate({ id: "roadmap.p4.registry.desc", message: "Share and reuse trained models across projects. Version control for AI models." }), icon: "archive" },
    ],
  },
];

const FUTURE_PHASES = [
  { title: translate({ id: "roadmap.p5.title", message: "Embedded Devices" }), description: translate({ id: "roadmap.p5.desc", message: "Run your product on microcontrollers and embedded hardware. Same definition, smallest footprint." }), icon: "cpu" },
  { title: translate({ id: "roadmap.p6.title", message: "OrbOS" }), description: translate({ id: "roadmap.p6.desc", message: "An operating system where every service is a verified product definition. System-level control." }), icon: "monitor" },
  { title: translate({ id: "roadmap.p7.title", message: "Robotics" }), description: translate({ id: "roadmap.p7.desc", message: "Control physical robots with verified behavior. Sensor integration, safety guarantees, fleet management." }), icon: "bot" },
];

// ---------------------------------------------------------------------------
// Timeline component
// ---------------------------------------------------------------------------

function TimelinePhase({ phase, isLast }: { phase: Phase; isLast: boolean }) {
  const isActive = phase.status === "active";
  const dotColor = isActive ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]";
  const lineColor = isActive ? "bg-[var(--color-primary)] opacity-30" : "bg-[var(--color-border)] opacity-40";

  return (
    <AnimatedReveal animation="fade-up">
      <Box className="flex flex-row gap-6">
        <Box className="flex flex-col items-center flex-shrink-0" style={{ width: 24 }}>
          <Box className={`w-3 h-3 rounded-full ${dotColor} flex-shrink-0 mt-2`} />
          {!isLast && <Box className={`w-0.5 flex-1 ${lineColor}`} style={{ minHeight: 40 }} />}
        </Box>

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

      <Box className="w-full py-16">
        <Box className="site-container">
          {PHASES.map((phase, i) => (
            <TimelinePhase key={phase.id} phase={phase} isLast={i === PHASES.length - 1} />
          ))}
        </Box>
      </Box>

      <Box className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

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
                    Same builder. New platforms. Expanding what verified software can do.
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
