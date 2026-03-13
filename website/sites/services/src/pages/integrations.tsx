import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./integrations.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.tag}>
          <Translate id="integrations.hero.tag">Connectors</Translate>
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="integrations.hero.title">Integrations</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="integrations.hero.subtitle">
            Pre-built connectors for the services your applications need. No glue code required.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const INTEGRATIONS = [
  {
    titleId: "integrations.stripe.title", title: "Stripe",
    descId: "integrations.stripe.desc", desc: "Payment processing, subscriptions, invoicing, and webhook handling. Connect your .orb application to Stripe in one line.",
    category: "Payments",
  },
  {
    titleId: "integrations.twilio.title", title: "Twilio",
    descId: "integrations.twilio.desc", desc: "SMS, voice calls, and WhatsApp messaging. Send notifications and receive user responses through Twilio's communication APIs.",
    category: "Communication",
  },
  {
    titleId: "integrations.github.title", title: "GitHub",
    descId: "integrations.github.desc", desc: "Repository management, issue tracking, pull requests, and webhooks. Automate development workflows.",
    category: "Development",
  },
  {
    titleId: "integrations.email.title", title: "Email",
    descId: "integrations.email.desc", desc: "Transactional email with templates, attachments, and delivery tracking. Built on SendGrid and Amazon SES.",
    category: "Communication",
  },
  {
    titleId: "integrations.youtube.title", title: "YouTube",
    descId: "integrations.youtube.desc", desc: "Video embedding, playlist management, and analytics. Pull video metadata and display content natively.",
    category: "Media",
  },
  {
    titleId: "integrations.docker.title", title: "Docker",
    descId: "integrations.docker.desc", desc: "Container orchestration for custom services. Deploy additional backend services alongside your .orb application.",
    category: "Infrastructure",
  },
  {
    titleId: "integrations.redis.title", title: "Redis",
    descId: "integrations.redis.desc", desc: "In-memory caching, pub/sub messaging, and session storage. High-performance data layer for real-time features.",
    category: "Infrastructure",
  },
];

function IntegrationsGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row align-items--center">
          <div className="col col--6">
            <div className={styles.sectionHeader} style={{ textAlign: "left", marginBottom: "2rem" }}>
              <Heading as="h2">
                <Translate id="integrations.catalog.title">Integration Catalog</Translate>
              </Heading>
            </div>
            <div className={styles.integrationsGrid}>
              {INTEGRATIONS.map((item) => (
                <div key={item.titleId} className={styles.integrationCard}>
                  <span className={styles.integrationCategory}>{item.category}</span>
                  <h3><Translate id={item.titleId}>{item.title}</Translate></h3>
                  <p><Translate id={item.descId}>{item.desc}</Translate></p>
                </div>
              ))}
            </div>
          </div>
          <div className="col col--6">
            <img src="/img/integrations-connectors.webp" alt="Integration connectors" className={styles.sectionImage} loading="lazy" style={{ margin: 0 }} />
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
            <Translate id="integrations.cta.title">Explore Other Layers</Translate>
          </Heading>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/brains">
              <Translate id="integrations.cta.brains">AI Services</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/metal">
              <Translate id="integrations.cta.metal">Metal Services</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Integrations(): ReactNode {
  return (
    <Layout
      title={translate({ id: "integrations.meta.title", message: "Integrations — Service Connectors" })}
      description={translate({ id: "integrations.meta.desc", message: "Stripe, Twilio, GitHub, Email, YouTube, Docker, and Redis. Pre-built connectors." })}
    >
      <Hero />
      <main>
        <IntegrationsGrid />
        <CTASection />
      </main>
    </Layout>
  );
}
