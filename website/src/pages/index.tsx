import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  Typography,
  Badge,
  Button,
  HStack,
  Icon,
  Card,
  FeatureGrid,
  FeatureCard,
  ShowcaseCard,
  CTABanner,
  SimpleGrid,
  AnimatedReveal,
} from "@almadar/ui/marketing";

import { OrbitalHeroBackground } from "../components/OrbitalHeroBackground";

const STUDIO_URL = "https://studio.almadar.io";
const STUDIO_FEATURES_URL = "https://studio.almadar.io/features";

// ---------------------------------------------------------------------------
// What Studio gives you
// ---------------------------------------------------------------------------

const CAPABILITIES = [
  {
    icon: "compass",
    title: translate({ id: "home.cap.control.title", message: "Control" }),
    description: translate({
      id: "home.cap.control.desc",
      message: "Studio assembles your product from 116 ready-made features instead of guessing code from prompts. You steer the AI: it's creative on UI and copy, precise on data and workflows.",
    }),
    href: STUDIO_URL,
    linkLabel: translate({ id: "home.cap.link", message: "Open Studio" }),
  },
  {
    icon: "shield-check",
    title: translate({ id: "home.cap.verify.title", message: "Verification" }),
    description: translate({
      id: "home.cap.verify.desc",
      message: "Every screen, every flow, every interaction is checked before you ship. Studio runs the actual app, clicks every button, and surfaces broken paths to you and the AI in real time.",
    }),
    href: STUDIO_URL,
    linkLabel: translate({ id: "home.cap.link", message: "Open Studio" }),
  },
  {
    icon: "lock-open",
    title: translate({ id: "home.cap.lockin.title", message: "No Vendor Lock-in" }),
    description: translate({
      id: "home.cap.lockin.desc",
      message: "You own the generated code. Bring your own AI model or use ours. Deploy to our cloud or yours. Take your product and leave any time. Studio enhances your team, it doesn't trap them.",
    }),
    href: STUDIO_URL,
    linkLabel: translate({ id: "home.cap.link", message: "Open Studio" }),
  },
];

// ---------------------------------------------------------------------------
// Personas — who Studio is built for
// ---------------------------------------------------------------------------

const PERSONAS = [
  {
    title: translate({ id: "home.persona.builder.title", message: "PMs & Founders" }),
    description: translate({
      id: "home.persona.builder.desc",
      message: "Type what you want to build. Watch the AI compose your product orbital by orbital. Hit deploy when it's ready. No code, no handoff, no waiting on a sprint.",
    }),
    image: { src: "/img/studio-flows/sahar-home.png", alt: "Builder Home with prompt input and product suggestion chips" },
    badge: translate({ id: "home.persona.builder.badge", message: "Prompt to product" }),
    href: STUDIO_URL,
  },
  {
    title: translate({ id: "home.persona.designer.title", message: "Designers" }),
    description: translate({
      id: "home.persona.designer.desc",
      message: "Drop new patterns onto a live canvas, edit props in the inspector, ship the change. No handoff, no rebuild.",
    }),
    image: { src: "/img/studio-flows/nadia-canvas.png", alt: "Studio canvas with palette open and screen flow" },
    badge: translate({ id: "home.persona.designer.badge", message: "Rapid expansion" }),
    href: STUDIO_URL,
  },
  {
    title: translate({ id: "home.persona.engineer.title", message: "Engineers" }),
    description: translate({
      id: "home.persona.engineer.desc",
      message: "Write guards, wire events between orbitals, review JEPA validation, ship the compiled TypeScript. Every release is proven before it leaves the workspace.",
    }),
    image: { src: "/img/studio-flows/tarek-validation.png", alt: "Studio validation panel with JEPA predictions" },
    badge: translate({ id: "home.persona.engineer.badge", message: "Verified by default" }),
    href: STUDIO_URL,
  },
];

// ---------------------------------------------------------------------------
// Step visualizations — paired with the deconstruction cards below
// ---------------------------------------------------------------------------

const svgStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  color: "var(--color-primary)",
};

/** Step 1 — A unified product (browser frame with content blocks). */
function ExistingProductGraphic() {
  return (
    <svg viewBox="0 0 240 130" style={svgStyle} aria-hidden="true">
      {/* browser chrome */}
      <rect x="20" y="14" width="200" height="102" rx="6" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.55" />
      <line x1="20" y1="30" x2="220" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="28" cy="22" r="1.6" fill="currentColor" opacity="0.5" />
      <circle cx="34" cy="22" r="1.6" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="22" r="1.6" fill="currentColor" opacity="0.5" />
      {/* hero strip */}
      <rect x="32" y="40" width="176" height="18" rx="2" fill="currentColor" opacity="0.18" />
      {/* three content tiles */}
      <rect x="32" y="66" width="52" height="40" rx="2" fill="currentColor" opacity="0.12" />
      <rect x="94" y="66" width="52" height="40" rx="2" fill="currentColor" opacity="0.12" />
      <rect x="156" y="66" width="52" height="40" rx="2" fill="currentColor" opacity="0.12" />
      {/* tile detail lines */}
      <line x1="38" y1="76" x2="78" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="38" y1="84" x2="68" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <line x1="100" y1="76" x2="140" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="100" y1="84" x2="130" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <line x1="162" y1="76" x2="202" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="162" y1="84" x2="192" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

/** Step 2 — The same elements separated into orbital units, scattered. */
function BuildingBlocksGraphic() {
  const blocks: Array<{ cx: number; cy: number; rx: number; ry: number; rot: number }> = [
    { cx: 58, cy: 38, rx: 24, ry: 16, rot: -6 },
    { cx: 132, cy: 28, rx: 22, ry: 16, rot: 4 },
    { cx: 200, cy: 46, rx: 24, ry: 16, rot: -3 },
    { cx: 50, cy: 92, rx: 22, ry: 14, rot: 5 },
    { cx: 122, cy: 100, rx: 26, ry: 16, rot: -4 },
    { cx: 196, cy: 96, rx: 22, ry: 14, rot: 6 },
  ];
  return (
    <svg viewBox="0 0 240 130" style={svgStyle} aria-hidden="true">
      {blocks.map((b, i) => (
        <g key={i} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}>
          {/* orbital ring */}
          <ellipse cx={b.cx} cy={b.cy} rx={b.rx + 6} ry={b.ry + 5} stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2.5" fill="none" opacity="0.45" />
          {/* unit body */}
          <rect x={b.cx - b.rx / 2} y={b.cy - b.ry / 2} width={b.rx} height={b.ry} rx="2" fill="currentColor" opacity="0.3" />
          {/* highlight dot */}
          <circle cx={b.cx + b.rx / 2 - 2} cy={b.cy - b.ry / 2 + 2} r="1.4" fill="currentColor" opacity="0.9" />
        </g>
      ))}
      {/* faint dispersion lines */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.18">
        <line x1="80" y1="46" x2="108" y2="32" />
        <line x1="156" y1="32" x2="178" y2="46" />
        <line x1="74" y1="86" x2="100" y2="100" />
        <line x1="148" y1="100" x2="174" y2="92" />
      </g>
    </svg>
  );
}

/** Step 3 — Reassembled in Studio: orbital nodes connected on a canvas. */
function StudioCanvasGraphic() {
  const nodes: Array<{ cx: number; cy: number }> = [
    { cx: 56, cy: 50 },
    { cx: 130, cy: 36 },
    { cx: 196, cy: 58 },
    { cx: 88, cy: 96 },
    { cx: 168, cy: 96 },
  ];
  return (
    <svg viewBox="0 0 240 130" style={svgStyle} aria-hidden="true">
      {/* canvas frame */}
      <rect x="10" y="10" width="220" height="110" rx="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.4" />
      {/* connection lines */}
      <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M 56 50 Q 92 36 130 36" />
        <path d="M 130 36 Q 164 44 196 58" />
        <path d="M 56 50 Q 70 76 88 96" />
        <path d="M 88 96 Q 128 102 168 96" />
        <path d="M 196 58 Q 188 80 168 96" />
      </g>
      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="13" fill="currentColor" opacity="0.18" />
          <circle cx={n.cx} cy={n.cy} r="13" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" />
          <rect x={n.cx - 5} y={n.cy - 5} width="10" height="10" rx="1.5" fill="currentColor" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

const STEP_GRAPHICS = [ExistingProductGraphic, BuildingBlocksGraphic, StudioCanvasGraphic];

// ---------------------------------------------------------------------------
// Deconstruction visual — existing product → orbital units → editable canvas
// ---------------------------------------------------------------------------

const DECONSTRUCTION_STEPS = [
  {
    icon: "globe",
    label: translate({ id: "home.decon.step1.label", message: "Any product, any stage" }),
    description: translate({
      id: "home.decon.step1.desc",
      message: "An idea on a napkin, a half-built MVP, or a live app that needs its next chapter.",
    }),
  },
  {
    icon: "boxes",
    label: translate({ id: "home.decon.step2.label", message: "Broken into building blocks" }),
    description: translate({
      id: "home.decon.step2.desc",
      message: "Studio resolves it into orbital units: every screen, entity, and flow as a piece you can grab.",
    }),
  },
  {
    icon: "wand-2",
    label: translate({ id: "home.decon.step3.label", message: "Reassembled in Studio" }),
    description: translate({
      id: "home.decon.step3.desc",
      message: "Drop new pieces in, rewire the flow, ship the new version. Same canvas, faster cadence.",
    }),
  },
];

// ---------------------------------------------------------------------------
// Stages — pre-PMF and post-PMF
// ---------------------------------------------------------------------------

const STAGES = [
  {
    icon: "rocket",
    title: translate({ id: "home.stage.zero.title", message: "From zero to product" }),
    description: translate({
      id: "home.stage.zero.desc",
      message: "Studio turns an idea into a working product fast enough to test with real users this week, not next quarter. Iterate, kill, pivot without rewriting from scratch.",
    }),
    href: STUDIO_URL,
    linkLabel: translate({ id: "home.stage.cta", message: "Start in Studio" }),
  },
  {
    icon: "trending-up",
    title: translate({ id: "home.stage.scale.title", message: "From product to scale" }),
    description: translate({
      id: "home.stage.scale.desc",
      message: "When the market pulls, Studio lets your team add features, surfaces, and platforms in days. Verification keeps every release shippable, no matter how fast you move.",
    }),
    href: STUDIO_URL,
    linkLabel: translate({ id: "home.stage.cta", message: "Start in Studio" }),
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({ id: "home.meta.title", message: "Ship real products. Absurdly fast." })}
      description={translate({
        id: "home.meta.desc",
        message: "Almadar Studio is the product development workspace for startups. Go from zero to product, then from product to scale, with verified releases, full control, and no vendor lock-in.",
      })}
    >
      {/* Hero — kept custom so the OrbitalHeroBackground can sit behind the content */}
      <Box as="header" className="w-full min-h-[60vh] flex items-center relative overflow-hidden">
        <OrbitalHeroBackground />
        <Box className="site-container py-20 relative z-10">
          <VStack gap="lg" align="center">
            <Badge variant="primary">
              {translate({ id: "home.hero.tag", message: "Built for startups" })}
            </Badge>
            <Typography variant="h1" align="center">
              {translate({ id: "home.hero.title", message: "Ship real products. Absurdly fast." })}
            </Typography>
            <Typography variant="body1" color="muted" align="center" className="max-w-2xl">
              {translate({ id: "home.hero.subtitle", message: "From zero to product. From product to scale." })}
            </Typography>
            <HStack gap="md">
              <a href={STUDIO_URL}>
                <Button variant="primary" size="lg">
                  {translate({ id: "home.hero.cta1", message: "Open Studio" })}
                </Button>
              </a>
              <a href={STUDIO_FEATURES_URL}>
                <Button variant="secondary" size="lg">
                  {translate({ id: "home.hero.cta2", message: "See how it works" })}
                </Button>
              </a>
            </HStack>
          </VStack>
        </Box>
      </Box>

      {/* Capabilities */}
      <Box className="w-full py-24">
        <Box className="site-container">
          <AnimatedReveal animation="fade-up">
            <VStack gap="md" align="center" className="mb-12">
              <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                {translate({ id: "home.cap.kicker", message: "What Studio gives you" })}
              </Typography>
              <Typography variant="h2" align="center" className="max-w-3xl">
                {translate({
                  id: "home.cap.title",
                  message: "Speed without the trade-offs founders normally accept.",
                })}
              </Typography>
            </VStack>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={100}>
            <FeatureGrid items={CAPABILITIES} columns={3} gap="lg" />
          </AnimatedReveal>
        </Box>
      </Box>

      {/* Deconstruction visual — existing product → orbital units → editable canvas */}
      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <AnimatedReveal animation="fade-up">
            <VStack gap="md" align="center" className="mb-16">
              <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                {translate({ id: "home.decon.kicker", message: "Rapid expansion" })}
              </Typography>
              <Typography variant="h2" align="center" className="max-w-3xl">
                {translate({
                  id: "home.decon.title",
                  message: "Pull a real product into Studio. Reshape it. Ship the next version this week.",
                })}
              </Typography>
              <Typography variant="body1" color="muted" align="center" className="max-w-2xl">
                {translate({
                  id: "home.decon.subtitle",
                  message: "Studio doesn't replace what you've built. It dismantles it into pieces you can grab, edit, and reassemble at startup speed.",
                })}
              </Typography>
            </VStack>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={100}>
            <SimpleGrid cols={3} gap="md">
              {DECONSTRUCTION_STEPS.map((step, i) => {
                const Graphic = STEP_GRAPHICS[i];
                return (
                  <Card key={step.label} className="p-6 h-full overflow-hidden">
                    <VStack gap="md">
                      <Box className="w-full -mx-2 -mt-2 mb-2">
                        <Graphic />
                      </Box>
                      <HStack gap="sm">
                        <Badge variant="primary">{`0${i + 1}`}</Badge>
                        <Box className="text-[var(--color-primary)]">
                          <Icon name={step.icon} size="md" />
                        </Box>
                      </HStack>
                      <Typography variant="h4">{step.label}</Typography>
                      <Typography variant="small" color="muted">
                        {step.description}
                      </Typography>
                    </VStack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </AnimatedReveal>

          <Box className="mt-12">
            <AnimatedReveal animation="fade-up" delay={150}>
              <SimpleGrid cols={2} gap="lg">
                <Card className="p-3 overflow-hidden">
                  <VStack gap="sm">
                    <img
                      src="/img/studio-flows/nadia-overview.png"
                      alt="Studio overview with two orbital units side by side"
                      className="w-full h-auto rounded"
                    />
                    <Box className="px-2 pb-2">
                      <VStack gap="xs">
                        <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                          {translate({ id: "home.decon.cap.blocks", message: "Building blocks" })}
                        </Typography>
                        <Typography variant="small" color="muted">
                          {translate({
                            id: "home.decon.cap.blocks.desc",
                            message: "Every screen, entity, and flow becomes its own orbital unit, ready to grab.",
                          })}
                        </Typography>
                      </VStack>
                    </Box>
                  </VStack>
                </Card>
                <Card className="p-3 overflow-hidden">
                  <VStack gap="sm">
                    <img
                      src="/img/studio-flows/nadia-canvas.png"
                      alt="Studio canvas with palette open, showing flow between orbital screens"
                      className="w-full h-auto rounded"
                    />
                    <Box className="px-2 pb-2">
                      <VStack gap="xs">
                        <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                          {translate({ id: "home.decon.cap.canvas", message: "Reassembled in Studio" })}
                        </Typography>
                        <Typography variant="small" color="muted">
                          {translate({
                            id: "home.decon.cap.canvas.desc",
                            message: "Drag new pieces in, rewire the flow, watch verification run in real time.",
                          })}
                        </Typography>
                      </VStack>
                    </Box>
                  </VStack>
                </Card>
              </SimpleGrid>
            </AnimatedReveal>
          </Box>
        </Box>
      </Box>

      {/* Personas */}
      <Box className="w-full py-24">
        <Box className="site-container">
          <AnimatedReveal animation="fade-up">
            <VStack gap="md" align="center" className="mb-12">
              <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                {translate({ id: "home.persona.kicker", message: "Built for the whole team" })}
              </Typography>
              <Typography variant="h2" align="center" className="max-w-3xl">
                {translate({
                  id: "home.persona.title",
                  message: "One workspace. Every role in your startup.",
                })}
              </Typography>
            </VStack>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={100}>
            <SimpleGrid cols={3} gap="lg">
              {PERSONAS.map((persona) => (
                <ShowcaseCard
                  key={persona.title}
                  title={persona.title}
                  description={persona.description}
                  image={persona.image}
                  badge={persona.badge}
                  href={persona.href}
                />
              ))}
            </SimpleGrid>
          </AnimatedReveal>
        </Box>
      </Box>

      {/* Stages */}
      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <AnimatedReveal animation="fade-up">
            <VStack gap="md" align="center" className="mb-12">
              <Typography variant="small" color="primary" className="uppercase font-semibold tracking-wide">
                {translate({ id: "home.stage.kicker", message: "Built for the whole startup arc" })}
              </Typography>
              <Typography variant="h2" align="center" className="max-w-3xl">
                {translate({
                  id: "home.stage.title",
                  message: "Whether you're searching for fit or scaling past it.",
                })}
              </Typography>
            </VStack>
          </AnimatedReveal>

          <AnimatedReveal animation="fade-up" delay={100}>
            <SimpleGrid cols={2} gap="lg">
              {STAGES.map((stage) => (
                <FeatureCard
                  key={stage.title}
                  icon={stage.icon}
                  title={stage.title}
                  description={stage.description}
                  href={stage.href}
                  linkLabel={stage.linkLabel}
                  variant="bordered"
                  size="lg"
                />
              ))}
            </SimpleGrid>
          </AnimatedReveal>
        </Box>
      </Box>

      {/* CTA */}
      <CTABanner
        title={translate({ id: "home.cta.title", message: "Stop prototyping. Start shipping." })}
        subtitle={translate({
          id: "home.cta.text",
          message: "Open Studio, describe what you want to build, and watch a real, verified product take shape. You stay in control. You keep the code. You move at startup speed.",
        })}
        primaryAction={{
          label: translate({ id: "home.cta.start", message: "Open Studio" }),
          href: STUDIO_URL,
        }}
        secondaryAction={{
          label: translate({ id: "home.cta.vision", message: "Read the Vision" }),
          href: "/vision",
        }}
        background="alt"
        align="center"
      />
    </Layout>
  );
}
