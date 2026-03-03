import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./case-study.module.css";

export default function TrainerCaseStudy(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "cs.trainer.meta.title",
        message: "Pro Trainer App — Almadar Case Study",
      })}
      description={translate({
        id: "cs.trainer.meta.desc",
        message:
          "How we built a trainer management app that separates coaching logic from billing using Orbitals.",
      })}
    >
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className="container">
          <span
            className={styles.badge}
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              color: "#34d399",
            }}
          >
            <Translate id="cs.trainer.badge">Health & Fitness</Translate>
          </span>
          <Heading as="h1">
            <Translate id="cs.trainer.title">Pro Trainer App</Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="cs.trainer.subtitle">
              Allow trainers to manage remote clients without admin burnout.
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
                <Translate id="cs.trainer.challenge.label">
                  The Challenge
                </Translate>
              </span>
            </h3>
            <p>
              <Translate id="cs.trainer.challenge.desc">
                Personal trainers were spending more time on admin than
                coaching. They needed a system to manage workout plans, track
                client progress, and handle billing — all in one place, without
                the complexity.
              </Translate>
            </p>
          </div>

          <div className={styles.card}>
            <h3>
              <span className={styles.highlight}>
                <Translate id="cs.trainer.solution.label">
                  The Solution
                </Translate>
              </span>
            </h3>
            <p>
              <Translate id="cs.trainer.solution.desc">
                Workout Plans are compositions of exercise patterns. Coaching
                logic is separated from Billing. Each concern is its own
                Orbital that can evolve independently.
              </Translate>
            </p>
            <ul className={styles.orbitalList}>
              <li>
                <strong>
                  <Translate id="cs.trainer.orbital1.name">
                    Client Entity:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.trainer.orbital1.desc">
                  Core profile and goal tracking
                </Translate>
              </li>
              <li>
                <strong>
                  <Translate id="cs.trainer.orbital2.name">
                    Workout Plan Orbital:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.trainer.orbital2.desc">
                  Composable exercise templates
                </Translate>
              </li>
              <li>
                <strong>
                  <Translate id="cs.trainer.orbital3.name">
                    Progress Tracking Orbital:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.trainer.orbital3.desc">
                  Metrics, photos, measurements
                </Translate>
              </li>
              <li>
                <strong>
                  <Translate id="cs.trainer.orbital4.name">
                    Billing Orbital:
                  </Translate>
                </strong>{" "}
                <Translate id="cs.trainer.orbital4.desc">
                  Subscription and payment handling
                </Translate>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>
              <span className={styles.highlight}>
                <Translate id="cs.trainer.future.label">
                  Future-Proofing
                </Translate>
              </span>
            </h3>
            <p>
              <Translate id="cs.trainer.future.desc">
                As fitness metrics evolve, new data Orbitals are attached
                without breaking core app logic. When the client wanted to add
                wearable device integration, we simply attached a new Wearable
                Sync Orbital.
              </Translate>
            </p>
          </div>

          <div className={styles.resultBox}>
            <strong>
              <Translate id="cs.trainer.result.label">Result:</Translate>
            </strong>{" "}
            <Translate id="cs.trainer.result.desc">
              70% reduction in admin time, 3x client capacity per trainer, 95%
              client retention rate.
            </Translate>
          </div>
        </div>
      </main>

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <Heading as="h2">
              <Translate id="cs.trainer.cta.title">
                Building Something Similar?
              </Translate>
            </Heading>
            <p>
              <Translate id="cs.trainer.cta.desc">
                Let's discuss how Orbitals can streamline your service business.
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
