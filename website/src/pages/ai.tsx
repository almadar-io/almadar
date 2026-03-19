import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import { Target, ShieldCheck, Database, Zap, Brain, Layers } from "lucide-react";
import styles from "./ai.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.tag}>
          <Translate id="ai.hero.tag">Masar</Translate>
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="ai.hero.title">System 2 for AI Agents</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="ai.hero.subtitle">
            Your LLM is fast and intuitive but cannot plan, verify, or remember. Masar gives it a world model: structured planning, instant verification, and experience-based memory.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" href="https://masar.almadar.io/docs/getting-started/quickstart">
            <Translate id="ai.hero.cta1">Get Started</Translate>
          </Link>
          <Link className="button button--secondary button--lg" href="https://masar.almadar.io/docs/api-reference/planning">
            <Translate id="ai.hero.cta2">View API</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

const CAPABILITIES = [
  {
    icon: <Target size={28} strokeWidth={1.5} />,
    titleId: "ai.caps.plan.title", title: "Planning",
    descId: "ai.caps.plan.desc",
    desc: "Masar knows 129 behavioral patterns across 18 domains. Given a partial result and a goal, it produces dependency-ordered instructions with exact parameters. The LLM does not guess what to build. Masar tells it.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    titleId: "ai.caps.verify.title", title: "Verification",
    descId: "ai.caps.verify.desc",
    desc: "Predicts validity in under 5ms without running the compiler. Catches 20 categories of structural errors. When something fails, beam search finds the optimal repair sequence entirely in latent space.",
  },
  {
    icon: <Database size={28} strokeWidth={1.5} />,
    titleId: "ai.caps.memory.title", title: "Memory",
    descId: "ai.caps.memory.desc",
    desc: "Stores agent experiences as structured episodes. Clusters similar episodes into reusable patterns over time. Your agent builds expertise from its own work, without retraining.",
  },
];

function CapabilitiesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="ai.caps.title">Three Capabilities LLMs Lack</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="ai.caps.subtitle">
              LLMs generate text. Masar understands structure.
            </Translate>
          </p>
        </div>
        <div className={styles.capGrid}>
          {CAPABILITIES.map((c) => (
            <div key={c.titleId} className={styles.capCard}>
              <div className={styles.capIcon}>{c.icon}</div>
              <h3><Translate id={c.titleId}>{c.title}</Translate></h3>
              <p><Translate id={c.descId}>{c.desc}</Translate></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PIPELINE_STEPS = [
  {
    num: "1", titleId: "ai.pipe.embed.title", title: "Embed",
    descId: "ai.pipe.embed.desc", desc: "Masar converts the current state into a compact representation that captures structural topology. Similar problems land in the same region of the representation space.",
  },
  {
    num: "2", titleId: "ai.pipe.match.title", title: "Match",
    descId: "ai.pipe.match.desc", desc: "Finds the closest known pattern from the library. 129 patterns across e-commerce, healthcare, CRM, project management, games, and 12 more domains.",
  },
  {
    num: "3", titleId: "ai.pipe.plan.title", title: "Plan",
    descId: "ai.pipe.plan.desc", desc: "Computes the structural difference between where you are and where you need to be. Decomposes it into 7 dependency levels of parameterized instructions.",
  },
  {
    num: "4", titleId: "ai.pipe.verify.title", title: "Verify",
    descId: "ai.pipe.verify.desc", desc: "After each step, predicts validity and error categories. Catches problems before the LLM compounds them. When errors occur, beam search finds the shortest repair path.",
  },
  {
    num: "5", titleId: "ai.pipe.remember.title", title: "Remember",
    descId: "ai.pipe.remember.desc", desc: "Stores the completed result as an episode. Over time, episodes cluster into new patterns. The 129 hand-authored patterns are just the seed. The library grows from experience.",
  },
];

function PipelineSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="ai.pipe.title">How Masar Works</Translate>
          </Heading>
        </div>
        <div className={styles.stepsGrid}>
          {PIPELINE_STEPS.map((step) => (
            <div key={step.num} className={styles.stepCard}>
              <span className={styles.stepNum}>{step.num}</span>
              <h3><Translate id={step.titleId}>{step.title}</Translate></h3>
              <p><Translate id={step.descId}>{step.desc}</Translate></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "< 5ms", label: "Planning latency" },
  { value: "94%", label: "Validity prediction accuracy" },
  { value: "129", label: "Built-in behavioral patterns" },
  { value: "18", label: "Domains covered" },
  { value: "20", label: "Error categories detected" },
  { value: "6", label: "API endpoints" },
];

function StatsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="ai.stats.title">By the Numbers</Translate>
          </Heading>
        </div>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function System2Section() {
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.differenceContent}>
          <Heading as="h2" className={styles.lightTitle}>
            <Translate id="ai.sys2.title">Thinking, Fast and Slow</Translate>
          </Heading>
          <p>
            <Translate id="ai.sys2.p1">
              Daniel Kahneman's research showed that human cognition has two systems. System 1 is fast, intuitive, and associative. System 2 is slow, deliberate, and structural. You need both to make good decisions.
            </Translate>
          </p>
          <p>
            <Translate id="ai.sys2.p2">
              LLMs are System 1. They respond instantly, pattern-match from training data, and generate fluent text. But they cannot plan multi-step processes, verify structural correctness, or learn from their own experience. That is System 2.
            </Translate>
          </p>
          <p>
            <Translate id="ai.sys2.p3">
              Masar is System 2 for any LLM agent. It handles the deliberate, structural thinking that language models cannot do. The LLM handles language and generation. Masar handles planning, verification, and memory. Together, they form a complete agent.
            </Translate>
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link className="button button--primary button--lg" href="https://masar.almadar.io">
              <Translate id="ai.sys2.cta">Explore Masar</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AI(): ReactNode {
  return (
    <Layout
      title={translate({ id: "ai.meta.title", message: "AI \u2014 Masar: System 2 for AI Agents" })}
      description={translate({ id: "ai.meta.desc", message: "Masar gives AI agents structured planning, instant verification, and experience-based memory. The world model that makes any LLM agent smarter." })}
    >
      <Hero />
      <main>
        <CapabilitiesSection />
        <PipelineSection />
        <StatsSection />
        <System2Section />
      </main>
    </Layout>
  );
}
