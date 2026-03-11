import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./platform.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="platform.hero.title">The Platform</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="platform.hero.subtitle">
            Three pillars, one goal: turn formal descriptions of software into running applications.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const PILLARS = [
  {
    titleId: "platform.language.title", title: "Orb",
    descId: "platform.language.desc", desc: "A formal language for describing how software systems behave. Open source, compiler-verified, AI-native. Write entities, traits, and pages. The compiler guarantees correctness before generating code.",
    linkHref: "https://orb.almadar.io",
    linkId: "platform.language.link", linkText: "Language Docs",
  },
  {
    titleId: "platform.studio.title", title: "Almadar Studio",
    descId: "platform.studio.desc", desc: "The builder where humans and AI collaborate. Describe what you want in plain language, the AI agent generates a valid program. Edit visually or in code. Preview in real time. Deploy with one click.",
    linkHref: "https://studio.almadar.io",
    linkId: "platform.studio.link", linkText: "Open Studio",
  },
  {
    titleId: "platform.services.title", title: "Almadar Services",
    descId: "platform.services.desc", desc: "AI-native infrastructure for the agentic era. Compute, storage, authentication, event routing, LLM orchestration, and observability. Designed for applications that agents build and operate.",
    linkHref: "https://services.almadar.io",
    linkId: "platform.services.link", linkText: "View Services",
  },
];

function PillarsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.pillarsGrid}>
          {PILLARS.map((p) => (
            <div key={p.titleId} className={styles.pillarCard}>
              <h3><Translate id={p.titleId}>{p.title}</Translate></h3>
              <p><Translate id={p.descId}>{p.desc}</Translate></p>
              <Link href={p.linkHref} className={styles.pillarLink}>
                <Translate id={p.linkId}>{p.linkText}</Translate> &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowTheyConnectSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="platform.connect.title">How They Connect</Translate>
          </Heading>
        </div>
        <div className={styles.flowGrid}>
          <div className={styles.flowCard}>
            <span className={styles.flowStep}>1</span>
            <h3><Translate id="platform.connect.step1.title">Describe</Translate></h3>
            <p><Translate id="platform.connect.step1.desc">You describe what you need in Studio. The AI agent turns your description into a verified application model.</Translate></p>
          </div>
          <div className={styles.flowCard}>
            <span className={styles.flowStep}>2</span>
            <h3><Translate id="platform.connect.step2.title">Generate</Translate></h3>
            <p><Translate id="platform.connect.step2.desc">The compiler verifies the model is correct, then generates a complete application: frontend, backend, and database.</Translate></p>
          </div>
          <div className={styles.flowCard}>
            <span className={styles.flowStep}>3</span>
            <h3><Translate id="platform.connect.step3.title">Run</Translate></h3>
            <p><Translate id="platform.connect.step3.desc">Almadar Services hosts your application with authentication, storage, event routing, and AI services built in.</Translate></p>
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
            <Translate id="platform.cta.title">Start Anywhere</Translate>
          </Heading>
          <p className={styles.ctaText}>
            <Translate id="platform.cta.text">
              Try the builder, explore the infrastructure, or dive into the language. Each product works on its own. Together, they form a complete platform.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" href="https://studio.almadar.io">
              <Translate id="platform.cta.studio">Try Studio</Translate>
            </Link>
            <Link className="button button--secondary button--lg" href="https://orb.almadar.io">
              <Translate id="platform.cta.docs">Explore Orb</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Platform(): ReactNode {
  return (
    <Layout
      title={translate({ id: "platform.meta.title", message: "Platform \u2014 Studio, Services, Orb" })}
      description={translate({ id: "platform.meta.desc", message: "Three products that turn descriptions into running applications: Studio, Services, and Orb." })}
    >
      <Hero />
      <main>
        <PillarsSection />
        <HowTheyConnectSection />
        <CTASection />
      </main>
    </Layout>
  );
}
