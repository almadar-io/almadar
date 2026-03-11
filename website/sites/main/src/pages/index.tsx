import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./index.module.css";

const AlmadarChat = React.lazy(() => import("@shared/AlmadarChat"));

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroText}>
          <span className={styles.tag}>
            <Translate id="home.hero.tag">AI-Native Platform</Translate>
          </span>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="home.hero.title">The Physics of Software</Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="home.hero.subtitle">
              World models for the agentic era. We build the language, intelligence, and infrastructure for software that understands itself.
            </Translate>
          </p>
          <BrowserOnly fallback={null}>
            {() => (
              <React.Suspense fallback={null}>
                <AlmadarChat mode="inline" />
              </React.Suspense>
            )}
          </BrowserOnly>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" href="https://studio.almadar.io">
              <Translate id="home.hero.cta1">Explore Studio</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/vision">
              <Translate id="home.hero.cta2">Read the Vision</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function WorldModelSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="home.idea.title">What is a World Model of Software?</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="home.idea.subtitle">
              Traditional programming tells computers what to do, step by step. A world model describes how things work: the data, the rules, the behaviors. The compiler turns it into any platform. The model stays the same.
            </Translate>
          </p>
        </div>
        <div className={styles.ideaGrid}>
          <div className={styles.ideaCard}>
            <div className={styles.ideaIcon}>&#x270D;</div>
            <h3><Translate id="home.idea.describe">Describe</Translate></h3>
            <p><Translate id="home.idea.describe.text">Write what your system does in Orb, a formal language for application behavior.</Translate></p>
          </div>
          <div className={styles.ideaCard}>
            <div className={styles.ideaIcon}>&#x2713;</div>
            <h3><Translate id="home.idea.prove">Prove</Translate></h3>
            <p><Translate id="home.idea.prove.text">The compiler validates every possible state before a single line of code runs.</Translate></p>
          </div>
          <div className={styles.ideaCard}>
            <div className={styles.ideaIcon}>&#x1F680;</div>
            <h3><Translate id="home.idea.deploy">Deploy</Translate></h3>
            <p><Translate id="home.idea.deploy.text">One model compiles to web, mobile, or any future platform. The model is the product.</Translate></p>
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    titleId: "home.pillars.language.title",
    titleDefault: "Orb",
    descId: "home.pillars.language.desc",
    descDefault: "A formal language for describing how software behaves. Open source. AI-native. Compiler-verified.",
    href: "https://orb.almadar.io",
    linkId: "home.pillars.language.link",
    linkDefault: "Explore the Language",
  },
  {
    titleId: "home.pillars.studio.title",
    titleDefault: "Almadar Studio",
    descId: "home.pillars.studio.desc",
    descDefault: "The builder where humans and AI agents collaborate to create software. Describe, generate, deploy.",
    href: "https://studio.almadar.io",
    linkId: "home.pillars.studio.link",
    linkDefault: "Try Studio",
  },
  {
    titleId: "home.pillars.services.title",
    titleDefault: "Almadar Services",
    descId: "home.pillars.services.desc",
    descDefault: "AI-native infrastructure. Compute, storage, authentication, event routing. Designed for agents.",
    href: "https://services.almadar.io",
    linkId: "home.pillars.services.link",
    linkDefault: "View Services",
  },
];

function PillarsSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="home.pillars.title">Three Pillars</Translate>
          </Heading>
        </div>
        <div className={styles.pillarsGrid}>
          {PILLARS.map((p) => (
            <div key={p.titleId} className={styles.pillarCard}>
              <h3><Translate id={p.titleId}>{p.titleDefault}</Translate></h3>
              <p><Translate id={p.descId}>{p.descDefault}</Translate></p>
              <Link href={p.href} className={styles.pillarLink}>
                <Translate id={p.linkId}>{p.linkDefault}</Translate> &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { valueId: "home.stats.behaviors.value", value: "129", labelId: "home.stats.behaviors.label", label: "Standard behaviors across 18 domains" },
  { valueId: "home.stats.projects.value", value: "7", labelId: "home.stats.projects.label", label: "Production projects deployed" },
  { valueId: "home.stats.cost.value", value: "$0.05\u2013$0.35", labelId: "home.stats.cost.label", label: "AI compute cost per application" },
];

function ProofSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="home.proof.title">Proven in Production</Translate>
          </Heading>
        </div>
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.valueId} className={styles.statCard}>
              <span className={styles.statValue}>
                <Translate id={s.valueId}>{s.value}</Translate>
              </span>
              <span className={styles.statLabel}>
                <Translate id={s.labelId}>{s.label}</Translate>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.aiContent}>
          <Heading as="h2" className={styles.aiTitle}>
            <Translate id="home.ai.title">We Train Our Own Models</Translate>
          </Heading>
          <p className={styles.aiText}>
            <Translate id="home.ai.text">
              We are not a company that wraps LLM APIs and calls it AI. Our neural pipeline understands software structure the way a chess engine understands board positions. It predicts errors, evaluates fixes, and generates valid software from scratch.
            </Translate>
          </p>
          <p className={styles.aiText}>
            <Translate id="home.ai.text2">
              We still use LLMs for natural language understanding. But the core structural intelligence is ours: small, specialized models that cost almost nothing to run.
            </Translate>
          </p>
          <Link className="button button--primary button--lg" to="/ai">
            <Translate id="home.ai.cta">Learn About Our AI</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.ctaCard}>
          <Heading as="h2">
            <Translate id="home.cta.title">Ready to build?</Translate>
          </Heading>
          <p>
            <Translate id="home.cta.text">
              Start with Orb. Build with Studio. Deploy on Almadar Services.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" href="https://studio.almadar.io">
              <Translate id="home.cta.start">Start Building</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/vision">
              <Translate id="home.cta.vision">Read the Vision</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({ id: "home.meta.title", message: "Almadar \u2014 The Physics of Software" })}
      description={translate({ id: "home.meta.desc", message: "Almadar builds the language, intelligence, and infrastructure for software that understands itself." })}
    >
      <Hero />
      <main>
        <WorldModelSection />
        <PillarsSection />
        <ProofSection />
        <AISection />
        <CTASection />
      </main>
    </Layout>
  );
}
