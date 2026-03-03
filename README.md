# Almadar

> **فيزياء البرمجيات** — The Physics of Software

Just as physics lets us predict how the physical world behaves, Almadar lets us predict how software systems behave.

Almadar (المدار) is a **world modeling language** — a semantic layer above programming languages that describes *how systems work*, not just *what they do*. Write a formal world model once, and AI agents generate valid implementations, the compiler validates correctness deterministically, and you can observe every possible state before a single line of code runs.

```
World Model (.orb) → Compiler → Valid System
        ▲                              │
        │                              ▼
   Natural Language              Observable
   (Human or AI)                 Behavior
```

**Built for the AI age:** Token-efficient representations that agents can generate and reason about. Deterministic validation that catches errors before runtime. Observable state spaces that let you prove correctness.

---

## Quick Start

```bash
# Install CLI globally
npm install -g @almadar/cli

# Create a new project
almadar new my-app
cd my-app

# Install dependencies
npm install

# Start development server
almadar dev
```

---

## Core Philosophy

### Model the World, Not Just the Code

Traditional programming languages tell computers *what to do*. Almadar describes *how things work*:

- **Entities** — What exists in your system (User, Order, Task)
- **Traits** — How those things behave and change over time
- **Pages** — How the world is observed and interacted with

This world model is a formal specification that both humans and AI can reason about.

### The Orbital Formula

```
World Unit = Entity + Traits + Pages
System     = Σ(World Units)
```

Each orbital is a self-contained world model describing a domain of your system. Compose them to build complex, observable applications.

### Observable by Design

Because Almadar models behavior formally, you can:
- **Validate deterministically** — The compiler proves your model is valid before runtime
- **Exhaustively test** — Examine all possible states to ensure correctness
- **Generate efficiently** — AI agents produce valid systems from natural language
- **Reason precisely** — Both humans and machines understand the same model

### Closed Circuit Pattern

Every interaction flows through a predictable path:

```
User Action → Event → State Machine → Effects → World Update → (loop)
```

No hidden state mutations. No side effects you can't trace. Observable causality throughout.

---

## Architecture Overview

### High-Level System Flow

```
Natural Language ──┐
(Human or AI)      │
                   │
Human-written ─────┼──► ┌─────────────────┐
.orb Schema        │    │  Builder IDE    │  Generates/Edits
                   │    │  (LLM Agent)    │  .orb schema
                   └──► └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Rust Compiler   │  Parse → Validate → Resolve → Generate
                         │ (orbital-rust)  │
                         └────────┬────────┘
                                  │
                             ┌────┴────┐
                             ▼         ▼
                          TypeScript  Python
                             Shell     Shell
                          
                          (Rust shell coming soon)
```

### Three Execution Models

| Model | Use Case | Technology |
|-------|----------|------------|
| **TypeScript Runtime** | Preview, development | `packages/almadar-runtime/` |
| **Rust Runtime** | Standalone apps, CLI | `orbital-rust/crates/orbital-server/` |
| **Compiled Code** | Production deployment | Generated TS/Python (Rust coming soon) |

---

## Why Almadar?

### For AI-Generated Systems
Traditional code generation produces brittle outputs that break when requirements change. Almadar's world models are **token-efficient** and **structurally valid** — AI agents can generate, modify, and reason about them reliably.

### For Guaranteed Correctness
Deterministic validation catches errors at compile time, not runtime. Exhaustive state space analysis lets you prove your system behaves correctly before deploying.

### For Observable Behavior
State machines make causality explicit. Every effect traces back to an event. Every guard is visible. The system's behavior is inspectable and predictable.

### For Complex Rules
Encode business logic, compliance requirements, or game mechanics in a formal model that can be validated, tested, and reasoned about — not buried in imperative code.

---

## Key Concepts

### 1. Entities

Define your data models:

```json
{
  "entity": {
    "name": "Task",
    "collection": "tasks",
    "fields": [
      { "name": "id", "type": "string", "primaryKey": true },
      { "name": "title", "type": "string", "required": true },
      { "name": "status", "type": "enum", "values": ["pending", "done"] }
    ]
  }
}
```

📚 [Entity Documentation](https://almadar.io/docs/en/core-concepts/entities)

### 2. Traits (State Machines)

Define behavior with states, events, and transitions:

```json
{
  "trait": {
    "name": "TaskBrowser",
    "linkedEntity": "Task",
    "stateMachine": {
      "states": [
        { "name": "Browsing", "isInitial": true },
        { "name": "Creating" }
      ],
      "events": ["INIT", "CREATE", "SAVE", "CANCEL"],
      "transitions": [
        {
          "from": "Browsing",
          "to": "Browsing",
          "event": "INIT",
          "effects": [
            ["render-ui", "main", { "type": "entity-table", "entity": "Task" }]
          ]
        }
      ]
    }
  }
}
```

📚 [Trait Documentation](https://almadar.io/docs/en/core-concepts/traits) | [Closed Circuit](https://almadar.io/docs/en/core-concepts/closed-circuit)

### 3. Patterns & UI

Patterns bridge schemas to UI components:

```json
["render-ui", "main", {
  "type": "entity-table",
  "entity": "Task",
  "columns": ["title", "status"]
}]
```

📚 [Patterns Documentation](https://almadar.io/docs/en/core-concepts/patterns)

### 4. Standard Library

Reuse pre-built behaviors:

```json
{
  "uses": [{ "from": "std/behaviors/crud", "as": "CRUD" }],
  "traits": [{ "name": "TaskCRUD", "uses": ["CRUD"] }]
}
```

📚 [Standard Library](https://almadar.io/docs/en/core-concepts/standard-library)

---

## Installation

### NPM Packages

```bash
# Core packages
npm install @almadar/core @almadar/validation @almadar/evaluator

# Standard library
npm install @almadar/std

# UI patterns and components
npm install @almadar/patterns @almadar/ui

# Runtime
npm install @almadar/runtime @almadar/server

# AI agent infrastructure
npm install @almadar/agent @almadar/llm @almadar/skills
```

### CLI Installation

```bash
# npm (recommended)
npm install -g @almadar/cli

# Or use npx
npx @almadar/cli validate schema.orb
```

---

## Published Packages

All `@almadar` packages are published to [npm](https://www.npmjs.com/org/almadar).

### Core

| Package | Description |
|---------|-------------|
| `@almadar/core` | Core schema types and definitions |
| `@almadar/validation` | Schema validation rules |
| `@almadar/evaluator` | S-expression evaluator |
| `@almadar/std` | Standard library operators |
| `@almadar/patterns` | Pattern registry and component mappings |

### Runtime

| Package | Description |
|---------|-------------|
| `@almadar/runtime` | Interpreted runtime for orbital applications |
| `@almadar/server` | Server infrastructure (Express middleware) |
| `@almadar/ui` | React UI components, hooks, and providers |
| `@almadar/integrations` | External service integrations |

### AI & Agent

| Package | Description |
|---------|-------------|
| `@almadar/agent` | AI agent infrastructure |
| `@almadar/llm` | Multi-provider LLM client |
| `@almadar/skills` | AI skill generators and prompts |

### Tooling

| Package | Description |
|---------|-------------|
| `@almadar/cli` | Almadar CLI (validate, compile, dev) |
| `@almadar/extensions` | Editor extensions (VSCode, Zed) |

---

## Development Workflow

### The Fix Priority Rule

When something breaks, follow this order:

1. **Fix schema first** — 99% of issues are schema problems
2. **Update shell components** — Component bugs
3. **Modify compiler** — LAST RESORT (ask first!)

### Typical Flow

```
1. Edit Schema (.orb)
        ↓
2. Validate: orbital validate schema.orb
        ↓
3. Compile: orbital compile schema.orb --shell typescript
        ↓
4. Test generated code
        ↓
5. Iterate
```

📚 [Developer Guide](https://almadar.io/docs/en) | [Projects Guide](https://almadar.io/docs/en)

---

## Documentation

Full documentation is available at [almadar.io/docs](https://almadar.io/docs/en):

### Core Concepts

| Document | Purpose |
|----------|---------|
| [Entities](https://almadar.io/docs/en/core-concepts/entities) | Data models, field types, persistence |
| [Traits](https://almadar.io/docs/en/core-concepts/traits) | State machines, guards, effects |
| [Pages](https://almadar.io/docs/en/core-concepts/pages) | Routes, URL patterns, trait bindings |
| [Closed Circuit](https://almadar.io/docs/en/core-concepts/closed-circuit) | Event flow pattern |
| [Patterns](https://almadar.io/docs/en/core-concepts/patterns) | UI patterns and components |
| [Standard Library](https://almadar.io/docs/en/core-concepts/standard-library) | Reusable behaviors and operators |

### Tutorials

| Level | Topic |
|-------|-------|
| Beginner | [Your First Schema](https://almadar.io/docs/en/tutorials/beginner/complete-orbital) |
| Intermediate | [UI Patterns](https://almadar.io/docs/en/tutorials/intermediate/ui-patterns), [Guards](https://almadar.io/docs/en/tutorials/intermediate/guards) |
| Advanced | [Full App](https://almadar.io/docs/en/tutorials/advanced/full-app) |

### Full Documentation

Visit [almadar.io/docs](https://almadar.io/docs/en) for complete documentation.

---

## Repository Structure

```
almadar/
├── examples/          # Example schemas
├── templates/         # Shell templates for compilation
├── website/           # Documentation website
├── extensions/        # Editor extensions
├── cli/               # CLI source
├── skills/            # AI skill definitions
└── tests/             # Test suites
```



---

## Community

- [Discord](https://discord.gg/almadar)
- [Twitter](https://twitter.com/AlmadarLang)
- [GitHub Discussions](https://github.com/almadar-io/almadar/discussions)

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

BSL 1.1 (Business Source License) - See [LICENSE](./LICENSE)

- Source code: BSL 1.1 (converts to Apache 2.0 on 2030-02-01)
- Documentation: CC BY 4.0
- Non-production use: Free
- Production use: Requires license (contact licensing@almadar.io)

---

Built with ❤️ by [Almadar](https://almadar.io)
