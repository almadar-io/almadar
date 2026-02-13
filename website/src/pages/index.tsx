import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import CodeBlock from "@theme/CodeBlock";

import styles from "./index.module.css";

const HelloWorldSchemaDisplay = () => (
  <pre className={styles.codeBlock}>
    <code>
      <span className="kp">{"{"}</span>
      {"\n  "}<span className="kk">"name"</span><span className="kp">: </span><span className="ks">"HelloWorld"</span><span className="kp">,</span>
      {"\n  "}<span className="kk">"orbitals"</span><span className="kp">: </span><span className="kp">[{"{"}</span>
      {"\n    "}<span className="kk">"name"</span><span className="kp">: </span><span className="ks">"Greeter"</span><span className="kp">,</span>
      {"\n    "}<span className="kk">"entity"</span><span className="kp">: {"{"}</span>
      {"\n      "}<span className="kk">"name"</span><span className="kp">: </span><span className="ks">"Greeting"</span><span className="kp">,</span>
      {"\n      "}<span className="kk">"fields"</span><span className="kp">: [</span>
      {"\n        "}<span className="kp">{"{"} </span><span className="kk">"name"</span><span className="kp">: </span><span className="ks">"message"</span><span className="kp">, </span><span className="kk">"type"</span><span className="kp">: </span><span className="ks">"string"</span><span className="kp"> {"}"},</span>
      {"\n        "}<span className="kp">{"{"} </span><span className="kk">"name"</span><span className="kp">: </span><span className="ks">"count"</span><span className="kp">, </span><span className="kk">"type"</span><span className="kp">: </span><span className="ks">"number"</span><span className="kp">, </span><span className="kk">"default"</span><span className="kp">: </span><span className="kn">0</span><span className="kp"> {"}"}</span>
      {"\n      "}<span className="kp">]</span>
      {"\n    "}<span className="kp">{"}"},</span>
      {"\n    "}<span className="kk">"traits"</span><span className="kp">: </span><span className="kp">[{"{"}</span>
      {"\n      "}<span className="kk">"name"</span><span className="kp">: </span><span className="ks">"Clickable"</span><span className="kp">,</span>
      {"\n      "}<span className="kk">"stateMachine"</span><span className="kp">: </span><span className="kp">{"{"}</span>
      {"\n        "}<span className="kk">"states"</span><span className="kp">: [</span>
      {"\n          "}<span className="kp">{"{"} </span><span className="kk">"name"</span><span className="kp">: </span><span className="ks">"idle"</span><span className="kp">, </span><span className="kk">"isInitial"</span><span className="kp">: </span><span className="kn">true</span><span className="kp"> {"}"},</span>
      {"\n          "}<span className="kp">{"{"} </span><span className="kk">"name"</span><span className="kp">: </span><span className="ks">"greeted"</span><span className="kp"> {"}"}</span>
      {"\n        "}<span className="kp">],</span>
      {"\n        "}<span className="kk">"transitions"</span><span className="kp">: </span><span className="kp">[{"{"}</span>
      {"\n          "}<span className="kk">"from"</span><span className="kp">: </span><span className="ks">"idle"</span><span className="kp">,</span>
      {"\n          "}<span className="kk">"event"</span><span className="kp">: </span><span className="ks">"CLICK"</span><span className="kp">,</span>
      {"\n          "}<span className="kk">"to"</span><span className="kp">: </span><span className="ks">"greeted"</span><span className="kp">,</span>
      {"\n          "}<span className="kk">"effects"</span><span className="kp">: [</span>
      {"\n            "}<span className="kp">[</span><span className="ks">"set"</span><span className="kp">, </span><span className="ks">"@entity.message"</span><span className="kp">, </span><span className="ks">"Hello, World!"</span><span className="kp">],</span>
      {"\n            "}<span className="kp">[</span><span className="ks">"set"</span><span className="kp">, </span><span className="ks">"@entity.count"</span><span className="kp">, [</span><span className="ks">"+"</span><span className="kp">, </span><span className="ks">"@entity.count"</span><span className="kp">, </span><span className="kn">1</span><span className="kp">]],</span>
      {"\n            "}<span className="kp">[</span><span className="ks">"render-ui"</span><span className="kp">, </span><span className="ks">"main"</span><span className="kp">, {"{"}</span>
      {"\n              "}<span className="kk">"type"</span><span className="kp">: </span><span className="ks">"stats-card"</span><span className="kp">,</span>
      {"\n              "}<span className="kk">"title"</span><span className="kp">: </span><span className="ks">"@entity.message"</span><span className="kp">,</span>
      {"\n              "}<span className="kk">"value"</span><span className="kp">: </span><span className="ks">"@entity.count"</span>
      {"\n            "}<span className="kp">{"}"}]</span>
      {"\n          "}<span className="kp">]</span>
      {"\n        "}<span className="kp">{"}"}]</span>
      {"\n      "}<span className="kp">{"}"}</span>
      {"\n    "}<span className="kp">{"}"}]</span>
      {"\n  "}<span className="kp">{"}"}]</span>
      {"\n"}<span className="kp">{"}"}</span>
    </code>
  </pre>
);

const helloWorldSchema = `{
  "name": "HelloWorld",
  "orbitals": [{
    "name": "Greeter",
    "entity": {
      "name": "Greeting",
      "fields": [
        { "name": "message", "type": "string" },
        { "name": "count", "type": "number", "default": 0 }
      ]
    },
    "traits": [{
      "name": "Clickable",
      "stateMachine": {
        "states": [
          { "name": "idle", "isInitial": true },
          { "name": "greeted" }
        ],
        "events": [{ "key": "CLICK", "name": "Click" }],
        "transitions": [{
          "from": "idle",
          "event": "CLICK",
          "to": "greeted",
          "effects": [
            ["set", "@entity.message", "Hello, World!"],
            ["set", "@entity.count", ["+", "@entity.count", 1]],
            ["render-ui", "main", {
              "type": "stats-card",
              "title": "@entity.message",
              "value": "@entity.count"
            }]
          ]
        }]
      }
    }]
  }]
}`;

import MashrabiyaPattern from "../components/MashrabiyaPattern";
import DemoCarousel from "../components/DemoCarousel";
import HeroOrbitalAnimation from "../components/HeroOrbitalAnimation";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      {/* Background Pattern */}
      <div className={styles.heroPatternContainer}>
        {/* Replaced generic pattern with 3D Orbital VFX */}
        <HeroOrbitalAnimation />
        {/* <MashrabiyaPattern className={styles.heroPattern} opacity={0.6} /> */}
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
          <div className={clsx(styles.codePreview, "home-page-code-preview")}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>hello-world.orb</span>
            </div>
            <HelloWorldSchemaDisplay />
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
