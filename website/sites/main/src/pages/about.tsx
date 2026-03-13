import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./about.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="about.hero.title">About Almadar</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="about.hero.subtitle">
            A small team building the physics of software. Based in Ljubljana, Slovenia.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const TEAM = [
  {
    name: "Osama",
    roleId: "about.team.osama.role",
    roleDefault: "Co-Founder & Technical Lead",
    bioId: "about.team.osama.bio",
    bioDefault: "15+ years building enterprise systems. Designed and built Saudi Arabia's national e-invoicing platform. Architect of the Orb programming language and the Almadar compiler. Leads the AI pipeline, standard library, and infrastructure.",
  },
  {
    name: "Maja Golob",
    roleId: "about.team.maja.role",
    roleDefault: "Co-Founder & Program Manager",
    bioId: "about.team.maja.bio",
    bioDefault: "10+ years in enterprise delivery and program management. Manages client projects, quality gates, and go-to-market strategy. Ensures every shipped product meets production standards.",
  },
];

function TeamSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="about.team.title">The Team</Translate>
          </Heading>
        </div>
        <img src="/img/about-team.webp" alt="The Almadar team" className={styles.sectionImage} loading="lazy" />
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.avatar}>{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <span className={styles.role}>
                <Translate id={member.roleId}>{member.roleDefault}</Translate>
              </span>
              <p>
                <Translate id={member.bioId}>{member.bioDefault}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <article className={styles.article}>
          <Heading as="h2">
            <Translate id="about.story.title">Why We Build This</Translate>
          </Heading>
          <p>
            <Translate id="about.story.p1">
              Software development has a fundamental problem: the gap between what someone wants and what they can build keeps growing. Tools get more powerful, but also more complex. AI assistants generate code faster, but the underlying approach is still the same: write code, hope it works, debug when it does not.
            </Translate>
          </p>
          <p>
            <Translate id="about.story.p2">
              We started Almadar with a different premise. What if software had physics? What if you could describe how a system behaves, formally, and a compiler could prove it correct before generating any code? What if AI understood software structure instead of just predicting the next token?
            </Translate>
          </p>
          <p>
            <Translate id="about.story.p3">
              That premise became Orb, the Almadar compiler, and the neural pipeline. It is still early. But seven production projects and 103 standard behaviors later, the premise holds.
            </Translate>
          </p>
        </article>
      </div>
    </section>
  );
}

export default function About(): ReactNode {
  return (
    <Layout
      title={translate({ id: "about.meta.title", message: "About — The Almadar Team" })}
      description={translate({ id: "about.meta.desc", message: "A small team in Ljubljana, Slovenia, building the physics of software." })}
    >
      <Hero />
      <main>
        <TeamSection />
        <StorySection />
      </main>
    </Layout>
  );
}
