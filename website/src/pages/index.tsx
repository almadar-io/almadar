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

// ---------------------------------------------------------------------------
// Four Pillars — each with description and the products that serve it
// ---------------------------------------------------------------------------

const PILLARS = [
  {
    icon: "compass",
    title: translate({ id: "home.pillar.control.title", message: "Control" }),
    subtitle: translate({ id: "home.pillar.control.subtitle", message: "The AI follows a blueprint, not its imagination." }),
    description: translate({ id: "home.pillar.control.desc", message: "Almadar ships with 116 ready-made features: shopping carts, login flows, dashboards, search, forms, games, and more. When the AI builds your product, it picks the right features and assembles them instead of writing code from scratch. Almadar analyzes what's still missing and tells the AI exactly what to add next. The AI is creative where it should be (your UI, your copy, your layout) and precise where it must be (your data, your logic, your workflows)." }),
    products: [
      {
        logo: "/img/studio-icon.svg",
        name: translate({ id: "home.pillar.control.studio", message: "Studio" }),
        role: translate({ id: "home.pillar.control.studio.role", message: "Where you and the AI build together. The AI follows the blueprint. You steer." }),
        href: "https://studio.almadar.io",
      },
      {
        logo: "/img/masar-icon.svg",
        name: translate({ id: "home.pillar.control.masar", message: "Masar" }),
        role: translate({ id: "home.pillar.control.masar.role", message: "Analyzes what your product is missing and gives the AI step-by-step instructions." }),
        href: "https://masar.almadar.io",
      },
    ],
  },
  {
    icon: "shield-check",
    title: translate({ id: "home.pillar.verify.title", message: "Verification" }),
    subtitle: translate({ id: "home.pillar.verify.subtitle", message: "Nothing ships without proof that it works." }),
    description: translate({ id: "home.pillar.verify.desc", message: "Before your app goes live, Almadar checks every possible screen your app can reach and every path a user could take. Then it launches the actual app, clicks through every interaction, fills every form, and screenshots every screen. Errors, missing pages, broken flows: all caught automatically and surfaced to both you and the AI." }),
    products: [
      {
        logo: "/img/orb-icon-transparent.svg",
        name: translate({ id: "home.pillar.verify.orb", message: "Orb" }),
        role: translate({ id: "home.pillar.verify.orb.role", message: "The language your product is written in. The compiler proves every screen and path is valid." }),
        href: "https://orb.almadar.io",
      },
    ],
  },
  {
    icon: "users",
    title: translate({ id: "home.pillar.source.title", message: "One Source" }),
    subtitle: translate({ id: "home.pillar.source.subtitle", message: "What the designer sees is what gets built." }),
    description: translate({ id: "home.pillar.source.desc", message: "Your entire product lives in one place. Engineers, designers, PMs, QA all work on the same thing. What QA tests is what the engineer wrote. No handoffs, no miscommunication, no \"that's not what I meant.\"" }),
    products: [
      {
        logo: "/img/studio-icon.svg",
        name: translate({ id: "home.pillar.source.studio", message: "Studio" }),
        role: translate({ id: "home.pillar.source.studio.role", message: "One workspace where every role contributes to the same product." }),
        href: "https://studio.almadar.io",
      },
    ],
  },
  {
    icon: "lock-open",
    title: translate({ id: "home.pillar.lockin.title", message: "No Lock-in" }),
    subtitle: translate({ id: "home.pillar.lockin.subtitle", message: "Bring your own AI model or use ours." }),
    description: translate({ id: "home.pillar.lockin.desc", message: "You own the generated code. Deploy anywhere you want. Take your code and leave anytime. Almadar enhances your team, it doesn't trap them." }),
    products: [
      {
        logo: "/img/services-icon-transparent.svg",
        name: translate({ id: "home.pillar.lockin.services", message: "Services" }),
        role: translate({ id: "home.pillar.lockin.services.role", message: "Managed infrastructure if you want it. Your own servers if you don't." }),
        href: "https://services.almadar.io",
      },
    ],
  },
];

const STATS = [
  { value: translate({ id: "home.stats.behaviors.value", message: "116" }), label: translate({ id: "home.stats.behaviors.label", message: "Ready-made features across 18 domains, from e-commerce to games" }) },
  { value: translate({ id: "home.stats.coverage.value", message: "100%" }), label: translate({ id: "home.stats.coverage.label", message: "Every screen and interaction verified before deployment" }) },
  { value: translate({ id: "home.stats.shells.value", message: "6" }), label: translate({ id: "home.stats.shells.label", message: "Target platforms from one source: Web today, Mobile and Python underway, Rust, Kotlin, and Swift in the pipeline" }) },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({ id: "home.meta.title", message: "Blueprints for your AI" })}
      description={translate({ id: "home.meta.desc", message: "Almadar is a software development platform where engineers, designers, product managers, and QA teams collaborate on a single product to generate testable, auditable, production-ready applications. Unlike prompt-based AI code generators, Almadar verifies correctness before deployment. Teams own their generated source code, choose their own AI models, and have no vendor lock-in." })}
    >
      {/* Hero — untouched */}
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

      {/* Four Pillars */}
      {PILLARS.map((pillar, i) => (
        <Box key={pillar.title} className={i % 2 === 0 ? "w-full py-24" : "w-full bg-[var(--color-surface)] py-24"}>
          <Box className="site-container">
            <AnimatedReveal animation="fade-up" delay={i * 50}>
              <VStack gap="lg">
                <VStack gap="sm">
                  <HStack gap="sm">
                    <Icon name={pillar.icon} size={20} />
                    <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                      {pillar.title}
                    </Typography>
                  </HStack>
                  <Typography variant="h2">{pillar.subtitle}</Typography>
                  <Typography variant="body1" color="muted" className="max-w-3xl">
                    {pillar.description}
                  </Typography>
                </VStack>

                <SimpleGrid cols={pillar.products.length > 1 ? 2 : 1} gap="md" className="max-w-2xl">
                  {pillar.products.map((product) => (
                    <a key={product.name} href={product.href} className="no-underline">
                      <Card className="p-5 h-full hover:border-[var(--color-primary)] transition-colors">
                        <HStack gap="md" align="center">
                          <img src={product.logo} alt={product.name} className="w-8 h-8 flex-shrink-0" />
                          <VStack gap="xs">
                            <Typography variant="body" weight="semibold">{product.name}</Typography>
                            <Typography variant="small" color="muted">{product.role}</Typography>
                          </VStack>
                        </HStack>
                      </Card>
                    </a>
                  ))}
                </SimpleGrid>
              </VStack>
            </AnimatedReveal>
          </Box>
        </Box>
      ))}

      {/* Stats */}
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

      {/* CTA */}
      <AnimatedReveal animation="fade-in">
        <Box className="w-full bg-[var(--color-surface)] py-16">
          <Box className="site-container">
            <VStack gap="lg" align="center">
              <Typography variant="h2" align="center">
                {translate({ id: "home.cta.title", message: "You own the code. You choose the models. You keep full control." })}
              </Typography>
              <Typography variant="body" color="muted" align="center" className="max-w-2xl">
                {translate({ id: "home.cta.text", message: "Your entire team works from one source that evolves with your business. Engineers architect instead of debug. Designers ship what they design. Launch in weeks, not months." })}
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
