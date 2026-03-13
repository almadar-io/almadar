import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./metal.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.tag}>
          <Translate id="metal.hero.tag">Infrastructure Layer</Translate>
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="metal.hero.title">Metal</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="metal.hero.subtitle">
            The infrastructure layer. Event-driven compute, persistent storage, and platform services.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const SERVICES = [
  {
    title: "Event Bus",
    desc: "Publish-subscribe event routing with guaranteed delivery. Every state machine transition flows through the bus.",
  },
  {
    title: "Event Persistence",
    desc: "Full event sourcing. Every event is stored, indexed, and replayable. Rebuild state from any point in time.",
  },
  {
    title: "Service Discovery",
    desc: "Automatic service registration and discovery. Applications find each other without manual configuration.",
  },
  {
    title: "Storage",
    desc: "Object storage with CDN distribution. Files, images, and documents with automatic optimization.",
  },
  {
    title: "Queue",
    desc: "Background job processing with retry logic, dead letter queues, and priority scheduling.",
  },
  {
    title: "Auth",
    desc: "Authentication and authorization. Email/password, OAuth providers, API keys, and role-based access control.",
  },
  {
    title: "Observability",
    desc: "Logs, metrics, and traces. See what every service and agent is doing in real time.",
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
                <Translate id="metal.services.title">Compute Services</Translate>
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
            <img src="/img/metal-eventbus.webp" alt="Event bus architecture" className={styles.sectionImage} loading="lazy" style={{ margin: 0 }} />
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
            <Translate id="metal.cta.title">Explore Other Layers</Translate>
          </Heading>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/brains">
              <Translate id="metal.cta.brains">AI Services</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/integrations">
              <Translate id="metal.cta.integrations">Integrations</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Metal(): ReactNode {
  return (
    <Layout
      title={translate({ id: "metal.meta.title", message: "Metal — Compute Services" })}
      description={translate({ id: "metal.meta.desc", message: "Event Bus, Event Persistence, Service Discovery, Storage, Queue, Auth, and Observability." })}
    >
      <Hero />
      <main>
        <ServicesGrid />
        <CTASection />
      </main>
    </Layout>
  );
}
