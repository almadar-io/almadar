import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./contact.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="contact.hero.title">Get in Touch</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="contact.hero.subtitle">
            Investors, partnerships, and enterprise inquiries.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const CHANNELS = [
  {
    titleId: "contact.investors.title", title: "Investors",
    descId: "contact.investors.desc", desc: "We are building foundational infrastructure for AI-native software. If you invest in developer tools, AI infrastructure, or platform companies, we would like to talk.",
  },
  {
    titleId: "contact.partnerships.title", title: "Partnerships",
    descId: "contact.partnerships.desc", desc: "System integrators, consultancies, and technology companies that want to build on or with the Almadar platform.",
  },
  {
    titleId: "contact.enterprise.title", title: "Enterprise",
    descId: "contact.enterprise.desc", desc: "Custom deployments, dedicated infrastructure, and tailored AI models for large organizations.",
  },
];

function ChannelsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.channelsGrid}>
          {CHANNELS.map((ch) => (
            <div key={ch.titleId} className={styles.channelCard}>
              <h3><Translate id={ch.titleId}>{ch.title}</Translate></h3>
              <p><Translate id={ch.descId}>{ch.desc}</Translate></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmailSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.emailContent}>
          <Heading as="h2">
            <Translate id="contact.email.title">Write to Us</Translate>
          </Heading>
          <p>
            <Translate id="contact.email.text">
              For any inquiry, reach us directly at:
            </Translate>
          </p>
          <Link href="mailto:hello@almadar.io" className={styles.emailLink}>
            hello@almadar.io
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Contact(): ReactNode {
  return (
    <Layout
      title={translate({ id: "contact.meta.title", message: "Contact — Almadar" })}
      description={translate({ id: "contact.meta.desc", message: "Investors, partnerships, and enterprise inquiries. hello@almadar.io" })}
    >
      <Hero />
      <main>
        <ChannelsSection />
        <EmailSection />
      </main>
    </Layout>
  );
}
