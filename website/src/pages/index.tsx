import React, { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./index.module.css";
import JsonHighlight from "../components/JsonHighlight";

// @ts-ignore
import helloWorldEn from "!!raw-loader!../examples/hello-world.en.orb";
// @ts-ignore
import helloWorldAr from "!!raw-loader!../examples/hello-world.ar.orb";
// @ts-ignore
import helloWorldSl from "!!raw-loader!../examples/hello-world.sl.orb";

function resolveRaw(content: any): string {
  return typeof content === "object" && content.default ? content.default : content;
}

const LocalizedSchemaDisplay = () => {
  const context = useDocusaurusContext();
  const currentLocale = context.i18n?.currentLocale ?? "en";
  const [activeTab, setActiveTab] = useState<"en" | "local">("en");

  const enCode = resolveRaw(helloWorldEn);

  if (currentLocale === "en") {
    return <JsonHighlight code={enCode} title="hello-world.orb" />;
  }

  let localContent = helloWorldEn;
  if (currentLocale === "ar") {
    localContent = helloWorldAr;
  } else if (currentLocale === "sl") {
    localContent = helloWorldSl;
  }
  const localCode = resolveRaw(localContent);

  const localLabel = translate({
    id: "homepage.schema.inYourLanguage",
    message: "In Your Language",
  });

  return (
    <div>
      <div className={styles.schemaTabs}>
        <button
          className={clsx(styles.schemaTab, activeTab === "en" && styles.schemaTabActive)}
          onClick={() => setActiveTab("en")}
        >
          English
        </button>
        <button
          className={clsx(styles.schemaTab, activeTab === "local" && styles.schemaTabActive)}
          onClick={() => setActiveTab("local")}
        >
          {localLabel}
        </button>
      </div>
      <JsonHighlight
        code={activeTab === "en" ? enCode : localCode}
        title="hello-world.orb"
        className={styles.schemaCodeBlock}
      />
    </div>
  );
};

import MashrabiyaPattern from "../components/MashrabiyaPattern";
import DemoCarousel from "../components/DemoCarousel";
import HeroSchemaAnimation from "../components/HeroSchemaAnimation";
import {
  SchemaIcon,
  StateMachineIcon,
  FullStackIcon,
  IntegrationsIcon,
  RealtimeIcon,
  AIIcon,
} from "../components/FeatureIcons";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      {/* Background Pattern */}
      <div className={styles.heroPatternContainer}>
        <HeroSchemaAnimation />
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
    IconComponent: SchemaIcon,
    titleId: "homepage.feature.declarative.title",
    titleDefault: "Declarative Schemas",
    descriptionId: "homepage.feature.declarative.description",
    descriptionDefault:
      "Define your entire application as a schema. Entities, traits, pages, and integrations - all in one place.",
  },
  {
    IconComponent: StateMachineIcon,
    titleId: "homepage.feature.stateMachines.title",
    titleDefault: "State Machines",
    descriptionId: "homepage.feature.stateMachines.description",
    descriptionDefault:
      "Model behavior as state machines with guards and effects. Predictable, testable, and secure by design.",
  },
  {
    IconComponent: FullStackIcon,
    titleId: "homepage.feature.fullStack.title",
    titleDefault: "Full-Stack Generation",
    descriptionId: "homepage.feature.fullStack.description",
    descriptionDefault:
      "Compile to React frontend, Express/FastAPI backend, and database models. One schema, complete app.",
  },
  {
    IconComponent: IntegrationsIcon,
    titleId: "homepage.feature.integrations.title",
    titleDefault: "Built-in Integrations",
    descriptionId: "homepage.feature.integrations.description",
    descriptionDefault:
      "Connect to external services with pre-built integrators. Stripe, Twilio, OpenAI, and more.",
  },
  {
    IconComponent: RealtimeIcon,
    titleId: "homepage.feature.realtime.title",
    titleDefault: "Real-time & Games",
    descriptionId: "homepage.feature.realtime.description",
    descriptionDefault:
      "Build real-time applications and games with the same declarative approach. WebSocket support included.",
  },
  {
    IconComponent: AIIcon,
    titleId: "homepage.feature.aiPowered.title",
    titleDefault: "AI-Powered",
    descriptionId: "homepage.feature.aiPowered.description",
    descriptionDefault:
      "Generate schemas from natural language. Let AI handle the boilerplate while you focus on logic.",
  },
];

function Feature({
  IconComponent,
  titleId,
  titleDefault,
  descriptionId,
  descriptionDefault,
}: {
  IconComponent: React.FC<{ size?: number; className?: string }>;
  titleId: string;
  titleDefault: string;
  descriptionId: string;
  descriptionDefault: string;
}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <IconComponent size={48} />
      </div>
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
                The Anatomy of an Orbital
              </Translate>
            </Heading>
            <p>
              <Translate id="homepage.philosophy.description">
                Most software is built like a house of cards. Almadar is built like a planetary system.
                We separate your application into three atomic units:
              </Translate>
            </p>

            <div className={styles.philosophyFeatures}>
              <div className={styles.philosophyFeature}>
                <strong>
                  <Translate id="homepage.philosophy.entity">Entity (Matter)</Translate>
                </strong>
                <span>
                  <Translate id="homepage.philosophy.entity.description">
                    The immutable Core. It defines the gravity and shape of your data.
                  </Translate>
                </span>
              </div>
              <div className={styles.philosophyFeature}>
                <strong>
                  <Translate id="homepage.philosophy.trait">Trait (Energy)</Translate>
                </strong>
                <span>
                  <Translate id="homepage.philosophy.trait.description">
                    The dynamic Orbit. A state machine that defines behavior and logic.
                  </Translate>
                </span>
              </div>
              <div className={styles.philosophyFeature}>
                <strong>
                  <Translate id="homepage.philosophy.page">Page (Space)</Translate>
                </strong>
                <span>
                  <Translate id="homepage.philosophy.page.description">
                    The Frame. A route container where users interact with Orbitals.
                  </Translate>
                </span>
              </div>
            </div>

            <OrbitalVisualization />

          </div>
          <div className={styles.codePreview}>
            <LocalizedSchemaDisplay />
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
                <code>["+", ...]</code> —{" "}
                <Translate id="homepage.effect.increment">
                  S-expression math
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
