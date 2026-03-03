import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./index.module.css";

import DemoCarousel from "../components/DemoCarousel";
import HeroSection from "../components/HeroSection";

// ─── Hero ──────────────────────────────────────────────────────────────────

function HomepageHeader() {
  return (
    <HeroSection
      title={
        <Translate id="homepage.title">The Physics of Software</Translate>
      }
      subtitle={
        <Translate id="homepage.subtitle">
          Build full-stack applications through declarative schemas. Define
          entities, behaviors, and UI as state machines — describe it in natural
          language, Almadar generates the rest.
        </Translate>
      }
      buttons={
        <>
          <Link className="button button--primary button--lg" to="/developers">
            <Translate id="homepage.getStarted">Get Started</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/enterprise"
          >
            <Translate id="homepage.talkToSales">Talk to Sales</Translate>
          </Link>
        </>
      }
    />
  );
}

// ─── What Almadar Does ─────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "01",
    titleId: "homepage.how.step1.title",
    titleDefault: "Describe in Natural Language",
    descId: "homepage.how.step1.desc",
    descDefault:
      "Tell Almadar what you want to build. No code, no schema syntax — just describe the behavior, data, and UI in plain language.",
  },
  {
    step: "02",
    titleId: "homepage.how.step2.title",
    titleDefault: "AI Generates the Schema",
    descId: "homepage.how.step2.desc",
    descDefault:
      "DeepAgent translates your description into a structured OrbitalSchema — entities, state machines, UI patterns, and integration points.",
  },
  {
    step: "03",
    titleId: "homepage.how.step3.title",
    titleDefault: "System Generates the App",
    descId: "homepage.how.step3.desc",
    descDefault:
      "The Almadar compiler produces a production-ready full-stack application: React frontend, Express backend, database models, and APIs.",
  },
];

function HomepageWhatWeDo() {
  return (
    <section className={styles.howSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.how.title">How Almadar Works</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.how.subtitle">
              From natural language to a running application in three steps
            </Translate>
          </p>
        </div>
        <div className={styles.howGrid}>
          {HOW_IT_WORKS.map(({ step, titleId, titleDefault, descId, descDefault }) => (
            <div key={step} className={styles.howCard}>
              <span className={styles.howStep}>{step}</span>
              <Heading as="h3" className={styles.howCardTitle}>
                <Translate id={titleId}>{titleDefault}</Translate>
              </Heading>
              <p className={styles.howCardDesc}>
                <Translate id={descId}>{descDefault}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Proof / Stats ─────────────────────────────────────────────────────────

const STATS = [
  {
    valueId: "homepage.stats.cost.value",
    valueDefault: "87%",
    labelId: "homepage.stats.cost.label",
    labelDefault: "Reduction in development cost",
  },
  {
    valueId: "homepage.stats.speed.value",
    valueDefault: "60%",
    labelId: "homepage.stats.speed.label",
    labelDefault: "Faster time to delivery",
  },
  {
    valueId: "homepage.stats.auto.value",
    valueDefault: "70%",
    labelId: "homepage.stats.auto.label",
    labelDefault: "Of application code auto-generated",
  },
];

function HomepageProof() {
  return (
    <section className={styles.proofSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.proof.title">Proven in Production</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.proof.subtitle">
              Real results from teams that switched to Almadar
            </Translate>
          </p>
        </div>
        <div className={styles.statsGrid}>
          {STATS.map(({ valueId, valueDefault, labelId, labelDefault }) => (
            <div key={valueId} className={styles.statCard}>
              <span className={styles.statValue}>
                <Translate id={valueId}>{valueDefault}</Translate>
              </span>
              <span className={styles.statLabel}>
                <Translate id={labelId}>{labelDefault}</Translate>
              </span>
            </div>
          ))}
        </div>
        <div className={styles.caseStudyLinks}>
          <span className={styles.caseStudyLabel}>
            <Translate id="homepage.proof.caseStudies">Case Studies:</Translate>
          </span>
          <Link to="/case-studies/inspection" className={styles.caseStudyLink}>
            <Translate id="homepage.proof.cs.inspection">
              Government Inspection System
            </Translate>
          </Link>
          <Link to="/case-studies/trainer" className={styles.caseStudyLink}>
            <Translate id="homepage.proof.cs.trainer">
              AI Trainer Platform
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <Heading as="h2">
            <Translate id="homepage.cta.title">Ready to build?</Translate>
          </Heading>
          <p>
            <Translate id="homepage.cta.description">
              Two paths forward: start building today with the Almadar developer
              tools, or talk to us about an enterprise deployment for your team.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/developers"
            >
              <Translate id="homepage.cta.startBuilding">Start Building</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/enterprise"
            >
              <Translate id="homepage.cta.enterprise">Enterprise</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "homepage.meta.title",
        message: "The Physics of Software",
      })}
      description={translate({
        id: "homepage.meta.description",
        message:
          "Almadar — build full-stack applications through declarative schemas. Natural language to production code.",
      })}
    >
      <HomepageHeader />
      <main>
        <HomepageWhatWeDo />
        <HomepageProof />
        <DemoCarousel />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
