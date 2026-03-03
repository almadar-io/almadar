import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./case-study.module.css";

export default function InspectionCaseStudy(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "cs.inspection.meta.title",
        message: "Inspection System — Almadar Case Study",
      })}
      description={translate({
        id: "cs.inspection.meta.desc",
        message:
          "How we digitized thousands of paper inspections with full offline reliability using Orbitals.",
      })}
    >
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className="container">
          <span
            className={styles.badge}
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              color: "#fb923c",
            }}
          >
            <Translate id="cs.inspection.badge">Field Ops</Translate>
          </span>
          <Heading as="h1">
            <Translate id="cs.inspection.title">Inspection System</Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="cs.inspection.subtitle">
              Digitizing thousands of paper inspections with full offline
              reliability.
            </Translate>
          </p>
        </div>
      </header>

      {/* ─── Content ───────────────────────────────────────────────────────── */}
      <main className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.card}>
            <h3>
              <span className={styles.highlight}>
                <Translate id="cs.inspection.challenge.label">
                  The Challenge
                </Translate>
              </span>
            </h3>
            <p>
              <Translate id="cs.inspection.challenge.desc">
                The client needed to digitize their paper-based inspection
                process. Field inspectors work in remote locations with
                unreliable connectivity. They needed a system that would work
                offline and sync reliably when back online.
              </Translate>
            </p>
          </div>

          <div className={styles.card}>
            <h3>
              <span className={styles.highlight}>
                <Translate id="cs.inspection.solution.label">
                  The Solution
                </Translate>
              </span>
            </h3>
            <p>
              <Translate id="cs.inspection.solution.desc">
                We mapped Inspection as a stable Entity, wrapped in GeoLocation
                and Sync Orbitals. Each inspection captures location data
                automatically and syncs in the background when connectivity is
                restored.
              </Translate>
            </p>
            <ul className={styles.orbitalList}>
              <li>
                <strong>
                  <Translate id="cs.inspection.orbital1.name">
                    Inspection Entity:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.inspection.orbital1.desc">
                  Core data structure for all inspection types
                </Translate>
              </li>
              <li>
                <strong>
                  <Translate id="cs.inspection.orbital2.name">
                    GeoLocation Orbital:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.inspection.orbital2.desc">
                  Automatic location capture and validation
                </Translate>
              </li>
              <li>
                <strong>
                  <Translate id="cs.inspection.orbital3.name">
                    Sync Orbital:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.inspection.orbital3.desc">
                  Background synchronization with conflict resolution
                </Translate>
              </li>
              <li>
                <strong>
                  <Translate id="cs.inspection.orbital4.name">
                    Approval Orbital:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.inspection.orbital4.desc">
                  Supervisor review and sign-off workflow
                </Translate>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>
              <span className={styles.highlight}>
                <Translate id="cs.inspection.future.label">
                  Future-Proofing
                </Translate>
              </span>
            </h3>
            <p>
              <Translate id="cs.inspection.future.desc">
                New compliance rules are added as single Orbitals, instantly
                propagating to all field units. When regulations change, we
                simply attach a new validation Orbital — no need to rewrite the
                core inspection logic.
              </Translate>
            </p>
          </div>

          <div className={styles.resultBox}>
            <strong>
              <Translate id="cs.inspection.result.label">Result:</Translate>
            </strong>{" "}
            <Translate id="cs.inspection.result.desc">
              500+ inspections per day, 99.9% sync reliability, 60% reduction
              in compliance errors.
            </Translate>
          </div>
        </div>
      </main>

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <Heading as="h2">
              <Translate id="cs.inspection.cta.title">
                Have a Similar Challenge?
              </Translate>
            </Heading>
            <p>
              <Translate id="cs.inspection.cta.desc">
                Let's discuss how Orbitals can solve your field operations
                challenges.
              </Translate>
            </p>
            <Link
              className="button button--primary button--lg"
              href="mailto:hello@almadar.io"
            >
              hello@almadar.io
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
