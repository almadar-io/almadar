import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import CodeBlock from "@theme/CodeBlock";

import styles from "./index.module.css";

const helloWorldSchema = `{
  "name": "HelloWorld",
  "orbitals": [{
    "name": "Greeter",
    "entity": {
      "name": "Greeting",
      "fields": [
        { "name": "message", "type": "string" },
        { "name": "count", "type": "number" }
      ]
    },
    "traits": [{
      "name": "Clickable",
      "stateMachine": {
        "initial": "idle",
        "states": ["idle", "greeted"],
        "transitions": [{
          "from": "idle",
          "event": "CLICK",
          "to": "greeted",
          "effects": [
            ["set", "message", "Hello, World!"],
            ["increment", "count", 1],
            ["render-ui", "main", {
              "pattern": "stats",
              "props": {
                "title": "@entity.message",
                "value": "@entity.count"
              }
            }]
          ]
        }]
      }
    }]
  }]
}`;

import MashrabiyaPattern from "../components/MashrabiyaPattern";
import DemoCarousel from "../components/DemoCarousel";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      {/* Background Pattern */}
      <div className={styles.heroPatternContainer}>
        <MashrabiyaPattern className={styles.heroPattern} opacity={0.6} />
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="homepage.title">The Physics of Software</Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="homepage.subtitle">
              Build full-stack applications through declarative schemas. Define
              entities, behaviors, and UI as state machines that compile to
              production-ready code.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs">
              <Translate id="homepage.getStarted">Get Started</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/downloads/cli"
            >
              <Translate id="homepage.downloadCLI">Download CLI</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    icon: "📐",
    titleId: "homepage.feature.declarative.title",
    titleDefault: "Declarative Schemas",
    descriptionId: "homepage.feature.declarative.description",
    descriptionDefault:
      "Define your entire application as a schema. Entities, traits, pages, and integrations - all in one place.",
  },
  {
    icon: "⚙️",
    titleId: "homepage.feature.stateMachines.title",
    titleDefault: "State Machines",
    descriptionId: "homepage.feature.stateMachines.description",
    descriptionDefault:
      "Model behavior as state machines with guards and effects. Predictable, testable, and secure by design.",
  },
  {
    icon: "🚀",
    titleId: "homepage.feature.fullStack.title",
    titleDefault: "Full-Stack Generation",
    descriptionId: "homepage.feature.fullStack.description",
    descriptionDefault:
      "Compile to React frontend, Express/FastAPI backend, and database models. One schema, complete app.",
  },
  {
    icon: "🔌",
    titleId: "homepage.feature.integrations.title",
    titleDefault: "Built-in Integrations",
    descriptionId: "homepage.feature.integrations.description",
    descriptionDefault:
      "Connect to external services with pre-built integrators. Stripe, Twilio, OpenAI, and more.",
  },
  {
    icon: "🎮",
    titleId: "homepage.feature.realtime.title",
    titleDefault: "Real-time & Games",
    descriptionId: "homepage.feature.realtime.description",
    descriptionDefault:
      "Build real-time applications and games with the same declarative approach. WebSocket support included.",
  },
  {
    icon: "🤖",
    titleId: "homepage.feature.aiPowered.title",
    titleDefault: "AI-Powered",
    descriptionId: "homepage.feature.aiPowered.description",
    descriptionDefault:
      "Generate schemas from natural language. Let AI handle the boilerplate while you focus on logic.",
  },
];

function Feature({
  icon,
  titleId,
  titleDefault,
  descriptionId,
  descriptionDefault,
}: {
  icon: string;
  titleId: string;
  titleDefault: string;
  descriptionId: string;
  descriptionDefault: string;
}) {
  return (
    <div className={styles.featureCard}>
      <span className={styles.featureIcon}>{icon}</span>
      <Heading as="h3">
        <Translate id={titleId}>{titleDefault}</Translate>
      </Heading>
      <p>
        <Translate id={descriptionId}>{descriptionDefault}</Translate>
      </p>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.features.title">
              Build Faster, Ship Confidently
            </Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="homepage.features.subtitle">
              Everything you need to go from idea to production
            </Translate>
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import OrbitalVisualization from "../components/OrbitalVisualization";

function HomepagePhilosophy() {
  return (
    <section className={styles.philosophy}>
      <div className="container">
        <div className={styles.philosophyContent}>
          <div className={styles.philosophyText}>
            <span className={styles.tag}>
              <Translate id="homepage.philosophy.tag">Philosophy</Translate>
            </span>
            <Heading as="h2">
              <Translate id="homepage.philosophy.title">
                Entity + Trait = Almadar
              </Translate>
            </Heading>
            <p>
              <Translate id="homepage.philosophy.description">
                Just as electrons orbit nuclei following quantum rules, your
                application components follow state machine rules. Each Almadar
                is an entity with attached traits that define its behavior, UI,
                and integrations.
              </Translate>
            </p>

            <OrbitalVisualization />

          </div>
          <div className={styles.codePreview}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>hello-world.orb</span>
            </div>
            <CodeBlock language="json" showLineNumbers>
              {helloWorldSchema}
            </CodeBlock>
            <div className={styles.effectsLegend}>
              <div className={styles.effectItem}>
                <span className={styles.effectIcon}>📝</span>
                <code>set</code> —{" "}
                <Translate id="homepage.effect.set">
                  Update entity field
                </Translate>
              </div>
              <div className={styles.effectItem}>
                <span className={styles.effectIcon}>➕</span>
                <code>increment</code> —{" "}
                <Translate id="homepage.effect.increment">
                  Add to number
                </Translate>
              </div>
              <div className={styles.effectItem}>
                <span className={styles.effectIcon}>🎨</span>
                <code>render-ui</code> —{" "}
                <Translate id="homepage.effect.renderui">
                  Render pattern to slot
                </Translate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              Install the CLI and create your first Almadar schema in seconds.
            </Translate>
          </p>
          <div className={styles.ctaCode}>
            <code>npx @almadar/cli new my-app</code>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/getting-started/introduction"
            >
              <Translate id="homepage.cta.readDocs">Read the Docs</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://github.com/almadar-io/almadar"
            >
              <Translate id="homepage.cta.viewGithub">View on GitHub</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: "homepage.meta.title",
        message: "The Physics of Software",
      })}
      description={translate({
        id: "homepage.meta.description",
        message:
          "Almadar - Declarative full-stack applications through state machines",
      })}
    >
      <HomepageHeader />
      <main>
        <DemoCarousel />
        <HomepagePhilosophy />
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
