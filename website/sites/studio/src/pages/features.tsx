import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import { Bot, Palette, FileText, Search, Zap, Users } from "lucide-react";
import styles from "./features.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="features.hero.title">Features</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="features.hero.subtitle">
            Everything you need to build, preview, and deploy full-stack applications.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const FEATURES = [
  {
    icon: <Bot size={32} strokeWidth={1.5} />,
    tag: "Intelligence",
    titleId: "features.agent.title", title: "AI Agent",
    descId: "features.agent.desc", desc: "Describe what you want in plain language. The DeepAgent generates a complete .orb program with entities, state machines, UI patterns, and pages. It understands domain requirements and produces production-quality output.",
    bullets: ["Natural language to working app", "Domain-aware generation", "Iterative refinement through conversation"],
    screenshot: "/img/screenshots/builder-hq.png",
  },
  {
    icon: <Palette size={32} strokeWidth={1.5} />,
    tag: "Editing",
    titleId: "features.editor.title", title: "Visual Editor",
    descId: "features.editor.desc", desc: "Edit your application schema visually with a structured interface, or switch to code mode with a full Monaco editor. Both views stay in sync.",
    bullets: ["Drag-and-drop state machine editing", "Monaco code editor with .orb syntax", "Real-time validation as you type"],
    screenshot: "/img/screenshots/builder-build.png",
  },
  {
    icon: <FileText size={32} strokeWidth={1.5} />,
    tag: "Version Control",
    titleId: "features.git.title", title: "Git History",
    descId: "features.git.desc", desc: "Every change is a commit. Browse the full version history of your project, compare diffs between any two versions, and roll back to any point.",
    bullets: ["Automatic commit on every change", "Visual diff viewer", "One-click rollback"],
    screenshot: "/img/screenshots/builder-templates-studioprojecttemplate--build-mode-schema.png",
  },
  {
    icon: <Search size={32} strokeWidth={1.5} />,
    tag: "Development",
    titleId: "features.preview.title", title: "Live Preview",
    descId: "features.preview.desc", desc: "See your application running in real time as you build. Changes compile instantly in the background. No manual refresh, no waiting.",
    bullets: ["Instant compilation", "Hot reload on schema changes", "Mobile and desktop preview"],
    screenshot: "/img/screenshots/builder-viz.png",
  },
  {
    icon: <Zap size={32} strokeWidth={1.5} />,
    tag: "Deployment",
    titleId: "features.deploy.title", title: "One-Click Deploy",
    descId: "features.deploy.desc", desc: "Deploy to production with Firebase App Hosting. Frontend, backend, and database are provisioned automatically. Custom domains supported.",
    bullets: ["Firebase App Hosting integration", "Automatic SSL and CDN", "Server backend included"],
    screenshot: "/img/screenshots/builder-templates-previewdashboardtemplate--default.png",
  },
  {
    icon: <Users size={32} strokeWidth={1.5} />,
    tag: "Collaboration",
    titleId: "features.collab.title", title: "Team Collaboration",
    descId: "features.collab.desc", desc: "Share projects with your team. Review changes, leave comments, and manage access with role-based permissions.",
    bullets: ["Shared project workspaces", "Role-based access control", "Change review workflow"],
    screenshot: "/img/screenshots/builder-templates-workspacetemplate--default.png",
  },
];

function FeatureSections() {
  return (
    <main>
      {FEATURES.map((feature, idx) => (
        <section
          key={feature.titleId}
          className={styles.featureSection}
        >
          <div className="container">
            <div className={idx % 2 === 1 ? styles.featureRowReverse : styles.featureRow}>
              <div className={styles.featureContent}>
                <span className={styles.featureTag}>{feature.tag}</span>
                <Heading as="h2">
                  <Translate id={feature.titleId}>{feature.title}</Translate>
                </Heading>
                <p>
                  <Translate id={feature.descId}>{feature.desc}</Translate>
                </p>
                <ul className={styles.featureList}>
                  {feature.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.featureVisual}>
                <img src={feature.screenshot} alt={feature.title} className={styles.featureImage} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

function CTASection() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaInner}>
          <Heading as="h2">
            <Translate id="features.cta.title">Ready to Build?</Translate>
          </Heading>
          <p>
            <Translate id="features.cta.text">
              Create your first application in minutes. Free to start.
            </Translate>
          </p>
          <Link className="button button--primary button--lg" href="https://studio.almadar.io/app">
            <Translate id="features.cta.button">Open Studio</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Features(): ReactNode {
  return (
    <Layout
      title={translate({ id: "features.meta.title", message: "Features — Almadar Studio" })}
      description={translate({ id: "features.meta.desc", message: "AI Agent, Visual Editor, Git History, Live Preview, One-Click Deploy, and Team Collaboration." })}
    >
      <Hero />
      <FeatureSections />
      <CTASection />
    </Layout>
  );
}
