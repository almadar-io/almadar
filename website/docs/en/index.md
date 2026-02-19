# Almadar

> **The Physics of Software**: Declare your application, compile to production

Welcome to the Almadar programming language documentation. Almadar is a declarative approach to building full-stack applications through state machines, entities, and traits.

## Quick Navigation

### Getting Started

- [Introduction](getting-started/introduction.md) - What is Almadar and why should you use it?
- [Installation](getting-started/installation.md) - Get the Almadar CLI on your system
- [Your First Schema](getting-started/first-schema.md) - Build a task manager in 10 minutes
- [Core Concepts](getting-started/core-concepts.md) - Entities, traits, and state machines

### Language Reference

- [Specification](language/specification.md) - Complete language specification
- [Entities](language/entities.md) - Data structures and persistence
- [Traits](language/traits.md) - Behavior as state machines
- [S-Expressions](language/s-expressions.md) - Guards and effects syntax
- [Effects](language/effects.md) - Server and client effects
- [Patterns](language/patterns.md) - UI pattern library

### Guides

#### Technical

- [State Machine Design](guides/technical/state-machines.md)
- [Guards and Permissions](guides/technical/guards-and-permissions.md)
- [Cross-Orbital Events](guides/technical/cross-orbital-events.md)
- [Testing](guides/technical/testing.md)

#### Business

- [Why Almadar?](guides/business/why-orbital.md)
- [Cost Comparison](guides/business/cost-comparison.md)
- [Case Studies](guides/business/case-studies.md)

### Tutorials

#### Beginner

- [Anatomy of a Complete Orbital](tutorials/beginner/complete-orbital.md) - Entity, traits, state machine, and pages
- [Build a Task Manager](tutorials/beginner/task-manager.md) - Full CRUD with lifecycle states

#### Intermediate

- [UI Patterns & render-ui](tutorials/intermediate/ui-patterns.md) - All pattern types, slots, and action wiring
- [Guards & Business Rules](tutorials/intermediate/guards.md) - S-expression conditions on transitions
- [Cross-Orbital Communication](tutorials/intermediate/cross-orbital.md) - Emits, listens, and payload contracts

#### Advanced

- [Building a Full Multi-Orbital Application](tutorials/advanced/full-app.md) - Three connected orbitals from a real schema
- [Generating Schemas with an LLM](tutorials/advanced/ai-generation.md) - Prompting, validation, and fixing common mistakes

### Reference

- [CLI Reference](reference/cli.md)
- [Standard Library](reference/std-library.md)
- [Traits Library](reference/traits-library.md)
- [Patterns Library](reference/patterns-library.md)
- [Error Codes](reference/error-codes.md)

---

## The Almadar Philosophy

### The Closed Circuit Pattern

Every user interaction in Almadar follows a guaranteed flow:

```
Event (User Action)
    ↓
Guard Evaluation (Permission Check)
    ↓
State Transition (Behavior Logic)
    ↓
Effects Execution
    ↓
Response to UI
```

This pattern ensures:
- **Security by design** - Guards enforce permissions at the transition level
- **Predictable behavior** - State machines can only exist in valid states
- **Testability** - Every path is enumerable and testable

### Three Pillars

1. **Entities** - What your application manages (data)
2. **Traits** - How your application behaves (state machines)
3. **Pages** - Where your application appears (routes)

### Why "Almadar"?

Like planets in orbit around a star, application components in Almadar follow predictable, law-governed paths. The laws of physics ensure stability; Almadar's state machines ensure application consistency.

---

## Community

- [Discord](https://discord.gg/YtWJCpnk) - Real-time chat and support
- [GitHub Discussions](https://github.com/almadar-io/almadar/discussions) - Technical discussions
- [LinkedIn](https://www.linkedin.com/company/almadar-io) - Updates and announcements

---

*Built with passion by [Almadar](https://almadar.io)*
