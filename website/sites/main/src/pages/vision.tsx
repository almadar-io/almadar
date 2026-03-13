import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./vision.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="vision.hero.title">A Shared Digital Reality</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="vision.hero.subtitle">
            Software that coexists, coordinates, and evolves together.
          </Translate>
        </p>
        <img src="/img/vision-hero.webp" alt="" className={styles.heroImage} loading="eager" />
      </div>
    </header>
  );
}

function CoexistenceSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <article className={styles.article}>
          <Heading as="h2">
            <Translate id="vision.coexist.title">Software That Coexists</Translate>
          </Heading>
          <p>
            <Translate id="vision.coexist.p1">
              Today, every application is an island. It has its own data model, its own rules, its own language. Moving information between systems means building bridges that break every time either side changes.
            </Translate>
          </p>
          <p>
            <Translate id="vision.coexist.p2">
              We believe software should share a common grammar. The idea flows seamlessly: a nurse identifies a need on the floor, and that domain knowledge translates directly into .orb. Data flows without translation layers. Rules compose without glue code.
            </Translate>
          </p>
        </article>
      </div>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <article className={styles.article}>
          <Heading as="h2">
            <Translate id="vision.ownership.title">Communities Keep Ownership</Translate>
          </Heading>
          <p>
            <Translate id="vision.ownership.p1">
              The current model concentrates power and wastes immense resources. A few platforms own the tools, the data, and the distribution, creating heavy, inefficient silos. Communities that build on those platforms rent their digital presence at a high cost, both financially and ecologically.
            </Translate>
          </p>
          <p>
            <Translate id="vision.ownership.p2">
              Almadar changes this with an efficiency-first, "Go Green" philosophy. Orb is open source. The standard library is open source. When a community describes their domain in Orb, they build lightweight, efficient models that they own. They can compile it to any platform, host it sustainably anywhere, and evolve it on their own terms.
            </Translate>
          </p>
        </article>
      </div>
    </section>
  );
}

function WorldModelsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <article className={styles.article}>
          <Heading as="h2">
            <Translate id="vision.models.title">Composable World Models</Translate>
          </Heading>
          <img src="/img/vision-composable.webp" alt="Composable world models" className={styles.sectionImage} loading="lazy" />
          <p>
            <Translate id="vision.models.p1">
              A world model is a formal description of how a domain works: what exists, how it changes, what the rules are. In .orb, a healthcare scheduling system and an inventory tracker are both world models. They can be validated independently and composed together.
            </Translate>
          </p>
          <p>
            <Translate id="vision.models.p2">
              This is the long game. When enough domains have formal models, software stops being a collection of isolated programs and becomes a shared, interoperable digital reality. Each model is a building block. Each composition creates something new.
            </Translate>
          </p>
        </article>
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
            <Translate id="vision.cta.title">Build With Us</Translate>
          </Heading>
          <p className={styles.ctaText}>
            <Translate id="vision.cta.text">
              The shared digital reality starts with the first model. Write yours.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" href="https://orb.almadar.io">
              <Translate id="vision.cta.language">Explore the Language</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/contact">
              <Translate id="vision.cta.contact">Get in Touch</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Vision(): ReactNode {
  return (
    <Layout
      title={translate({ id: "vision.meta.title", message: "Vision — A Shared Digital Reality" })}
      description={translate({ id: "vision.meta.desc", message: "Software that coexists, coordinates, and evolves together. Communities keeping ownership. Composable world models." })}
    >
      <Hero />
      <main>
        <CoexistenceSection />
        <OwnershipSection />
        <WorldModelsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
