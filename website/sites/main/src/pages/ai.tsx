import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./ai.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <span className={styles.tag}>
          <Translate id="ai.hero.tag">Our AI</Translate>
        </span>
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="ai.hero.title">We Train Our Own Models</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="ai.hero.subtitle">
            Purpose-built neural networks that understand how applications work. Not wrappers around someone else's intelligence.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const PIPELINE_STEPS = [
  {
    titleId: "ai.pipeline.mutator.title", title: "Generation",
    descId: "ai.pipeline.mutator.desc", desc: "Creates candidate application designs from your description. Produces multiple structurally valid starting points.",
  },
  {
    titleId: "ai.pipeline.classifier.title", title: "Quality Scoring",
    descId: "ai.pipeline.classifier.desc", desc: "Evaluates each candidate on correctness, completeness, and user experience quality. Filters out anything that would not pass verification.",
  },
  {
    titleId: "ai.pipeline.graph.title", title: "Structure Analysis",
    descId: "ai.pipeline.graph.desc", desc: "Understands the application logic as a graph. Detects dead ends, missing workflows, and broken interaction paths.",
  },
  {
    titleId: "ai.pipeline.edit.title", title: "Error Repair",
    descId: "ai.pipeline.edit.desc", desc: "When something is wrong, predicts the smallest fix that resolves it. Like autocomplete, but for application logic.",
  },
  {
    titleId: "ai.pipeline.gflownet.title", title: "Diverse Solutions",
    descId: "ai.pipeline.gflownet.desc", desc: "Builds applications step by step, exploring multiple approaches. Produces diverse solutions instead of collapsing to one output.",
  },
  {
    titleId: "ai.pipeline.integration.title", title: "Verification",
    descId: "ai.pipeline.integration.desc", desc: "Combines neural predictions with compiler verification to guarantee correctness. Every generated application passes formal checks.",
  },
];

function PipelineSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row align-items--center">
          <div className="col col--7">
            <div className={styles.sectionHeader} style={{ textAlign: "left", marginBottom: "2rem" }}>
              <Heading as="h2">
                <Translate id="ai.pipeline.title">Six Specialized Models</Translate>
              </Heading>
              <p className={styles.sectionSubtitle} style={{ margin: "1rem 0" }}>
                <Translate id="ai.pipeline.subtitle">
                  Each model does one thing well. Together, they generate verified applications from descriptions.
                </Translate>
              </p>
            </div>
            <div className={styles.pipelineGrid}>
              {PIPELINE_STEPS.map((step) => (
                <div key={step.titleId} className={styles.pipelineCard}>
                  <h3><Translate id={step.titleId}>{step.title}</Translate></h3>
                  <p><Translate id={step.descId}>{step.desc}</Translate></p>
                </div>
              ))}
            </div>
          </div>
          <div className="col col--5">
            <img src="/img/ai-pipeline.webp" alt="Neural pipeline" className={styles.sectionImage} loading="lazy" style={{ margin: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CostSection() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className="container">
        <div className="row align-items--center">
          <div className="col col--6">
            <div className={styles.sectionHeader} style={{ textAlign: "left", marginBottom: "2rem" }}>
              <Heading as="h2">
                <Translate id="ai.cost.title">10x Cheaper Than LLMs</Translate>
              </Heading>
            </div>
            <div className={styles.costContent}>
              <p>
                <Translate id="ai.cost.p1">
                  General-purpose LLMs cost $0.50 to $5.00 per complex generation. Our specialized models cost $0.05 to $0.35 for the same task. That is a 10x to 15x reduction.
                </Translate>
              </p>
              <p>
                <Translate id="ai.cost.p2">
                  The savings come from focus. An LLM has to know everything about everything. Our models only need to understand application structure, a much smaller problem. Smaller models, faster inference, lower cost.
                </Translate>
              </p>
            </div>
          </div>
          <div className="col col--6">
            <img src="/img/ai-cost.webp" alt="Cost comparison" className={styles.sectionImage} loading="lazy" style={{ margin: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section className={`${styles.section} ${styles.sectionDark}`}>
      <div className="container">
        <div className={styles.differenceContent}>
          <Heading as="h2" className={styles.lightTitle}>
            <Translate id="ai.diff.title">We Own Our Intelligence</Translate>
          </Heading>
          <p>
            <Translate id="ai.diff.p1">
              We use LLMs for understanding what you say. But the intelligence that designs, verifies, and fixes applications is ours. Trained on our data, optimized for our domain.
            </Translate>
          </p>
          <p>
            <Translate id="ai.diff.p2">
              That means we control our costs, our quality, and our roadmap. We do not depend on another company's pricing or model updates.
            </Translate>
          </p>
          <Link className="button button--primary button--lg" to="/platform">
            <Translate id="ai.diff.cta">See the Platform</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AI(): ReactNode {
  return (
    <Layout
      title={translate({ id: "ai.meta.title", message: "AI \u2014 Our Own Models for Software Generation" })}
      description={translate({ id: "ai.meta.desc", message: "Purpose-built neural networks that understand application structure. 10x cheaper than general-purpose LLMs." })}
    >
      <Hero />
      <main>
        <PipelineSection />
        <CostSection />
        <DifferenceSection />
      </main>
    </Layout>
  );
}
