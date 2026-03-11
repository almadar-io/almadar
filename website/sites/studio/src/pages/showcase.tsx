import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./showcase.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="showcase.hero.title">Showcase</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="showcase.hero.subtitle">
            Real projects built with Almadar Studio and deployed to production.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const PROJECTS = [
  {
    titleId: "showcase.inspection.title", title: "Inspection System",
    descId: "showcase.inspection.desc", desc: "Field inspection platform for industrial compliance. Scheduling, checklists, photo evidence, PDF reports, and real-time status tracking.",
    tag: "Enterprise",
  },
  {
    titleId: "showcase.traitwars.title", title: "Trait Wars",
    descId: "showcase.traitwars.desc", desc: "Isometric strategy game with hero collection, turn-based combat, and territory control. Canvas rendering with DOM UI overlays.",
    tag: "Gaming",
  },
  {
    titleId: "showcase.knowledge.title", title: "Knowledge Platform",
    descId: "showcase.knowledge.desc", desc: "Structured knowledge management with collections, articles, quizzes, and progress tracking. Multi-tenant with role-based access.",
    tag: "Education",
  },
  {
    titleId: "showcase.blazklemenc.title", title: "Blazklemenc",
    descId: "showcase.blazklemenc.desc", desc: "Professional portfolio and booking system for a personal training business. Scheduling, payments, and client management.",
    tag: "Business",
  },
  {
    titleId: "showcase.winning11.title", title: "Winning-11",
    descId: "showcase.winning11.desc", desc: "Football team management app with player stats, match scheduling, formation builder, and tournament brackets.",
    tag: "Sports",
  },
];

function ProjectGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.projectGrid}>
          {PROJECTS.map((project) => (
            <div key={project.titleId} className={styles.projectCard}>
              <span className={styles.projectTag}>{project.tag}</span>
              <h3><Translate id={project.titleId}>{project.title}</Translate></h3>
              <p><Translate id={project.descId}>{project.desc}</Translate></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2">
            <Translate id="showcase.cta.title">Build Yours Next</Translate>
          </Heading>
          <p>
            <Translate id="showcase.cta.text">
              Every project on this page was built by describing requirements to the AI agent. No templates. No boilerplate.
            </Translate>
          </p>
          <Link className="button button--primary button--lg" href="https://studio.almadar.io/app">
            <Translate id="showcase.cta.button">Start Building</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Showcase(): ReactNode {
  return (
    <Layout
      title={translate({ id: "showcase.meta.title", message: "Showcase — Projects Built with Almadar" })}
      description={translate({ id: "showcase.meta.desc", message: "Real projects built with Almadar Studio and deployed to production." })}
    >
      <Hero />
      <main>
        <ProjectGrid />
        <CTASection />
      </main>
    </Layout>
  );
}
