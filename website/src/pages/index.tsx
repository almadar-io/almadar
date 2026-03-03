import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import HeroSection from "../components/HeroSection";
import ProjectShowcase from "../components/ProjectShowcase";
import styles from "./index.module.css";

// ─── Hero ───────────────────────────────────────────────────────────────────

function HomepageHeader() {
  return (
    <HeroSection
      title={
        <Translate id="homepage.title">
          Custom Software, Delivered in Weeks
        </Translate>
      }
      subtitle={
        <Translate id="homepage.subtitle">
          Almadar is a two-person software studio. We turn your idea into a
          production-ready application — full source code, full documentation,
          no vendor lock-in.
        </Translate>
      }
      buttons={
        <>
          <Link
            className="button button--primary button--lg"
            href="mailto:hello@almadar.io"
          >
            <Translate id="homepage.startProject">Start a Project</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/enterprise"
          >
            <Translate id="homepage.enterprise">Enterprise</Translate>
          </Link>
        </>
      }
    />
  );
}

// ─── Why Almadar ────────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  {
    agencyId: "homepage.why.agency.team",
    agencyDefault: "Large teams (5–10 people)",
    almadarId: "homepage.why.almadar.team",
    almadarDefault: "Lean team — 2 senior experts",
  },
  {
    agencyId: "homepage.why.agency.timeline",
    agencyDefault: "Months of development",
    almadarId: "homepage.why.almadar.timeline",
    almadarDefault: "Weeks to production",
  },
  {
    agencyId: "homepage.why.agency.cost",
    agencyDefault: "High cost, unpredictable scope",
    almadarId: "homepage.why.almadar.cost",
    almadarDefault: "Fixed price, clear deliverables",
  },
  {
    agencyId: "homepage.why.agency.changes",
    agencyDefault: "Expensive change requests",
    almadarId: "homepage.why.almadar.changes",
    almadarDefault: "Flexible, cost-effective changes",
  },
  {
    agencyId: "homepage.why.agency.docs",
    agencyDefault: "Documentation as afterthought",
    almadarId: "homepage.why.almadar.docs",
    almadarDefault: "Full documentation included",
  },
];

function WhyAlmadar() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.why.title">Why Almadar</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.why.subtitle">
              What you get that a traditional agency cannot give you
            </Translate>
          </p>
        </div>
        <div className={styles.comparisonTable}>
          <div className={styles.comparisonHeader}>
            <div className={styles.comparisonHeaderCell} />
            <div className={`${styles.comparisonHeaderCell} ${styles.agencyHeader}`}>
              <Translate id="homepage.why.agencyCol">Traditional Agency</Translate>
            </div>
            <div className={`${styles.comparisonHeaderCell} ${styles.almadarHeader}`}>
              <Translate id="homepage.why.almadarCol">Almadar</Translate>
            </div>
          </div>
          {COMPARISON_ROWS.map((row) => (
            <div key={row.agencyId} className={styles.comparisonRow}>
              <div className={styles.comparisonAgency}>
                <span className={styles.xMark} aria-hidden="true">✕</span>
                <Translate id={row.agencyId}>{row.agencyDefault}</Translate>
              </div>
              <div className={styles.comparisonAlmadar}>
                <span className={styles.checkMark} aria-hidden="true">✓</span>
                <Translate id={row.almadarId}>{row.almadarDefault}</Translate>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.deliverables}>
          <Heading as="h3" className={styles.deliverablesTitle}>
            <Translate id="homepage.why.deliverables.title">What you get</Translate>
          </Heading>
          <ul className={styles.deliverablesList}>
            {[
              { id: "homepage.why.deliverables.app", msg: "Working application deployed to production" },
              { id: "homepage.why.deliverables.source", msg: "Complete source code — standard technologies, no proprietary lock-in" },
              { id: "homepage.why.deliverables.docs", msg: "Full documentation for your team" },
              { id: "homepage.why.deliverables.support", msg: "60-day post-launch support included" },
              { id: "homepage.why.deliverables.transfer", msg: "Knowledge transfer so you can maintain and extend the system" },
            ].map((item) => (
              <li key={item.id} className={styles.deliverableItem}>
                <span className={styles.checkMark} aria-hidden="true">✓</span>
                <Translate id={item.id}>{item.msg}</Translate>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Results / Stats ────────────────────────────────────────────────────────

const STATS = [
  {
    valueId: "homepage.stats.cost.value",
    valueDefault: "87%",
    labelId: "homepage.stats.cost.label",
    labelDefault: "Reduction in development cost",
    linkTo: "/enterprise",
  },
  {
    valueId: "homepage.stats.speed.value",
    valueDefault: "60%",
    labelId: "homepage.stats.speed.label",
    labelDefault: "Faster time to delivery",
    linkTo: "/enterprise",
  },
  {
    valueId: "homepage.stats.auto.value",
    valueDefault: "70%",
    labelId: "homepage.stats.auto.label",
    labelDefault: "Of application code auto-generated",
    linkTo: "/developers",
  },
];

function HomepageResults() {
  return (
    <section className={styles.proofSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.proof.title">Proven in Production</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.proof.subtitle">
              Real results from teams that switched to Almadar
            </Translate>
          </p>
        </div>
        <div className={styles.statsGrid}>
          {STATS.map(({ valueId, valueDefault, labelId, labelDefault, linkTo }) => (
            <Link key={valueId} to={linkTo} className={styles.statCard}>
              <span className={styles.statValue}>
                <Translate id={valueId}>{valueDefault}</Translate>
              </span>
              <span className={styles.statLabel}>
                <Translate id={labelId}>{labelDefault}</Translate>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team ───────────────────────────────────────────────────────────────────

const TEAM = [
  {
    nameId: "homepage.team.osama.name",
    nameDefault: "Osama Alghanmi",
    roleId: "homepage.team.osama.role",
    roleDefault: "Co-Founder & Technical Lead",
    bioId: "homepage.team.osama.bio",
    bioDefault:
      "Built Saudi Arabia's national e-invoicing platform. 15+ years across enterprise systems, compiler design, and full-stack development.",
  },
  {
    nameId: "homepage.team.maja.name",
    nameDefault: "Maja Golob",
    roleId: "homepage.team.maja.role",
    roleDefault: "Co-Founder & Program Manager",
    bioId: "homepage.team.maja.bio",
    bioDefault:
      "10+ years delivering enterprise software projects. Expert in stakeholder management, delivery planning, and cross-cultural teams.",
  },
];

function HomepageTeam() {
  return (
    <section className={styles.teamSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.team.title">Two Experts. Full Accountability.</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.team.subtitle">
              No handoffs, no junior developers, no project managers in between.
              You work directly with the people who build your application.
            </Translate>
          </p>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <div key={member.nameId} className={styles.teamCard}>
              <div className={styles.teamAvatar} aria-hidden="true">
                {translate({ id: member.nameId, message: member.nameDefault }).charAt(0)}
              </div>
              <div>
                <h3 className={styles.teamName}>
                  <Translate id={member.nameId}>{member.nameDefault}</Translate>
                </h3>
                <p className={styles.teamRole}>
                  <Translate id={member.roleId}>{member.roleDefault}</Translate>
                </p>
                <p className={styles.teamBio}>
                  <Translate id={member.bioId}>{member.bioDefault}</Translate>
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.teamFootnote}>
          <Translate id="homepage.team.experience">
            25+ years combined experience building software at scale.
            Based in Ljubljana, Slovenia. Working globally.
          </Translate>
        </p>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <Heading as="h2">
            <Translate id="homepage.cta.title">Ready to build?</Translate>
          </Heading>
          <p>
            <Translate id="homepage.cta.description">
              Tell us what you want to build. We will scope it, price it, and
              deliver it — with full source code and documentation.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              href="mailto:hello@almadar.io"
            >
              <Translate id="homepage.cta.startProject">Start a Project</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/developers"
            >
              <Translate id="homepage.cta.developers">Developer Docs</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "homepage.meta.title",
        message: "Almadar — Custom Software, Delivered in Weeks",
      })}
      description={translate({
        id: "homepage.meta.description",
        message:
          "Almadar is a software studio that builds production-ready applications from schema to deployment. Two experts, fixed price, full source code.",
      })}
    >
      <HomepageHeader />
      <main>
        <WhyAlmadar />
        <ProjectShowcase />
        <HomepageResults />
        <HomepageTeam />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
