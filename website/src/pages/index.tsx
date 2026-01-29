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

function OrbitalSVG() {
  return (
    <svg
      className={styles.orbitalCanvas}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="orbitalGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="lobeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6">
            <animate
              attributeName="stop-color"
              values="#14b8a6;#06b6d4;#14b8a6"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <linearGradient id="lobeGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4">
            <animate
              attributeName="stop-color"
              values="#06b6d4;#14b8a6;#06b6d4"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Top Lobe */}
      <g className="top-lobe" filter="url(#orbitalGlow)">
        <path
          d="M 200 200 Q 140 150, 140 100 Q 140 40, 200 30 Q 260 40, 260 100 Q 260 150, 200 200"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1"
          opacity="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 200 200 Q 175 160, 165 110 Q 155 60, 175 40"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 200 200 Q 185 150, 180 100 Q 175 50, 190 35"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 200 200 Q 200 150, 200 90 Q 200 45, 200 30"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1"
          opacity="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.7;0.4"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 200 200 Q 215 150, 220 100 Q 225 50, 210 35"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 200 200 Q 225 160, 235 110 Q 245 60, 225 40"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 160 90 Q 180 85, 200 80 Q 220 85, 240 90"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.6"
          opacity="0.35"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.45;0.2"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        <ellipse
          cx="200"
          cy="115"
          rx="40"
          ry="60"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.8"
          opacity="0.35"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.45;0.2"
            dur="5.5s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="200"
          cy="105"
          rx="28"
          ry="45"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.6"
          opacity="0.3"
        >
          <animate
            attributeName="opacity"
            values="0.15;0.4;0.15"
            dur="6.5s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>

      {/* Bottom Lobe */}
      <g className="bottom-lobe" filter="url(#orbitalGlow)">
        <path
          d="M 200 200 Q 140 250, 140 300 Q 140 360, 200 370 Q 260 360, 260 300 Q 260 250, 200 200"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
          opacity="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </path>
        <path
          d="M 200 200 Q 175 240, 165 290 Q 155 340, 175 360"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="5s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>
        <path
          d="M 200 200 Q 185 250, 180 300 Q 175 350, 190 365"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4.5s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </path>
        <path
          d="M 200 200 Q 200 250, 200 310 Q 200 355, 200 370"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
          opacity="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.7;0.4"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </path>
        <path
          d="M 200 200 Q 215 250, 220 300 Q 225 350, 210 365"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="4.5s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </path>
        <path
          d="M 200 200 Q 225 240, 235 290 Q 245 340, 225 360"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.8"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.5;0.2"
            dur="5s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>
        <path
          d="M 160 310 Q 180 315, 200 320 Q 220 315, 240 310"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.6"
          opacity="0.35"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.45;0.2"
            dur="6s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </path>
        <ellipse
          cx="200"
          cy="285"
          rx="40"
          ry="60"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.8"
          opacity="0.35"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.45;0.2"
            dur="5.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </ellipse>
        <ellipse
          cx="200"
          cy="295"
          rx="28"
          ry="45"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="0.6"
          opacity="0.3"
        >
          <animate
            attributeName="opacity"
            values="0.15;0.4;0.15"
            dur="6.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </ellipse>
      </g>

      {/* Floating Particles */}
      <g className="particles">
        <circle cx="165" cy="85" r="2" fill="#14b8a6" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values="85;80;85"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="235" cy="75" r="1.5" fill="#06b6d4" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.2;0.7;0.2"
            dur="5s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="cy"
            values="75;70;75"
            dur="7s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="50" r="2.5" fill="#14b8a6" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle cx="165" cy="315" r="2" fill="#06b6d4" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="4s"
            repeatCount="indefinite"
            begin="2s"
          />
          <animate
            attributeName="cy"
            values="315;320;315"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="235" cy="325" r="1.5" fill="#14b8a6" opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.2;0.7;0.2"
            dur="5s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <animate
            attributeName="cy"
            values="325;330;325"
            dur="7s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="350" r="2.5" fill="#06b6d4" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur="3.5s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
      </g>

      {/* Central Nucleus */}
      <g filter="url(#strongGlow)">
        <circle cx="200" cy="200" r="12" fill="url(#nucleusGlow)">
          <animate
            attributeName="r"
            values="12;14;12"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="200" r="6" fill="#fff">
          <animate
            attributeName="r"
            values="6;7;6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
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
        <div className={styles.heroAnimation}>
          <OrbitalSVG />
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
                Entity + Trait = Orbital
              </Translate>
            </Heading>
            <p>
              <Translate id="homepage.philosophy.description">
                Just as electrons orbit nuclei following quantum rules, your
                application components follow state machine rules. Each Orbital
                is an entity with attached traits that define its behavior, UI,
                and integrations.
              </Translate>
            </p>
            <div className={styles.philosophyFeatures}>
              <div className={styles.philosophyFeature}>
                <strong>
                  <Translate id="homepage.philosophy.entity">Entity</Translate>
                </strong>
                <span>
                  <Translate id="homepage.philosophy.entity.description">
                    Your data model with fields and persistence
                  </Translate>
                </span>
              </div>
              <div className={styles.philosophyFeature}>
                <strong>
                  <Translate id="homepage.philosophy.trait">Trait</Translate>
                </strong>
                <span>
                  <Translate id="homepage.philosophy.trait.description">
                    Reusable state machine with UI effects
                  </Translate>
                </span>
              </div>
              <div className={styles.philosophyFeature}>
                <strong>
                  <Translate id="homepage.philosophy.page">Page</Translate>
                </strong>
                <span>
                  <Translate id="homepage.philosophy.page.description">
                    Route binding that composes traits
                  </Translate>
                </span>
              </div>
            </div>
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
              Install the CLI and create your first Orbital schema in seconds.
            </Translate>
          </p>
          <div className={styles.ctaCode}>
            <code>npx @almadar/cli init my-app</code>
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
        <HomepageFeatures />
        <HomepagePhilosophy />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
