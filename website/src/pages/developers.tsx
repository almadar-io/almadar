import React, { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import HeroSchemaAnimation from "../components/HeroSchemaAnimation";
import JsonHighlight from "../components/JsonHighlight";
import RenderUIDemo from "../components/RenderUIDemo";
import {
  HeroSection,
  ContentSection,
  InstallBox,
  StepFlow,
  FeatureGrid,
  VStack,
  Typography,
  Box,
} from "@almadar/ui/marketing";
import styles from "./developers.module.css";
import playgroundStyles from "./playground.module.css";
import { PlaygroundCore } from "./playground";

// @ts-ignore
import helloWorldEn from "!!raw-loader!../examples/hello-world.en.orb";
// @ts-ignore
import helloWorldAr from "!!raw-loader!../examples/hello-world.ar.orb";
// @ts-ignore
import helloWorldSl from "!!raw-loader!../examples/hello-world.sl.orb";

import stdlibModules from "../data/stdlib-modules.json";

function resolveRaw(content: unknown): string {
  return typeof content === "object" && content !== null && "default" in content
    ? String((content as { default: unknown }).default)
    : String(content);
}

// ─── Core Concepts (interactive, kept as-is) ───────────────────────────────

const ENTITY_SNIPPET = `{
  "name": "Task",
  "persistence": "runtime",
  "fields": [
    { "name": "title", "type": "string" },
    { "name": "done",  "type": "boolean", "default": false }
  ]
}`;

const TRAIT_SNIPPET = `{
  "name": "TodoList",
  "stateMachine": {
    "states": [
      { "name": "Idle", "isInitial": true },
      { "name": "Done" }
    ],
    "transitions": [{
      "from": "Idle", "event": "COMPLETE",
      "to": "Done",
      "effects": [["set", "@entity.done", true]]
    }]
  }
}`;

const PAGE_SNIPPET = `{
  "name": "TaskPage",
  "route": "/tasks/:id",
  "orbitals": ["TaskOrbital"],
  "layout": "default"
}`;

const CONCEPTS = [
  {
    key: "entity",
    labelId: "developers.concepts.entity.label",
    labelDefault: "Entity",
    taglineId: "developers.concepts.entity.tagline",
    taglineDefault: "Data shape",
    descId: "developers.concepts.entity.desc",
    descDefault:
      "Entities define your data model. Fields are typed, can have defaults, and support three persistence modes: runtime (in-memory), persistent (database), and singleton.",
    snippet: ENTITY_SNIPPET,
    color: "#c9a227",
  },
  {
    key: "trait",
    labelId: "developers.concepts.trait.label",
    labelDefault: "Trait",
    taglineId: "developers.concepts.trait.tagline",
    taglineDefault: "State machine + UI",
    descId: "developers.concepts.trait.desc",
    descDefault:
      "Traits model behavior as state machines with states, events, guards, and effects. Effects can set entity fields, emit events, call services, or render UI patterns.",
    snippet: TRAIT_SNIPPET,
    color: "#14b8a6",
  },
  {
    key: "page",
    labelId: "developers.concepts.page.label",
    labelDefault: "Page",
    taglineId: "developers.concepts.page.tagline",
    taglineDefault: "Route binding",
    descId: "developers.concepts.page.desc",
    descDefault:
      "Pages bind Orbitals to routes. They define the URL, the layout, and which Orbitals (groups of Entity + Traits) are mounted. Pages are generated as React route components.",
    snippet: PAGE_SNIPPET,
    color: "#8b5cf6",
  },
];

function CoreConceptCard({
  labelId,
  labelDefault,
  taglineId,
  taglineDefault,
  descId,
  descDefault,
  snippet,
  color,
  isActive,
  onClick,
}: {
  labelId: string;
  labelDefault: string;
  taglineId: string;
  taglineDefault: string;
  descId: string;
  descDefault: string;
  snippet: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(styles.conceptCard, isActive && styles.conceptCardActive)}
      style={{ "--concept-color": color } as React.CSSProperties}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className={styles.conceptCardHeader}>
        <span className={styles.conceptLabel}>
          <Translate id={labelId}>{labelDefault}</Translate>
        </span>
        <span className={styles.conceptTagline}>
          <Translate id={taglineId}>{taglineDefault}</Translate>
        </span>
      </div>
      <p className={styles.conceptDesc}>
        <Translate id={descId}>{descDefault}</Translate>
      </p>
      {isActive && (
        <div className={styles.conceptSnippet}>
          <JsonHighlight code={snippet} />
        </div>
      )}
    </div>
  );
}

function CoreConcepts() {
  const [active, setActive] = useState<string>("entity");
  return (
    <ContentSection>
      <VStack gap="lg" align="center" className="container">
        <VStack gap="sm" align="center">
          <Typography variant="h2">
            <Translate id="developers.concepts.title">Core Concepts</Translate>
          </Typography>
          <Typography variant="body" color="muted">
            <Translate id="developers.concepts.subtitle">Three building blocks compose every Almadar application</Translate>
          </Typography>
        </VStack>
        <div className={styles.conceptsGrid}>
          {CONCEPTS.map((c) => (
            <CoreConceptCard
              key={c.key}
              {...c}
              isActive={active === c.key}
              onClick={() => setActive(c.key)}
            />
          ))}
        </div>
      </VStack>
    </ContentSection>
  );
}

// ─── Quick Start ───────────────────────────────────────────────────────────

function LocalizedSchema() {
  const context = useDocusaurusContext();
  const currentLocale = context.i18n?.currentLocale ?? "en";
  const [activeTab, setActiveTab] = useState<"en" | "local">("en");

  const enCode = resolveRaw(helloWorldEn);

  if (currentLocale === "en") {
    return <JsonHighlight code={enCode} title="hello-world.orb" />;
  }

  let localContent: unknown = helloWorldEn;
  if (currentLocale === "ar") {
    localContent = helloWorldAr;
  } else if (currentLocale === "sl") {
    localContent = helloWorldSl;
  }
  const localCode = resolveRaw(localContent);

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
          <Translate id="developers.quickstart.inYourLanguage">In Your Language</Translate>
        </button>
      </div>
      <JsonHighlight
        code={activeTab === "en" ? enCode : localCode}
        title="hello-world.orb"
        className={styles.schemaCodeBlock}
      />
    </div>
  );
}

const QUICKSTART_STEPS = [
  { title: translate({ id: "developers.quickstart.step1", message: "Install the CLI" }), description: "" },
  { title: translate({ id: "developers.quickstart.step2", message: "Edit your .orb schema" }), description: "" },
  { title: translate({ id: "developers.quickstart.step3", message: "Run almadar dev my-app.orb to watch and compile" }), description: "" },
];

function QuickStart() {
  return (
    <ContentSection background="alt">
      <div className="container">
        <div className={styles.quickstartLayout}>
          <VStack gap="md">
            <Typography variant="h2">
              <Translate id="developers.quickstart.title">First Schema in 60 Seconds</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="developers.quickstart.desc">Install the CLI, create your first schema, and compile it to a running application.</Translate>
            </Typography>
            <InstallBox command="npx @almadar/cli new my-app" />
            <StepFlow steps={QUICKSTART_STEPS} orientation="vertical" />
            <Link className="button button--primary" to="/docs/getting-started/introduction">
              <Translate id="developers.quickstart.fullGuide">Full Getting Started Guide</Translate>
            </Link>
          </VStack>
          <div className={styles.quickstartCode}>
            <LocalizedSchema />
          </div>
        </div>
      </div>
    </ContentSection>
  );
}

// ─── Operator Modules (interactive table, kept) ───────────────────────────

type StdlibModuleEntry = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  operators: unknown[];
};

const PROB_MODULE = {
  id: "prob",
  name: "Prob",
  displayName: "Probabilistic Programming",
  description:
    "Distribution sampling (Gaussian, Beta, Poisson), Bayesian inference via rejection sampling, and statistical summaries.",
  icon: "\uD83C\uDFB2",
  operatorCount: 16,
};

function OperatorModules() {
  const modules = (stdlibModules as { modules: StdlibModuleEntry[] }).modules;
  return (
    <ContentSection>
      <div className="container">
        <VStack gap="lg" align="center">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="developers.modules.title">Standard Library Modules</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="developers.modules.subtitle">213+ built-in operators across 9 modules -- all available as s-expressions in guards and effects</Translate>
            </Typography>
          </VStack>
        </VStack>
        <div className={styles.modulesTable}>
          {modules.map((mod) => (
            <Link
              key={mod.id}
              to={`/docs/reference/operators/${mod.id}`}
              className={styles.moduleRow}
            >
              <span className={styles.moduleIcon}>{mod.icon}</span>
              <span className={styles.moduleName}>{mod.name}</span>
              <span className={styles.moduleCount}>
                {mod.operators.length}{" "}
                <Translate id="developers.modules.operators">operators</Translate>
              </span>
              <span className={styles.moduleDesc}>{mod.description}</span>
            </Link>
          ))}
          <Link to="/docs/reference/operators/prob" className={styles.moduleRow}>
            <span className={styles.moduleIcon}>{PROB_MODULE.icon}</span>
            <span className={styles.moduleName}>{PROB_MODULE.name}</span>
            <span className={styles.moduleCount}>
              {PROB_MODULE.operatorCount}{" "}
              <Translate id="developers.modules.operators">operators</Translate>
            </span>
            <span className={styles.moduleDesc}>{PROB_MODULE.description}</span>
          </Link>
        </div>
        <div className={styles.modulesFooter}>
          <Link to="/docs/reference/operators" className={styles.allOperatorsLink}>
            <Translate id="developers.modules.viewAll">View full operator reference</Translate>{" "}
            &rarr;
          </Link>
        </div>
      </div>
    </ContentSection>
  );
}

// ─── Tutorials ──────────────────────────────────────────────────────────────

const TUTORIAL_TRACKS = [
  {
    key: "beginner",
    labelId: "developers.tutorials.beginner.label",
    labelDefault: "Beginner",
    descId: "developers.tutorials.beginner.desc",
    descDefault: "Build your first Orbital Unit, understand state machines, and deploy a working application.",
    items: ["Your first Orbital", "Task Manager from Scratch"],
    to: "/docs/tutorials/beginner/complete-orbital",
    color: "#22c55e",
  },
  {
    key: "intermediate",
    labelId: "developers.tutorials.intermediate.label",
    labelDefault: "Intermediate",
    descId: "developers.tutorials.intermediate.desc",
    descDefault: "Work with UI patterns, write guards with s-expressions, and connect multiple Orbitals.",
    items: ["UI Patterns in Depth", "Guard Expressions", "Cross-Orbital Events"],
    to: "/docs/tutorials/intermediate/ui-patterns",
    color: "#f59e0b",
  },
  {
    key: "advanced",
    labelId: "developers.tutorials.advanced.label",
    labelDefault: "Advanced",
    descId: "developers.tutorials.advanced.desc",
    descDefault: "Build production apps with integrations, AI generation, and custom skills.",
    items: ["Full Production App", "AI Schema Generation"],
    to: "/docs/tutorials/advanced/full-app",
    color: "#ef4444",
  },
];

function Tutorials() {
  return (
    <ContentSection background="alt">
      <div className="container">
        <VStack gap="lg" align="center">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="developers.tutorials.title">Tutorial Tracks</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="developers.tutorials.subtitle">Structured paths from zero to production</Translate>
            </Typography>
          </VStack>
        </VStack>
        <div className={styles.tutorialsGrid}>
          {TUTORIAL_TRACKS.map((track) => (
            <Link key={track.key} to={track.to} className={styles.tutorialCard}>
              <div
                className={styles.tutorialBadge}
                style={{ "--track-color": track.color } as React.CSSProperties}
              >
                <Translate id={track.labelId}>{track.labelDefault}</Translate>
              </div>
              <p className={styles.tutorialDesc}>
                <Translate id={track.descId}>{track.descDefault}</Translate>
              </p>
              <ul className={styles.tutorialItems}>
                {track.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className={styles.tutorialCta}>
                <Translate id="developers.tutorials.start">Start Track</Translate>{" "}
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </ContentSection>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Developers(): ReactNode {
  return (
    <Layout
      title={translate({ id: "developers.meta.title", message: "Developers — Almadar" })}
      description={translate({ id: "developers.meta.description", message: "Almadar developer hub — the Orbital Language, operator reference, tutorials, and quick start guide." })}
    >
      <HeroSection
        tag={translate({ id: "developers.hero.tag", message: "Programming Language" })}
        title={translate({ id: "developers.hero.title", message: "The Orbital Language" })}
        subtitle={translate({ id: "developers.hero.subtitle", message: "Almadar is a declarative schema language for full-stack applications. Define entities, state machines, and UI in a single .orb file — the compiler generates the rest." })}
        primaryAction={{ label: translate({ id: "developers.hero.getStarted", message: "Get Started" }), href: "/docs/getting-started/introduction" }}
        secondaryAction={{ label: translate({ id: "developers.hero.viewExamples", message: "View Examples" }), href: "/demos" }}
      />

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="developers.animation.title">How It Works</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="developers.animation.subtitle">
                Every Almadar application is composed of Orbital Units. An Entity holds your data, Traits define behavior as state machines, and Pages bind them to routes. Watch the architecture assemble itself.
              </Translate>
            </Typography>
          </VStack>
          <HeroSchemaAnimation />
          <Typography variant="body" color="muted">
            <Translate id="developers.animation.caption">Orbital Unit = Entity + Traits + Pages</Translate>
          </Typography>
        </VStack>
      </ContentSection>

      <CoreConcepts />
      <QuickStart />
      <OperatorModules />
      <RenderUIDemo />

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="developers.playground.title">Try It in the Browser</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="developers.playground.subtitle">Run Almadar s-expressions live -- no installation needed</Translate>
            </Typography>
          </VStack>
        </VStack>
        <div className={styles.playgroundEmbed}>
          <BrowserOnly
            fallback={
              <div className={playgroundStyles.loadingFallback}>
                <Translate id="playground.loading">Loading playground...</Translate>
              </div>
            }
          >
            {() => <PlaygroundCore />}
          </BrowserOnly>
        </div>
      </ContentSection>

      <Tutorials />
    </Layout>
  );
}
