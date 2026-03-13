import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./brains.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.tag}>
          <Translate id="brains.hero.tag">AI Layer</Translate>
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="brains.hero.title">Brains</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="brains.hero.subtitle">
            The intelligence layer. LLM orchestration, memory, sessions, and autonomous agents.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const SERVICES = [
  {
    title: "LLM Service",
    desc: "Unified API for multiple LLM providers. Automatic model selection based on task complexity. Token-level cost tracking.",
  },
  {
    title: "Memory Manager",
    desc: "Persistent conversation memory with semantic retrieval. Agents remember context across sessions and projects.",
  },
  {
    title: "Session Manager",
    desc: "Manages agent sessions with state persistence, timeout handling, and multi-user isolation.",
  },
  {
    title: "Skill Agent",
    desc: "Specialized agents for specific tasks: code generation, data modeling, UI design, testing. Composable into workflows.",
  },
  {
    title: "DeepAgent",
    desc: "The orchestration agent. Breaks complex requests into skill chains, manages execution, and assembles results into coherent output.",
  },
  {
    title: "Agent Builder",
    desc: "Create custom agents with specific skills, prompts, and memory configurations. Deploy them as API endpoints.",
  },
  {
    title: "UI Builder",
    desc: "AI-powered interface generation. Describe a screen, get a production-quality component using the Almadar design system.",
  },
];

function ServicesGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row align-items--center">
          <div className="col col--6">
            <div className={styles.sectionHeader} style={{ textAlign: "left", marginBottom: "2rem" }}>
              <Heading as="h2">
                <Translate id="brains.services.title">AI Services</Translate>
              </Heading>
            </div>
            <div className={styles.servicesGrid}>
              {SERVICES.map((svc) => (
                <div key={svc.title} className={styles.serviceCard}>
                  <Heading as="h3">{svc.title}</Heading>
                  <p>{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col col--6">
            <img src="/img/brains-orchestration.webp" alt="Agent orchestration" className={styles.sectionImage} loading="lazy" style={{ margin: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={styles.ctaTitle}>
            <Translate id="brains.cta.title">Explore Other Layers</Translate>
          </Heading>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/metal">
              <Translate id="brains.cta.metal">Metal Services</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/integrations">
              <Translate id="brains.cta.integrations">Integrations</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Brains(): ReactNode {
  return (
    <Layout
      title={translate({ id: "brains.meta.title", message: "Brains — AI Services" })}
      description={translate({ id: "brains.meta.desc", message: "LLM orchestration, memory management, session handling, skill agents, and the DeepAgent." })}
    >
      <Hero />
      <main>
        <ServicesGrid />
        <CTASection />
      </main>
    </Layout>
  );
}
