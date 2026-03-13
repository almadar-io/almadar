import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import { BrainCircuit, Server, Plug } from "lucide-react";
import styles from "./index.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.tag}>
          <Translate id="services.hero.tag">Infrastructure</Translate>
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="services.hero.title">Infrastructure for the Agentic Era</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="services.hero.subtitle">
            AI-native compute, storage, and orchestration. Built for applications that agents create and operate.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/pricing">
            <Translate id="services.hero.cta1">View Pricing</Translate>
          </Link>
          <Link className="button button--secondary button--lg" to="/brains">
            <Translate id="services.hero.cta2">Explore Services</Translate>
          </Link>
        </div>
        <img src="/img/hero-layers.webp" alt="Three-layer architecture" className={styles.heroImage} loading="eager" />
      </div>
    </header>
  );
}

const LAYERS = [
  {
    icon: <BrainCircuit size={32} strokeWidth={1.5} />,
    titleId: "services.layers.brains.title", title: "Brains",
    descId: "services.layers.brains.desc", desc: "LLM orchestration, memory management, session handling, skill agents, and the DeepAgent. The intelligence layer.",
    href: "/brains",
    linkId: "services.layers.brains.link", linkText: "AI Services",
  },
  {
    icon: <Server size={32} strokeWidth={1.5} />,
    titleId: "services.layers.metal.title", title: "Metal",
    descId: "services.layers.metal.desc", desc: "Event bus, persistence, service discovery, storage, queues, authentication, and observability. The infrastructure layer.",
    href: "/metal",
    linkId: "services.layers.metal.link", linkText: "Compute Services",
  },
  {
    icon: <Plug size={32} strokeWidth={1.5} />,
    titleId: "services.layers.integrations.title", title: "Integrations",
    descId: "services.layers.integrations.desc", desc: "Stripe, Twilio, GitHub, Email, YouTube, Docker, Redis. Pre-built connectors for the services your applications need.",
    href: "/integrations",
    linkId: "services.layers.integrations.link", linkText: "Integration Catalog",
  },
];

function LayersSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="services.layers.title">Three Layers</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="services.layers.subtitle">
              Intelligence on top, infrastructure in the middle, integrations at the edge.
            </Translate>
          </p>
        </div>
        <div className={styles.layersGrid}>
          {LAYERS.map((layer) => (
            <div key={layer.titleId} className={styles.layerCard}>
              <div style={{ marginBottom: "1rem" }}>{layer.icon}</div>
              <h3><Translate id={layer.titleId}>{layer.title}</Translate></h3>
              <p><Translate id={layer.descId}>{layer.desc}</Translate></p>
              <Link to={layer.href} className={styles.layerLink}>
                <Translate id={layer.linkId}>{layer.linkText}</Translate> &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATALOG = [
  // Brains
  { name: "LLM Orchestrator", layer: "Brains" },
  { name: "DeepAgent SDK", layer: "Brains" },
  { name: "Semantic Memory", layer: "Brains" },
  { name: "S-Expression Engine", layer: "Brains" },
  { name: "Context Manager", layer: "Brains" },
  { name: "Vector Search", layer: "Brains" },
  
  // Metal
  { name: "Distributed Event Bus", layer: "Metal" },
  { name: "Managed Authentication", layer: "Metal" },
  { name: "Persistent Storage", layer: "Metal" },
  { name: "Service Discovery", layer: "Metal" },
  { name: "Observability Hub", layer: "Metal" },
  { name: "Secret Manager", layer: "Metal" },
  { name: "IAM & RBAC", layer: "Metal" },
  { name: "VPC Networking", layer: "Metal" },

  // Integrations
  { name: "Stripe Connector", layer: "Integrations" },
  { name: "Twilio Gateway", layer: "Integrations" },
  { name: "GitHub Automations", layer: "Integrations" },
  { name: "Firebase Sync", layer: "Integrations" },
  { name: "PostgreSQL Bridge", layer: "Integrations" },
  { name: "Redis Cache", layer: "Integrations" },
  { name: "AWS S3 Adapter", layer: "Integrations" },
  { name: "Slack & Discord", layer: "Integrations" },
];

function CatalogSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="services.catalog.title">Service Catalog</Translate>
          </Heading>
        </div>
        <div className={styles.catalogGrid}>
          {CATALOG.map((svc) => (
            <div key={svc.name} className={styles.catalogCard}>
              <span className={styles.catalogLayer}>{svc.layer}</span>
              <span className={styles.catalogName}>{svc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={styles.ctaTitle}>
            <Translate id="services.waitlist.title">Coming Soon</Translate>
          </Heading>
          <p className={styles.ctaText}>
            <Translate id="services.waitlist.text">
              Almadar Services is in private beta. Join the waitlist to get early access.
            </Translate>
          </p>
          <Link className="button button--primary button--lg" href="mailto:hello@almadar.io">
            <Translate id="services.waitlist.cta">Join Waitlist</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServicesHome(): ReactNode {
  return (
    <Layout
      title={translate({ id: "services.meta.title", message: "Almadar Services — Infrastructure for the Agentic Era" })}
      description={translate({ id: "services.meta.desc", message: "AI-native compute, storage, and orchestration. Built for applications that agents create and operate." })}
    >
      <Hero />
      <main>
        <LayersSection />
        <CatalogSection />
        <WaitlistSection />
      </main>
    </Layout>
  );
}
