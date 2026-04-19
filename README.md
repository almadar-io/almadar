# Almadar

> Building tools for formally verifiable, AI-native software development.

Almadar builds developer tools that treat software behavior as a first-class, formally verifiable artifact. We combine programming language design, compiler engineering, and AI agent systems to make software that's correct by construction.

---

## Products

### [Orb](https://github.com/almadar-io/orb) - Programming Language

A formal language for describing how software behaves. Write a world model, the compiler proves it correct, AI agents generate valid implementations.

```
World Model (.orb) --> Compiler --> Valid System
```

- Turing-complete language for state machines, effects, and UI
- Deterministic compiler (Rust) with TypeScript and Python shells
- 129 standard behaviors across 18 domains
- Open source

### [Almadar Studio](https://studio.almadar.io) - Builder IDE

Visual builder where humans and AI agents collaborate to create software. Describe what you want in natural language, the agent generates a valid .orb program, the compiler produces a deployable app.

### [Almadar Services](https://services.almadar.io) - Infrastructure

AI-native infrastructure: compute, storage, authentication, event routing. Designed for agent-built applications.

### [KFlow Academy](https://kflow.academy) - Learning Platform

Interactive courses on software engineering, from fundamentals to AI-powered development.

---

## Architecture

```
Natural Language --> AI Agent --> .orb Program --> Rust Compiler --> Deployable App
                                     |                  |
                              Standard Library     Deterministic
                              (129 behaviors)      Validation
```

The core pipeline: a user (or AI agent) writes a `.orb` program describing system behavior. The Rust compiler validates it deterministically and generates a full-stack application (TypeScript frontend + Express backend). No runtime interpretation needed in production.

---

## Repositories

| Repository | Description |
|------------|-------------|
| [orb](https://github.com/almadar-io/orb) | The Orb programming language: compiler, standard library, CLI |
| [almadar-ui](https://github.com/almadar-io/almadar-ui) | React component library and design system |
| [almadar-core](https://github.com/almadar-io/almadar-core) | Core schema types and definitions |
| [almadar-std](https://github.com/almadar-io/almadar-std) | Standard library: 129 reusable behaviors |
| [almadar-agent](https://github.com/almadar-io/almadar-agent) | AI agent infrastructure (LangGraph, JEPA planner) |
| [almadar-llm](https://github.com/almadar-io/almadar-llm) | Multi-provider LLM client (Anthropic, DeepSeek, OpenRouter) |

---

## For Developers

### Quick Start

```bash
# Install the Orb compiler
npm install -g @almadar/cli

# Create and validate a schema
orbital validate my-app.orb

# Compile to TypeScript
orbital compile my-app.orb --shell typescript

# Start development server
orbital dev my-app.orb
```

### Published Packages (npm)

**Core**: `@almadar/core`, `@almadar/std`, `@almadar/evaluator`, `@almadar/patterns`, `@almadar/validation`

**Runtime**: `@almadar/runtime`, `@almadar/server`, `@almadar/ui`, `@almadar/integrations`

**AI**: `@almadar/agent`, `@almadar/llm`, `@almadar/skills`

### Key Design Decisions

- **Schema first**: Edit the .orb program, recompile. Never edit generated code.
- **Deterministic validation**: The compiler catches errors before runtime. No flaky tests.
- **Closed circuit**: Every user action flows through Event --> Guard --> State Machine --> Effects --> UI. No hidden mutations.
- **AI-native**: Token-efficient representations that agents generate and reason about reliably.

### Documentation

- [Orb Language Docs](https://orb.almadar.io/docs/getting-started/introduction)
- [API Reference](https://almadar.io/docs)

---

## Community

- [Discord](https://discord.gg/q83VjPJx)
- [GitHub Discussions](https://github.com/almadar-io/almadar/discussions)

---

## Team

Built by [Almadar](https://almadar.io) in Ljubljana, Slovenia.

## License

BSL 1.1 (Business Source License). Converts to Apache 2.0 on 2030-02-01. Non-production use is free.
