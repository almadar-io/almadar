import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { MessageSquare, Settings, Rocket, Bot, Palette, FileText, Search, Zap, Users } from "lucide-react";

import styles from "./index.module.css";

const steps = [
  {
    number: 1,
    titleId: "studio.steps.describe.title",
    titleDefault: "Describe",
    descId: "studio.steps.describe.desc",
    descDefault:
      "Tell the AI what you want to build in plain language. Describe your data, workflows, and UI.",
    screenshot: "/img/screenshots/builder-home-page.png",
  },
  {
    number: 2,
    titleId: "studio.steps.generate.title",
    titleDefault: "Generate",
    descId: "studio.steps.generate.desc",
    descDefault:
      "The AI agent writes a complete .orb program. The compiler validates every state before a single line of code runs.",
    screenshot: "/img/screenshots/builder-build.png",
  },
  {
    number: 3,
    titleId: "studio.steps.deploy.title",
    titleDefault: "Deploy",
    descId: "studio.steps.deploy.desc",
    descDefault:
      "One click to deploy. Your app is live on Firebase Hosting with a server backend.",
    screenshot: "/img/screenshots/builder-viz.png",
  },
];

const features = [
  {
    icon: <Bot size={32} strokeWidth={1.5} />,
    titleId: "studio.feature.agent.title",
    titleDefault: "AI Agent",
    descId: "studio.feature.agent.desc",
    descDefault:
      "Describe what you want in plain language. The DeepAgent generates a complete .orb program with entities, traits, and pages.",
  },
  {
    icon: <Palette size={32} strokeWidth={1.5} />,
    titleId: "studio.feature.editor.title",
    titleDefault: "Visual Editor",
    descId: "studio.feature.editor.desc",
    descDefault:
      "Edit schemas visually with a drag-and-drop interface, or switch to code mode with a full Monaco editor.",
  },
  {
    icon: <FileText size={32} strokeWidth={1.5} />,
    titleId: "studio.feature.git.title",
    titleDefault: "Git History",
    descId: "studio.feature.git.desc",
    descDefault:
      "Every change is a commit. Browse the full version history, compare diffs, and roll back to any point.",
  },
  {
    icon: <Search size={32} strokeWidth={1.5} />,
    titleId: "studio.feature.preview.title",
    titleDefault: "Live Preview",
    descId: "studio.feature.preview.desc",
    descDefault:
      "See your application running in real time as you build. Changes compile instantly in the background.",
  },
  {
    icon: <Zap size={32} strokeWidth={1.5} />,
    titleId: "studio.feature.deploy.title",
    titleDefault: "One-Click Deploy",
    descId: "studio.feature.deploy.desc",
    descDefault:
      "Deploy to production with Firebase App Hosting. Frontend, backend, and database provisioned automatically.",
  },
  {
    icon: <Users size={32} strokeWidth={1.5} />,
    titleId: "studio.feature.collab.title",
    titleDefault: "Team Collaboration",
    descId: "studio.feature.collab.desc",
    descDefault:
      "Share projects with your team. Review changes, leave comments, and manage access with roles.",
  },
];

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="studio.hero.title.prefix">Build Software</Translate>{" "}
          <span className={styles.heroTitleAccent}>
            <Translate id="studio.hero.title.accent">with AI</Translate>
          </span>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="studio.hero.subtitle">
            Describe what you want. Get a working application. Edit, preview,
            deploy.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="https://kflow-builder-app.web.app/">
            <Translate id="studio.hero.cta.start">Start Building</Translate>
          </Link>
          <Link className="button button--secondary button--lg" to="/features">
            <Translate id="studio.hero.cta.features">See Features</Translate>
          </Link>
        </div>
        <img src="/img/screenshots/builder-home-page.png" alt="Almadar Studio AI Builder" className={styles.heroImage} loading="eager" />
      </div>
    </header>
  );
}

function HowItWorks(): ReactNode {
  return (
    <section className={styles.steps}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="studio.steps.title">How It Works</Translate>
          </Heading>
          <p>
            <Translate id="studio.steps.subtitle">
              From idea to production in three steps
            </Translate>
          </p>
        </div>
        <div className={styles.stepsVertical}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepRow}>
              <div className={styles.stepInfo}>
                <span className={styles.stepNumber}>{step.number}</span>
                <Heading as="h3">
                  <Translate id={step.titleId}>{step.titleDefault}</Translate>
                </Heading>
                <p>
                  <Translate id={step.descId}>{step.descDefault}</Translate>
                </p>
              </div>
              <div className={styles.stepScreenshot}>
                <img src={step.screenshot} alt={step.titleDefault} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" style={{ color: "var(--almadar-parchment)" }}>
            <Translate id="studio.features.title">
              Everything You Need to Build
            </Translate>
          </Heading>
          <p>
            <Translate id="studio.features.subtitle">
              A complete development environment powered by AI
            </Translate>
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <Heading as="h3">
                <Translate id={feature.titleId}>
                  {feature.titleDefault}
                </Translate>
              </Heading>
              <p>
                <Translate id={feature.descId}>{feature.descDefault}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase(): ReactNode {
  return (
    <section className={styles.showcase}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="studio.showcase.title">See It in Action</Translate>
          </Heading>
          <p>
            <Translate id="studio.showcase.subtitle">
              Real screenshots from Almadar Studio
            </Translate>
          </p>
        </div>
        <div className={styles.showcaseGrid}>
          <div className={styles.showcaseItem}>
            <img src="/img/screenshots/builder-hq.png" alt="HQ - Entity Story View" loading="lazy" />
            <span className={styles.showcaseLabel}>
              <Translate id="studio.showcase.hq">HQ &amp; Domain Story</Translate>
            </span>
          </div>
          <div className={styles.showcaseItem}>
            <img src="/img/screenshots/builder-viz.png" alt="Orbital Graph Visualization" loading="lazy" />
            <span className={styles.showcaseLabel}>
              <Translate id="studio.showcase.viz">Orbital Graph</Translate>
            </span>
          </div>
          <div className={styles.showcaseItem}>
            <img src="/img/screenshots/builder-build.png" alt="Schema Editor" loading="lazy" />
            <span className={styles.showcaseLabel}>
              <Translate id="studio.showcase.build">Schema Editor</Translate>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TryItLive(): ReactNode {
  return (
    <section className={styles.steps}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="studio.tryit.title">Try It Live</Translate>
          </Heading>
          <p>
            <Translate id="studio.tryit.subtitle">
              Describe an app idea and watch the AI generate a complete .orb program
            </Translate>
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0 2rem' }}>
          <BrowserOnly fallback={<p style={{ color: '#94a3b8' }}>Loading builder...</p>}>
            {() => {
              const { AlmadarBuilder } = require('@site/src/components/AlmadarBuilder');
              return <AlmadarBuilder />;
            }}
          </BrowserOnly>
        </div>
      </div>
    </section>
  );
}

function CallToAction(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <Heading as="h2">
            <Translate id="studio.cta.title">
              Start Building. It's Free.
            </Translate>
          </Heading>
          <p>
            <Translate id="studio.cta.subtitle">
              Create your first application in minutes. No credit card required.
            </Translate>
          </p>
          <Link className={styles.ctaButton} to="https://kflow-builder-app.web.app/">
            <Translate id="studio.cta.button">Open Studio</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function StudioHome(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "studio.meta.title",
        message: "Build Software with AI",
      })}
      description={translate({
        id: "studio.meta.description",
        message:
          "Almadar Studio - Describe what you want, get a working application. AI-powered software builder.",
      })}
    >
      <Hero />
      <main>
        <HowItWorks />
        <Features />
        <Showcase />
        <TryItLive />
        <CallToAction />
      </main>
    </Layout>
  );
}
