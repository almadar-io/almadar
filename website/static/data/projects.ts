import { useMemo } from "react";
import { translate } from "@docusaurus/Translate";

export interface TechPill {
  label: string;
}

export interface ProjectEntry {
  key: string;
  name: string;
  tagline: string;
  category: "Enterprise" | "Game" | "EdTech" | "Consumer" | "Platform";
  clientContext: string;
  whatWeBuilt: string;
  keyCapability: string;
  techPills: TechPill[];
  storybookUrl: string;
  featuredStoryId: string;
  appUrl: string;
  accentColor: string;
}

// Base project data (non-translatable fields)
const BASE_PROJECTS: Omit<ProjectEntry, "name" | "tagline" | "clientContext" | "whatWeBuilt" | "keyCapability" | "techPills">[] = [
  {
    key: "builder",
    category: "Platform",
    storybookUrl: "https://almadar-builder-design-system.web.app",
    featuredStoryId: "builder-templates-studioprojecttemplate--story-mode",
    appUrl: "https://kflow-builder-app.web.app",
    accentColor: "#c9a227",
  },
  {
    key: "kflow",
    category: "EdTech",
    storybookUrl: "https://almadar-kflow-design-system.web.app",
    featuredStoryId:
      "kflow-templates-appshelltemplate--series-detail&globals=theme:trait-wars-light",
    appUrl: "https://almadar-kflow.web.app",
    accentColor: "#6366f1",
  },
  {
    key: "inspection-system",
    category: "Enterprise",
    storybookUrl: "https://almadar-inspection-system-design-system.web.app",
    featuredStoryId:
      "clients-inspection-system-templates-inspectionformtemplate--empty-start&globals=theme:Inspection+System+Light",
    appUrl: "https://almadar-inspection-system.web.app",
    accentColor: "#0ea5e9",
  },
  {
    key: "winning-11",
    category: "Consumer",
    storybookUrl: "https://almadar-winning-11-design-system.web.app",
    featuredStoryId:
      "clients-winning-11-templates-relationshipgardentemplate--default&globals=theme:Winning+11+Light",
    appUrl: "https://almadar-winning-11.web.app",
    accentColor: "#8b5cf6",
  },
  {
    key: "blaz-klemenc",
    category: "Consumer",
    storybookUrl: "https://almadar-blaz-klemenc-design-system.web.app",
    featuredStoryId: "blaz-klemenc-organisms-mealplandetailboard--default",
    appUrl: "https://almadar-blaz-klemenc.web.app",
    accentColor: "#10b981",
  },
  {
    key: "kekec",
    category: "EdTech",
    storybookUrl: "https://almadar-kekec-design-system.web.app",
    featuredStoryId: "kekec-templates-worldmap--large-map",
    appUrl: "https://almadar-kekec.web.app",
    accentColor: "#f59e0b",
  },
  {
    key: "iram",
    category: "Game",
    storybookUrl: "https://almadar-iram-design-system.web.app",
    featuredStoryId: "game-animation-lab--lab",
    appUrl: "https://almadar-iram.web.app",
    accentColor: "#ef4444",
  },
  {
    key: "trait-wars",
    category: "Game",
    storybookUrl: "https://almadar-trait-wars-design-system.web.app",
    featuredStoryId: "trait-wars-templates-canvasworldmaptemplate--large-map",
    appUrl: "https://almadar-trait-wars.web.app",
    accentColor: "#c9a227",
  },
];

// Tech pill translation IDs
const TECH_PILL_IDS: Record<string, string[]> = {
  builder: [
    "projects.builder.tech.canvas",
    "projects.builder.tech.evaluator",
    "projects.builder.tech.compiler",
    "projects.builder.tech.ai",
    "projects.builder.tech.operators",
  ],
  kflow: [
    "projects.kflow.tech.graph",
    "projects.kflow.tech.stories",
    "projects.kflow.tech.mastery",
    "projects.kflow.tech.achievements",
    "projects.kflow.tech.curriculum",
  ],
  "inspection-system": [
    "projects.inspection.tech.entities",
    "projects.inspection.tech.statemachine",
    "projects.inspection.tech.rules",
    "projects.inspection.tech.documents",
    "projects.inspection.tech.offline",
  ],
  "winning-11": [
    "projects.winning11.tech.entities",
    "projects.winning11.tech.statemachines",
    "projects.winning11.tech.ai",
    "projects.winning11.tech.pages",
    "projects.winning11.tech.ui",
  ],
  "blaz-klemenc": [
    "projects.blaz.tech.entities",
    "projects.blaz.tech.credits",
    "projects.blaz.tech.ai",
    "projects.blaz.tech.progress",
    "projects.blaz.tech.links",
  ],
  kekec: [
    "projects.kekec.tech.tiers",
    "projects.kekec.tech.guardians",
    "projects.kekec.tech.puzzles",
    "projects.kekec.tech.dragdrop",
    "projects.kekec.tech.nodes",
  ],
  iram: [
    "projects.iram.tech.sprites",
    "projects.iram.tech.renderer",
    "projects.iram.tech.combat",
    "projects.iram.tech.cutscenes",
    "projects.iram.tech.i18n",
  ],
  "trait-wars": [
    "projects.traitwars.tech.traits",
    "projects.traitwars.tech.hybrid",
    "projects.traitwars.tech.rendering",
    "projects.traitwars.tech.screens",
    "projects.traitwars.tech.boss",
  ],
};

// Default English texts (for fallback)
const DEFAULT_PROJECTS: ProjectEntry[] = [
  {
    key: "builder",
    name: "Almadar Builder",
    tagline: "The schema-driven IDE that generates every project in this portfolio",
    category: "Platform",
    clientContext: "Every client project in this portfolio was built with the same tool: a browser-based IDE where developers describe application behavior as Orbital schemas (.orb files) and the compiler generates a full-stack TypeScript application. The builder needed to be self-hosting — the IDE itself is an Almadar application, built with its own design system and compiled by its own pipeline.",
    whatWeBuilt: "A full browser-based development environment for authoring Orbital schemas. The canvas lets developers compose entities, traits, pages, and events visually. A live evaluator validates s-expressions as you type. The compiler runs in-process and streams generated code to a preview pane. DeepAgent — the AI assistant integrated into the builder — translates natural language requirements into valid .orb schema using the same evaluator under the hood.",
    keyCapability: "Self-describing platform: the builder's own UI is generated from an Orbital schema. State machines, guard expressions, and render-ui effects that power the builder's panels are authored in the same .orb format that client projects use.",
    techPills: [
      { label: "Schema canvas editor" },
      { label: "Live s-expression evaluator" },
      { label: "In-browser compiler" },
      { label: "DeepAgent AI assistant" },
      { label: "213+ std operators" },
    ],
    storybookUrl: "https://almadar-builder-design-system.web.app",
    featuredStoryId: "builder-templates-studioprojecttemplate--story-mode",
    appUrl: "https://kflow-builder-app.web.app",
    accentColor: "#c9a227",
  },
  {
    key: "kflow",
    name: "KFlow",
    tagline: "Cross-domain knowledge platform that teaches through real engineering events",
    category: "EdTech",
    clientContext: "Most learning platforms silo knowledge by subject: physics here, cryptography there, ecology somewhere else. The client wanted a platform that surfaces the structural patterns connecting engineering disciplines — taught through real events where failures in one domain propagated into others.",
    whatWeBuilt: 'A knowledge exploration platform where learners navigate concepts, stories, and courses through a cross-domain graph. Each story is a real engineering event ("The $125 Million Bug", "The Bridge That Swayed") contextualized across disciplines. A knowledge graph shows how concepts link across domains. The dashboard tracks streaks, mastery, and breadth across a learner\'s concept map.',
    keyCapability: "Content model as schema: every concept, story, and course is an Orbital entity with traits that govern progress state, prerequisite guards, and recommendation logic. Adding a new domain means authoring schema, not writing recommendation algorithms.",
    techPills: [
      { label: "Cross-domain knowledge graph" },
      { label: "Real-event story engine" },
      { label: "Concept mastery tracking" },
      { label: "Streak and achievement system" },
      { label: "Multi-domain curriculum" },
    ],
    storybookUrl: "https://almadar-kflow-design-system.web.app",
    featuredStoryId: "kflow-templates-appshelltemplate--series-detail&globals=theme:trait-wars-light",
    appUrl: "https://almadar-kflow.web.app",
    accentColor: "#6366f1",
  },
  {
    key: "inspection-system",
    name: "Inspection System",
    tagline: "Field inspection management for government inspectors in Slovenia",
    category: "Enterprise",
    clientContext: "Government inspectors in Slovenia run complex, legally-mandated field inspections with 50–60 conditional rules per inspection type, law references to the official gazette (Uradni list RS), multi-party participation, and formal document generation with electronic signatures. Existing tools were paper-based or generic form builders with no understanding of inspection lifecycle structure.",
    whatWeBuilt: "A schema-driven field inspection management system. The entire 5-phase lifecycle (Introduction → Content → Preparation → Record → Closing) is encoded as a state machine in the .orb schema. Guards enforce legal preconditions at each phase transition. Effects trigger document compilation, participant management, and rule checking at the right moment — automatically.",
    keyCapability: "Schema-first conditional complexity: the same schema handles multiple inspection types. Rules appear and disappear based on entity state, not branching code paths. Adding a new inspection type means authoring schema, not refactoring logic.",
    techPills: [
      { label: "14 entities" },
      { label: "5-phase state machine" },
      { label: "50–60 conditional rules" },
      { label: "Document generation" },
      { label: "Offline capable" },
    ],
    storybookUrl: "https://almadar-inspection-system-design-system.web.app",
    featuredStoryId: "clients-inspection-system-templates-inspectionformdemotemplate--empty-start&globals=theme:Inspection+System+Light",
    appUrl: "https://almadar-inspection-system.web.app",
    accentColor: "#0ea5e9",
  },
  {
    key: "winning-11",
    name: "Winning 11",
    tagline: "Trust-based relationship intelligence built on Dunbar's Number",
    category: "Consumer",
    clientContext: "Professional networking platforms optimize for connection volume, not relationship quality. The client wanted a platform grounded in Dunbar's Number (150 meaningful relationships maximum) where connections are intentional, trust-scored, and actively maintained — not just accumulated contacts.",
    whatWeBuilt: "A relationship management platform with psychological depth. Users complete a compatibility assessment on signup. Each connection has a dynamic trust score computed from psychology, interaction history, and peer verification. Slots are finite (150 max) with a waiting room for overflow. Relationships have health states (Dormant, Needs Attention, Healthy, Thriving) that decay without interaction.",
    keyCapability: "Multi-entity state machine coordination: the health state machine on a Connection entity ticks independently of the User state machine, emitting events that surface in the dashboard. Complex cross-entity behavior with no custom orchestration code.",
    techPills: [
      { label: "14 entities" },
      { label: "5 state machines" },
      { label: "AI trust scoring" },
      { label: "18 pages" },
      { label: "Garden metaphor UI" },
    ],
    storybookUrl: "https://almadar-winning-11-design-system.web.app",
    featuredStoryId: "clients-winning-11-templates-relationshipgardentemplate--default&globals=theme:Winning+11+Light",
    appUrl: "https://almadar-winning-11.web.app",
    accentColor: "#8b5cf6",
  },
  {
    key: "blaz-klemenc",
    name: "Blaz Klemenc",
    tagline: "Fitness trainer platform with AI meal analysis",
    category: "Consumer",
    clientContext: "Personal trainers managing multiple trainees need to track credit-based session allocation, major lift progression, meal plans, daily wellness metrics, kinesiology exams, and group scheduling — across a fragmented set of spreadsheets, WhatsApp messages, and generic fitness apps.",
    whatWeBuilt: "A unified trainer-trainee management platform. Credits are purchased in blocks and expire by date — the system tracks allocation and expiry automatically. Meal plans are entered by trainees and analyzed by an AI service that estimates macro and micronutrient breakdown. Lift tracking shows historical progress curves.",
    keyCapability: "Service integration from schema: the AI meal analysis is declared as a call-service effect in the trait. The evaluator handles invocation, error states, and result binding — no custom async glue code in the application layer.",
    techPills: [
      { label: "15+ entities" },
      { label: "Credit expiry state machine" },
      { label: "AI meal analysis" },
      { label: "Progress visualization" },
      { label: "Shareable links" },
    ],
    storybookUrl: "https://almadar-blaz-klemenc-design-system.web.app",
    featuredStoryId: "blaz-klemenc-templates-mealplandetailtemplate--default",
    appUrl: "https://almadar-blaz-klemenc.web.app",
    accentColor: "#10b981",
  },
  {
    key: "kekec",
    name: "Kekec Koda",
    tagline: "Teaching children to code through Slovenia's beloved mountain hero",
    category: "EdTech",
    clientContext: "The client wanted a coding education game set in the world of Kekec — Slovenia's national character, a mountain shepherd boy — that teaches programming concepts progressively from simple sequences to full state machine design, without using abstract programming syntax.",
    whatWeBuilt: "A three-tier educational game where each tier teaches a different programming abstraction through physical metaphors: Sequencer (ages 5–8) uses drag-and-drop action blocks; Event Handler (ages 9–12) uses a WHEN/THEN rule editor; State Architect (ages 13+) uses a node graph editor for designing and testing full state machines. All tiers share an alpine world map with 12 animal guardians.",
    keyCapability: "Almadar building tools that teach Almadar's own concepts: the state machine the child designs in the State Architect tier is structurally identical to the Orbital traits that power the game itself.",
    techPills: [
      { label: "3 learning tiers" },
      { label: "12 animal guardians" },
      { label: "9 puzzles" },
      { label: "Drag-and-drop editor" },
      { label: "Node graph editor" },
    ],
    storybookUrl: "https://almadar-kekec-design-system.web.app",
    featuredStoryId: "kekec-templates-worldmap--large-map",
    appUrl: "https://almadar-kekec.web.app",
    accentColor: "#f59e0b",
  },
  {
    key: "iram",
    name: "Iram",
    tagline: "A 3D dungeon-crawling RPG driven by the Orbital trait system",
    category: "Game",
    clientContext: "Build a production-quality 3D dungeon-crawling RPG where character progression, combat, and narrative are driven by the same trait-state-machine system that powers enterprise Almadar applications — proving the runtime is general-purpose across domains.",
    whatWeBuilt: "A dungeon-crawling action RPG set in the Iram Dominion. Characters have trait-based progression — abilities are modeled as state machines that transition on combat events. The isometric renderer handles 31+ character and unit sprites with directional animation. A cutscene system delivers localized narrative across 22+ storyboard sequences in Arabic, English, and Slovenian.",
    keyCapability: "The same Orbital runtime that handles a government inspection workflow also drives real-time game combat. State machines, guards, and effects are domain-agnostic — the language works at any fidelity.",
    techPills: [
      { label: "31 sprite sheets" },
      { label: "Isometric canvas renderer" },
      { label: "Combat state machines" },
      { label: "22+ cutscene sequences" },
      { label: "EN / AR / SL narrative" },
    ],
    storybookUrl: "https://almadar-iram-design-system.web.app",
    featuredStoryId: "game-animation-lab--lab",
    appUrl: "https://almadar-iram.web.app",
    accentColor: "#ef4444",
  },
  {
    key: "trait-wars",
    name: "Trait Wars",
    tagline: "Turn-based strategy where units equip and swap traits between battles",
    category: "Game",
    clientContext: "A proof-of-concept demonstrating that Almadar's trait system can model a full turn-based strategy game, where units have persistent trait state across combat rounds and the game board is itself an Orbital entity.",
    whatWeBuilt: "A turn-based strategy game where units have modular equippable traits that determine their combat abilities. Traits are swappable between battles. Boss arena, dungeon encounters, hub world, and zone select screens are all driven by the same schema runtime, using a canvas + DOM hybrid renderer.",
    keyCapability: "Trait modularity at runtime: units acquire and lose traits during play — the same mechanism that governs entity state transitions in enterprise apps governs combat unit behavior in a strategy game.",
    techPills: [
      { label: "Equippable trait slots" },
      { label: "Canvas + DOM hybrid" },
      { label: "Isometric unit rendering" },
      { label: "4 distinct screens" },
      { label: "Boss arena combat" },
    ],
    storybookUrl: "https://almadar-trait-wars-design-system.web.app",
    featuredStoryId: "trait-wars-templates-canvasworldmaptemplate--large-map",
    appUrl: "https://almadar-trait-wars.web.app",
    accentColor: "#c9a227",
  },
];

// For backwards compatibility - static English projects
export const PROJECTS: ProjectEntry[] = DEFAULT_PROJECTS;

// Hook to get translated projects
export function useProjects(): ProjectEntry[] {
  return useMemo(() => {
    return BASE_PROJECTS.map((base) => {
      const defaultProject = DEFAULT_PROJECTS.find((p) => p.key === base.key)!;
      const techIds = TECH_PILL_IDS[base.key] || [];

      return {
        ...base,
        name: translate({
          id: `projects.${base.key}.name`,
          message: defaultProject.name,
        }),
        tagline: translate({
          id: `projects.${base.key}.tagline`,
          message: defaultProject.tagline,
        }),
        clientContext: translate({
          id: `projects.${base.key}.clientContext`,
          message: defaultProject.clientContext,
        }),
        whatWeBuilt: translate({
          id: `projects.${base.key}.whatWeBuilt`,
          message: defaultProject.whatWeBuilt,
        }),
        keyCapability: translate({
          id: `projects.${base.key}.keyCapability`,
          message: defaultProject.keyCapability,
        }),
        techPills: techIds.map((id, index) => ({
          label: translate({
            id,
            message: defaultProject.techPills[index]?.label || "",
          }),
        })),
      };
    });
  }, []);
}
