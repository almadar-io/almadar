---
slug: one-schema-six-apps
title: "One Schema, Six Apps: How We Built a Game, a Government Tool, and a Fitness Tracker with the Same Language"
authors: [almadar]
tags: [case-study, architecture]
---

A tactical strategy game. A 3D dungeon crawler. A relationship intelligence platform. A government inspection system. An AI learning platform. A personal fitness tracker.

Six applications. Six completely different domains. One language.

Here's how — and why it matters.

<!-- truncate -->

## The Claim

Every programming language claims to be "general purpose." But when was the last time you used the same framework to build a game *and* a government compliance tool?

Almadar's Orbital architecture is domain-agnostic by design. An Orbital is: Entity + Traits + Pages. That formula works for any domain because it models **behavior**, not **technology**.

Let's walk through all six.

## 1. Trait Wars — Tactical Strategy Game

**Domain:** Turn-based tactical combat
**Key Challenge:** Complex combat with visible AI, turn phases, unit composition

Trait Wars is a Heroes of Might and Magic-inspired strategy game where units equip **Traits** — visible state machines that define their behavior. The core innovation: players can read enemy state machines and exploit transition windows.

**How Orbitals model it:**

```
Match Orbital: manages game state, turns, win conditions
Unit Orbital: handles movement, combat, death
Hero Orbital: special abilities, trait composition
Terrain Orbital: tile effects, fog of war
```

Each unit's behavior is a trait with states like `Idle → Moving → Attacking → Defending`. Players see these states and plan around them.

**What makes this work:** The turn-based phase controller is a state machine itself:

```json
{
  "states": [
    { "name": "ObservationPhase", "isInitial": true },
    { "name": "SelectionPhase" },
    { "name": "MovementPhase" },
    { "name": "ActionPhase" },
    { "name": "ResolutionPhase" }
  ]
}
```

Five states. Clean transitions. No hidden game loop complexity.

## 2. Iram — 3D Action RPG

**Domain:** Dungeon-crawling ARPG
**Key Challenge:** Real-time combat, procedural dungeons, ability composition

Iram is set inside a Dyson Sphere called the Iram Dominion. Players descend through 5 dungeon zones, defeat bosses, and collect **Orbital Shards** — fragments of behavior that compose into new abilities.

**How Orbitals model it:**

```
Player Orbital: health, inventory, equipped orbitals
Dungeon Orbital: room generation, enemy spawning, loot tables
Combat Orbital: damage, projectiles, area effects
Boss Orbital: phase-based boss encounters
```

The player can equip 8 Orbitals simultaneously (Defend, Mend, Disrupt, Fabricate, Pathfind, Transmute, Command, Archive). Each is a self-contained state machine that composes with the others.

**The resonance system:** Compatible Orbitals create synergy effects:
- Defend + Mend → 1.5x shield healing
- Disrupt + Fabricate → Traps apply debuffs
- Archive + Command → Allies receive enemy weakness intel

This creates a deckbuilding meta-game on top of the action combat.

## 3. Winning 11 — Relationship Intelligence

**Domain:** Trust-based professional networking
**Key Challenge:** Dunbar's number enforcement, psychological compatibility, team formation

Winning 11 replaces passive LinkedIn-style networking with intentional, high-value "gardens" of trusted collaborators. The system enforces Dunbar's number (150 connection cap) and uses psychological assessments to calculate trust scores.

**How Orbitals model it:**

```
User Orbital: profile, Jungian archetype assessment
Connection Orbital: trust scoring, categorization, decay
Garden Orbital: relationship visualization, health metrics
Team Orbital: AI-driven team formation (2-11 members)
```

The psychological assessment is a multi-step trait with states for each question phase. Trust scores update as entity fields via effects when interactions occur.

**Guards enforce social dynamics:**

```json
{
  "from": "Active",
  "to": "Active",
  "event": "ADD_CONNECTION",
  "guard": ["<", "@entity.connectionCount", 150]
}
```

You literally can't add a 151st connection. It's not a suggestion — the state machine has no transition.

## 4. Government Inspection System — Compliance Workflow

**Domain:** Structured field inspections for government regulators
**Key Challenge:** 5-phase workflow enforcement, legal requirement guards, audit trails

Built for government inspectors, this system guides them through Introduction → Content → Preparation → Record → Closing phases. Legal requirements are enforced by guards — you can't advance without completing mandatory fields.

**How Orbitals model it:**

```
Inspection Orbital: 5-phase workflow, field validation, document generation
Inspector Orbital: authentication, assignment, workload
Company Orbital: entity being inspected, history, compliance status
```

**The closing guard ensures nothing is missed:**

```json
{
  "from": "Record",
  "to": "Closing",
  "event": "CLOSE",
  "guard": ["and",
    ["not-empty", "@entity.legalBasis"],
    ["not-empty", "@entity.findings"],
    ["not-empty", "@entity.measures"],
    ["=", "@entity.inspectorSignature", true],
    ["=", "@entity.subjectSignature", true]
  ]
}
```

Every state transition is automatically logged. The audit trail isn't a feature — it's a consequence of the architecture.

## 5. KFlow — AI Learning Platform

**Domain:** LLM-powered knowledge graph generation
**Key Challenge:** Recursive concept expansion, AI lesson generation, course publishing

KFlow transforms a seed topic (like "JavaScript") into a structured knowledge graph with interconnected concepts, AI-generated lessons, and publishable courses.

**How Orbitals model it:**

```
Graph Orbital: seed concept, difficulty levels, learning paths
Concept Orbital: hierarchical layers, prerequisites, follow-ups
Lesson Orbital: AI-generated content, flashcards, exercises
Course Orbital: curated subsets, publishing, mentor assignment
```

**Cross-orbital events drive the pipeline:**

```
User enters topic → Graph emits TOPIC_CREATED →
  Concept listens → expands prerequisites → emits CONCEPT_EXPANDED →
    Lesson listens → generates AI content → emits LESSON_CREATED →
      Course listens → adds to curriculum
```

The entire pipeline is declarative. No orchestration code. No job queues. Just events flowing through Orbitals.

## 6. Fitness Tracker — Personal Training Platform

**Domain:** Trainer-client management with credit-based scheduling
**Key Challenge:** Credit system, workout tracking, AI meal analysis

Built for a personal trainer managing multiple clients. Features a credit-based session booking system, lift tracking, meal plan management, and AI-powered nutritional analysis.

**How Orbitals model it:**

```
Trainee Orbital: profile, credits, progress metrics
Session Orbital: booking, credit deduction, cancellation
Workout Orbital: lift logging, reps, weight, trends
Meal Orbital: daily intake, AI analysis, trainer feedback
Schedule Orbital: group sessions, YouTube video references
```

**Credit expiry as a guard:**

```json
{
  "from": "Available",
  "to": "Booked",
  "event": "BOOK_SESSION",
  "guard": ["and",
    [">", "@entity.remainingCredits", 0],
    ["<", "@now", "@entity.creditsExpireAt"]
  ],
  "effects": [
    ["set", "@entity.remainingCredits", ["-", "@entity.remainingCredits", 1]]
  ]
}
```

Can't book with zero credits. Can't book with expired credits. The state machine knows.

## The Pattern

Six applications. Six different domains. The same pattern:

| Concept | Game | Government | Social | Fitness | Education | RPG |
|---------|------|-----------|--------|---------|-----------|-----|
| **Entity** | Unit | Inspection | Connection | Session | Concept | Player |
| **States** | Idle→Attack→Dead | Intro→Content→Close | Pending→Active→Decayed | Available→Booked→Done | Seed→Expanded→Published | Exploring→Combat→Boss |
| **Guards** | HP > 0, in range | Fields filled, signed | < 150 connections | Credits > 0 | Prerequisites met | Has required orbital |
| **Effects** | Deal damage, move | Save findings, log | Update trust score | Deduct credit | Generate lesson | Drop loot |
| **Events** | ATTACK, MOVE, DIE | PROCEED, CLOSE | CONNECT, DECAY | BOOK, CANCEL | EXPAND, PUBLISH | ENTER_ROOM, ATTACK |

The vocabulary changes. The structure doesn't.

## Why This Matters

### For Developers

You learn Almadar once. Then you can build:
- Business tools
- Games
- Government systems
- Social platforms
- AI-powered products
- Health and fitness apps

No new framework per domain. No new state management library. No new backend architecture. One language, one compiler, one mental model.

### For Companies

One team can build multiple products. The architect who designed the inspection system can design the game's combat system — the patterns are the same. States, transitions, guards, effects.

### For the Industry

The fact that the same architecture handles turn-based combat and government compliance suggests we've found something fundamental. Not a framework optimized for one domain, but a **model of behavior** that works across domains.

Because behavior is behavior. Whether it's a game unit deciding to attack, an inspector completing a phase, or a fitness trainer booking a session — it's all:

1. Start in a state
2. Receive an event
3. Check the guards
4. Execute the effects
5. Move to the next state

That's not a framework feature. That's how systems work.

## The Takeaway

The question "what language should I use?" is less important than "what model of behavior am I using?"

React + Express. Django + PostgreSQL. Rails + Redis. These are technology choices. They don't change how you model behavior — they just change where you write the same patterns.

Almadar is a behavior model that happens to compile to technology. One schema. Six apps. Because the model is right.

Explore all projects and try building your own at [almadar.io](/docs/getting-started/introduction).
